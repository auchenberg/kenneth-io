import { chromium } from 'playwright';

const slug = process.argv[2];
const output = process.argv[3];

if (!slug) {
  console.error('Usage: node scripts/screenshot-post.mjs <post-slug> [output-path]');
  console.error('Example: node scripts/screenshot-post.mjs technical-co-founders-are-more-important-than-ever');
  process.exit(1);
}

const outputPath = output || `${slug}.png`;
const PADDING = 100;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 800 },
  deviceScaleFactor: 2,
});

await page.goto(`http://localhost:3000/post/${slug}`, {
  waitUntil: 'networkidle',
});

// Hide the "back to kenneth.io" link and set white background
await page.evaluate(() => {
  const backLink = document.querySelector('a[href="/"]');
  if (backLink) backLink.style.display = 'none';
  document.documentElement.style.background = 'white';
  document.body.style.background = 'white';
});

await page.waitForTimeout(300);

// Get .post bounding box (includes header + content)
const box = await page.evaluate(() => {
  const el = document.querySelector('.post');
  const rect = el.getBoundingClientRect();
  return { x: rect.x, y: rect.y + window.scrollY, width: rect.width, height: rect.height };
});

const clip = {
  x: Math.max(0, box.x - PADDING),
  y: Math.max(0, box.y - PADDING),
  width: box.width + PADDING * 2,
  height: box.height + PADDING * 2,
};

await page.screenshot({
  path: outputPath,
  fullPage: true,
  clip,
});

console.log(`Screenshot saved to ${outputPath}`);
await browser.close();
