/* SecretNote — Build Script (concat JS → bundle.js) */
const fs = require('fs');
const path = require('path');

const FILES = [
  'js/config.js',
  'js/i18n.js',
  'js/data.js',
  'js/crypto.js',
  'js/components.js',
  'js/pin.js',
  'js/notebook.js',
  'js/notebooks.js',
  'js/editor.js',
  'js/search.js',
  'js/settings.js',
  'js/subscription.js',
  'js/app.js',
  'js/main.js',
];

const bundle = FILES.map(f => {
  const content = fs.readFileSync(path.join(__dirname, f), 'utf8');
  return `// ── ${f} ${'─'.repeat(60 - f.length)}\n${content}`;
}).join('\n\n');

fs.writeFileSync(path.join(__dirname, 'bundle.js'), bundle, 'utf8');
console.log(`✓ Bundle created (${FILES.length} files → bundle.js)`);
