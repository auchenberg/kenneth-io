// Download one candidate photo into a guide's raw/ directory, rejecting
// anything that is not a usable photograph.
//
// Sourcing guide photos means trying a lot of URLs that turn out to be
// logos, tracking pixels, or HTML error pages served with an image
// content-type. This validates before keeping the file, so the raw
// directory only ever holds real candidates.
//
// Usage:
//   node scripts/travel-photos/grab.mjs copenhagen noma "https://…/photo.jpg"
//   node scripts/travel-photos/grab.mjs copenhagen noma "https://…" --raw /tmp/raw
//
// The <id> becomes the filename, and is what the guide's data file
// references. Re-running for an existing id replaces it.

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const MIN_WIDTH = 900;
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const argv = process.argv.slice(2);
const rawFlag = argv.indexOf('--raw');
const rawOverride = rawFlag !== -1 ? argv[rawFlag + 1] : null;
const [city, id, url] = argv.filter((a, i) => {
  if (a === '--raw') return false;
  if (rawFlag !== -1 && i === rawFlag + 1) return false;
  return true;
});

if (!city || !id || !url) {
  console.error('usage: node grab.mjs <city> <id> <image-url> [--raw <dir>]');
  process.exit(2);
}

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const raw = rawOverride || path.join(repo, 'raw-photos', city);
fs.mkdirSync(raw, { recursive: true });

const response = await fetch(url, {
  redirect: 'follow',
  headers: { 'user-agent': UA, accept: 'image/avif,image/webp,image/png,image/jpeg,*/*' },
});
if (!response.ok) {
  console.error(`HTTP ${response.status}`);
  process.exit(1);
}

const contentType = response.headers.get('content-type') || '';
const buffer = Buffer.from(await response.arrayBuffer());
if (!/image\//.test(contentType) && buffer.length < 20000) {
  console.error(`not an image (${contentType}, ${buffer.length} bytes)`);
  process.exit(1);
}

const ext = /png/.test(contentType)
  ? '.png'
  : /webp/.test(contentType)
    ? '.webp'
    : /avif/.test(contentType)
      ? '.avif'
      : '.jpg';

const tmp = path.join(raw, `.tmp-${id}${ext}`);
fs.writeFileSync(tmp, buffer);

// Decode it rather than trusting the content-type — this is what catches
// error pages and truncated downloads.
let width, height;
try {
  const dims = execFileSync(
    'python3',
    ['-c', `from PIL import Image;i=Image.open(r"${tmp}");print(i.width,i.height)`],
    { encoding: 'utf8' },
  ).trim();
  [width, height] = dims.split(' ').map(Number);
} catch {
  fs.unlinkSync(tmp);
  console.error('could not decode as an image');
  process.exit(1);
}

if (width < MIN_WIDTH) {
  fs.unlinkSync(tmp);
  console.error(`too small: ${width}x${height} (need >= ${MIN_WIDTH} wide)`);
  process.exit(1);
}

for (const existing of fs.readdirSync(raw)) {
  if (existing.replace(/\.[a-z]+$/, '') === id) fs.unlinkSync(path.join(raw, existing));
}
fs.renameSync(tmp, path.join(raw, id + ext));

// Record where it came from. The originals are too large to keep in git,
// so this is what makes a photo re-fetchable if the grade ever changes.
const sourcesPath = path.join(raw, 'sources.json');
let sources = {};
try {
  sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));
} catch {
  /* first photo for this city */
}
sources[id] = { url, width, height, fetched: new Date().toISOString().slice(0, 10) };
fs.writeFileSync(
  sourcesPath,
  JSON.stringify(Object.fromEntries(Object.entries(sources).sort()), null, 2) + '\n',
);

console.log(`SAVED ${id} ${width}x${height} ${(buffer.length / 1024).toFixed(0)}kb`);
