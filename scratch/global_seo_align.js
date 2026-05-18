const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\xampp\\htdocs\\webtoolkit-pro\\tradeconvert';

const targets = [
  'blog/what-water-pressure-is-too-high',
  'excavation',
  'drywall',
  'conduit-fill',
  'stair',
  'torque',
  'electrical',
  'contact',
  'blog/lumber-dimensions-nominal-vs-actual',
  'paint',
  'about',
  'voltage-drop',
  'blog/voltage-drop-calculation-nec',
  'concrete',
  'lumber',
  'temperature',
  'blog',
  'weight',
  'volume',
  'roofing',
  'blog/concrete-psi-requirements-aci-318',
  'tile',
  'blog/soil-swell-compaction-factors-guide',
  'pressure',
  'length',
  'privacy'
];

// Recursively find all HTML files
function getHtmlFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== '.git' && file !== 'node_modules' && file !== 'scratch') {
        getHtmlFiles(filePath, filesList);
      }
    } else if (file.endsWith('.html')) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

const htmlFiles = getHtmlFiles(baseDir);
console.log(`Found ${htmlFiles.length} HTML files to process.`);

let totalReplacements = 0;
let updatedFilesCount = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileReplacements = 0;

  targets.forEach(target => {
    // Elegant regex to capture href="/slug followed by ", ', or #
    // Ensure we don't match if it already has a trailing slash
    const regex = new RegExp(`href="\\/${target}(["'#])`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `href="/${target}/$1`);
      fileReplacements++;
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    const relativePath = path.relative(baseDir, filePath);
    console.log(`✓ Updated: ${relativePath} (${fileReplacements} target types updated)`);
    totalReplacements += fileReplacements;
    updatedFilesCount++;
  }
});

console.log(`\n=== Compilation complete! ===`);
console.log(`Successfully updated ${updatedFilesCount} files with a total of ${totalReplacements} link enhancements.`);
