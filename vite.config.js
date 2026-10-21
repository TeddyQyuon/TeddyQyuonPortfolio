import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Local preview serves the same security headers as production (vercel.json),
// so CSP problems show up before deployment. Dev mode is left without CSP
// because Vite's hot-reload client relies on inline scripts.
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'));
const productionHeaders = Object.fromEntries(
  vercel.headers[0].headers.map(({ key, value }) => [key, value]),
);

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4174,
    strictPort: true,
    headers: productionHeaders,
  },
  build: {
    sourcemap: false,
  },
});
