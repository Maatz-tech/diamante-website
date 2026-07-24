// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO(dev-todo-list #5): trocar pelo domínio final antes do deploy
  site: 'https://diamanteenergia.com.br',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
