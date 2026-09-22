import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Preview uses the deployment headers so CSP can be checked locally.
const deploymentConfig = JSON.parse(
  readFileSync(new URL('./vercel.json', import.meta.url), 'utf8')
);
const productionHeaders = Object.fromEntries(
  deploymentConfig.headers
    .find((rule) => rule.source === '/(.*)')
    .headers.map(({ key, value }) => [key, value])
);

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1', headers: productionHeaders },
});
