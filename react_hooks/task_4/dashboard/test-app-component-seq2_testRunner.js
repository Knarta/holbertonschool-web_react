#!/usr/bin/env node
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const result = spawnSync(
  'npx',
  ['jest', 'test-app-component-seq2.spec.js', '--no-cache', '--silent', '--testNamePattern=verify notification item deletion'],
  {
    cwd: __dirname,
    encoding: 'utf8',
    stdio: ['inherit', 'pipe', 'pipe'],
  }
);

if (result.status === 0) {
  console.log('OK');
} else {
  console.log('NOK:', result.stderr || result.stdout || 'Test failed');
  process.exit(1);
}
