import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const read = (rel) => readFileSync(resolve(root, rel), 'utf8');

// Loads a src/data module in plain Node. Asset imports (images) are replaced
// with their resolved absolute paths so tests can check the files exist.
export function loadDataModule(rel) {
  const file = resolve(root, rel);
  let src = readFileSync(file, 'utf8');
  src = src.replace(/^import (\w+) from '([^']+)';$/gm, (_, name, path) =>
    `const ${name} = ${JSON.stringify(resolve(dirname(file), path))};`,
  );
  const names = [...src.matchAll(/^export const (\w+)/gm)].map((m) => m[1]);
  src = src.replace(/^export const /gm, 'const ');
  return new Function(`${src}\nreturn { ${names.join(', ')} };`)();
}
