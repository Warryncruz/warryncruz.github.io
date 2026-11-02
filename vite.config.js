import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import portfolio from './vite-plugin-portfolio.js';

function normalizeBase(value) {
  if (!value || value === '/') return '/';
  let base = value.trim();
  if (!base.startsWith('/')) base = '/' + base;
  if (!base.endsWith('/')) base = base + '/';
  return base;
}

const BASE_PATH = normalizeBase(process.env.BASE_PATH || '/');

export default defineConfig({
  base: BASE_PATH,
  plugins: [
    tailwindcss(),

    portfolio(),
  ],
  build: {
    target: 'es2020',
    rollupOptions: {

      input: {
        main: 'index.html',
        notFound: '404.html',
      },
    },
  },
});
