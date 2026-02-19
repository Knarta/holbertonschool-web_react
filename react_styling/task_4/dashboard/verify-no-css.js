#!/usr/bin/env node
/**
 * Script de vérification : aucun fichier .css et aucune import .css
 * Exécuter : node verify-no-css.js
 */
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const dirs = ['src/App', 'src/Login', 'src/Header', 'src/BodySection', 'src/Footer', 'src/Notifications', 'src/HOC', 'src/utils'];
let hasError = false;

// Vérifier les fichiers .css dans les dossiers listés
for (const dir of dirs) {
  if (!existsSync(dir)) continue;
  const files = readdirSync(dir).filter(f => f.endsWith('.css'));
  if (files.length > 0) {
    console.log(`FAIL: Fichiers .css trouvés dans ${dir}:`, files);
    hasError = true;
  }
}

// Vérifier les imports .css dans les fichiers src
function scanDir(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const path = join(dir, e.name);
    if (e.isDirectory() && e.name !== 'node_modules') scanDir(path);
    else if (e.name.endsWith('.js') || e.name.endsWith('.jsx')) {
      const content = readFileSync(path, 'utf8');
      if (/import\s+['"].*\.css['"]|require\s*\(['"].*\.css['"]\)/.test(content)) {
        console.log(`FAIL: Import .css trouvé dans ${path}`);
        hasError = true;
      }
    }
  }
}
scanDir('src');

if (hasError) {
  console.log('\nCorrigez les erreurs ci-dessus.');
  process.exit(1);
}
console.log('OK: Aucun fichier .css ni import .css détecté.');
