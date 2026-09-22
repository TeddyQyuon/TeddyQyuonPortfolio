import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import test from 'node:test';
import { createServer } from 'vite';

// Preserve traversal segments in the request; fetch() would normalize the URL.
function request(port, requestPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(
      { hostname: '127.0.0.1', port, path: requestPath, agent: false },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => resolve({ status: res.statusCode, body }));
        res.on('error', reject);
      }
    );
    req.setTimeout(5000, () => req.destroy(new Error('Security check timed out')));
    req.on('error', reject);
  });
}

test('Vite blocks the audited file-disclosure paths', { timeout: 30000 }, async (t) => {
  const workspace = await realpath(process.cwd());
  const fixture = await mkdtemp(path.join(workspace, '.security-regression-'));
  const root = path.join(fixture, 'root');
  const marker = 'SECURITY_REGRESSION_DUMMY_ONLY';
  let server;

  try {
    await mkdir(root);
    await writeFile(path.join(root, '.env'), `AUDIT_DUMMY=${marker}`);
    await writeFile(path.join(root, 'public.txt'), 'Public fixture');
    await writeFile(path.join(fixture, 'canary.map'), JSON.stringify({
      version: 3,
      file: 'dummy.js',
      sources: ['dummy.js'],
      sourcesContent: [marker],
      names: [],
      mappings: '',
    }));

    server = await createServer({
      configFile: false,
      root,
      envFile: false,
      publicDir: false,
      cacheDir: path.join(root, 'cache'),
      logLevel: 'silent',
      optimizeDeps: { entries: [], include: [] },
      server: {
        host: '127.0.0.1',
        port: 0,
        fs: { strict: true, allow: [root] },
      },
    });
    await server.listen();
    const { port } = server.httpServer.address();

    const expectBlocked = async (requestPath) => {
      const result = await request(port, requestPath);
      assert.ok(result.status >= 400 && result.status < 500,
        `${requestPath} should be rejected, received ${result.status}`);
      assert.ok(!result.body.includes(marker), 'Protected dummy contents leaked');
    };

    await t.test('ordinary public files remain readable', async () => {
      const result = await request(port, '/public.txt');
      assert.equal(result.status, 200);
      assert.equal(result.body, 'Public fixture');
    });

    await t.test('environment files are blocked', async () => {
      await expectBlocked('/.env?raw');
    });

    await t.test('Windows alternate data streams cannot bypass the deny list', {
      skip: process.platform !== 'win32',
    }, async () => {
      // Confirm that NTFS resolves this alternate name to the dummy file.
      assert.ok((await readFile(path.join(root, '.env::$DATA'), 'utf8')).includes(marker));
      await expectBlocked('/.env::$DATA?raw');
    });

    await t.test('source maps outside the allowed directory stay private', async () => {
      const mapPath = path.join(fixture, 'canary.map').replaceAll('\\', '/');
      await expectBlocked(`/@fs/${mapPath}`);
      await expectBlocked('/cache/deps/../../../canary.map');
    });
  } finally {
    try {
      if (server) await server.close();
    } finally {
      // Delete only the newly created fixture after checking its absolute path.
      const target = await realpath(fixture);
      assert.equal(path.dirname(target), workspace);
      assert.ok(path.basename(target).startsWith('.security-regression-'));
      await rm(target, { recursive: true, force: true });
    }
  }
});
