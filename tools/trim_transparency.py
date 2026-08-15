from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


def main() -> int:
    parser = argparse.ArgumentParser(description="Remove apenas bordas transparentes de uma imagem.")
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--padding", type=int, default=0)
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()

    source = args.input.resolve()
    destination = args.output.resolve()
    if not source.is_file():
        raise SystemExit(f"Origem não encontrada: {source}")
    if destination.exists() and not args.overwrite:
        raise SystemExit(f"Destino já existe: {destination}. Use --overwrite para substituir.")
    if args.padding < 0:
        raise SystemExit("--padding não pode ser negativo.")

    with Image.open(source).convert("RGBA") as image:
        bounds = image.getchannel("A").getbbox()
        if not bounds:
            raise SystemExit("A imagem é totalmente transparente.")
        left, top, right, bottom = bounds
        left = max(0, left - args.padding)
        top = max(0, top - args.padding)
        right = min(image.width, right + args.padding)
        bottom = min(image.height, bottom + args.padding)
        trimmed = image.crop((left, top, right, bottom))
        destination.parent.mkdir(parents=True, exist_ok=True)
        trimmed.save(destination, optimize=True)

    print(f"OK    {source.name}: {image.width}x{image.height} -> {trimmed.width}x{trimmed.height}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
