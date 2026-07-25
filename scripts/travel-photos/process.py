#!/usr/bin/env python3
"""Apply the travel-guide photo treatment.

Reads every image in a raw/ directory and writes a matching .webp into
public/images/travel/<city>/, cropped to 4:3 and put through one grade:
a gentle S-curve with lifted blacks, a light pull on saturation, and a
touch of contrast.

Colour is kept. The guide pages render the grid with
`filter: grayscale(1)` and drop to `grayscale(0)` on hover, so the
photos need their colour intact.

The point of the shared grade is consistency: guide photos come from
dozens of unrelated sources — press kits, brand CDNs, Wikimedia — and
without one treatment the grid looks like a scrapbook.

Usage:
    python3 scripts/travel-photos/process.py copenhagen
    python3 scripts/travel-photos/process.py copenhagen --only noma,barr
    python3 scripts/travel-photos/process.py copenhagen --raw /tmp/raw

The output filename is the input's basename, which is also the id the
guide's data file references (e.g. raw/noma.jpg -> noma.webp).
"""
import argparse
import os
import sys

from PIL import Image, ImageEnhance, ImageOps

WIDTH, HEIGHT = 1200, 900
QUALITY = 82

# grab.mjs keeps sources.json alongside the photos, so only take images.
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".tif", ".tiff"}

# Crop slightly above centre: in architectural shots the subject usually
# sits above the midline and the bottom is floor or foreground.
CENTERING = (0.5, 0.45)

SATURATION = 0.82
CONTRAST = 1.05

# Per-image crops applied before the 4:3 fit, for sources with a
# watermark or furniture along one edge. id -> (edge, fraction)
PRECROP = {
    "april": ("bottom", 0.08),
}


def _tone_curve():
    """Lift blacks, roll off highlights — a soft, film-like response."""
    out = []
    for value in range(256):
        x = value / 255.0
        x = x * x * (3 - 2 * x) * 0.82 + x * 0.18  # gentle S-curve
        x = 0.055 + x * (0.985 - 0.055)  # lift the black point
        out.append(max(0, min(255, int(round(x * 255)))))
    return out


CURVE = _tone_curve()


def process(src, dst, image_id=None):
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)

    # Flatten transparency onto white rather than letting it go black.
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        im = Image.alpha_composite(Image.new("RGBA", im.size, (255, 255, 255, 255)), im)
    im = im.convert("RGB")

    if image_id in PRECROP:
        edge, fraction = PRECROP[image_id]
        w, h = im.size
        if edge == "bottom":
            im = im.crop((0, 0, w, int(h * (1 - fraction))))
        elif edge == "top":
            im = im.crop((0, int(h * fraction), w, h))

    im = ImageOps.fit(im, (WIDTH, HEIGHT), method=Image.LANCZOS, centering=CENTERING)
    im = im.point(CURVE * 3)  # same curve per channel, so hue is preserved
    im = ImageEnhance.Color(im).enhance(SATURATION)
    im = ImageEnhance.Contrast(im).enhance(CONTRAST)
    im.save(dst, "WEBP", quality=QUALITY, method=6)
    return os.path.getsize(dst)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("city", help="guide slug, e.g. copenhagen")
    parser.add_argument("--raw", help="source directory (default: <repo>/raw-photos/<city>)")
    parser.add_argument("--only", help="comma-separated ids to process")
    args = parser.parse_args()

    repo = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    raw = args.raw or os.path.join(repo, "raw-photos", args.city)
    out = os.path.join(repo, "public", "images", "travel", args.city)

    if not os.path.isdir(raw):
        sys.exit(f"no such source directory: {raw}")
    os.makedirs(out, exist_ok=True)

    only = set(args.only.split(",")) if args.only else None
    total = count = 0
    for name in sorted(os.listdir(raw)):
        if name.startswith(".") or os.path.splitext(name)[1].lower() not in IMAGE_SUFFIXES:
            continue
        image_id = os.path.splitext(name)[0]
        if only and image_id not in only:
            continue
        try:
            total += process(os.path.join(raw, name), os.path.join(out, image_id + ".webp"), image_id)
            count += 1
        except Exception as exc:  # keep going; report at the end
            print(f"FAIL {image_id}: {exc}")

    if count:
        print(f"{count} images -> {out} ({total / 1024 / 1024:.1f} MB, avg {total / count / 1024:.0f} kb)")
    else:
        print("nothing to do")


if __name__ == "__main__":
    main()
