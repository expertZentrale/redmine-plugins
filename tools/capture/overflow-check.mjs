import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto('http://127.0.0.1:4111/de/metrics/', { waitUntil: 'networkidle' });
const culprits = await p.evaluate(() => {
  const docW = document.documentElement.clientWidth;
  const out = [];
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.right > docW + 0.5 || r.left < -0.5) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.toString()).slice(0, 40),
        right: Math.round(r.right), left: Math.round(r.left), w: Math.round(r.width),
        text: (el.textContent || '').trim().slice(0, 50),
      });
    }
  });
  return { docW, out: out.slice(0, 12) };
});
console.log(JSON.stringify(culprits, null, 1));
await b.close();
