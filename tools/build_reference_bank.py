from __future__ import annotations

import hashlib
import json
import mimetypes
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
REFERENCE = ROOT / "reference"
SOURCE = REFERENCE / "site-original"
CATALOG = REFERENCE / "catalog"
BASE_URL = "https://seccol.com.br/"
CAPTURED_AT = "2026-08-15"
TEXT_TAGS = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li"}


def compact(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


class PageParser(HTMLParser):
    def __init__(self, source_url: str) -> None:
        super().__init__(convert_charrefs=True)
        self.source_url = source_url
        self.meta: list[dict[str, str]] = []
        self.blocks: list[dict[str, str]] = []
        self.links: list[dict[str, str | bool]] = []
        self.images: list[dict[str, str]] = []
        self.forms: list[dict] = []
        self.title = ""
        self._captures: list[dict] = []
        self._link_stack: list[dict] = []
        self._form: dict | None = None
        self._select: dict | None = None
        self._option: dict | None = None
        self._textarea: dict | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        data = {key.lower(): value or "" for key, value in attrs}
        if tag == "meta" and (data.get("name") or data.get("property")):
            self.meta.append({
                "key": data.get("name") or data.get("property", ""),
                "content": data.get("content", ""),
            })
        if tag in TEXT_TAGS or tag == "title":
            self._captures.append({"tag": tag, "parts": []})
        if tag == "a":
            self._link_stack.append({"href": data.get("href", ""), "parts": [], "title": data.get("title", "")})
        if tag == "img":
            kept = {key: value for key, value in data.items() if key in {
                "src", "alt", "title", "data-src", "data-lazy-src", "data-thumb", "data-dark-logo"
            } and value}
            if kept:
                self.images.append(kept)
        if tag == "form":
            self._form = {
                "action": data.get("action", ""),
                "method": (data.get("method") or "get").lower(),
                "id": data.get("id", ""),
                "fields": [],
            }
        elif self._form is not None and tag == "input":
            self._form["fields"].append({
                "element": "input",
                "type": data.get("type", "text"),
                "name": data.get("name", ""),
                "placeholder": data.get("placeholder", ""),
                "value": data.get("value", ""),
                "required": "required" in data,
            })
        elif self._form is not None and tag == "select":
            self._select = {
                "element": "select", "name": data.get("name", ""),
                "required": "required" in data, "options": [],
            }
            self._form["fields"].append(self._select)
        elif self._select is not None and tag == "option":
            self._option = {"value": data.get("value", ""), "parts": []}
        elif self._form is not None and tag == "textarea":
            self._textarea = {
                "element": "textarea", "name": data.get("name", ""),
                "placeholder": data.get("placeholder", ""), "required": "required" in data,
                "parts": [],
            }
            self._form["fields"].append(self._textarea)

    def handle_data(self, data: str) -> None:
        for capture in self._captures:
            capture["parts"].append(data)
        for link in self._link_stack:
            link["parts"].append(data)
        if self._option is not None:
            self._option["parts"].append(data)
        if self._textarea is not None:
            self._textarea["parts"].append(data)

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag in TEXT_TAGS or tag == "title":
            for index in range(len(self._captures) - 1, -1, -1):
                if self._captures[index]["tag"] == tag:
                    capture = self._captures.pop(index)
                    value = compact("".join(capture["parts"]))
                    if value:
                        if tag == "title":
                            self.title = value
                        else:
                            self.blocks.append({"element": tag, "text": value})
                    break
        if tag == "a" and self._link_stack:
            link = self._link_stack.pop()
            href = link["href"]
            absolute = urljoin(self.source_url, href) if href else ""
            self.links.append({
                "text": compact("".join(link["parts"])),
                "href": href,
                "absolute_url": absolute,
                "external": bool(absolute and urlparse(absolute).netloc not in {"", "seccol.com.br"}),
                "title": link["title"],
            })
        if tag == "option" and self._option is not None and self._select is not None:
            self._select["options"].append({
                "value": self._option["value"],
                "text": compact("".join(self._option["parts"])),
            })
            self._option = None
        elif tag == "select":
            self._select = None
        elif tag == "textarea" and self._textarea is not None:
            self._textarea["default_text"] = compact("".join(self._textarea.pop("parts")))
            self._textarea = None
        elif tag == "form" and self._form is not None:
            self.forms.append(self._form)
            self._form = None


def page_inventory(path: Path) -> dict:
    relative = path.relative_to(SOURCE).as_posix()
    source_url = BASE_URL if relative == "index.html" else urljoin(BASE_URL, relative)
    parser = PageParser(source_url)
    parser.feed(path.read_text(encoding="utf-8", errors="replace"))
    return {
        "page": relative,
        "source_url": source_url,
        "sha256": sha256(path),
        "title": parser.title,
        "meta": parser.meta,
        "content_blocks": parser.blocks,
        "images": parser.images,
        "links": parser.links,
        "forms": parser.forms,
    }


def image_inventory(path: Path, searchable: dict[str, str]) -> dict:
    relative = path.relative_to(SOURCE).as_posix()
    with Image.open(path) as image:
        width, height = image.size
        image_format = image.format
        mode = image.mode
    usages = []
    for source_file, content in searchable.items():
        if relative in content or relative.removeprefix("images/") in content:
            usages.append(source_file)
    return {
        "path": relative,
        "source_url": urljoin(BASE_URL, relative),
        "sha256": sha256(path),
        "bytes": path.stat().st_size,
        "format": image_format,
        "mode": mode,
        "width": width,
        "height": height,
        "aspect_ratio": round(width / height, 4) if height else None,
        "used_by": sorted(usages),
    }


def make_contact_sheet(images: list[dict]) -> None:
    cards = []
    font = ImageFont.load_default()
    for item in images:
        source = SOURCE / item["path"]
        with Image.open(source) as image:
            preview = image.convert("RGB")
            preview.thumbnail((260, 150), Image.Resampling.LANCZOS)
            card = Image.new("RGB", (300, 210), "white")
            x = (300 - preview.width) // 2
            y = 8 + (150 - preview.height) // 2
            card.paste(preview, (x, y))
            draw = ImageDraw.Draw(card)
            label = item["path"].replace("images/", "")
            if len(label) > 44:
                label = label[:41] + "..."
            draw.text((10, 166), label, fill="#222", font=font)
            draw.text((10, 184), f'{item["width"]} x {item["height"]} · {item["format"]}', fill="#666", font=font)
            cards.append(card)
    columns = 3
    rows = (len(cards) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * 300, rows * 210), "#eeeeee")
    for index, card in enumerate(cards):
        sheet.paste(card, ((index % columns) * 300, (index // columns) * 210))
    sheet.save(CATALOG / "image-contact-sheet.jpg", quality=90)


def main() -> int:
    CATALOG.mkdir(parents=True, exist_ok=True)
    files = sorted(path for path in SOURCE.rglob("*") if path.is_file())
    html_files = sorted(SOURCE.glob("*.html"))
    manifest = {
        "source": BASE_URL,
        "captured_at": CAPTURED_AT,
        "policy": "Arquivos originais imutáveis. Não editar reference/site-original.",
        "file_count": len(files),
        "files": [{
            "path": path.relative_to(SOURCE).as_posix(),
            "source_url": urljoin(BASE_URL, path.relative_to(SOURCE).as_posix()),
            "bytes": path.stat().st_size,
            "sha256": sha256(path),
            "content_type": mimetypes.guess_type(path.name)[0] or "application/octet-stream",
        } for path in files],
    }
    pages = [page_inventory(path) for path in html_files]
    searchable = {}
    for path in files:
        if path.suffix.lower() in {".html", ".css", ".js"}:
            searchable[path.relative_to(SOURCE).as_posix()] = path.read_text(encoding="utf-8", errors="replace")
    image_paths = sorted(path for path in (SOURCE / "images").rglob("*") if path.is_file())
    images = [image_inventory(path, searchable) for path in image_paths]

    (CATALOG / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (CATALOG / "pages.json").write_text(json.dumps({
        "source": BASE_URL,
        "captured_at": CAPTURED_AT,
        "page_count": len(pages),
        "pages": pages,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (CATALOG / "images.json").write_text(json.dumps({
        "source": BASE_URL,
        "captured_at": CAPTURED_AT,
        "image_count": len(images),
        "images": images,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    make_contact_sheet(images)
    print(f"files={len(files)} pages={len(pages)} images={len(images)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
