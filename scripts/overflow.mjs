/**
 * Encontra elementos que estouram a largura do viewport.
 *   node scripts/overflow.mjs <url> <width>
 */
import { chromium } from 'playwright';

const [url, widthArg] = process.argv.slice(2);
const width = Number(widthArg ?? 375);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });

const offenders = await page.evaluate((vw) => {
  const out = [];
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 || r.left < -1) {
      out.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        cls: (el.className?.toString?.() ?? '').slice(0, 70),
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
    }
  });
  return out;
}, width);

// Só os que não estão dentro de um ancestral com overflow escondido
console.log(`viewport ${width}px — ${offenders.length} elementos estouram:`);
offenders.slice(0, 25).forEach((o) =>
  console.log(
    `  <${o.tag}${o.id ? '#' + o.id : ''}> l:${o.left} r:${o.right}  ${o.cls}`
  )
);

await browser.close();
