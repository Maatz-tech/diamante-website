import { Font, woff2 } from 'fonteditor-core';
import { readFileSync, writeFileSync } from 'node:fs';

await woff2.init();

const SRC = '/Users/samuelbarbosa/astro-power-template - cópia/Gotham-font-family-www.Dfonts.org/Gotham';
const OUT = '/Users/samuelbarbosa/diamante-website/public/fonts';
const weights = [
  ['Gotham-Book.otf', 'gotham-400', 400],
  ['Gotham-Medium.otf', 'gotham-500', 500],
  ['Gotham-Bold.otf', 'gotham-700', 700],
  ['Gotham-Black.otf', 'gotham-900', 900],
];

for (const [file, name, weight] of weights) {
  const buf = readFileSync(`${SRC}/${file}`);
  const font = Font.create(buf, { type: 'otf', hinting: true, compound2simple: false });
  const out = font.write({ type: 'woff2', hinting: true });
  writeFileSync(`${OUT}/${name}.woff2`, out);
  console.log(`${name}.woff2  ${(out.length/1024).toFixed(1)} KB  (otf: ${(buf.length/1024).toFixed(1)} KB)  peso ${weight}`);
}
