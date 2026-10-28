import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decodeHashId } from '../src/hooks/useScrollToHash.js';

test('malformed fragments are ignored without throwing', () => {
  assert.equal(decodeHashId('#%'), null);
  assert.equal(decodeHashId('#%E0%A4%A'), null);
});

test('valid fragments retain their intended IDs', () => {
  assert.equal(decodeHashId('#projects'), 'projects');
  assert.equal(decodeHashId('#hello%20world'), 'hello world');
  assert.equal(decodeHashId('#%25'), '%');
  assert.equal(decodeHashId('#unknown'), 'unknown');
});
