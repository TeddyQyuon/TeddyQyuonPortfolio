import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Responsive Meta: index.html defines viewport-fit=cover for notched mobile screens', () => {
  const htmlPath = path.resolve('index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  assert.match(html, /name="viewport"/);
  assert.match(html, /viewport-fit=cover/);
});

test('Responsive Styles: index.css prevents horizontal overflow and enforces mobile breakpoints', () => {
  const cssPath = path.resolve('src/index.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Horizontal overflow guards
  assert.match(css, /overflow-x:\s*hidden/);
  assert.match(css, /max-width:\s*100vw/);

  // Tablet breakpoint (899px)
  assert.match(css, /@media\s*\(max-width:\s*899px\)/);
  assert.match(css, /safe-area-inset-bottom/);

  // Mobile breakpoint (599px)
  assert.match(css, /@media\s*\(max-width:\s*599px\)/);

  // Touch target ergonomics: minimum 44px on mobile buttons
  assert.match(css, /min-height:\s*44px/);
});

test('Responsive Grid: Education marks grid provides full width on narrow mobile viewports', () => {
  const eduPath = path.resolve('src/sections/EducationSection.jsx');
  const content = fs.readFileSync(eduPath, 'utf8');
  assert.match(content, /Grid\s+item\s+xs=\{12\}\s+sm=\{6\}\s+md=\{4\}/);
});
