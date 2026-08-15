from __future__ import annotations

import argparse
import mimetypes
import re
import time
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urldefrag, urljoin, urlparse, urlunparse
from urllib.request import Request, urlopen


ASSET_EXTENSIONS = {
    ".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico",
    ".woff", ".woff2", ".ttf", ".eot", ".otf", ".mp4", ".webm", ".pdf", ".xml",
    ".json", ".map",
}
HTML_ATTRS = {
    "href", "src", "poster", "data-src", "data-lazy-src", "data-thumb", "data-dark-logo",
    "data-bg", "data-background", "data-videomp4", "data-videowebm",
}
CSS_URL_RE = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.I)
CSS_IMPORT_RE = re.compile(r"@import\s+(?:url\()?\s*['\"]([^'\"]+)", re.I)
QUOTED_ASSET_RE = re.compile(
    r"['\"]([^'\"\s?#]+\.(?:css|js|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|eot|otf|mp4|webm|pdf|map)(?:\?[^'\"]*)?)['\"]",
    re.I,
)


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if not value:
                continue
            key = name.lower()
            if key in HTML_ATTRS:
                self.links.append(value)
            elif key == "srcset":
                self.links.extend(item.strip().split()[0] for item in value.split(",") if item.strip())
            elif key == "style":
                self.links.extend(match[1] for match in CSS_URL_RE.findall(value))


def normalized(url: str) -> str:
    url, _ = urldefrag(url)
    parsed = urlparse(url)
    path = re.sub(r"/{2,}", "/", parsed.path or "/")
    return urlunparse((parsed.scheme.lower(), parsed.netloc.lower(), path, "", parsed.query, ""))


def local_path(output: Path, url: str, content_type: str) -> Path:
    parsed = urlparse(url)
    rel = parsed.path.lstrip("/")
    if not rel or rel.endswith("/"):
        rel += "index.html"
    path = output / rel
    if not path.suffix and "text/html" in content_type:
        path = path / "index.html"
    elif not path.suffix:
        guessed = mimetypes.guess_extension(content_type.split(";", 1)[0].strip())
        if guessed:
            path = path.with_suffix(guessed)
    return path


def discover(content: bytes, content_type: str, base_url: str) -> list[str]:
    if not any(kind in content_type for kind in ("text/", "javascript", "json", "xml")):
        return []
    text = content.decode("utf-8", errors="replace")
    found: list[str] = []
    if "html" in content_type or "<html" in text[:1000].lower():
        parser = LinkParser()
        parser.feed(text)
        found.extend(parser.links)
    if "css" in content_type:
        found.extend(match[1] for match in CSS_URL_RE.findall(text))
        found.extend(CSS_IMPORT_RE.findall(text))
    found.extend(QUOTED_ASSET_RE.findall(text))
    return [urljoin(base_url, item.strip()) for item in found if item.strip()]


def should_queue(url: str, host: str) -> bool:
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or parsed.netloc.lower() != host:
        return False
    return not parsed.path.lower().endswith((".php", ".asp", ".aspx"))


def mirror(start_url: str, output: Path) -> tuple[int, list[tuple[str, str]]]:
    start = normalized(start_url)
    host = urlparse(start).netloc
    queue = deque([start])
    seen: set[str] = set()
    errors: list[tuple[str, str]] = []
    downloaded = 0

    while queue:
        url = normalized(queue.popleft())
        dedupe_key = urlunparse((*urlparse(url)[:4], "", ""))
        if dedupe_key in seen:
            continue
        seen.add(dedupe_key)
        request = Request(url, headers={"User-Agent": "Mozilla/5.0 SeccolLocalMirror/1.0"})
        try:
            with urlopen(request, timeout=30) as response:
                body = response.read()
                final_url = normalized(response.geturl())
                content_type = response.headers.get("Content-Type", "application/octet-stream").lower()
        except (HTTPError, URLError, TimeoutError) as exc:
            errors.append((url, str(exc)))
            continue

        destination = local_path(output, final_url, content_type)
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(body)
        downloaded += 1
        print(f"{downloaded:04d} {destination.relative_to(output)}")

        for candidate in discover(body, content_type, final_url):
            candidate = normalized(candidate)
            if should_queue(candidate, host):
                path = urlparse(candidate).path
                ext = Path(path).suffix.lower()
                if ext in ASSET_EXTENSIONS or not ext or ext in {".html", ".htm"}:
                    queue.append(candidate)
        time.sleep(0.02)
    return downloaded, errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Mirror a same-domain static website.")
    parser.add_argument("url")
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    count, errors = mirror(args.url, args.output.resolve())
    print(f"\nDownloaded: {count}")
    if errors:
        print(f"Errors: {len(errors)}")
        for url, error in errors:
            print(f"- {url}: {error}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
