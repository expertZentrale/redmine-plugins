/* Capture plugin screenshots from the clean screenshots stack.
 *
 *   node tools/capture/capture.mjs <plugin> --lang en|de [--out DIR]
 *
 * Reads shots.json. Points at docker-compose.screenshots.yml on :3001, NOT the
 * dev stack — that one's database is a restore of production, and several of
 * these surfaces report installation-wide numbers.
 *
 * Language comes from the capture user's own Redmine preference rather than an
 * Accept-Language header, because that is what actually drives Redmine's
 * locale. The agile plugin is the exception: its board columns are issue status
 * *names*, i.e. data, so its seed has a RELABEL mode instead.
 */
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(resolve(here, 'shots.json'), 'utf8'));

const plugin = process.argv[2];
const lang = (process.argv.includes('--lang')
  ? process.argv[process.argv.indexOf('--lang') + 1] : 'en');
const outIdx = process.argv.indexOf('--out');
const outDir = outIdx > -1 ? process.argv[outIdx + 1]
  : resolve(here, 'shots-raw', plugin, lang);

const spec = cfg.plugins[plugin];
if (!spec) { console.error(`unknown plugin: ${plugin}`); process.exit(1); }
if (!spec.shots.length) { console.log(`  ${plugin}: no shots defined yet`); process.exit(0); }

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: cfg.viewport,
  deviceScaleFactor: cfg.deviceScaleFactor,
  reducedMotion: 'reduce',
});
const page = await ctx.newPage();

async function signIn({ user, password }) {
  await page.goto(`${cfg.baseUrl}/login`, { waitUntil: 'domcontentloaded' });
  await page.fill('#username', user);
  await page.fill('#password', password);
  await page.click('input[type="submit"]');
  await page.waitForLoadState('networkidle');
  if (await page.locator('#login-form').count()) {
    throw new Error(`sign-in failed for ${user} — is the seed loaded?`);
  }
}

// Redmine renders in the *user's* configured language, so set it once per run
// rather than fighting it per request.
async function setLanguage(code) {
  await page.goto(`${cfg.baseUrl}/my/account`, { waitUntil: 'domcontentloaded' });
  await page.selectOption('#user_language', code);
  await page.click('input[type="submit"]');
  await page.waitForLoadState('networkidle');
}

await signIn(spec.login || cfg.login);
await setLanguage(lang);

for (const shot of spec.shots) {
  await page.goto(cfg.baseUrl + shot.url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // Redmine's flash messages and the admin page's own auto-refresh meta would
  // both make a capture non-reproducible.
  await page.evaluate(() => {
    document.querySelectorAll('#flash_notice, .flash').forEach(el => el.remove());
  });
  const target = shot.clip ? page.locator(shot.clip).first() : page;
  const path = resolve(outDir, `${shot.file}.png`);
  await target.screenshot({ path });

  // Redmine's content column is min-height'd, so an element screenshot carries
  // a slab of empty white under the content. Trim the uniform edges and give
  // the result an even margin back, which also normalises the left/right
  // padding across pages.
  if (shot.trim !== false) {
    execFileSync('convert', [path, '-background', 'white', '-flatten',
                             '-trim', '+repage',
                             '-bordercolor', 'white', '-border', '28', path]);
  }
  console.log(`  ${plugin}/${lang}/${shot.file}.png`);
}

await browser.close();
