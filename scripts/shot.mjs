/**
 * Screenshot local para comparação pixel-perfect com o Figma.
 *
 *   node scripts/shot.mjs <url> <width> <output.png> [--full | --clip=selector]
 *
 * Exemplos:
 *   node scripts/shot.mjs http://localhost:4321 375 docs/local/hero-mobile.png --clip=#topo
 *   node scripts/shot.mjs http://localhost:4321 1440 docs/local/home-desktop.png --full
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const [url, widthArg, out, ...flags] = process.argv.slice(2);

if (!url || !widthArg || !out) {
  console.error(
    'uso: node scripts/shot.mjs <url> <width> <output.png> [--full|--clip=selector]'
  );
  process.exit(1);
}

const width = Number(widthArg);
const full = flags.includes('--full');
const clipFlag = flags.find((f) => f.startsWith('--clip='));
const clipSelector = clipFlag?.split('=')[1];

await mkdir(dirname(out), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height: 900 },
  deviceScaleFactor: 2,
  bypassCSP: true,
  // desliga as animações de entrada: sem isso a captura pega elementos
  // no meio do fade e a comparação com o Figma fica não-determinística
  reducedMotion: 'reduce',
});
// Sempre buscar assets frescos — evita comparar contra imagem em cache
await context.route('**/*', (route) =>
  route.continue({ headers: { ...route.request().headers(), 'cache-control': 'no-cache' } })
);
const page = await context.newPage();

await page.goto(url, { waitUntil: 'networkidle' });
// Garante que webfonts e imagens terminaram de carregar
await page.evaluate(() => document.fonts.ready);

// Rola a página inteira para disparar as imagens com loading="lazy"
// (sem isso o screenshot --full sai com buracos onde elas deveriam estar)
await page.evaluate(async () => {
  const step = window.innerHeight;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo(0, 0);
});
// aguarda as imagens que acabaram de entrar em carregamento (com teto de tempo)
await page.evaluate(
  () =>
    Promise.race([
      Promise.all(
        Array.from(document.images)
          .filter((i) => !i.complete)
          .map((i) => new Promise((res) => { i.onload = i.onerror = res; }))
      ),
      new Promise((res) => setTimeout(res, 4000)),
    ])
);
// Remove a barra de ferramentas do Astro dev para não poluir a comparação
await page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
await page.waitForTimeout(400);

if (clipSelector) {
  const el = await page.locator(clipSelector).first();
  await el.screenshot({ path: out });
} else if (full) {
  // fullPage do Playwright às vezes não pinta imagens lazy já carregadas.
  // Aumentar o viewport para a altura da página coloca tudo "em tela" e resolve.
  const height = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(500);
  await page.screenshot({ path: out });
} else {
  await page.screenshot({ path: out });
}

await browser.close();
console.log(`✓ ${out} (${width}px${full ? ', full page' : ''})`);
