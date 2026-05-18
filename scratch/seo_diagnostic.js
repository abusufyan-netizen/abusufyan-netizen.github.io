const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\xampp\\htdocs\\webtoolkit-pro\\tradeconvert';

// Map of optimal, punchy SEO titles (under 60 chars) and meta descriptions (under 160 chars)
const seoMap = {
  'index.html': {
    title: 'TradeConvert | Construction Unit Converter & Reference',
    desc: 'Verified client-side calculation tools for the building trades. Convert pressure, electrical, concrete, and lumber specifications accurately under NIST.'
  },
  'about/index.html': {
    title: 'Engineering Methodology & Standards | TradeConvert',
    desc: 'Read the E-E-A-T and technical verification standards behind TradeConvert. All calculators are aligned with NIST, NEC, and ACI code standards.'
  },
  'contact/index.html': {
    title: 'Contact Us | TradeConvert',
    desc: 'Get in touch with the TradeConvert engineering team. Send us your feedback, utility tool requests, and construction calculation suggestions.'
  },
  'privacy/index.html': {
    title: 'Privacy Policy | TradeConvert',
    desc: 'Read the TradeConvert Privacy Policy. Our utility calculators execute entirely client-side, ensuring absolute data privacy and zero server latency.'
  },
  'blog/index.html': {
    title: 'Field Notes: Construction & Engineering Guides | TradeConvert',
    desc: 'Original technical research, material estimation guides, and code compliance studies for professional framing, plumbing, and electrical trades.'
  },
  'concrete/index.html': {
    title: 'Concrete Cubic Yards & Bag Calculator | TradeConvert',
    desc: 'Calculate concrete volume in cubic yards and estimate the number of Quikrete bags needed for slabs, footings, and columns with custom waste factors.'
  },
  'conduit-fill/index.html': {
    title: 'Conduit Fill Calculator (NEC 2026) | TradeConvert',
    desc: 'Calculate maximum conductor fill capacity inside electrical conduit according to NEC Chapter 9 limits. Supports standard EMT, PVC, and Rigid tubing.'
  },
  'drywall/index.html': {
    title: 'Drywall & Sheet Material Estimator | TradeConvert',
    desc: 'Estimate drywall sheets, joint compound, tape, and screws needed for residential wall and ceiling framing, with adjustable waste factor controls.'
  },
  'electrical/index.html': {
    title: 'Watts to Amps Calculator & AWG Guide | TradeConvert',
    desc: 'Convert Watts to Amps, find AWG copper wire gauge sizing, and verify circuit breaker capacities under standard NEC continuous load rules.'
  },
  'excavation/index.html': {
    title: 'Excavation Spoil & Backfill Calculator | TradeConvert',
    desc: 'Calculate bank cubic yards versus loose yards using swell factor coefficients. Estimate dump truck haul cycles and backfill compaction requirements.'
  },
  'length/index.html': {
    title: 'Length & Linear Dimension Converter | TradeConvert',
    desc: 'Convert linear dimensions between inches, millimeters, feet, and meters. A quick, precise reference tool for framing and layout construction.'
  },
  'lumber/index.html': {
    title: 'Board Feet Calculator (Lumber Sizing) | TradeConvert',
    desc: 'Calculate total board feet and lumber volume for pricing and material orders. Includes dimensions chart mapping nominal to actual standard sizes.'
  },
  'paint/index.html': {
    title: 'Paint Gallon & Coverage Calculator | TradeConvert',
    desc: 'Estimate paint gallons and quarts needed for walls and ceilings. Assumes standard commercial coverage thresholds with adjustable coat options.'
  },
  'pressure/index.html': {
    title: 'PSI to Bar Pressure Unit Converter | TradeConvert',
    desc: 'Convert pressure values between PSI, Bar, Kilopascals (kPa), and Megapascals (MPa). Ideal for HVAC, hydronic plumbing, and PRV valve adjustments.'
  },
  'roofing/index.html': {
    title: 'Roofing Shingle & Square Calculator | TradeConvert',
    desc: 'Calculate roofing squares and shingle bundles based on roof length, width, and pitch rise-to-run slope multipliers. Includes starter strip math.'
  },
  'stair/index.html': {
    title: 'Stair Riser & Stringer Layout Calculator | TradeConvert',
    desc: 'Calculate stair riser heights, tread run layouts, and stringer angles automatically based on IRC building code limits (7.75-inch max rise).'
  },
  'temperature/index.html': {
    title: 'Temperature Converter (°F to °C) | TradeConvert',
    desc: 'Convert temperatures between Fahrenheit, Celsius, and Kelvin. Built for HVAC technicians, commercial mechanical engineers, and thermodynamic tasks.'
  },
  'tile/index.html': {
    title: 'Flooring & Tile Layout Calculator | TradeConvert',
    desc: 'Calculate floor and backsplash tile quantities, dynamic grout offsets, grout bag weight yields, and waste multipliers for grid tile patterns.'
  },
  'torque/index.html': {
    title: 'Torque Spec Converter (lb-ft to Nm) | TradeConvert',
    desc: 'Convert torque values between imperial Pound-Feet (lb-ft), Pound-Inches, and metric Newton-Meters (Nm) for mechanical fasteners and structural bolts.'
  },
  'voltage-drop/index.html': {
    title: 'Voltage Drop Calculator (NEC 2026) | TradeConvert',
    desc: 'Estimate electrical voltage drop over long wire runs. Calculates single-phase drop percentage and recommends minimum AWG wire sizing for efficiency.'
  },
  'volume/index.html': {
    title: 'Volume Converter (Cubic Yards to m³) | TradeConvert',
    desc: 'Convert volumes between cubic yards, cubic feet, cubic meters, gallons, and liters. Multi-unit reference calculator for excavation and concrete trades.'
  },
  'weight/index.html': {
    title: 'Weight Converter (lb, kg, US Ton) | TradeConvert',
    desc: 'Convert weight measurements between pounds, kilograms, ounces, grams, metric tonnes, and US short tons. Built for shipping and hauling logistics.'
  },

  // Blog Articles
  'blog/board-feet-calculator-lumber-estimation-2026/index.html': {
    title: 'Board Feet & Lumber Sizing Guide | TradeConvert',
    desc: 'Calculate board feet like a pro. Read our comprehensive lumber guide covering Doyle vs Scribner scales, waste factors, and structural timber pricing.'
  },
  'blog/circuit-breaker-sizing-guide-2026/index.html': {
    title: 'NEC Circuit Breaker Sizing Guide | TradeConvert',
    desc: 'Master the NEC 80% breaker safety rule. Learn how to calculate continuous vs non-continuous electrical loads and size circuit breakers properly.'
  },
  'blog/concrete-calculator-2026/index.html': {
    title: 'Concrete Slabs & Bag Sizing Guide | TradeConvert',
    desc: 'Calculate concrete volume, Quikrete bags, and structural slab cost with our expert field guide. Includes nominal thickness compaction factors.'
  },
  'blog/concrete-psi-requirements-aci-318/index.html': {
    title: 'ACI 318 Concrete PSI Requirements | TradeConvert',
    desc: 'durability standards deep-dive. Learn ACI requirements for residential concrete footings, slab-on-grade floors, and exterior freeze-thaw exposure.'
  },
  'blog/drywall-calculator-waste-factor-guide-2026/index.html': {
    title: 'Drywall Estimation & Waste Guide | TradeConvert',
    desc: 'Master drywall sheet layout calculations. Learn how to deduct for doors and windows, estimate joint compound, tape, and select fast dry screws.'
  },
  'blog/excavation-volume-spoil-hauling-guide-2026/index.html': {
    title: 'Excavation dirt volume & Spoil Guide | TradeConvert',
    desc: 'Calculate loose versus bank cubic yards like a professional estimator. Learn soil swell multipliers and coordinate optimal dump truck hauling cycles.'
  },
  'blog/lumber-dimensions-nominal-vs-actual/index.html': {
    title: 'Lumber Sizes: Nominal vs. Actual | TradeConvert',
    desc: 'Why a 2x4 is not a 2x4. Read our guide to PS 20-20 lumber standards, moisture content shrinkage, and timber framing specifications.'
  },
  'blog/pipe-size-water-flow-calculator-2026/index.html': {
    title: 'Plumbing Pipe Size & Water Flow Guide | TradeConvert',
    desc: 'Learn how to size water supply pipes using GPM, PSI, and friction loss equations. Explains critical water velocity limits to prevent pipe fatigue.'
  },
  'blog/roofing-calculator-guide-2026/index.html': {
    title: 'Roofing Materials & Square Guide | TradeConvert',
    desc: 'Learn how to calculate roof squares, underlayment rolls, and shingle bundles. Includes pitch factor tables and edge starter strip guidelines.'
  },
  'blog/roofing-material-calculator-guide-2026/index.html': {
    title: 'Shingle & Metal Roof Estimator Guide | TradeConvert',
    desc: 'Exhaustive guide to estimating shingle packages, metal panels, and layout margins. Includes pitch riser variables and ridge cap calculation rules.'
  },
  'blog/soil-swell-compaction-factors-guide/index.html': {
    title: 'Soil Swell & Compaction Guide | TradeConvert',
    desc: 'Master Bank, Loose, and Compacted volumes in excavation. Learn how expansion impacts hauling costs and engineering backfill specs.'
  },
  'blog/stair-stringer-calculator-building-code-2026/index.html': {
    title: 'Stair Stringer Layout & IRC Codes | TradeConvert',
    desc: 'Step-by-step guide to laying out stair stringers using rise, run, and stringer calculations. Strictly reviews IRC maximum riser height guidelines.'
  },
  'blog/voltage-drop-calculation-nec/index.html': {
    title: 'Voltage Drop Guide (NEC 2026) | TradeConvert',
    desc: 'Learn the official NEC voltage drop formulas for long branch runs. Includes circular mils wire resistance reference charts and upsizing advice.'
  },
  'blog/voltage-drop-calculator-guide-2026/index.html': {
    title: 'Voltage Drop Calculator Wire Guide | TradeConvert',
    desc: 'Avoid equipment damage by sizing wire runs for low drop percentages. Reviews single-phase K-factors, balanced feeder loads, and copper vs aluminum.'
  },
  'blog/what-water-pressure-is-too-high/index.html': {
    title: 'Water Pressure Limits & Plumber Guide | TradeConvert',
    desc: 'Understanding UPC §608.2. Why residential static water pressure above 80 PSI damages pipes, voids appliance warranties, and requires a PRV valve.'
  }
};

