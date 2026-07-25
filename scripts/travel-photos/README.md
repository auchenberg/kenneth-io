# Travel guide photo pipeline

Tools for the photos on the travel guide pages (`/travel/copenhagen`).

Guide photos come from dozens of unrelated sources — press kits, brand
CDNs, architecture publications, Wikimedia. Left alone they look like a
scrapbook: different crops, exposures and colour casts sitting next to
each other. These scripts put every photo through one crop and one grade
so the grid reads as a single set.

## The three steps

**1. Fetch a candidate**

```sh
node scripts/travel-photos/grab.mjs copenhagen noma "https://…/photo.jpg"
```

Downloads to `raw-photos/copenhagen/noma.jpg` and rejects anything that
isn't a real photograph — decodes it and requires at least 900px wide,
which is what catches logos, tracking pixels, and HTML error pages served
with an image content-type. The `<id>` is the filename and the key the
guide's data file references.

It also appends to `raw-photos/<city>/sources.json`, recording the URL
each photo came from.

**2. Apply the treatment**

```sh
python3 scripts/travel-photos/process.py copenhagen
python3 scripts/travel-photos/process.py copenhagen --only noma,barr
```

Writes `public/images/travel/copenhagen/<id>.webp`: cropped to 4:3
(1200×900, centred slightly above the midline), then a gentle S-curve
with lifted blacks so shadows keep their detail, saturation pulled to
0.82, contrast 1.05, WebP quality 82. Lands around 130kb each.

Requires Pillow: `pip install pillow`.

**3. Review the set**

```sh
python3 scripts/travel-photos/contact-sheet.py copenhagen --grayscale
```

Labelled 4×4 sheets. A bad photo is obvious next to good ones in a way
it never is on its own, and `--grayscale` previews how the grid actually
looks on the page.

## Colour

The photos keep their colour. The guide page desaturates the grid in CSS
and restores it on hover:

```css
:global(.item-image) { filter: grayscale(1); transition: filter 0.5s ease; }
.item-card:hover :global(.item-image) { filter: grayscale(0); }
```

So don't flatten photos to black and white on export — the hover needs
the colour to be there.

## The originals aren't in git

`raw-photos/` is gitignored; the Copenhagen originals alone are ~124MB.
Only the processed `.webp` files are committed.

This matters if the grade ever changes: re-running `process.py` over the
already-processed files would grade them twice. Re-fetch the originals
from `sources.json` first, then re-process.

## Per-image fixes

A few photos need an edge trimmed before the 4:3 crop — a watermark, or
furniture cut off along one side. Add them to `PRECROP` in `process.py`:

```python
PRECROP = {
    "april": ("bottom", 0.08),   # trims an 8% strip to drop a watermark
}
```
