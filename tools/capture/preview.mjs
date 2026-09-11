/* Screenshot the local Jekyll site for review.
 *
 *   node tools/capture/preview.mjs <path> <out.png> [--dark] [--mobile] [--full]
 */
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const path = args[0] || '/';
const out  = args[1] || '/tmp/preview.png';
const dark   = args.includes('--dark');
const mobile = args.includes('--mobile');
const full   = args.includes('--full');

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: dark ? 'dark' : 'light',
  reducedMotion: 'reduce',
});
await page.goto(`http://127.0.0.1:4111${path}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out, fullPage: full });

// Surface the two failure modes a static site hides: console errors, and a page
// that scrolls sideways.
const overflow = await page.evaluate(() =>
  document.documentElement.scrollWidth - document.documentElement.clientWidth);
if (overflow > 0) console.log(`  !! horizontal overflow: ${overflow}px`);
await browser.close();
console.log(`  ${out}`);
