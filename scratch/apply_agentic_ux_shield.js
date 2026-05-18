const fs = require('fs');
const path = require('path');

const tradeConvertDir = 'c:\\xampp\\htdocs\\webtoolkit-pro\\tradeconvert';

// Helper to recursively list all HTML files in a directory
function getHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.next' && file !== 'scratch') {
        getHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

console.log('=== Starting TradeConvert Agentic UX & Accessibility Tree Alignment ===\n');

const tcFiles = getHtmlFiles(tradeConvertDir);
console.log(`[Agentic UX] Found ${tcFiles.length} HTML files to inspect.`);

let filesUpdated = 0;

tcFiles.forEach(filePath => {
  // Skip utility pages
  const relPath = path.relative(tradeConvertDir, filePath).replace(/\\/g, '/');
  if (relPath.includes('template.html') || relPath.includes('embed.html') || relPath.includes('plan.html') || relPath === 'index.html') {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // A. Parse Labels to Map Label Text to Input IDs
  const labelMap = {};
  // Match: <label ... for="([^"]+)"[^>]*>([^<]+)</label>
  const labelRegex = /<label[^>]+for="([^"]+)"[^>]*>([\s\S]*?)<\/label>/gi;
  let labelMatch;
  while ((labelMatch = labelRegex.exec(content)) !== null) {
    const forId = labelMatch[1];
    const text = labelMatch[2].replace(/<[^>]+>/g, '').trim(); // strip inner elements
    labelMap[forId] = text;
  }

  // B. Optimize Input Elements for Autonomous Browser Agents
  // Match inputs like: <input class="input-field" id="con-l" type="number" ...>
  const inputRegex = /<input\s+([^>]*?)id="([^"]+)"([^>]*?)>/gi;
  content = content.replace(inputRegex, (fullMatch, preAttrs, id, postAttrs) => {
    // If it already has data-agent-input, don't modify
    if (fullMatch.includes('data-agent-input')) return fullMatch;

    const cleanLabelText = labelMap[id] || id.replace(/[_-]/g, ' ');
    const agentInputName = id.replace(/^(con|el|press|temp|lum|len|torq|vol|wt)-/, ''); // strip prefix for semantic clarity
    
    // Maintain the valid HTML output structure by adding the closing angle bracket
    let updatedInput = `<input ${preAttrs}id="${id}"${postAttrs}>`;
    
    // Add Agentic DOM descriptors & ARIA tags
    updatedInput = updatedInput.replace('<input', `<input data-agent-input="${agentInputName}" aria-label="Input field for ${cleanLabelText}"`);
    changed = true;
    return updatedInput;
  });

  // C. Optimize Conversion Outputs for RAG Grounding (aria-live="polite", role="status")
  // Match spans or divs that hold output, typically having ids like id="con-yd3", id="temp-f", id="el-amps" etc.
  const outputSpanRegex = /<(span|div|p)\s+([^>]*?)id="([^"]+)"([^>]*?)>([\s\S]*?)<\/\1>/gi;
  content = content.replace(outputSpanRegex, (fullMatch, tagName, preAttrs, id, postAttrs, innerText) => {
    // Target only calculation results or conversion displays
    if (!id.match(/^(con|el|press|temp|lum|len|torq|vol|wt)-/) && !id.includes('result') && !id.includes('output') && !id.includes('res-')) {
      return fullMatch;
    }
    // If it already has aria-live, don't modify
    if (fullMatch.includes('aria-live') || fullMatch.includes('role="status"')) {
      return fullMatch;
    }

    const cleanOutputName = id.replace(/^(con|el|press|temp|lum|len|torq|vol|wt)-/, '');
    let updatedOutput = `<${tagName} ${preAttrs}id="${id}"${postAttrs} aria-live="polite" role="status" data-agent-output="${cleanOutputName}" aria-label="Output calculation result for ${cleanOutputName.replace(/[_-]/g, ' ')}">${innerText}</${tagName}>`;
    changed = true;
    return updatedOutput;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesUpdated++;
    console.log(`  ✓ Aligned Agentic UX and Accessibility Tree for: ${relPath}`);
  }
});

console.log(`\n✓ Agentic UX alignment complete! Optimized ${filesUpdated} Trade calculators.`);
console.log('=== All TradeConvert Pages Optimized for Generative AI Features & Browser Agents ===');
