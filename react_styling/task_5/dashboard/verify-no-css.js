#!/usr/bin/env node
/**
 * Verify no CSS files or imports in task_5 (use inline styles or CSS-in-JS/Tailwind)
 */
import fs from 'fs';
import path from 'path';

const SRC_DIRS = [
  'src/App',
  'src/Login',
  'src/Header',
  'src/BodySection',
  'src/Footer',
  'src/Notifications',
  'src/HOC',
  'src/utils',
];

const CSS_IMPORT_REGEX = /import\s+['"].*\.css['"]|require\s*\(\s*['"].*\.css['"]\s*\)/g;

let hasErrors = false;

// Check for .css files
for (const dir of SRC_DIRS) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir);
  const cssFiles = files.filter(f => f.endsWith('.css'));
  if (cssFiles.length > 0) {
    console.error(`FAIL: Found .css files in ${dir}/: ${cssFiles.join(', ')}`);
    hasErrors = true;
  }
}

// Check for CSS imports in .jsx and .js files
function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      scanDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (CSS_IMPORT_REGEX.test(content)) {
        console.error(`FAIL: CSS import found in ${fullPath}`);
        hasErrors = true;
      }
    }
  }
}

scanDir('src');

if (hasErrors) {
  console.error('\nRemove all .css files and CSS imports. Use inline styles or Tailwind instead.');
  process.exit(1);
}

console.log('OK');
process.exit(0);
