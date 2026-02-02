const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '../../registry');
const dest = path.join(__dirname, 'public/registry');
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
for (const name of ['themes.json', 'plugins.json']) {
  const s = path.join(src, name);
  const d = path.join(dest, name);
  if (fs.existsSync(s)) fs.copyFileSync(s, d);
}
