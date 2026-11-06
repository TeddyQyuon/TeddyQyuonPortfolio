import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadDataModule, read, root } from './helpers.mjs';

const walk = (dir) => readdirSync(resolve(root, dir), { withFileTypes: true })
  .flatMap((entry) => entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]);
const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const styles = walk('src/styles').filter((file) => file.endsWith('.css'))
  .map((file) => ({ file, css: stripComments(read(file)) }));
const declarations = (css) => [...css.matchAll(/(?:^|[;{}])\s*([\w-]+)\s*:\s*([^;{}]*)(?=;|}|$)/g)]
  .map((match) => ({ property: match[1].toLowerCase(), value: match[2].trim(), index: match.index }));

// Commas inside var(), cubic-bezier(), etc. do not separate transitions.
function splitTransitions(value) {
  const items = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '(') depth++;
    if (value[i] === ')') depth--;
    if (value[i] === ',' && depth === 0) {
      items.push(value.slice(start, i).trim());
      start = i + 1;
    }
  }
  items.push(value.slice(start).trim());
  return items;
}

function keyframeBody(css, openingBrace) {
  let depth = 1;
  let quote = null;
  for (let i = openingBrace + 1; i < css.length; i++) {
    const char = css[i];
    if (char === '\\') { i++; continue; }
    if (quote) { if (char === quote) quote = null; continue; }
    if (char === '"' || char === "'") { quote = char; continue; }
    if (char === '{') depth++;
    if (char === '}' && --depth === 0) return css.slice(openingBrace + 1, i);
  }
  assert.fail('Unclosed keyframes block');
}

test('keyframes live in motion.css and animate only transform and opacity', () => {
  let count = 0;
  for (const { file, css } of styles) {
    for (const match of css.matchAll(/@(?:-\w+-)?keyframes\b[^{}]*\{/gi)) {
      count++;
      assert.equal(file, 'src/styles/motion.css', `${file}: keyframes outside motion.css`);
      const body = keyframeBody(css, match.index + match[0].length - 1);
      const properties = declarations(body);
      assert.ok(properties.length > 0, `${file}: empty keyframes`);
      for (const { property } of properties) {
        assert.ok(['transform', 'opacity'].includes(property), `${file}: keyframes animate ${property}`);
      }
    }
  }
  assert.ok(count > 0, 'Expected motion keyframes');
});

test('transitions name only permitted properties, with discrete display changes', () => {
  const allowed = new Set(['transform', 'opacity', 'color', 'background-color', 'border-color', 'text-decoration-color', 'display']);
  for (const { file, css } of styles) {
    for (const { property, value, index } of declarations(css)) {
      if (property !== 'transition' && property !== 'transition-property') continue;
      for (const item of splitTransitions(value)) {
        // Property-first shorthands make the animated property explicit.
        const name = item.match(/^([a-z-]+)(?:\s|$)/i)?.[1];
        assert.ok(allowed.has(name), `${file}: disallowed ${property}: ${item}`);
        if (name === 'display') {
          const block = css.slice(css.lastIndexOf('{', index), css.indexOf('}', index));
          assert.ok(/\ballow-discrete\b/.test(item) || /\btransition-behavior\s*:\s*allow-discrete\s*[;}]/.test(block + '}'), `${file}: display needs allow-discrete`);
        }
      }
    }
  }
});

test('styles do not retain will-change', () => {
  for (const { file, css } of styles) {
    assert.doesNotMatch(css, /\bwill-change\s*:/i, file);
  }
});

test('the reduced-motion override remains available', () => {
  assert.match(read('src/styles/base.css'), /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/);
});

test('CSS duration tokens match the JavaScript motion durations', () => {
  const { motion } = loadDataModule('src/motion/tokens.js');
  const values = declarations(stripComments(read('src/styles/tokens.css')))
    .filter(({ property }) => property.startsWith('--dur-'));
  const cssDurations = Object.fromEntries(values.map(({ property, value }) => {
    assert.match(value, /^(?:\d+(?:\.\d+)?|\.\d+)ms$/, `${property}: expected a duration in milliseconds`);
    return [property.slice('--dur-'.length), Number.parseFloat(value)];
  }));
  assert.equal(values.length, Object.keys(cssDurations).length, 'Duplicate duration tokens');
  assert.deepEqual(cssDurations, motion.duration);
});

test('source files do not inject style elements or style attributes', () => {
  const source = walk('src').filter((file) => /\.(?:[cm]?[jt]sx?|css|html|json|svg)$/.test(file));
  for (const file of source) {
    assert.doesNotMatch(read(file), /\b(?:createElement|setAttribute)\s*\(\s*(['"`])style\1/i, file);
  }
});
