#!/usr/bin/env python3
"""Build labelled contact sheets of a guide's processed photos.

Reviewing ~100 photos one file at a time is impractical, and bad ones are
obvious the moment they sit next to good ones — a logo, a website
screenshot, or a photo of the wrong place jumps out immediately in a grid.

Usage:
    python3 scripts/travel-photos/contact-sheet.py copenhagen
    python3 scripts/travel-photos/contact-sheet.py copenhagen --grayscale

--grayscale previews how the grid actually looks on the page, since the
guide desaturates the photos in CSS.
"""
import argparse
import os
import sys

from PIL import Image, ImageDraw, ImageFont, ImageOps

COLS, ROWS = 4, 4
CELL_W, CELL_H = 380, 285
LABEL_H = 26
PAD = 8


def load_font():
    for candidate in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ):
        if os.path.exists(candidate):
            return ImageFont.truetype(candidate, 15)
    return ImageFont.load_default()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("city", help="guide slug, e.g. copenhagen")
    parser.add_argument("--out", help="directory for the sheets (default: current directory)")
    parser.add_argument(
        "--grayscale",
        action="store_true",
        help="preview as the page renders it, desaturated",
    )
    args = parser.parse_args()

    repo = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    src = os.path.join(repo, "public", "images", "travel", args.city)
    out = args.out or os.getcwd()

    if not os.path.isdir(src):
        sys.exit(f"no photos found at {src}")

    files = sorted(f for f in os.listdir(src) if f.endswith(".webp"))
    if not files:
        sys.exit(f"no .webp files in {src}")

    font = load_font()
    per_sheet = COLS * ROWS

    for index in range(0, len(files), per_sheet):
        batch = files[index : index + per_sheet]
        sheet_no = index // per_sheet + 1
        sheet = Image.new(
            "RGB",
            (COLS * (CELL_W + PAD) + PAD, ROWS * (CELL_H + LABEL_H + PAD) + PAD),
            (255, 255, 255),
        )
        draw = ImageDraw.Draw(sheet)

        for cell, name in enumerate(batch):
            row, col = divmod(cell, COLS)
            x = PAD + col * (CELL_W + PAD)
            y = PAD + row * (CELL_H + LABEL_H + PAD)
            im = Image.open(os.path.join(src, name)).resize((CELL_W, CELL_H), Image.LANCZOS)
            if args.grayscale:
                im = ImageOps.grayscale(im).convert("RGB")
            sheet.paste(im, (x, y))
            draw.text((x + 2, y + CELL_H + 5), os.path.splitext(name)[0], fill=(0, 0, 0), font=font)

        path = os.path.join(out, f"{args.city}-sheet{sheet_no}.jpg")
        sheet.save(path, "JPEG", quality=88)
        print(f"{path} ({len(batch)} photos)")


if __name__ == "__main__":
    main()
