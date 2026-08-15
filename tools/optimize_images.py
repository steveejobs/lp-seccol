from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageOps


SUPPORTED = {".jpg", ".jpeg", ".png", ".webp"}


@dataclass
class Result:
    source: Path
    destination: Path
    before: int
    after: int

    @property
    def saved_percent(self) -> float:
        return (1 - self.after / self.before) * 100 if self.before else 0


def output_path(source: Path, input_root: Path, output_root: Path, target_format: str) -> Path:
    relative = source.relative_to(input_root)
    extension = source.suffix.lower()
    if target_format != "keep":
        extension = f".{target_format}"
    return (output_root / relative).with_suffix(extension)


def optimize(
    source: Path,
    destination: Path,
    max_width: int,
    quality: int,
    target_format: str,
    overwrite: bool,
) -> Result | None:
    if destination.exists() and not overwrite:
        print(f"SKIP  {destination} (já existe)")
        return None

    destination.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)

        selected_format = target_format if target_format != "keep" else source.suffix.lower().lstrip(".")
        if selected_format == "jpg":
            selected_format = "jpeg"

        save_options: dict[str, int | bool] = {"optimize": True}
        if selected_format in {"jpeg", "webp"}:
            save_options["quality"] = quality

        if selected_format == "jpeg" and image.mode not in {"RGB", "L"}:
            background = Image.new("RGB", image.size, "white")
            if "A" in image.getbands():
                background.paste(image, mask=image.getchannel("A"))
            else:
                background.paste(image.convert("RGB"))
            image = background

        image.save(destination, format=selected_format.upper(), **save_options)

    return Result(source, destination, source.stat().st_size, destination.stat().st_size)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Otimiza imagens sem alterar os arquivos de origem por padrão.",
    )
    parser.add_argument("input", type=Path, help="Imagem ou pasta de origem.")
    parser.add_argument("output", type=Path, help="Pasta de destino separada.")
    parser.add_argument("--max-width", type=int, default=2400)
    parser.add_argument("--quality", type=int, default=82)
    parser.add_argument("--format", choices=("keep", "webp", "jpg", "png"), default="webp")
    parser.add_argument("--overwrite", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    input_path = args.input.resolve()
    output_root = args.output.resolve()

    if not input_path.exists():
        raise SystemExit(f"Origem não encontrada: {input_path}")
    if not 1 <= args.quality <= 100:
        raise SystemExit("--quality deve estar entre 1 e 100.")
    if args.max_width < 320:
        raise SystemExit("--max-width deve ser pelo menos 320.")

    input_root = input_path if input_path.is_dir() else input_path.parent
    if output_root == input_root or input_root in output_root.parents:
        raise SystemExit("Use uma pasta de saída fora da árvore de origem para evitar recursão.")

    candidates = [input_path] if input_path.is_file() else sorted(input_path.rglob("*"))
    images = [path for path in candidates if path.is_file() and path.suffix.lower() in SUPPORTED]
    results: list[Result] = []

    for source in images:
        destination = output_path(source, input_root, output_root, args.format)
        result = optimize(
            source,
            destination,
            args.max_width,
            args.quality,
            args.format,
            args.overwrite,
        )
        if result:
            results.append(result)
            print(
                f"OK    {source.name}: {result.before / 1024:.1f} KB -> "
                f"{result.after / 1024:.1f} KB ({result.saved_percent:.1f}% menor)",
            )

    before = sum(result.before for result in results)
    after = sum(result.after for result in results)
    print(f"\nProcessadas: {len(results)} de {len(images)}")
    if before:
        print(f"Total: {before / 1024 / 1024:.2f} MB -> {after / 1024 / 1024:.2f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
