/* Verify the deployed site.
 *
 *   node tools/capture/verify-live.mjs [base-url]
 *
 * Checks every page for: HTTP 200, no console errors, no horizontal overflow,
 * and no request to any origin but its own. That last one is the load-bearing
 * check — the privacy page claims there are no third-party requests, and this
 * is what keeps that claim true after someone adds an embed in good faith.
 */
import { chromium } from 'playwright';
const base = process.argv[2] || 'https://expertzentrale.github.io/redmine-plugins';
const paths = ['/', '/de/', '/helpdesk/', '/de/helpdesk/', '/agile/', '/de/agile/',
               '/metrics/', '/de/metrics/', '/lightbox/', '/de/lightbox/',
               '/compatibility/', '/de/kompatibilitaet/', '/imprint/', '/de/impressum/',
               '/privacy/', '/de/datenschutz/'];
const b = await chromium.launch();
let bad = 0;
for (const p of paths) {
  const page = await b.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = [];
  page.on('response', r => { if (r.status() >= 400) errs.push(`${r.status()} ${r.url()}`); });
  page.on('console', m => { if (m.type() === 'error') errs.push(`console: ${m.text()}`); });
  const res = await page.goto(base + p, { waitUntil: 'networkidle' });
  const ov = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const foreign = await page.evaluate(() => performance.getEntriesByType('resource')
    .map(e => new URL(e.name).origin)
    .filter(o => o !== location.origin));
  const ok = res.status() === 200 && errs.length === 0 && ov <= 0 && foreign.length === 0;
  if (!ok) { bad++; console.log(`  FAIL ${p}: http=${res.status()} overflow=${ov} foreign=${foreign} errs=${errs}`); }
  await page.close();
}
console.log(bad === 0 ? `  all ${paths.length} pages: 200, no console errors, no overflow, no third-party requests` : `  ${bad} page(s) failed`);
await b.close();
