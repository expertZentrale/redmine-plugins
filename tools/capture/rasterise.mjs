/* Rasterise SVG -> PNG through Chromium.
 *
 * ImageMagick is not usable for this: its SVG delegate is rsvg-convert, which
 * is not installed here, so it silently falls back to its own MSVG renderer.
 * That renderer ignores group `opacity` (the 5% expert-star watermark comes out
 * solid) and mis-places `<tspan>` runs (the "for Redmine" line overlaps). Both
 * artifacts reproduce on the original agile logo, so they are the renderer, not
 * the artwork.
 *
 *   node tools/capture/rasterise.mjs <in.svg> <out.png> <size>
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [input, output, sizeArg] = process.argv.slice(2);
if (!input || !output) {
  console.error('usage: rasterise.mjs <in.svg> <out.png> [size]');
  process.exit(1);
}
const size = Number(sizeArg) || 500;
const svg = readFileSync(resolve(input), 'utf8');

// Nunito is not installed in this Chromium, and the wordmark is set in it.
// Inline the self-hosted variable font as a data URI so the raster matches the
// site exactly rather than falling back to a generic sans.
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const nunito = readFileSync(resolve(repoRoot, 'assets/fonts/nunito-latin.woff2')).toString('base64');
const fontFace = `@font-face{font-family:'Nunito';font-weight:400 900;font-style:normal;` +
                 `src:url(data:font/woff2;base64,${nunito}) format('woff2')}`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: size, height: size },
  deviceScaleFactor: 1,
});
await page.setContent(
  `<!doctype html><meta charset="utf-8">
   <style>
     ${fontFace}
     html,body{margin:0;padding:0;background:transparent}
     svg{display:block;width:${size}px;height:${size}px}
   </style>${svg}`,
  { waitUntil: 'load' }
);
// The wordmark is set in Nunito; without it Chromium falls back and the
// letterforms are wrong. Wait for the webfont the page just declared.
await page.evaluate(() => document.fonts.ready);
await page.locator('svg').screenshot({ path: resolve(output), omitBackground: true });
await browser.close();
console.log(`  ${output} (${size}px)`);
