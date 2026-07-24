/**
 * Auditoria de performance sobre o build de produção (npm run preview).
 * Mede peso transferido, LCP, CLS e checa lazy-loading.
 *   node scripts/perf.mjs <url> [width]
 */
import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4322';
const width = Number(process.argv[3] ?? 390);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height: 844 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

const assets = [];
page.on('response', async (res) => {
  try {
    const h = res.headers();
    const type = (h['content-type'] ?? '').split(';')[0];
    const body = await res.body().catch(() => null);
    if (body) assets.push({ url: res.url(), type, size: body.length });
  } catch {}
});

await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);

const vitals = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const out = { lcp: 0, cls: 0, lcpEl: '' };
      new PerformanceObserver((l) => {
        const e = l.getEntries().at(-1);
        out.lcp = Math.round(e.startTime);
        out.lcpEl = e.element?.tagName
          ? `${e.element.tagName.toLowerCase()} ${
              e.element.getAttribute('src') ?? e.element.className ?? ''
            }`.slice(0, 60)
          : e.url ?? '';
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => {
        l.getEntries().forEach((e) => {
          if (!e.hadRecentInput) out.cls += e.value;
        });
      }).observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => resolve(out), 900);
    })
);

const byType = {};
let total = 0;
assets.forEach((a) => {
  const k = a.type || 'outro';
  byType[k] = (byType[k] ?? 0) + a.size;
  total += a.size;
});

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

console.log(`\n=== performance @ ${width}px (build de produção) ===`);
console.log(`peso total carregado: ${kb(total)}  (${assets.length} requisições)`);
Object.entries(byType)
  .sort((a, b) => b[1] - a[1])
  .forEach(([t, s]) => console.log(`  ${t.padEnd(26)} ${kb(s)}`));

console.log('\nmaiores arquivos:');
assets
  .sort((a, b) => b.size - a.size)
  .slice(0, 6)
  .forEach((a) =>
    console.log(`  ${kb(a.size).padStart(9)}  ${a.url.split('/').pop()}`)
  );

console.log('\ncore web vitals:');
console.log(`  LCP: ${vitals.lcp} ms  ${vitals.lcp < 2500 ? '✓' : '⚠️ >2.5s'}`);
console.log(`  CLS: ${vitals.cls.toFixed(4)}  ${vitals.cls < 0.1 ? '✓' : '⚠️ >0.1'}`);
console.log(`  elemento LCP: ${vitals.lcpEl}`);

// lazy loading acima/abaixo da dobra
const imgs = await page.evaluate((vh) => {
  const out = { eagerBelow: [], lazyAbove: [] };
  document.querySelectorAll('img').forEach((i) => {
    const top = i.getBoundingClientRect().top + window.scrollY;
    const lazy = i.getAttribute('loading') === 'lazy';
    const src = (i.getAttribute('src') ?? '').split('/').pop();
    if (top > vh && !lazy) out.eagerBelow.push(src);
    if (top < vh && lazy) out.lazyAbove.push(src);
  });
  return out;
}, 844);

console.log('\nlazy-loading:');
console.log(
  `  imagens abaixo da dobra sem lazy: ${imgs.eagerBelow.length}` +
    (imgs.eagerBelow.length ? ` ⚠️ ${imgs.eagerBelow.join(', ')}` : ' ✓')
);
console.log(
  `  imagens acima da dobra com lazy: ${imgs.lazyAbove.length}` +
    (imgs.lazyAbove.length ? ` ⚠️ ${imgs.lazyAbove.join(', ')}` : ' ✓')
);

await browser.close();
