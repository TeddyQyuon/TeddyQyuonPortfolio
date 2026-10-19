import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getThemeOptions } from '../src/theme/themeTokens.js';

test('Responsive & Zero-Flash Meta: index.html defines viewport-fit=cover and loads theme-init.js', () => {
  const htmlPath = path.resolve('index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  assert.match(html, /name="viewport"/);
  assert.match(html, /viewport-fit=cover/);
  assert.match(html, /<script src="\/theme-init\.js"><\/script>/);

  const initScriptPath = path.resolve('public/theme-init.js');
  assert.ok(fs.existsSync(initScriptPath), 'public/theme-init.js must exist');
});

test('Responsive & Dark Theme Styles: index.css defines dark tokens and mobile guards', () => {
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

  // Dark mode CSS tokens
  assert.match(css, /\[data-theme="dark"\]\s*\{/);
  assert.match(css, /--bg-page:\s*#090d16/);
  assert.match(css, /--bg-card:\s*#111726/);

  // Inverted monochrome SVG filters
  assert.match(css, /\[data-theme="dark"\]\s*\.technology-github/);
  assert.match(css, /filter:\s*brightness\(0\)\s*invert\(1\)/);
});

test('Theme Tokens: getThemeOptions produces Linear / Vercel minimalist dark tokens', () => {
  const darkTokens = getThemeOptions('dark');
  assert.equal(darkTokens.palette.mode, 'dark');
  assert.equal(darkTokens.palette.background.default, '#090d16');
  assert.equal(darkTokens.palette.background.paper, '#111726');
  assert.equal(darkTokens.palette.text.primary, '#f8fafc');
  assert.equal(darkTokens.palette.text.secondary, '#94a3b8');

  const lightTokens = getThemeOptions('light');
  assert.equal(lightTokens.palette.mode, 'light');
  assert.equal(lightTokens.palette.background.default, '#f7f8fa');
  assert.equal(lightTokens.palette.background.paper, '#ffffff');
});

test('Component Theme Reactivity: SkillChip and Navbar toggle', () => {
  const skillChipContent = fs.readFileSync(path.resolve('src/components/common/SkillChip.jsx'), 'utf8');
  assert.match(skillChipContent, /theme\.palette\.mode === 'dark'\s*\?\s*theme\.palette\.text\.primary/);

  const navbarContent = fs.readFileSync(path.resolve('src/components/layout/Navbar.jsx'), 'utf8');
  assert.match(navbarContent, /useThemeMode/);
  assert.match(navbarContent, /toggleTheme/);
});

test('Responsive Grid: Education marks grid provides full width on narrow mobile viewports', () => {
  const eduPath = path.resolve('src/sections/EducationSection.jsx');
  const content = fs.readFileSync(eduPath, 'utf8');
  assert.match(content, /Grid\s+item\s+xs=\{12\}\s+sm=\{6\}\s+md=\{4\}/);
});
