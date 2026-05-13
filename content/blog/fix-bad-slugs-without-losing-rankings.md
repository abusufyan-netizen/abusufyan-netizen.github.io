---
title: "How to Fix Bad Slugs on an Existing WordPress Site Without Losing Rankings"
description: "A step-by-step guide to cleaning up poor URL slugs on a live WordPress site while protecting SEO rankings through proper 301 redirects."
date: "2026-05-13"
category: "SEO Tools"
tags: ["WordPress", "SEO", "Redirects", "URL Slugs"]
keywords: ["fix wordpress slugs seo", "change url slug without losing rankings", "wordpress 301 redirect slug", "yoast redirect old slug", "wordpress slug seo fix"]
readTime: "11 min read"
tldr: "Never change a slug on a live page without a 301 redirect. Use Yoast SEO's redirect module or the Redirection plugin to map old URLs to new ones automatically. Submit the updated sitemap to Search Console afterward."
author: "WebToolkit Pro SEO Team"
image: "/blog/fix-wordpress-slugs.jpg"
imageAlt: "WordPress post editor showing slug field being updated"
---

## Why Bad Slugs Happen

Most URL slug problems come from three sources:

1. **WordPress default slugs** — WordPress generates slugs from the full title, including stop words: `/how-to-build-a-rest-api-in-node-js-a-beginners-guide/`
2. **Date-based slugs that were later changed** — Sites that switched permalink structures mid-life
3. **Slugs set during CMS migrations** — Content migrated from another platform with IDs or ugly paths

The challenge: these URLs may already have Google rankings and inbound links. Changing them carelessly destroys that equity.

## Step 1: Audit Your Current Slug Quality

Export your full URL list from Google Search Console:
- **Performance** → Export → Download CSV

Or use a crawling tool like Screaming Frog to spider your site and export all URLs.

Identify slugs that are:
- Over 75 characters
- Contain stop words (the, a, an, of, for, etc.)
- Have underscores instead of hyphens
- Include dates that will age badly
- Don't include the primary keyword

Use our [Slug Generator](/tools/slug-generator/) to generate the optimal version of each slug.

## Step 2: Check Which URLs Have Traffic or Backlinks

Before touching any slug, check:
- **Google Search Console → Performance:** Does this URL have impressions or clicks?
- **Ahrefs/Moz/Semrush:** Does this URL have backlinks?

**Rule:** If a URL has ANY inbound traffic or backlinks, never change it without a redirect. The more traffic, the more careful you need to be.

## Step 3: Set Up Redirect Infrastructure

### Option A: Yoast SEO Premium (Recommended for WordPress)

Yoast Premium includes an automatic redirect feature. When you update a post's slug:
1. Yoast detects the slug change on save
2. It automatically creates a 301 redirect from the old slug to the new one
3. The redirect lives in Yoast's database, not `.htaccess`

### Option B: Redirection Plugin (Free)

Install the free **Redirection** plugin. Before changing any slug:
1. Add a manual redirect: Old URL → New URL (Type: 301)
2. Then update the slug in WordPress

The plugin also monitors 404 errors and suggests redirects automatically.

### Option C: .htaccess (Server-Level, Most Performant)

For bulk redirects or when you're changing permalink structures entirely, use server-level redirects. Generate them with our [.htaccess Generator](/tools/htaccess-generator/):

```apache
# Pattern: redirect any date-based URL to the post name
RewriteRule ^[0-9]{4}/[0-9]{2}/[0-9]{2}/([^/]+)/?$ /$1/ [R=301,L]
```

## Step 4: Update the Slug in WordPress

1. Open the post in the editor
2. Find **Permalink** (in the block editor, it's under **Post** → **Summary** → **URL**)
3. Click **Edit** and enter your new, optimized slug
4. **Save / Update** the post

If using Yoast Premium, the redirect is created automatically. If using the Redirection plugin, confirm your manual redirect is in place first.

## Step 5: Update Internal Links

WordPress doesn't automatically update internal links when a slug changes. Do a database search-and-replace:

```bash
# Using WP-CLI
wp search-replace '/old-slug/' '/new-slug/' --all-tables
```

Or use the **Better Search Replace** plugin if you don't have CLI access.

## Step 6: Submit the Updated Sitemap

After making changes:
1. Go to **Yoast → General → Features** → make sure XML Sitemaps is on
2. Visit `yoursite.com/sitemap_index.xml` and copy the URL
3. Go to **Google Search Console → Sitemaps** → Submit the sitemap URL
4. Monitor the **Coverage** report over the next 2–4 weeks for indexing confirmation

## Slug Change Risk Table

| URL Has | Risk Level | Action |
|---|---|---|
| No traffic, no links | ✅ Low | Change freely |
| <100 monthly visits | ⚠️ Medium | Change with 301 redirect |
| 100–1000 visits/month | 🔴 High | Change with 301, monitor closely |
| 1000+ visits/month | 🔴 Very High | Consider keeping the old slug |
| Multiple high-DA backlinks | 🔴 Extreme | Do not change without specialist review |
