import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:3001/login', { waitUntil: 'domcontentloaded' });
await p.fill('#username', 'm.keller'); await p.fill('#password', 'screenshots');
await p.click('input[type="submit"]'); await p.waitForLoadState('networkidle');
await p.goto('http://localhost:3001/projects/field-service/wiki/Branch_042', { waitUntil: 'networkidle' });
await p.click("img[src*='/attachments/']");
await p.waitForTimeout(1200);
const open = await p.locator('dialog[open]').count();
console.log('  inline wiki image opens the dialog:', open === 1 ? 'YES' : 'NO');
if (open) console.log('  caption:', await p.locator('.elb-caption').textContent(),
                      '| counter:', await p.locator('.elb-counter').textContent());
await b.close();
