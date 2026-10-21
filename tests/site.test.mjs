import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { read, root } from './helpers.mjs';

const html = read('index.html');

test('social preview image is an absolute 1200x630 PNG', () => {
  const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert.equal(og, 'https://teddy-qyuon-portfolio.vercel.app/og-image.png');
  assert.match(html, /name="twitter:image" content="https:\/\/[^"]+\.png"/);

  const png = readFileSync(resolve(root, 'public/og-image.png'));
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert.equal(png.readUInt32BE(16), 1200, 'width');
  assert.equal(png.readUInt32BE(20), 630, 'height');
});

test('index.html has canonical URL, description and no inline scripts or styles', () => {
  assert.match(html, /<link rel="canonical" href="https:\/\/teddy-qyuon-portfolio\.vercel\.app\/"/);
  assert.match(html, /<meta\s+name="description"/);
  // CSP is script-src 'self' with no 'unsafe-inline' for styles.
  const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>/g)];
  assert.equal(inlineScripts.length, 0, 'inline <script> found');
  assert.doesNotMatch(html, /\sstyle="/, 'inline style attribute found');
  assert.ok(existsSync(resolve(root, 'public/theme-init.js')));
});

test('vercel.json keeps strict security headers', () => {
  const headers = Object.fromEntries(
    JSON.parse(read('vercel.json')).headers[0].headers.map((h) => [h.key, h.value]),
  );
  const csp = headers['Content-Security-Policy'];
  assert.match(csp, /default-src 'none'/);
  assert.match(csp, /script-src 'self'(;|$)/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.doesNotMatch(csp, /unsafe-eval/);
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['Cross-Origin-Opener-Policy'], 'same-origin');
  assert.equal(headers['Cross-Origin-Resource-Policy'], 'same-origin');
});

test('built output ships no source maps', () => {
  const dist = resolve(root, 'dist');
  if (!existsSync(dist)) return; // Only meaningful after `npm run build`.
  const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [e.name]));
  assert.deepEqual(walk(dist).filter((f) => f.endsWith('.map')), []);
});

test('dependencies are pinned to exact versions', () => {
  const pkg = JSON.parse(read('package.json'));
  for (const [name, version] of Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })) {
    assert.match(version, /^\d+\.\d+\.\d+$/, `${name} is not pinned (${version})`);
  }
});