// Helper: Get HTML files recursively
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
console.log(`Processing ${htmlFiles.length} HTML files...`);

let totalModified = 0;

htmlFiles.forEach(filePath => {
  const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/');
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Identify canonical URL or extract it
  let canonicalUrl = `https://tradeconvert.pro/${relativePath.replace('index.html', '')}`;
  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
  if (canonicalMatch) {
    canonicalUrl = canonicalMatch[1];
  }

  // 2. Lookup pre-configured SEO mapping
  const seoData = seoMap[relativePath];
  
  if (seoData) {
    // A. Update or Insert Title
    const titleRegex = /<title>.*?<\/title>/gi;
    if (titleRegex.test(content)) {
      content = content.replace(titleRegex, `<title>${seoData.title}</title>`);
    } else {
      content = content.replace('</head>', `  <title>${seoData.title}</title>\n</head>`);
    }

    // B. Update or Insert Meta Description
    const descRegex = /<meta name="description" content=".*?"\/?>/gi;
    if (descRegex.test(content)) {
      content = content.replace(descRegex, `<meta name="description" content="${seoData.desc}">`);
    } else {
      content = content.replace('</head>', `  <meta name="description" content="${seoData.desc}">\n</head>`);
    }
  }

  // 3. Absolute Open Graph image paths and URL alignments
  // Find standard Relative paths in OG/Twitter tags and make them absolute
  content = content.replace(/property="og:image" content="\/assets\/og-image\.png"/gi, `property="og:image" content="https://tradeconvert.pro/assets/og-image.png"`);
  content = content.replace(/name="twitter:image" content="\/assets\/og-image\.png"/gi, `name="twitter:image" content="https://tradeconvert.pro/assets/og-image.png"`);

  // Align og:url to the exact canonicalUrl (with trailing slash)
  const ogUrlRegex = /<meta property="og:url" content=".*?"\/?>/gi;
  if (ogUrlRegex.test(content)) {
    content = content.replace(ogUrlRegex, `<meta property="og:url" content="${canonicalUrl}">`);
  } else {
    content = content.replace('</head>', `  <meta property="og:url" content="${canonicalUrl}">\n</head>`);
  }

  // Ensure og:site_name, og:type, and twitter:card tags exist
  if (!content.includes('property="og:site_name"')) {
    content = content.replace('</head>', `  <meta property="og:site_name" content="TradeConvert">\n</head>`);
  }
  if (!content.includes('property="og:type"')) {
    const isBlog = relativePath.startsWith('blog/') && relativePath !== 'blog/index.html';
    const ogType = isBlog ? 'article' : 'website';
    content = content.replace('</head>', `  <meta property="og:type" content="${ogType}">\n</head>`);
  }
  if (!content.includes('name="twitter:card"')) {
    content = content.replace('</head>', `  <meta name="twitter:card" content="summary_large_image">\n</head>`);
  }

  // 4. Structured Data (JSON-LD) correction & validation upgrades
  // We locate <script type="application/ld+json">...</script> blocks
  const scriptRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let scriptMatches = [...content.matchAll(scriptRegex)];

  scriptMatches.forEach(match => {
    const originalScriptBlock = match[0];
    const jsonStr = match[1].trim();

    try {
      let json = JSON.parse(jsonStr);

      let isModified = false;

      // Rule A: SoftwareApplication Schema Alignment
      if (json['@type'] === 'SoftwareApplication') {
        json.url = canonicalUrl;
        json.applicationCategory = 'BusinessApplication'; // Correct category validation
        json.offers = {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        };
        isModified = true;
      }

      // Rule B: Article Schema Alignment
      if (json['@type'] === 'Article' || json['@type'] === 'BlogPosting') {
        json.image = "https://tradeconvert.pro/assets/og-image.png"; // Mandatory for Rich Snippets
        json.dateModified = json.datePublished || "2026-05-17T08:00:00Z";
        json.publisher = {
          "@type": "Organization",
          "name": "TradeConvert",
          "url": "https://tradeconvert.pro/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://tradeconvert.pro/assets/logo.png"
          }
        };
        isModified = true;
      }

      if (isModified) {
        const formattedJsonStr = JSON.stringify(json, null, 2);
        const newScriptBlock = `<script type="application/ld+json">\n  ${formattedJsonStr}\n  </script>`;
        content = content.replace(originalScriptBlock, newScriptBlock);
      }
    } catch (e) {
      console.warn(`[Warning] JSON-LD parse error in ${relativePath}: ${e.message}`);
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Audited & Aligned: ${relativePath}`);
    totalModified++;
  }
});

console.log(`\n=== Auditing Complete! ===`);
console.log(`Successfully optimized and aligned headers/schema tags in ${totalModified} files.`);
