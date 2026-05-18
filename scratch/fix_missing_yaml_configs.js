const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const yamlPath = 'c:\\xampp\\htdocs\\webtoolkit-pro\\config\\tools.yaml';

try {
  const fileContents = fs.readFileSync(yamlPath, 'utf8');
  const data = yaml.load(fileContents);

  console.log(`Loaded tools.yaml. Found ${data.tools.length} tools.`);

  // 1. Upgrade UUID v7 Generator
  const uuidTool = data.tools.find(t => t.slug === 'uuid-v7-generator');
  if (uuidTool) {
    uuidTool.meta = {
      title: 'Free UUID v7 Generator Online — Secure & RFC 9562 Compliant',
      description: 'Generate cryptographically secure, time-ordered UUID version 7 identifiers instantly. Perfect for B-tree index optimizations, high-throughput distributed systems, and modern database primary keys. Processes 100% offline and local for maximum security.'
    };
    uuidTool.content = {
      title: 'Free UUID v7 Generator Online — Secure Sortable Identifiers',
      description: 'Generate cryptographically secure, time-ordered UUID version 7 identifiers instantly. Perfect for B-tree index optimizations, high-throughput distributed systems, and database primary keys.',
      keywords: [
        'uuid v7 generator',
        'time-ordered uuid',
        'sortable unique identifier',
        'rfc 9562 uuid',
        'database primary key generator',
        'next-gen uuid online',
        'secure unique id'
      ],
      tldr: 'Generate time-ordered, database-friendly UUID v7 identifiers locally using standard cryptographically secure Web Crypto APIs.',
      entity_definition: "A UUID v7 Generator is a high-performance utility designed to produce time-ordered Universally Unique Identifiers in strict accordance with the IETF RFC 9562 specification. Unlike standard v4 UUIDs which are completely random and lead to severe database index fragmentation (B-tree page splits), version 7 incorporates a millisecond-precision Unix timestamp in its most significant 48 bits. This chronological structure guarantees that identifiers are lexicographically sortable, allowing database engines like PostgreSQL, MySQL, and SQLite to index new primary keys sequentially. The remaining bits are populated with cryptographically secure, hardware-backed randomness (CSPRNG), preventing collisions and maintaining the unguessable nature of standard UUIDs. By generating all UUIDs client-side, WebToolkit Pro ensures absolute security for sensitive database schema designs.",
      how_it_works: "Our generator combines a high-precision local system timestamp (Unix epoch milliseconds) with a cryptographically secure random bitstream drawn from the browser's native Web Crypto API. The timestamp is converted into a 48-bit integer, and the sub-millisecond counter or random entropy occupies the next 12 bits, followed by the mandatory 4-bit UUID version marker ('0111' for v7) and the 2-bit variant indicator. The remaining 62 bits are generated randomly to guarantee global uniqueness. This binary structure is then formatted into standard 36-character hexadecimal representation (8-4-4-4-12 structure).",
      use_cases: [
        'Optimizing high-throughput write operations in databases like PostgreSQL, MySQL, and MongoDB by preventing B-tree leaf fragmentation.',
        'Generating sequential, chronologically-ordered primary keys for event-sourcing and distributed logs without sacrificing privacy.',
        'Creating secure, unguessable yet lexicographically sortable transaction IDs for financial and e-commerce record keeping.',
        'Improving read latency in large database clusters by keeping recently created records physically clustered together on disk.',
        'Generating unique request tracing IDs (correlation IDs) for microservices debugging and logging pipelines.'
      ],
      features: [
        'Strict compliance with the newly ratified IETF RFC 9562 specification.',
        'Chronological, time-ordered generation for optimized database B-Tree index insertions.',
        'Cryptographically secure randomness derived from the hardware-backed window.crypto API.',
        'High-speed batch generation supporting up to 50 unique sortable identifiers simultaneously.',
        'One-click instant copying and zero-latency client-side local generation.',
        'Granular output formats (Standard Hex, Uppercase, or raw integer byte arrays).',
        'Zero data transmission — works entirely offline and secure on your browser.'
      ],
      faq: [
        {
          question: 'What makes UUID v7 superior to UUID v4 for database primary keys?',
          answer: 'UUID v4 is entirely random, which forces databases (using B-tree indexes) to insert records at random leaf pages. This causes frequent page splits, index fragmentation, and high disk I/O. UUID v7 is time-ordered, meaning new records are appended sequentially. This preserves index efficiency and speeds up insert throughput by up to 10x while maintaining standard 128-bit uniqueness.'
        },
        {
          question: 'Are UUID v7 identifiers guessable since they contain a timestamp?',
          answer: 'While the timestamp portion (first 48 bits) is chronological, the remaining 74 bits are generated using cryptographically secure pseudorandom numbers (CSPRNG). This provides 2^74 (approx. 18.8 sextillion) possible combinations per millisecond. It remains mathematically impossible for an attacker to guess or predict subsequently generated UUIDs, ensuring high security.'
        },
        {
          question: 'Is UUID v7 officially standardized?',
          answer: 'Yes. UUID v7 is formally standardized under RFC 9562, which superseded the older RFC 4122 standard. It is fully supported by modern ORMs (like Prisma, Hibernate, and Entity Framework) and database engines.'
        },
        {
          question: 'How does this tool guarantee my data privacy?',
          answer: 'WebToolkit Pro utilizes 100% client-side JavaScript. The generator runs completely within your browser\'s execution thread and does not make any API requests to a backend. Your system time and cryptographic entropy never leave your machine.'
        },
        {
          question: 'Can UUID v7 suffer from collisions if generated on multiple servers simultaneously?',
          answer: 'No. Even if two UUIDs are generated at the exact same millisecond on different servers, the 74-bit random entropy pool makes the collision probability practically zero (1 in billions of years), making it safe for distributed environments.'
        }
      ],
      technical_specs: [
        { label: 'Standard Specification', value: 'RFC 9562 (RFC 9562 Compliant)' },
        { label: 'Bit Structure', value: '128-Bit Unique (48-Bit Timestamp)' },
        { label: 'Randomness Pool', value: '74-Bit CSPRNG Web Crypto API' },
        { label: 'Sortability', value: 'Lexicographical Chronological' },
        { label: 'Batch Output Rate', value: 'Up to 50 IDs / Sec' },
        { label: 'Processing Security', value: '100% Local / Sandbox Safe' }
      ]
    };
    console.log('✓ Upgraded UUID v7 Generator');
  }

  // 2. Upgrade Secure Password Auditor
  const pwdTool = data.tools.find(t => t.slug === 'password-auditor');
  if (pwdTool) {
    pwdTool.meta = {
      title: 'Secure Password Strength Tester & Data Breach Auditor Online',
      description: 'Instantly audit your password\'s strength, entropy bits, and check if it has been exposed in a database leak. Powered by 100% secure client-side lookup via the k-Anonymity protocol to guarantee absolute privacy.'
    };
    pwdTool.content = {
      title: 'Secure Password Strength Tester & Data Breach Auditor Online',
      description: 'Audit your password\'s strength and check if it has been exposed in a data breach. A privacy-first tool that uses k-Anonymity to check against 10+ billion leaked credentials securely.',
      keywords: [
        'password strength tester',
        'password breach auditor',
        'secure password checker',
        'pwned password lookup',
        'password entropy meter',
        'offline password auditor',
        'k-anonymity breach check'
      ],
      tldr: 'Audit password strength, compute entropy bits, and verify breach exposures using the cryptographically secure local k-Anonymity method.',
      entity_definition: "The Secure Password Strength Tester & Auditor is a critical client-side security utility that performs multi-dimensional security evaluation of user-supplied credentials. In a cybersecurity landscape dominated by high-speed GPU hash cracking and automated credential stuffing, testing a password's resilience goes beyond simple character checking. Our engine calculates mathematical entropy (total bits of randomness), estimates offline brute-force cracking time using modern dictionary models, and audits the password against a dictionary of over 10 billion compromised credentials. Crucially, to prevent exposing your credential during the check, the auditor implements the industry-standard k-Anonymity privacy protocol. By hashing your password locally and only sending the first 5 characters of the SHA-1 hash to the breach API, your actual password never leaves your browser, ensuring a zero-knowledge security audit.",
      how_it_works: "When you type a password, the auditor executes two parallel processes. First, it runs a localized complexity analyzer that computes the length, character variance, and lexicographical entropy bits. Second, it calculates the SHA-1 hash of the password locally in your browser. It takes the first 5 characters of this hash (the prefix) and sends only this prefix to the HaveIBeenPwned database. The database responds with a list of all leaked hashes matching that prefix. The auditor then compares the rest of the hash (the suffix) against this list locally in your browser. If a match is found, it reports the exact leak frequency. Since only the 5-character prefix is sent, the API can never reconstruct your original password.",
      use_cases: [
        'Auditing the strength and security of corporate account credentials before updates.',
        'Testing if a password has been compromised in historical or recent database leaks.',
        'Verifying that newly generated passwords meet high-entropy requirements for system administrators.',
        'Educating users on the weakness of common password patterns and keyboard paths.',
        'Ensuring your master password for password managers is completely unique and unexposed.'
      ],
      features: [
        'Real-time entropy bit calculation and visual security level meter.',
        '100% secure HaveIBeenPwned API integration using the k-Anonymity protocol.',
        'Local SHA-1 hashing — your password is never transmitted across the network.',
        'Accurate brute-force cracking time estimations based on modern hardware benchmarks.',
        'Detailed analysis of character distribution (Uppercase, Lowercase, Numbers, Special characters).',
        'Dictionary attack resilience testing to identify common words and keyboard patterns.',
        'Fully responsive, dark-mode optimized interface with zero local logging.'
      ],
      faq: [
        {
          question: 'Is it safe to type my password into this online tester?',
          answer: 'Yes, absolutely. Most password strength checkers send the plain text password to a server, which is extremely dangerous. WebToolkit Pro uses 100% client-side JavaScript. For the data breach check, we use the k-Anonymity protocol. We compute the SHA-1 hash of your password locally in your browser, and only send the first 5 characters (e.g. \'21BD1\') to the database. The database only sees a generic prefix shared by thousands of other passwords and can never reconstruct or see your actual input.'
        },
        {
          question: 'What does \'entropy\' mean in password security?',
          answer: 'Password entropy is a mathematical measure of how unpredictable a password is, measured in bits. Higher entropy means a password is much harder for automated computers to guess. A password with more than 80 bits of entropy is considered highly secure, while passwords above 120 bits are secure against modern supercomputers and AI-driven cracking.'
        },
        {
          question: 'What is a dictionary attack?',
          answer: 'A dictionary attack is a brute-force method where hackers use automated scripts to try lists of common words, phrases, and historical passwords. Standard complexity rules (like requiring capital letters and numbers) can still result in weak passwords if they follow common patterns (e.g., \'P@ssword123!\'). Our tester checks against dictionary databases to identify these patterns.'
        },
        {
          question: 'Why does it show my password was exposed even if I just created it?',
          answer: 'If a password is flagged as exposed, it means that exact character combination has been leaked in a past data breach. Even if you just created it, it means someone else used that exact password before, and it was compromised. You should never use a password that has been exposed in a breach, as automated hacker tools prioritize these lists.'
        },
        {
          question: 'Does this tool save or log my typed passwords?',
          answer: 'Never. We do not have any database, logging scripts, or analytics that track form inputs. Everything runs dynamically in your browser\'s active memory and is instantly cleared as soon as you type or close the page.'
        }
      ],
      technical_specs: [
        { label: 'Security Model', value: 'Zero-Knowledge / Sandbox' },
        { label: 'Breach Database Lookup', value: 'k-Anonymity SHA-1 API' },
        { label: 'Complexity Library', value: 'Dynamic Entropy Meter' },
        { label: 'Cracking Thresholds', value: 'Modern GPU Benchmarks' },
        { label: 'Encryption Standard', value: 'Local Local Hash (SHA-1)' },
        { label: 'Compliance Guarantee', value: 'NIST SP 800-63B Compliant' }
      ]
    };
    console.log('✓ Upgraded Secure Password Auditor');
  }

  // 3. Upgrade Markdown to HTML Converter
  const mdTool = data.tools.find(t => t.slug === 'markdown-converter');
  if (mdTool) {
    mdTool.meta = {
      title: 'Free Markdown to HTML Converter Online — Secure & Fast',
      description: 'Convert your Markdown syntax into clean, valid, and semantic HTML instantly. Ideal for technical documentation, developers, and content writers. Features real-time split-screen preview and offline local processing.'
    };
    mdTool.content = {
      title: 'Free Markdown to HTML Converter Online — Clean Semantic Markup',
      description: 'Convert Markdown text to clean, semantic HTML instantly. Perfect for technical writers, content editors, and frontend developers.',
      keywords: [
        'markdown to html converter',
        'convert md to html online',
        'clean semantic html parser',
        'markdown compiler web',
        'gfm tables to html',
        'technical documentation converter',
        'markdown visual preview'
      ],
      tldr: 'Instantly compile lightweight Markdown syntax into structured, standard HTML5 with full GFM and codeblock preview support offline.',
      entity_definition: "The Markdown to HTML Converter is a high-fidelity markup utility designed to convert lightweight Markdown syntax into structured Hypertext Markup Language (HTML) in real-time. Markdown is highly popular for its human-readable syntax, but browsers require HTML to render web content. Our engine parses headings, blockquotes, code fences, inline emphasis, tables, and lists, outputting perfectly formatted, semantic HTML that aligns with the latest W3C and web standards. The compiler preserves all standard nesting and formatting while stripping malicious script payloads to ensure secure rendering. By executing the conversion entirely inside your browser, the tool protects your unpublished draft articles, document designs, and codebase files from external visibility.",
      how_it_works: "Our parser scans the input string line-by-line using optimized regular expression rules and a highly compliant markdown lexer. It converts block-level elements (headings, paragraphs, blockquotes, tables, lists) and inline elements (bold, italics, links, images, code spans) into their respective HTML5 semantic tags (e.g. <h1>, <p>, <blockquote>, <ul>). It then updates the live split-screen preview pane and compiles the raw HTML output container instantly.",
      use_cases: [
        'Converting technical documentation and README.md files into web pages instantly.',
        'Preparing blog articles and rich-text content for publication in CMS systems that accept HTML.',
        'Formatting complex tables, lists, and code blocks without writing verbose HTML manually.',
        'Sanitizing and validating markdown text structure before production deployment.',
        'Creating HTML newsletters, emails, and notes quickly from standard markdown files.'
      ],
      features: [
        'Real-time double-pane live preview showing rendered HTML as you type.',
        'Strict compliance with CommonMark and Github Flavored Markdown (GFM) standards.',
        'Automated generation of clean, semantic HTML5 markup without junk classes or tags.',
        'One-click copy actions for both raw HTML code and formatted visual preview.',
        'Complete offline functionality powered by local client-side processing.',
        'Built-in code syntax highlighting support for code block previews.',
        'Highly responsive and clean dark-mode UI optimized for technical writers.'
      ],
      faq: [
        {
          question: 'Is the generated HTML search-engine friendly (SEO)?',
          answer: 'Yes, absolutely. The converter parses your markdown headers (#, ##, ###) into semantic HTML5 headings (h1, h2, h3), lists into ul/ol, and paragraphs into standard p tags. This semantic structure is highly readable by search engines and accessibility screen readers, helping optimize your content for Google Search and AI Overviews.'
        },
        {
          question: 'Does this tool support Github Flavored Markdown (GFM)?',
          answer: 'Yes. The engine fully supports GFM elements including strikethrough, task lists, code block language formatting, and standard tables, making it highly compatible with files written for Github repositories.'
        },
        {
          question: 'Can I use this tool offline?',
          answer: 'Yes. The converter loads all processing scripts on the first visit. Once loaded, all parsing logic runs locally in your browser\'s compiler thread. You can disconnect from the internet and continue using the tool indefinitely with zero loss in speed or functionality.'
        },
        {
          question: 'Are my unpublished drafts secure when pasted here?',
          answer: 'Absolutely. Unlike online converters that send your drafts to a backend API to compile, WebToolkit Pro operates strictly client-side. Your text never leaves your device, keeping your proprietary articles, designs, and notes safe from server logs or third-party tracking.'
        },
        {
          question: 'Does the converter support custom HTML tags inline?',
          answer: 'Yes, standard Markdown specifications allow inline HTML tags. Our parser will safely pass-through valid, standard HTML elements, allowing you to combine Markdown convenience with precise HTML customizations.'
        }
      ],
      technical_specs: [
        { label: 'Parser Engine', value: 'CommonMark Lexer V3.0' },
        { label: 'HTML Standard', value: 'Semantic HTML5 (W3C Standard)' },
        { label: 'Tables / Tasks Support', value: 'Full GFM Compliance' },
        { label: 'Preview Latency', value: '0ms (Real-Time Parsing)' },
        { label: 'Asset Compilation', value: 'Client-Side (100% Offline)' },
        { label: 'Draft Security', value: 'Zero Server Transmission' }
      ]
    };
    console.log('✓ Upgraded Markdown to HTML Converter');
  }

  // Dump the updated yaml configuration back
  const updatedYaml = yaml.dump(data, { indent: 2, lineWidth: -1 });
  fs.writeFileSync(yamlPath, updatedYaml, 'utf8');
  console.log('=== All Tools Successfully Upgraded & Saved! ===');

} catch (err) {
  console.error('Failed to update config:', err);
}
