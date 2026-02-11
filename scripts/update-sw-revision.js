const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function fileHash(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

function main() {
  const root = path.join(__dirname, '..');
  const cssPath = path.join(root, 'css', 'style.css');
  const swPath = path.join(root, 'sw.js');

  if (!fs.existsSync(cssPath)) {
    console.error('css/style.css not found at', cssPath);
    process.exit(1);
  }
  if (!fs.existsSync(swPath)) {
    console.error('sw.js not found at', swPath);
    process.exit(1);
  }

  const hash = fileHash(cssPath);

  let sw = fs.readFileSync(swPath, 'utf8');

  if (sw.indexOf('__CSS_REVISION__') !== -1) {
    sw = sw.replace(/__CSS_REVISION__/g, hash);
  } else {
    // fallback: replace any css/style.css revision value
    sw = sw.replace(/\{url:\"css\/style\.css\",revision:\"[^\"]*\"\}/, `{url:"css/style.css",revision:"${hash}"}`);
  }

  fs.writeFileSync(swPath, sw, 'utf8');
  console.log('Updated sw.js — css/style.css revision =', hash);
}

main();
