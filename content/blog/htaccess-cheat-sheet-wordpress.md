---
title: "The Complete .htaccess Cheat Sheet for WordPress Developers"
description: "Every essential .htaccess rule for WordPress — security hardening, redirect patterns, caching headers, hotlink protection, and custom error pages. With a live generator."
date: "2026-05-13"
category: "SEO Tools"
tags: ["WordPress", "htaccess", "Security", "Performance"]
keywords: ["htaccess cheat sheet wordpress", "wordpress htaccess rules", "htaccess security wordpress", "htaccess performance rules", "wordpress htaccess complete guide"]
readTime: "15 min read"
tldr: "The definitive .htaccess reference for WordPress: from force-HTTPS to blocking xmlrpc.php attacks, caching headers, and hotlink protection — generate all rules with our visual tool."
author: "WebToolkit Pro Engineering Team"
image: "/blog/htaccess-cheatsheet.jpg"
imageAlt: "Code editor showing a well-organized htaccess file with sections"
---

## The WordPress Default .htaccess

After installation, WordPress generates this minimal `.htaccess`:

```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

**Never edit between `# BEGIN WordPress` and `# END WordPress`.** WordPress regenerates this block. Add your rules above or below it.

Use our [.htaccess Generator](/tools/htaccess-generator/) to build any of the rules below without writing code.

---

## Section 1: HTTPS and Domain Canonicalization

### Force HTTPS
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Remove WWW (non-www canonical)
```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

### Force WWW
```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Section 2: Security Hardening

### Block wp-config.php Access
```apache
<Files wp-config.php>
  order allow,deny
  deny from all
</Files>
```

### Block .htaccess Access
```apache
<Files .htaccess>
  order allow,deny
  deny from all
</Files>
```

### Disable Directory Browsing
```apache
Options -Indexes
```

### Block xmlrpc.php (Prevents Brute Force and DDoS)
```apache
<Files xmlrpc.php>
  order deny,allow
  deny from all
</Files>
```

### Block Script Injection in Query Strings
```apache
RewriteCond %{QUERY_STRING} (\<|%3C).*script.*(\>|%3E) [NC,OR]
RewriteCond %{QUERY_STRING} GLOBALS(=|\[|\%[0-9A-Z]{0,2}) [OR]
RewriteCond %{QUERY_STRING} _REQUEST(=|\[|\%[0-9A-Z]{0,2})
RewriteRule ^(.*)$ index.php [F,L]
```

### Block Specific IP Addresses
```apache
<Limit GET POST PUT>
  Order allow,deny
  Allow from all
  Deny from 192.168.1.100
  Deny from 10.0.0.0/8
</Limit>
```

---

## Section 3: Performance and Caching

### Browser Caching Headers
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 day"
</IfModule>
```

### Enable Gzip Compression
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>
```

---

## Section 4: Hotlink Protection

Prevent other sites from embedding your images directly (stealing your bandwidth):

```apache
RewriteEngine On
RewriteCond %{HTTP_REFERER} !^$
RewriteCond %{HTTP_REFERER} !^https?://(www\.)?yoursite\.com [NC]
RewriteRule \.(jpg|jpeg|png|gif|webp|svg)$ - [F,NC]
```

Replace `yoursite\.com` with your actual domain.

---

## Section 5: Custom Error Pages

```apache
ErrorDocument 404 /404.html
ErrorDocument 403 /403.html
ErrorDocument 500 /500.html
```

---

## Section 6: Redirect Patterns

### Single Page 301 Redirect
```apache
Redirect 301 /old-page /new-page
```

### Pattern: Redirect Old Blog Path
```apache
RewriteRule ^old-blog/(.*)$ /blog/$1 [R=301,L]
```

### Redirect Date-Based URLs to Post Name (permalink migration)
```apache
RewriteRule ^[0-9]{4}/[0-9]{2}/[0-9]{2}/([^/]+)/?$ /$1/ [R=301,L]
```

Generate all these rules visually with our [.htaccess Generator](/tools/htaccess-generator/) — copy the output and paste it above the WordPress block in your `.htaccess` file.
