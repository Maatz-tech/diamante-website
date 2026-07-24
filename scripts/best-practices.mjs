/**
 * Auditoria de boas práticas: erros de console, meta tags, segurança de links,
 * ícones, e higiene geral do HTML.
 *   node scripts/best-practices.mjs <url>
 */
import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4322';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

const errors = [];
const warnings = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text().slice(0, 120));
  if (m.type() === 'warning') warnings.push(m.text().slice(0, 120));
});
page.on('pageerror', (e) => errors.push('JS: ' + e.message.slice(0, 120)));
page.on('requestfailed', (r) =>
  errors.push('REQ: ' + r.url().split('/').pop() + ' — ' + r.failure()?.errorText)
);

await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += innerHeight) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
  scrollTo(0, 0);
});
await page.waitForTimeout(800);

const checks = await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const all = (s) => Array.from(document.querySelectorAll(s));
  const externalLinks = all('a[target="_blank"]');
  return {
    lang: document.documentElement.lang,
    charset: !!q('meta[charset]'),
    viewport: q('meta[name=viewport]')?.content,
    title: document.title,
    titleLen: document.title.length,
    description: q('meta[name=description]')?.content?.length ?? 0,
    canonical: !!q('link[rel=canonical]'),
    ogImage: !!q('meta[property="og:image"]'),
    ogDims: !!q('meta[property="og:image:width"]'),
    favicon: !!q('link[rel=icon]'),
    appleIcon: !!q('link[rel=apple-touch-icon]'),
    manifest: !!q('link[rel=manifest]'),
    themeColor: q('meta[name=theme-color]')?.content,
    jsonLd: !!q('script[type="application/ld+json"]'),
    generator: !!q('meta[name=generator]'),
    externalTotal: externalLinks.length,
    externalUnsafe: externalLinks.filter(
      (a) => !(a.rel || '').includes('noopener')
    ).length,
    imgs: all('img').length,
    imgsLazy: all('img[loading=lazy]').length,
    imgsNoDims: all('img').filter((i) => !i.width || !i.height).length,
    inlineStyles: all('[style]').length,
    scripts: all('script[src]').length,
    h1: all('h1').length,
    emptyLinks: all('a').filter(
      (a) => !a.textContent.trim() && !a.getAttribute('aria-label')
    ).length,
    httpLinks: all('a[href^="http:"]').length,
  };
});

const ok = (b) => (b ? '✓' : '✗');
console.log(`\n=== boas práticas ===`);
console.log(`  lang="${checks.lang}"                 ${ok(checks.lang === 'pt-BR')}`);
console.log(`  charset                         ${ok(checks.charset)}`);
console.log(`  viewport                        ${ok(!!checks.viewport)}`);
console.log(
  `  title (${checks.titleLen} chars)              ${ok(
    checks.titleLen > 10 && checks.titleLen <= 60
  )}`
);
console.log(
  `  description (${checks.description} chars)       ${ok(
    checks.description >= 120 && checks.description <= 165
  )}`
);
console.log(`  canonical                       ${ok(checks.canonical)}`);
console.log(`  og:image + dimensões            ${ok(checks.ogImage && checks.ogDims)}`);
console.log(`  JSON-LD                         ${ok(checks.jsonLd)}`);
console.log(`  h1 único                        ${ok(checks.h1 === 1)}`);

console.log(`\n=== ícones ===`);
console.log(`  favicon                         ${ok(checks.favicon)}`);
console.log(`  apple-touch-icon                ${ok(checks.appleIcon)}`);
console.log(`  web manifest                    ${ok(checks.manifest)}`);
console.log(`  theme-color (${checks.themeColor ?? '—'})        ${ok(!!checks.themeColor)}`);

console.log(`\n=== segurança / higiene ===`);
console.log(
  `  links externos com noopener     ${ok(checks.externalUnsafe === 0)} (${
    checks.externalTotal - checks.externalUnsafe
  }/${checks.externalTotal})`
);
console.log(`  links http:// inseguros         ${ok(checks.httpLinks === 0)}`);
console.log(`  meta generator removido         ${ok(!checks.generator)}`);
console.log(`  links sem rótulo                ${ok(checks.emptyLinks === 0)}`);

console.log(`\n=== assets ===`);
console.log(`  imagens: ${checks.imgs}  (lazy: ${checks.imgsLazy})`);
console.log(`  imagens sem width/height        ${ok(checks.imgsNoDims === 0)}`);
console.log(`  scripts externos: ${checks.scripts}`);
console.log(`  elementos com style inline: ${checks.inlineStyles}`);

console.log(`\n=== console ===`);
console.log(`  erros: ${errors.length} ${ok(errors.length === 0)}`);
errors.slice(0, 6).forEach((e) => console.log(`    · ${e}`));
console.log(`  avisos: ${warnings.length}`);
warnings.slice(0, 4).forEach((w) => console.log(`    · ${w}`));

await browser.close();
