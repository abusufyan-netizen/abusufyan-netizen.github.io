const fs = require('fs');
const path = require('path');

const blogDir = 'c:\\xampp\\htdocs\\webtoolkit-pro\\severance-calculator-repo\\blog';
const files = fs.readdirSync(blogDir);

const targetText = 'This guide was developed by employment specialists and software engineers to ensure absolute compliance with global labor regulations. Our formulas are audited regularly against official Ministry of Labor directives and legislative statutory laws. To maintain complete user trust, all mathematical calculation processes run entirely <strong>client-side</strong> in your local browser window. Absolutely no personal salary, compensation, or demographic data is ever transmitted, processed, or stored on our servers.';

const replacementText = 'This guide was developed by employment specialists and software engineers to ensure absolute compliance with global labor regulations. Our formulas are audited regularly against official Ministry of Labor directives and legislative statutory laws. To maintain complete user trust, all mathematical calculation processes run entirely <strong>client-side</strong> in your local browser window. Absolutely no personal salary, compensation, or demographic data is ever transmitted, processed, or stored on our servers.<br><br><strong>Content Creation &amp; Automation Transparency:</strong> To ensure our global labor statutory resources remain completely updated and accurate against real-time legislative reforms, our guides compile regulatory references using advanced programmatic systems. Every mathematical model and legal summary is subsequently audited, fact-checked, and approved by our system researchers under strict review to guarantee absolute accuracy.';

let count = 0;

files.forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes(targetText)) {
      content = content.replace(targetText, replacementText);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Processed: ${file}`);
      count++;
    } else {
      console.log(`✕ Methodology card not matched in: ${file}`);
    }
  }
});

console.log(`=== Complete! Successfully updated ${count} guide pages inside severance-calculator-repo/blog/ ===`);
