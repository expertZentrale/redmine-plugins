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

// A dashboard screenshot taken at a real "now" shows whatever the clock says,
// and the clock is often a Sunday evening — every stat panel then reads 1 and
// the product looks dead. Anchor the window on the most recent working-day
// mid-morning instead, which is both the honest busy case and reproducible.
function lastWorkdayMorning() {
  const end = new Date();
  end.setUTCHours(10, 30, 0, 0);
  if (end > new Date()) end.setUTCDate(end.getUTCDate() - 1);
  while (end.getUTCDay() === 0 || end.getUTCDay() === 6) {
    end.setUTCDate(end.getUTCDate() - 1);
  }
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 5);
  return { from: start.getTime(), to: end.getTime() };
}

const spec = cfg.plugins[plugin];
if (!spec) { console.error(`unknown plugin: ${plugin}`); process.exit(1); }
if (!spec.shots.length) { console.log(`  ${plugin}: no shots defined yet`); process.exit(0); }

mkdirSync(outDir, { recursive: true });

// channel:'chromium' picks the full browser build rather than the headless shell
// Playwright uses by default. The shell ships no PDF viewer, so the PDF shot came
// out as an empty white dialog.
const browser = await chromium.launch({ channel: 'chromium' });
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

// Only sign in if at least one shot actually needs a Redmine session. The
// Grafana dashboard shot does not — that container runs with anonymous access.
if (spec.shots.some(s => !s.noAuth)) {
  await signIn(spec.login || cfg.login);
  await setLanguage(lang);
}

for (const shot of spec.shots) {
  const target_page = shot.viewport
    ? await ctx.newPage() : page;
  if (shot.viewport) await target_page.setViewportSize(shot.viewport);

  let url = (shot.base || cfg.baseUrl) + shot.url;
  if (shot.timeRange === 'lastWorkdayMorning') {
    const { from, to } = lastWorkdayMorning();
    url += `${url.includes('?') ? '&' : '?'}from=${from}&to=${to}`;
  }
  await target_page.goto(url, { waitUntil: 'networkidle' });
  await target_page.evaluate(() => document.fonts.ready);
  if (shot.waitFor) await target_page.waitForSelector(shot.waitFor, { timeout: 30000 });

  // Some surfaces only exist after an interaction — the lightbox dialog is
  // created by the click that opens it, and its edge chevrons only fade in on
  // hover, which is exactly the behaviour worth showing.
  for (const action of shot.actions || []) {
    if (action.click) await target_page.click(action.click);
    if (action.hover) await target_page.hover(action.hover);
    if (action.mouse) {
      const vp = target_page.viewportSize();
      await target_page.mouse.move(vp.width * action.mouse[0], vp.height * action.mouse[1]);
    }
    if (action.waitMs) await target_page.waitForTimeout(action.waitMs);
  }
  // Grafana renders panels progressively after the layout exists, so a plain
  // networkidle is not enough to catch a dashboard with every graph drawn.
  if (shot.settleMs) await target_page.waitForTimeout(shot.settleMs);
  // Redmine's flash messages and the admin page's own auto-refresh meta would
  // both make a capture non-reproducible.
  await target_page.evaluate(() => {
    document.querySelectorAll('#flash_notice, .flash').forEach(el => el.remove());
  });
  const target = shot.clip ? target_page.locator(shot.clip).first() : target_page;
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
  if (shot.viewport) await target_page.close();
}

await browser.close();
