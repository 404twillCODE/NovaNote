const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const tokens = JSON.parse(fs.readFileSync(path.join(srcDir, 'tokens.json'), 'utf8'));

// Generate CSS variables
const lines = ['/* NovaNote design tokens - do not edit by hand */', ':root {'];

function flatten(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}-${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      Object.assign(out, flatten(v, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}

const flat = flatten(tokens);
for (const [k, v] of Object.entries(flat)) {
  const varName = '--nova-' + k.replace(/([A-Z])/g, (m) => m.toLowerCase());
  lines.push(`  ${varName}: ${v};`);
}
lines.push('}');

// Reduced motion
lines.push('', '@media (prefers-reduced-motion: reduce) {', '  :root {', '    --nova-motion-fast: 0ms;', '    --nova-motion-normal: 0ms;', '    --nova-motion-slow: 0ms;', '  }', '}');

fs.writeFileSync(path.join(distDir, 'tokens.css'), lines.join('\n'));
fs.writeFileSync(path.join(distDir, 'tokens.generated.json'), JSON.stringify(tokens, null, 2));

console.log('Tokens built: dist/tokens.css, dist/tokens.generated.json');
