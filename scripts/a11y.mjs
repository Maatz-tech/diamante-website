/**
 * Auditoria de acessibilidade (axe-core) + checagens estruturais.
 *   node scripts/a11y.mjs <url> [width]
 */
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const url = process.argv[2] ?? 'http://localhost:4321';
const width = Number(process.argv[3] ?? 1440);

const browser = await chromium.launch();
// reducedMotion desliga as animações de entrada: sem isso o axe pode avaliar
// contraste de um elemento no meio do fade e reportar falso positivo
const context = await browser.newContext({
  viewport: { width, height: 900 },
  reducedMotion: 'reduce',
});
const page = await context.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
  .analyze();

console.log(`\n=== axe @ ${width}px ===`);
console.log(`passes: ${results.passes.length}  violations: ${results.violations.length}`);

for (const v of results.violations) {
  console.log(`\n[${v.impact?.toUpperCase()}] ${v.id} — ${v.help}`);
  console.log(`  ${v.helpUrl.split('?')[0]}`);
  v.nodes.slice(0, 4).forEach((n) => {
    console.log(`  · ${n.target.join(' ')}`);
    const msg = (n.failureSummary ?? '').split('\n').filter(Boolean).slice(1, 3);
    msg.forEach((m) => console.log(`      ${m.trim()}`));
  });
  if (v.nodes.length > 4) console.log(`  … +${v.nodes.length - 4} ocorrências`);
}

// --- Checagens estruturais próprias ---
const structure = await page.evaluate(() => {
  const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(
    (h) => ({ level: Number(h.tagName[1]), text: h.textContent.trim().slice(0, 48) })
  );
  const imgsNoAlt = Array.from(document.querySelectorAll('img:not([alt])')).map(
    (i) => i.getAttribute('src')
  );
  const imgsNoDims = Array.from(document.querySelectorAll('img'))
    .filter((i) => !i.getAttribute('width') || !i.getAttribute('height'))
    .map((i) => i.getAttribute('src'));
  const links = Array.from(document.querySelectorAll('a')).filter(
    (a) => !a.textContent.trim() && !a.getAttribute('aria-label')
  ).length;
  return {
    headings,
    imgsNoAlt,
    imgsNoDims,
    unlabelledLinks: links,
    landmarks: {
      header: document.querySelectorAll('header').length,
      nav: document.querySelectorAll('nav').length,
      main: document.querySelectorAll('main').length,
      footer: document.querySelectorAll('footer').length,
    },
  };
});

console.log('\n=== estrutura ===');
console.log('landmarks:', JSON.stringify(structure.landmarks));

// hierarquia de headings
let prev = 0;
const jumps = [];
structure.headings.forEach((h) => {
  if (prev && h.level > prev + 1) jumps.push(`h${prev} -> h${h.level} (${h.text})`);
  prev = h.level;
});
console.log(
  `headings: ${structure.headings.length}` +
    (jumps.length ? `\n  ⚠️ saltos: ${jumps.join(', ')}` : '  (hierarquia ok)')
);
const h1s = structure.headings.filter((h) => h.level === 1).length;
console.log(`h1: ${h1s} ${h1s === 1 ? '(ok)' : '⚠️ deve haver exatamente 1'}`);
console.log(
  `imgs sem alt: ${structure.imgsNoAlt.length}` +
    (structure.imgsNoAlt.length ? ` ⚠️ ${structure.imgsNoAlt.join(', ')}` : '')
);
console.log(
  `imgs sem width/height: ${structure.imgsNoDims.length}` +
    (structure.imgsNoDims.length ? ` ⚠️ ${structure.imgsNoDims.join(', ')}` : '')
);
console.log(`links sem rótulo: ${structure.unlabelledLinks}`);

await browser.close();
process.exit(results.violations.length ? 1 : 0);
