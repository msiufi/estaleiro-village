import fs from 'node:fs/promises';

const html = await fs.readFile('scripts/.tmp/album-sample.html', 'utf8');
const marker = 'modelExport: ';
const start = html.indexOf(marker);
console.log('marker at', start);
let i = start + marker.length;
let depth = 0, inStr = false, esc = false;
for (; i < html.length; i++) {
  const c = html[i];
  if (inStr) {
    if (esc) { esc = false; }
    else if (c === '\\') esc = true;
    else if (c === '"') inStr = false;
    continue;
  }
  if (c === '"') { inStr = true; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) break; }
}
const jsonStr = html.slice(start + marker.length, i + 1);
console.log('json len', jsonStr.length);
const model = JSON.parse(jsonStr);
console.log('top-level main keys:', Object.keys(model.main || {}));
for (const k of Object.keys(model.main || {})) {
  const v = model.main[k];
  console.log(`  ${k}: ${Array.isArray(v) ? `array[${v.length}]` : typeof v}`);
  if (Array.isArray(v) && v.length && v[0]?.data) {
    console.log(`    [0].data keys:`, Object.keys(v[0].data).slice(0, 20));
  }
}
await fs.writeFile('scripts/.tmp/album-model.json', JSON.stringify(model, null, 2));
console.log('dumped to scripts/.tmp/album-model.json');
