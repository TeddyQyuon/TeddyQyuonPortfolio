import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
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
  plugins: [react(), {
    name: 'project-html-preview',
    configurePreviewServer(server) {
      // Apply the project rewrite before Vite's SPA fallback, as Vercel does.
      server.middlewares.use((req, _res, next) => {
        const match = /^\/projects\/([a-z0-9-]+)\/?(\?.*)?$/.exec(req.url || '');
        if (match && ['GET', 'HEAD'].includes(req.method)) {
          const entry = resolve(server.config.root, server.config.build.outDir, 'projects', match[1], 'index.html');
          if (existsSync(entry)) req.url = `/projects/${match[1]}/index.html${match[2] || ''}`;
        }
        next();
      });
    },
  }],
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
