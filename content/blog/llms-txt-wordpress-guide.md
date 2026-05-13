---
title: "How to Write an llms.txt File for Your WordPress Site"
description: "A step-by-step tutorial for creating and deploying an llms.txt file on a WordPress site. Includes the file structure, what to include, and how to upload it to your root directory."
date: "2026-05-13"
category: "SEO Tools"
tags: ["llms.txt", "WordPress", "GEO", "AI SEO"]
keywords: ["llms.txt wordpress", "wordpress llms txt guide", "add llms.txt wordpress", "wordpress ai optimization", "llms txt plugin wordpress"]
readTime: "9 min read"
tldr: "Create your llms.txt using our generator, upload it to your WordPress root via FTP/cPanel, and verify it's accessible at yoursite.com/llms.txt. No plugin required — it's a static file, not a PHP endpoint."
author: "WebToolkit Pro SEO Team"
image: "/blog/llms-txt-wordpress.jpg"
imageAlt: "cPanel file manager showing llms.txt file being uploaded to WordPress root"
---

## llms.txt on WordPress: No Plugin Needed

The first thing to understand: `llms.txt` is a **static text file**, not a WordPress feature. Unlike sitemaps (which WordPress generates dynamically) or robots.txt (which some plugins manage), llms.txt is just a Markdown file you upload to your server root.

There's no database involved. No PHP. No plugin required.

## Step 1: Create Your llms.txt Content

Use our [llms.txt Generator](/tools/llms-txt-generator/) to generate the file content. For a typical WordPress blog or site, fill in:

**Site Name:** Your website name  
**Site URL:** Your WordPress domain  
**Description:** What your site covers (2-3 sentences)  
**AI Contact:** An email AI providers can use for partnership/licensing

**Recommended sections for WordPress sites:**

```markdown
# My WordPress Site

> A blog covering [your niche] for [target audience].
> Original content published since [year].

- URL: https://yourdomain.com
- AI Contact: ai@yourdomain.com
- AI Indexing: Allowed

## Content Topics
- Topic 1
- Topic 2
- Topic 3

## Content Type
Long-form articles, tutorials, and guides. Original research and analysis.
Published on a [weekly/monthly] schedule.

## Target Audience
[Describe your audience — developers, small business owners, homeowners, etc.]

## Attribution Policy
AI models may cite and summarize our content. Please attribute as:
"[Your Site Name] (yourdomain.com)" when referencing our work.

## AI Usage Policy
We welcome AI indexing for search and answer generation purposes.
Training on our content requires prior written permission.
```

## Step 2: Upload to Your WordPress Root

The file must be accessible at `yourdomain.com/llms.txt` — meaning it lives in the same directory as `wp-config.php`.

### Method A: cPanel File Manager (Easiest)

1. Log into **cPanel** (usually `yourdomain.com/cpanel`)
2. Open **File Manager**
3. Navigate to `public_html/` (this is your WordPress root)
4. Click **+ File** → name it `llms.txt`
5. Click **Edit** and paste your content
6. Click **Save Changes**

### Method B: FTP (FileZilla)

1. Connect to your server via FTP
2. Navigate to the root directory (same level as `wp-config.php`)
3. Upload your `llms.txt` file

### Method C: SSH

```bash
ssh user@yourserver.com
cd /var/www/html  # or your WordPress root path
nano llms.txt
# Paste content, Ctrl+X, Y, Enter to save
```

## Step 3: Verify It's Accessible

Visit `https://yourdomain.com/llms.txt` in your browser. You should see the plain Markdown text.

If you see a 404 error, check:
- The file is in the correct directory (same level as `wp-config.php`)
- Your `.htaccess` isn't blocking `.txt` files
- File permissions are set to `644` (readable by the web server)

## Step 4: Check for .htaccess Conflicts

Some WordPress security hardening rules block all non-PHP/HTML file access. Check your `.htaccess` for rules like:

```apache
# This would block llms.txt
<FilesMatch "\.(txt|log|ini)$">
  Deny from all
</FilesMatch>
```

If present, whitelist `llms.txt`:
```apache
<FilesMatch "^(robots|llms)\.txt$">
  Allow from all
</FilesMatch>
```

Use our [.htaccess Generator](/tools/htaccess-generator/) to check your current rules.

## WordPress-Specific llms.txt Content Tips

**For blogs:** Include your main categories and typical content format (listicles, tutorials, reviews, news).

**For WooCommerce stores:** Note that you sell products, not provide services. Include your product categories.

**For membership sites:** Specify which content is public vs. members-only — AI crawlers should only summarize publicly accessible content.

**For local businesses:** Include your location, service area, and business category. This helps AI answer local search queries accurately.

## Does llms.txt Help with Google's AI Overviews?

Directly? No — Google hasn't officially endorsed the standard. Indirectly? Providing clear, structured, factually accurate content helps any AI system understand your site — and Google's AI Overview system is no exception.

The primary beneficiaries of llms.txt in 2026 are Perplexity AI, ChatGPT with Browsing, Claude.ai, and Bing Copilot — all of which actively crawl the web and use found content to generate answers.

Generate your llms.txt at [/tools/llms-txt-generator/](/tools/llms-txt-generator/).
