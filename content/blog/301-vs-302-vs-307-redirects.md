---
title: "301 vs 302 vs 307 Redirects: Which One to Use and When"
description: "The definitive guide to HTTP redirects. Understand the SEO and technical differences between 301, 302, 307, and 308 redirects — and when to use each."
date: "2026-05-13"
category: "SEO Tools"
tags: ["SEO", "HTTP", "Redirects", "htaccess"]
keywords: ["301 vs 302 redirect seo", "307 redirect vs 301", "http redirect types explained", "301 redirect seo", "htaccess redirect guide"]
readTime: "10 min read"
tldr: "Use 301 for permanent URL changes (passes full link equity). Use 302 for temporary redirects (maintains the original URL in Google's index). Use 307 when you need a temporary redirect that must preserve the HTTP method (POST stays POST)."
author: "WebToolkit Pro SEO Team"
image: "/blog/301-vs-302-redirects.jpg"
imageAlt: "HTTP redirect flow diagram showing 301 302 and 307 response codes"
---

## The Short Answer

| Status | Type | SEO Equity Passed | Method Preserved | Use When |
|---|---|---|---|---|
| 301 | Permanent | ~99% | No (POST → GET) | URL moved permanently |
| 302 | Temporary | ~0% | No (POST → GET) | URL temporarily different |
| 307 | Temporary | ~0% | Yes (POST → POST) | Temporary redirect, must keep POST |
| 308 | Permanent | ~99% | Yes (POST → POST) | Permanent, must keep POST |
| 303 | See Other | ~0% | No (always GET) | After form submission redirect |

## 301: Permanent Redirect (The SEO Standard)

A 301 tells crawlers and browsers: "This URL has permanently moved. Update your records. Don't come back to the old URL."

**SEO effect:** Google transfers approximately 99% of PageRank (link equity) through a 301. This is the redirect to use after:
- A domain migration
- A URL restructuring
- Changing a post slug (see our [slug guide](/blog/url-slug-seo-best-practices/))
- Canonicalizing www vs non-www
- Forcing HTTP → HTTPS

**In .htaccess:**
```apache
# Single URL redirect
Redirect 301 /old-page /new-page

# Pattern-based (all pages from old blog path)
RewriteRule ^old-blog/(.*)$ /blog/$1 [R=301,L]
```

Generate your `.htaccess` redirect rules with our [.htaccess Generator](/tools/htaccess-generator/).

## 302: Temporary Redirect (Preserve the Original)

A 302 tells crawlers: "The content at this URL has temporarily moved. Keep the original URL in your index — it will come back."

**SEO effect:** Google does NOT transfer link equity through a 302 (or transfers much less). The original URL remains indexed. This is by design: if you redirect temporarily for a sale, an A/B test, or maintenance, you want the original URL to remain dominant.

**Correct use cases:**
- Showing a maintenance page while a feature is rebuilt
- A/B testing between two landing pages
- Geo-based redirects that sometimes serve different content
- Directing users to a login page when a session expires (the protected page is the original)

**In .htaccess:**
```apache
Redirect 302 /sale https://example.com/sale-page
```

## 307: Temporary Redirect (Method-Preserving)

307 is technically identical to 302 in SEO terms, but with one key difference: **it preserves the HTTP method.**

With a 302, a browser will convert a POST request to a GET request after the redirect. With a 307, the browser resends the POST request to the new URL.

**When does this matter?**
- API endpoints that accept `POST /submit` and need to temporarily redirect to a new server
- Form submissions that must not be converted to GET
- Payment processing flows

**In .htaccess:**
```apache
RewriteRule ^api/old-endpoint$ /api/new-endpoint [R=307,L]
```

## 308: Permanent Redirect (Method-Preserving 301)

308 is to 307 what 301 is to 302 — the permanent, method-preserving equivalent. Use 308 when you're permanently moving an API endpoint that receives POST/PUT/PATCH requests and the client should update its endpoint reference.

## The Method Change Problem

This catches many developers off guard:

```
Client: POST /form-handler
Server: 302 Found → /new-form-handler

Client: GET /new-form-handler   ← Changed from POST to GET!
```

If your form data disappears after a redirect, you probably have a 301/302 converting POST to GET. Use 307/308 to prevent this.

## Redirect Chains: The Hidden SEO Tax

A redirect chain is multiple consecutive redirects:
```
/old-url → 301 → /temp-url → 301 → /new-url
```

Each hop in the chain reduces the link equity passed. More importantly, it adds latency — each redirect is an additional HTTP round trip. For mobile users, this can mean hundreds of milliseconds of page load delay.

**Rule:** Never have more than one redirect in a chain between any two URLs. Check for chains with our [HTTP Redirect Checker](/tools/redirect-checker/).
