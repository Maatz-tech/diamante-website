// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO(dev-todo-list #5): trocar pelo domínio final antes do deploy
  site: 'https://diamanteenergia.com.br',
  // GitHub Pages serve o repo de projeto em /<repo>/. Quando o domínio próprio
  // for anexado (servindo na raiz), trocar para base: '/'.
  base: '/diamente-website/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
