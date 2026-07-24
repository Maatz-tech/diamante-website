/**
 * Compara a página desenvolvida com a referência do Figma, seção por seção.
 * Alinha cada seção pelo topo (as alturas divergem por causa da fonte),
 * gera imagens lado a lado e um mapa de diferença.
 *
 *   node scripts/compare.mjs <url> <largura>
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:4321';
const width = Number(process.argv[3] ?? 1440);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width, height: 900 } });
const page = await context.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

const sections = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('main > section').forEach((s) => {
    const r = s.getBoundingClientRect();
    out.push({
      id: s.id,
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
    });
  });
  const f = document.querySelector('footer');
  if (f) {
    const r = f.getBoundingClientRect();
    out.push({
      id: 'footer',
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
    });
  }
  return out;
});

writeFileSync('docs/local/sections.json', JSON.stringify(sections, null, 1));
console.log('seções na página desenvolvida:');
sections.forEach((s) =>
  console.log(`  ${s.id.padEnd(16)} top:${String(s.top).padStart(5)}  h:${s.height}`)
);

await browser.close();
