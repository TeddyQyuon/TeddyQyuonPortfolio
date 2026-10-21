import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadDataModule, read, root } from './helpers.mjs';

const { projects } = loadDataModule('src/data/projects.js');
const { projectMetrics } = loadDataModule('src/data/projectMetrics.js');
const { personalInfo } = loadDataModule('src/data/personalInfo.js');

test('every project has a unique slug and the fields the UI needs', () => {
  const slugs = projects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, 'duplicate slug');
  for (const p of projects) {
    assert.match(p.slug, /^[a-z0-9-]+$/, `bad slug ${p.slug}`);
    for (const key of ['name', 'cardSummary', 'summary', 'type', 'role', 'category', 'myContribution']) {
      assert.ok(p[key], `${p.slug} is missing ${key}`);
    }
    assert.ok(['personal', 'school'].includes(p.projectGroup), `${p.slug} has unknown group`);
    assert.ok(p.technologies?.length > 0, `${p.slug} has no technologies`);
  }
});

test('every screenshot file exists and has alt text', () => {
  for (const p of projects) {
    for (const s of p.screenshots || []) {
      assert.ok(existsSync(s.src), `${p.slug}: missing image ${s.src}`);
      assert.ok(s.alt?.length > 10, `${p.slug}: screenshot without meaningful alt text`);
    }
  }
});

test('external links use https and local reports exist', () => {
  for (const p of projects) {
    for (const key of ['demoUrl', 'repositoryUrl', 'apiUrl']) {
      if (p[key]) assert.match(p[key], /^https:\/\//, `${p.slug}.${key} is not https`);
    }
    if (p.reportUrl) assert.ok(existsSync(resolve(root, 'public', `.${p.reportUrl}`)), `${p.slug}: report missing`);
  }
  // This deployment shows a Vercel login page; the portfolio must not link to it.
  assert.ok(!JSON.stringify(projects).includes('gamevault-qyuon1'), 'protected GameVault URL is linked');
});

test('dashboard metrics only reference real projects and appear in that project text', () => {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  for (const [slug, metrics] of Object.entries(projectMetrics)) {
    const p = bySlug.get(slug);
    assert.ok(p, `metrics for unknown slug ${slug}`);
    const text = JSON.stringify(p).replace(/PostgreSQL 16/g, 'PG 16');
    for (const m of metrics) {
      assert.ok(text.includes(m.value), `${slug}: metric "${m.label}" value ${m.value} not found in project data`);
    }
  }
});

test('removed wording stays removed', () => {
  const src = read('src/data/projects.js');
  assert.doesNotMatch(src, /sister/i);
  assert.doesNotMatch(src, /high-conversion/i);
});

test('personal info has no placeholders and the résumé exists', () => {
  const json = JSON.stringify(personalInfo);
  assert.doesNotMatch(json, /example\.com|yourname|placeholder|TODO/i);
  assert.ok(existsSync(resolve(root, 'public', `.${personalInfo.resumePath}`)), 'résumé PDF missing');
  const pdf = readFileSync(resolve(root, 'public', `.${personalInfo.resumePath}`));
  assert.equal(pdf.subarray(0, 4).toString(), '%PDF');
});

test('sitemap lists the homepage and every case study', () => {
  const xml = read('public/sitemap.xml');
  const base = 'https://teddy-qyuon-portfolio.vercel.app';
  assert.ok(xml.includes(`<loc>${base}/</loc>`));
  for (const p of projects) assert.ok(xml.includes(`<loc>${base}/projects/${p.slug}</loc>`), `sitemap missing ${p.slug}`);
  assert.match(read('public/robots.txt'), /Sitemap: https:\/\/teddy-qyuon-portfolio\.vercel\.app\/sitemap\.xml/);
});
