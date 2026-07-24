/**
 * Percorre a página só com Tab e reporta a ordem de foco, checando se
 * cada elemento focado tem indicador de foco visível e rótulo acessível.
 *   node scripts/keyboard.mjs <url> [width]
 */
import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4321';
const width = Number(process.argv[3] ?? 1440);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width, height: 900 } });
const page = await context.newPage();
await page.goto(url, { waitUntil: 'networkidle' });

const seen = [];
let noOutline = 0;

for (let i = 0; i < 40; i++) {
  await page.keyboard.press('Tab');
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const s = getComputedStyle(el);
    const label =
      el.getAttribute('aria-label') ||
      el.textContent?.trim().slice(0, 38) ||
      el.getAttribute('alt') ||
      '';
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || '',
      // índice no DOM: distingue elementos com o mesmo rótulo
      domIndex: Array.from(document.querySelectorAll('*')).indexOf(el),
      label,
      // outline OU box-shadow contam como indicador visível
      outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0,
      shadow: s.boxShadow !== 'none',
    };
  });
  if (!info) break;
  const key = `${info.domIndex}`;
  if (seen.some((s) => s.key === key)) break; // deu a volta
  if (!info.outline && !info.shadow) noOutline++;
  seen.push({ ...info, key });
}

console.log(`\n=== ordem de foco @ ${width}px (${seen.length} paradas) ===`);
seen.forEach((s, i) => {
  const mark = s.outline || s.shadow ? '✓' : '✗ sem foco visível';
  console.log(
    `${String(i + 1).padStart(2)}. <${s.tag}${s.id ? '#' + s.id : ''}> ${
      s.label || '(sem rótulo)'
    }  ${mark}`
  );
});
console.log(
  noOutline
    ? `\n⚠️ ${noOutline} elemento(s) sem indicador de foco visível`
    : '\n✓ todos os elementos focáveis têm indicador visível'
);

await browser.close();
