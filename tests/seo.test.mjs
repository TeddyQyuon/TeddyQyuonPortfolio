import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import {
  SITE_URL,
  absoluteUrl,
  projectDescription,
  projectPageTitle,
  truncateText,
} from '../src/utils/seo.js';
import { renderProjectHtml, renderSitemap } from '../scripts/generate-seo.mjs';

const read = (file) => fs.readFileSync(path.resolve(file), 'utf8');

test('Home metadata: absolute PNG social image, canonical URL and Twitter alt text', () => {
  const html = read('index.html');

  assert.ok(html.includes('rel="canonical" href="https://teddy-qyuon-portfolio.vercel.app/"'));
  assert.ok(
    html.includes(
      'property="og:image" content="https://teddy-qyuon-portfolio.vercel.app/og-image.png"'
    )
  );
  assert.ok(html.includes('property="og:image:type" content="image/png"'));
  assert.ok(html.includes('property="og:image:width" content="1200"'));
  assert.ok(html.includes('property="og:image:height" content="630"'));
  assert.ok(html.includes('property="og:site_name" content="Wai Yan Hpone Lat"'));
  assert.ok(html.includes('property="og:url" content="https://teddy-qyuon-portfolio.vercel.app/"'));
  assert.ok(
    html.includes('name="twitter:image" content="https://teddy-qyuon-portfolio.vercel.app/og-image.png"')
  );
  assert.ok(html.includes('name="twitter:image:alt"'));
  assert.ok(!html.includes('og-image.svg'), 'social crawlers should receive the raster PNG');
});

test('Robots: allows the site and points at the generated sitemap', () => {
  const robots = read('public/robots.txt');
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.ok(robots.includes('Sitemap: https://teddy-qyuon-portfolio.vercel.app/sitemap.xml'));
});

test('Vercel rewrites: project HTML is selected before the SPA fallback', () => {
  const config = JSON.parse(read('vercel.json'));
  const sources = config.rewrites.map((rewrite) => rewrite.source);

  assert.equal(sources.at(-1), '/(.*)', 'the SPA fallback must remain last');
  const projectRule = config.rewrites.find((rewrite) => rewrite.source === '/projects/:slug');
  assert.ok(projectRule, 'the project rewrite must exist');
  assert.equal(projectRule.destination, '/projects/:slug/index.html');

  const trailingSlashRule = config.rewrites.find(
    (rewrite) => rewrite.source === '/projects/:slug/'
  );
  assert.ok(trailingSlashRule, 'trailing-slash project URLs must also resolve');
  assert.equal(trailingSlashRule.destination, '/projects/:slug/index.html');
});

test('SEO helpers: canonical URLs and project copy are deterministic', () => {
  const project = {
    displayName: 'Demo',
    name: 'Demo Project',
    category: 'Full-Stack',
    slug: 'demo-project',
    seoDescription: 'A short, verified description.',
  };

  assert.equal(projectPageTitle(project), 'Demo | Wai Yan Hpone Lat');
  assert.equal(projectDescription(project), 'A short, verified description.');
  assert.equal(absoluteUrl('/projects/demo-project'), `${SITE_URL}/projects/demo-project`);
  assert.ok(truncateText('word '.repeat(100)).length <= 155);
  assert.ok(truncateText('word '.repeat(100)).endsWith('…'));
});

test('Project HTML generator replaces every crawler-visible tag', () => {
  const template = `<!doctype html>
<html lang="en">
  <head>
    <title>Old title</title>
    <meta name="description" content="Old description" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://old.example/" />
    <meta property="og:title" content="Old title" />
    <meta property="og:description" content="Old description" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://old.example/" />
    <meta property="og:image" content="https://old.example/old.svg" />
    <meta property="og:image:type" content="image/svg+xml" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Old alt" />
    <meta property="og:site_name" content="Old site" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Old title" />
    <meta name="twitter:description" content="Old description" />
    <meta name="twitter:image" content="https://old.example/old.svg" />
    <meta name="twitter:image:alt" content="Old alt" />
  </head>
  <body></body>
</html>`;

  const html = renderProjectHtml(template, {
    title: 'Demo & Test | Wai Yan Hpone Lat',
    description: 'A & B',
    type: 'article',
    canonical: 'https://example.com/projects/demo',
    image: 'https://example.com/og.png',
    imageAlt: 'Demo case study',
    siteName: 'Wai Yan Hpone Lat',
  });

  assert.ok(html.includes('<title>Demo &amp; Test | Wai Yan Hpone Lat</title>'));
  assert.ok(html.includes('name="description" content="A &amp; B"'));
  assert.ok(html.includes('property="og:title" content="Demo &amp; Test | Wai Yan Hpone Lat"'));
  assert.ok(html.includes('property="og:type" content="article"'));
  assert.ok(html.includes('property="og:url" content="https://example.com/projects/demo"'));
  assert.ok(html.includes('property="og:image" content="https://example.com/og.png"'));
  assert.ok(html.includes('property="og:image:type" content="image/png"'));
  assert.ok(html.includes('property="og:image:alt" content="Demo case study"'));
  assert.ok(html.includes('name="twitter:image" content="https://example.com/og.png"'));
  assert.ok(html.includes('rel="canonical" href="https://example.com/projects/demo"'));
  assert.ok(!html.includes('Old title'));
  assert.ok(!html.includes('old.svg'));
});

test('Sitemap generator includes the homepage and every project', () => {
  const sitemap = renderSitemap(
    [{ slug: 'demo-project' }, { slug: 'second-project' }],
    'https://example.com',
    '2026-10-20'
  );

  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.ok(sitemap.includes('<loc>https://example.com/</loc>'));
  assert.ok(sitemap.includes('<loc>https://example.com/projects/demo-project</loc>'));
  assert.ok(sitemap.includes('<loc>https://example.com/projects/second-project</loc>'));
  assert.ok(sitemap.includes('<lastmod>2026-10-20</lastmod>'));
  assert.ok(sitemap.includes('<priority>1.0</priority>'));
});

test('Social image is a real PNG', () => {
  const image = fs.readFileSync(path.resolve('public/og-image.png'));
  assert.deepEqual(
    [...image.subarray(0, 8)],
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    'og-image.png must have the PNG signature'
  );
  assert.ok(image.length > 10_000, 'og-image.png should be a full social preview, not a placeholder');
});

test('Pages update metadata during client-side navigation', () => {
  assert.match(read('src/pages/HomePage.jsx'), /usePageMetadata\(/);
  assert.match(read('src/pages/HomePage.jsx'), /DEFAULT_TITLE/);
  assert.match(read('src/pages/ProjectDetailPage.jsx'), /usePageMetadata\(/);
  assert.match(read('src/pages/ProjectDetailPage.jsx'), /projectDescription/);
  assert.match(read('src/pages/NotFoundPage.jsx'), /noindex: true/);
});
