#!/usr/bin/env node
// Generates a real HTML entry point for every project case study plus a
// sitemap. Vite has already produced dist/index.html and copied public/.
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DIST_DIR = path.resolve('dist');
const ROOT_DIR = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", '&apos;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function setTitle(html, title) {
  const tag = `<title>${escapeHtml(title)}</title>`;
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, () => tag);
  }
  return html.replace('</head>', () => `    ${tag}\n  </head>`);
}

function setMeta(html, attribute, key, content) {
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(`<meta\\s+${attribute}="${escapeRegExp(key)}"[^>]*>`, 'i');
  if (pattern.test(html)) return html.replace(pattern, () => tag);
  return html.replace('</head>', () => `    ${tag}\n  </head>`);
}

function setCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
    return html.replace(/<link\s+rel="canonical"[^>]*>/i, () => tag);
  }
  return html.replace('</head>', () => `    ${tag}\n  </head>`);
}

export function renderProjectHtml(template, meta) {
  if (!template.includes('</head>')) {
    throw new Error('[seo] Template is missing a closing </head> tag');
  }

  let html = setTitle(template, meta.title);
  html = setMeta(html, 'name', 'description', meta.description);
  html = setMeta(html, 'name', 'robots', meta.robots || 'index, follow');
  html = setCanonical(html, meta.canonical);

  html = setMeta(html, 'property', 'og:title', meta.title);
  html = setMeta(html, 'property', 'og:description', meta.description);
  html = setMeta(html, 'property', 'og:type', meta.type);
  html = setMeta(html, 'property', 'og:url', meta.canonical);
  html = setMeta(html, 'property', 'og:image', meta.image);
  html = setMeta(html, 'property', 'og:image:type', 'image/png');
  html = setMeta(html, 'property', 'og:image:width', '1200');
  html = setMeta(html, 'property', 'og:image:height', '630');
  html = setMeta(html, 'property', 'og:image:alt', meta.imageAlt);
  html = setMeta(html, 'property', 'og:site_name', meta.siteName);

  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = setMeta(html, 'name', 'twitter:title', meta.title);
  html = setMeta(html, 'name', 'twitter:description', meta.description);
  html = setMeta(html, 'name', 'twitter:image', meta.image);
  html = setMeta(html, 'name', 'twitter:image:alt', meta.imageAlt);

  return html;
}

export function renderSitemap(projects, siteUrl, lastmod) {
  const base = siteUrl.replace(/\/$/, '');
  const entries = [
    { loc: `${base}/`, priority: '1.0', changefreq: 'monthly' },
    ...projects.map((project) => ({
      loc: `${base}/projects/${project.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
    })),
  ];

  const urls = entries
    .map(
      (entry) => [
        '  <url>',
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        ...(lastmod ? [`    <lastmod>${escapeXml(lastmod)}</lastmod>`] : []),
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        '  </url>',
      ].join('\n')
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function loadSiteData() {
  const { createServer } = await import('vite');
  const server = await createServer({
    root: ROOT_DIR,
    configFile: false,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
    optimizeDeps: { noDiscovery: true, include: [] },
  });

  try {
    const { projects } = await server.ssrLoadModule('/src/data/projects.js');
    const seo = await server.ssrLoadModule('/src/utils/seo.js');
    return { projects, seo };
  } finally {
    await server.close();
  }
}

export async function generateSeo({ distDir = DIST_DIR } = {}) {
  distDir = path.resolve(distDir);
  const templatePath = path.join(distDir, 'index.html');
  const template = await readFile(templatePath, 'utf8');
  const { projects, seo } = await loadSiteData();

  // Remove stale case-study directories from earlier builds so deleted or
  // renamed projects cannot keep serving an old HTML entry point.
  const projectsDir = path.resolve(distDir, 'projects');
  if (distDir === path.parse(distDir).root || !projectsDir.startsWith(distDir + path.sep)) {
    throw new Error('[seo] Refusing an unsafe output directory');
  }
  await rm(projectsDir, { recursive: true, force: true });

  // Keep the homepage and client hook consistent too.
  await writeFile(templatePath, renderProjectHtml(template, seo.documentMeta({ path: '/' })), 'utf8');

  const generated = [];
  for (const project of projects) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) throw new Error('[seo] Invalid project slug');
    const meta = seo.documentMeta(seo.projectMeta(project));
    const html = renderProjectHtml(template, meta);
    const target = path.join(distDir, 'projects', project.slug, 'index.html');
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');
    generated.push(project.slug);
  }

  const sitemap = renderSitemap(projects, seo.SITE_URL);
  await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');

  if (!existsSync(path.join(distDir, 'robots.txt'))) {
    throw new Error('[seo] dist/robots.txt is missing; public/robots.txt was not copied by Vite');
  }

  return { generated, sitemap };
}

async function main() {
  const { generated } = await generateSeo();
  console.log(`[seo] Generated ${generated.length} project pages and sitemap.xml`);
}

const isMain =
  process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
