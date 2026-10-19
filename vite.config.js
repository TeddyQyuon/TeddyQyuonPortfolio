import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Preview uses the deployment headers so CSP can be checked locally.
//
// A missing or reshaped vercel.json fails loudly with an actionable message
// instead of a TypeError, and never silently serves preview without its
// security headers — that would let local CSP checks pass for the wrong reason.
//
// The lookup is deferred to preview only, so `vite build` and the dev server do
// not depend on the deployment config being present or valid.
function productionHeaders() {
  const configPath = new URL('./vercel.json', import.meta.url);

  if (!existsSync(configPath)) {
    throw new Error(
      '[vite] vercel.json is missing, so preview cannot mirror the production security headers.'
    );
  }

  const { headers } = JSON.parse(readFileSync(configPath, 'utf8'));
  const rule = (headers ?? []).find((entry) => entry?.source === '/(.*)');

  if (!Array.isArray(rule?.headers) || rule.headers.length === 0) {
    throw new Error(
      '[vite] vercel.json has no "/(.*)" header rule, so preview cannot mirror the production security headers.'
    );
  }

  return Object.fromEntries(rule.headers.map(({ key, value }) => [key, value]));
}

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  server: { host: '127.0.0.1' },
  build: {
    rollupOptions: {
      output: {
        // Split the vendor graph so the entry chunk stays under Vite's 500 kB
        // warning and so framework code caches independently of app code.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          // Only MUI and Emotion form their own chunk. Shared low-level helpers
          // (@babel/runtime, react-transition-group, clsx, ...) must stay in the
          // react bucket: MUI imports them AND they import react, so putting
          // them on the MUI side creates a vendor-mui <-> vendor-react cycle.
          if (id.includes('@mui') || id.includes('@emotion')) {
            return 'vendor-mui';
          }
          if (id.includes('react-router')) return 'vendor-router';
          return 'vendor-react';
        },
      },
    },
  },
  // `vite preview` resolves with command "serve" and mode "production";
  // `vite` (dev) resolves with mode "development" and `vite build` with
  // command "build", so neither touches vercel.json.
  preview: {
    host: '127.0.0.1',
    headers: command === 'serve' && mode === 'production' ? productionHeaders() : {},
  },
}));
