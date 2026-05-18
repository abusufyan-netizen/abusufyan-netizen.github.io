const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const toolsPath = path.join('c:', 'xampp', 'htdocs', 'webtoolkit-pro', 'config', 'tools.yaml');

try {
  const fileContents = fs.readFileSync(toolsPath, 'utf8');
  const data = yaml.load(fileContents);
  const tools = data.tools || [];
  console.log(`Loaded tools.yaml. Correcting meta alignment for ${tools.length} tools...`);

  let categoryHealed = 0;
  let metaHealed = 0;
  let faqHealed = 0;

  tools.forEach(tool => {
    // 1. Normalize Categories
    let cat = tool.category || '';
    let newCat = cat;

    if (cat === 'Security' || cat === 'Security Tools') {
      if (tool.slug.includes('hasher') || tool.slug.includes('gen') || tool.slug.includes('sign') || tool.slug.includes('encrypt')) {
        newCat = 'Generators';
      } else {
        newCat = 'Developer Tools';
      }
    } else if (cat === 'Data Formatters & Parsers' || cat === 'Math Tools') {
      newCat = 'Developer Tools';
    } else if (cat === 'SEO & Search Optimization') {
      newCat = 'SEO Tools';
    } else if (cat === 'Content & Writing' || cat === 'Writing Tools' || cat === 'Content Tools') {
      newCat = 'Content Utilities';
    }

    if (newCat !== cat) {
      tool.category = newCat;
      categoryHealed++;
    }

    // 2. Align Meta and Content
    if (!tool.meta) tool.meta = {};
    if (!tool.content) tool.content = {};

    // Prioritize content title/description for meta tags
    if (tool.content.title && (!tool.meta.title || tool.meta.title === '')) {
      tool.meta.title = tool.content.title;
      metaHealed++;
    }
    if (tool.content.description && (!tool.meta.description || tool.meta.description === '')) {
      tool.meta.description = tool.content.description;
      metaHealed++;
    }

    // Fallbacks if still empty
    let title = tool.meta.title || '';
    if (!title || title.length < 15) {
      const generatedTitle = `${tool.name} — WebToolkit Pro`;
      tool.meta.title = generatedTitle;
      tool.content.title = generatedTitle;
      metaHealed++;
    }

    let desc = tool.meta.description || '';
    if (!desc || desc.length < 60) {
      const generatedDesc = `Use our free online ${tool.name} to complete your developer tasks instantly. Secure, private, and runs entirely in your browser.`;
      tool.meta.description = generatedDesc;
      tool.content.description = generatedDesc;
      metaHealed++;
    }

    // 3. Heal Missing FAQs
    const faqs = tool.content.faq || [];
    if (faqs.length === 0) {
      tool.content.faq = [
        {
          question: `Is this ${tool.name} secure to use?`,
          answer: `Yes, 100%. Our ${tool.name} executes entirely inside your web browser using client-side JavaScript. None of your sensitive inputs or data are sent to our servers or stored anywhere.`
        },
        {
          question: `Do I need to install anything to use this ${tool.name}?`,
          answer: `No. This is a fully web-based utility that works instantly in any modern desktop or mobile browser without any installation, downloads, or sign-ups required.`
        }
      ];
      faqHealed++;
    }
  });

  // Write back to tools.yaml
  const newYamlContent = yaml.dump(data, { lineWidth: -1, noRefs: true });
  fs.writeFileSync(toolsPath, newYamlContent, 'utf8');

  console.log(`\n✓ Alignment & Healing complete!`);
  console.log(`   - Normalized Categories: ${categoryHealed} tools`);
  console.log(`   - Repaired Meta Titles/Descriptions: ${metaHealed} tools`);
  console.log(`   - Generated Semantic FAQs: ${faqHealed} tools`);

} catch (e) {
  console.error('Error healing configurations:', e);
}
