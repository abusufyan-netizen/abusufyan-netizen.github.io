---
title: "How to Add a Favicon to WordPress: The Right Way in 2026"
description: "The complete guide to adding a favicon to WordPress using the Site Editor, classic Customizer, and functions.php — plus how to add it to every page size correctly."
date: "2026-05-13"
category: "Design Tools"
tags: ["WordPress", "Favicon", "Design", "Tutorial"]
keywords: ["add favicon wordpress 2026", "wordpress site icon", "wordpress favicon customizer", "functions.php favicon", "wordpress favicon not showing"]
readTime: "8 min read"
tldr: "In WordPress 6.x, add your favicon under Appearance → Customize → Site Identity → Site Icon. For block themes use the Site Editor → Styles. Verify it appears correctly in browser tabs, bookmarks, and Google Search results."
author: "WebToolkit Pro Design Team"
image: "/blog/wordpress-favicon.jpg"
imageAlt: "WordPress customizer showing the Site Icon upload interface"
---

## Method 1: WordPress Customizer (Classic Themes — Most Common)

This works for any traditional/classic WordPress theme.

**Steps:**
1. Go to **Appearance → Customize**
2. Click **Site Identity**
3. Find **Site Icon** at the bottom
4. Click **Select Image** and upload a square PNG image (at least 512×512 pixels)
5. WordPress will crop it — accept the crop
6. Click **Publish**

WordPress automatically generates the required sizes from your uploaded image and outputs the correct `<link>` tags in your `<head>`.

**The image requirement:** Your uploaded image must be square and at least 512×512 pixels. WordPress will NOT accept non-square images. Use our [Favicon Generator](/tools/favicon-generator/) to create a perfectly square PNG at exactly 512×512.

## Method 2: Block Theme Site Editor (WordPress 6.x)

For block themes (Twenty Twenty-Four, Kadence blocks theme, etc.):

1. Go to **Appearance → Editor**
2. Click the **WordPress logo** in the top left
3. Select **Site Icon** from the navigation
4. Upload your image

Or alternatively, the Site Icon is also available at **Settings → General → Site Icon** in the admin dashboard (added in WordPress 6.5).

## Method 3: Direct HTML in functions.php

For complete control over the exact favicon HTML output:

```php
// In your child theme's functions.php or a plugin

// Remove WordPress's default favicon output
remove_action('wp_head', 'wp_site_icon', 99);

// Add your custom favicon tags
add_action('wp_head', function() {
    ?>
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/apple-touch-icon.png">
    <link rel="icon" type="image/svg+xml" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/favicon.svg">
    <link rel="manifest" href="<?php echo get_stylesheet_directory_uri(); ?>/assets/site.webmanifest">
    <?php
}, 1);
```

**Place your favicon files** in `/wp-content/themes/your-child-theme/assets/` and reference them as shown.

## Troubleshooting: Favicon Not Showing

### Browser Cache

Your browser aggressively caches favicons. After updating, hard refresh:
- **Chrome/Edge:** Ctrl + Shift + R (Windows) / Cmd + Shift + R (Mac)
- **Firefox:** Ctrl + F5

Or open a private/incognito window — it starts with a fresh cache.

### Wrong Image Format

WordPress requires a square image. If you uploaded a rectangular image and it was cropped to an aspect ratio you don't like, delete the current Site Icon and re-upload a properly square version.

### Theme Overriding the Favicon

Some themes declare their own `<link rel="icon">` tags in `header.php`. Check your theme files for hardcoded favicon tags and remove or override them in your child theme.

### Caching Plugin Interference

WP Rocket, W3 Total Cache, and similar plugins can serve stale HTML with old favicon tags. Clear all caches after changing your favicon.

## Verifying Your Favicon

After adding your favicon:

1. **Browser tab check:** Open your site in a fresh browser window
2. **Google check:** In Search Console, wait 1–2 days and check that Google shows your favicon in mobile search results
3. **Bookmark test:** Bookmark your site and check the icon in your bookmarks bar
4. **Mobile test:** On iPhone, tap Share → Add to Home Screen. Your 180×180 Apple touch icon should appear

Generate the perfect WordPress favicon at [/tools/favicon-generator/](/tools/favicon-generator/) — download the 512×512 PNG and upload it directly to the WordPress Site Identity panel.
