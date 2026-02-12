const fs = require('fs');
const path = require('path');

// Define replacements
const replacements = [
  { from: /bg-white\/5/g, to: 'bg-white bg-opacity-5' },
  { from: /bg-white\/8/g, to: 'bg-white bg-opacity-10' },
  { from: /border-white\/10/g, to: 'border-white border-opacity-10' },
  { from: /border-white\/15/g, to: 'border-white border-opacity-20' },
  { from: /border-cyan-500\/20/g, to: 'border-cyan-500 border-opacity-20' },
  { from: /border-cyan-500\/40/g, to: 'border-cyan-500 border-opacity-40' },
  { from: /border-cyan-400\/50/g, to: 'border-cyan-400 border-opacity-50' },
];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walkDir(filepath, callback);
    } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts') || filepath.endsWith('.jsx') || filepath.endsWith('.js')) {
      callback(filepath);
    }
  });
}

let fixedCount = 0;
const projectRoot = process.cwd();

walkDir(path.join(projectRoot, 'app'), (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;
  
  replacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`[v0] Fixed: ${filepath}`);
    fixedCount++;
  }
});

walkDir(path.join(projectRoot, 'components'), (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;
  
  replacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`[v0] Fixed: ${filepath}`);
    fixedCount++;
  }
});

console.log(`[v0] Fixed ${fixedCount} files with Tailwind class replacements.`);
