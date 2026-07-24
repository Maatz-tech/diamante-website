/**
 * Mede posição/tamanho de elementos para comparar com o Figma.
 *
 *   node scripts/measure.mjs <url> <width> <selector> [selector...]
 *
 * Imprime top/left/width/height em px CSS, relativos à seção pai mais próxima.
 */
import { chromium } from 'playwright';

const [url, widthArg, ...selectors] = process.argv.slice(2);

if (!url || !widthArg || selectors.length === 0) {
  console.error('uso: node scripts/measure.mjs <url> <width> <selector...>');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(widthArg), height: 900 },
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);

for (const sel of selectors) {
  const data = await page.evaluate((selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const section = el.closest('section') ?? document.body;
    const r = el.getBoundingClientRect();
    const s = section.getBoundingClientRect();
    return {
      top: Math.round(r.top - s.top),
      left: Math.round(r.left - s.left),
      width: Math.round(r.width),
      height: Math.round(r.height),
    };
  }, sel);

  if (!data) {
    console.log(`${sel.padEnd(34)} — não encontrado`);
    continue;
  }
  console.log(
    `${sel.padEnd(34)} top:${String(data.top).padStart(5)}  left:${String(
      data.left
    ).padStart(5)}  ${data.width}×${data.height}`
  );
}

await browser.close();
