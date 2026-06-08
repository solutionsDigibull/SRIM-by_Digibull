// Dependency-free asar parser: dumps file tree + extracts chosen files.
const fs = require('fs');
const path = require('path');
const ASAR = path.join(__dirname, 'app.asar');
const OUT = __dirname;

const buf = fs.readFileSync(ASAR);
const size = buf.readUInt32LE(4);
const headerPickle = buf.subarray(8, 8 + size);
const strLen = headerPickle.readUInt32LE(4);
const json = headerPickle.subarray(8, 8 + strLen).toString('utf8');
const header = JSON.parse(json);
const dataStart = 8 + size;

const files = [];
function walk(node, prefix) {
  if (!node.files) return;
  for (const [name, child] of Object.entries(node.files)) {
    const p = prefix ? prefix + '/' + name : name;
    if (child.files) walk(child, p);
    else files.push({ path: p, size: child.size || 0, offset: child.offset != null ? Number(child.offset) : null });
  }
}
walk(header, '');

// 1. full file list
fs.writeFileSync(path.join(OUT, 'asar-filelist.txt'), files.map((f) => `${f.size}\t${f.path}`).join('\n'));
console.log('TOTAL FILES: ' + files.length);

function extract(relPath, destName) {
  const f = files.find((x) => x.path === relPath || x.path.endsWith('/' + relPath));
  if (!f || f.offset == null) { console.log('NOT FOUND: ' + relPath); return null; }
  const start = dataStart + f.offset;
  const content = buf.subarray(start, start + f.size);
  if (destName) fs.writeFileSync(path.join(OUT, destName), content);
  return content;
}

// 2. inner package.json
const pkg = extract('package.json', 'inner-package.json');
if (pkg) {
  const p = JSON.parse(pkg.toString('utf8'));
  console.log('VERSION: ' + p.version);
  console.log('DEPS: ' + Object.keys(p.dependencies || {}).sort().join(', '));
}

// 3. top-level dirs
const top = new Set(files.map((f) => f.path.split('/')[0]));
console.log('TOP-LEVEL: ' + [...top].sort().join(', '));

// 4. main-process bundle file names (feature surface)
const mainFiles = files.filter((f) => f.path.startsWith('dist-electron/main/'));
console.log('MAIN FILES: ' + mainFiles.length);
fs.writeFileSync(path.join(OUT, 'main-files.txt'), mainFiles.map((f) => `${f.size}\t${f.path}`).join('\n'));

// 5. extract the largest main bundle for channel grrepping
const biggest = mainFiles.sort((a, b) => b.size - a.size).slice(0, 6);
for (const f of biggest) {
  const safe = f.path.replace(/[\\/]/g, '__');
  extract(f.path, 'main__' + safe);
}
console.log('EXTRACTED MAIN BUNDLES: ' + biggest.map((f) => f.path + ' (' + f.size + ')').join(' | '));
