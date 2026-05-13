---
title: "Working with WordPress REST API Data: Export to CSV Without a Plugin"
description: "How to fetch WordPress REST API data — posts, users, and WooCommerce orders — and export it to CSV without a plugin using JavaScript and our JSON to CSV converter."
date: "2026-05-13"
category: "Developer Tools"
tags: ["WordPress", "REST API", "CSV", "JavaScript"]
keywords: ["wordpress rest api export csv", "wordpress api to csv", "woocommerce orders csv api", "wordpress json to csv", "export wordpress posts csv api"]
readTime: "12 min read"
tldr: "The WordPress REST API returns JSON. Combine it with a client-side JSON-to-CSV converter to export posts, users, and WooCommerce orders without installing any plugins."
author: "WebToolkit Pro Engineering Team"
image: "/blog/wordpress-api-csv.jpg"
imageAlt: "WordPress REST API response being converted to a CSV spreadsheet"
---

## Why Export WordPress Data via the API?

The WordPress built-in export (Tools → Export) produces XML that requires the WordPress Importer to read. It's useless for Excel, Google Sheets, or data analysis tools.

REST API + CSV gives you:
- Human-readable spreadsheets for client reporting
- Data for Google Sheets dashboards
- Database migrations to other platforms
- Analytics and BI tool imports

## Step 1: Enable and Test the REST API

The WordPress REST API is enabled by default since WordPress 4.7. Test it by visiting:

```
https://yoursite.com/wp-json/wp/v2/posts
```

You should see a JSON array of posts. If you get a 404, check **Settings → Permalinks** and save once to flush rewrite rules.

## Step 2: Fetch Posts and Convert to CSV

### Using the Browser Console (Quick Method)

Open your browser console (F12) on any page of your WordPress site and run:

```javascript
// Fetch all published posts (paginated — 100 per request)
const response = await fetch('/wp-json/wp/v2/posts?per_page=100&status=publish')
const posts = await response.json()

// Select only the fields you need
const cleanData = posts.map(p => ({
  id: p.id,
  title: p.title.rendered,
  date: p.date,
  status: p.status,
  link: p.link,
  author: p.author,
  categories: p.categories.join('; '),
  tags: p.tags.join('; ')
}))

// Copy to clipboard as JSON for pasting into the converter
copy(JSON.stringify(cleanData, null, 2))
```

Then paste into our [JSON to CSV Converter](/tools/json-to-csv/) and download the CSV.

## Step 3: Export WordPress Users

```javascript
// Requires authentication for user data
const response = await fetch('/wp-json/wp/v2/users?per_page=100', {
  headers: {
    'Authorization': 'Basic ' + btoa('username:application_password')
  }
})
const users = await response.json()

const cleanUsers = users.map(u => ({
  id: u.id,
  name: u.name,
  username: u.slug,
  email: u.email || 'N/A', // Only available with auth
  registered: u.registered_date,
  roles: u.roles ? u.roles.join('; ') : '',
  url: u.url
}))

copy(JSON.stringify(cleanUsers, null, 2))
```

**Application Passwords** (WordPress 5.6+): Generate at **Users → Profile → Application Passwords**. Use these instead of your main password for API authentication.

## Step 4: Export WooCommerce Orders

WooCommerce extends the REST API with its own endpoints. Authentication is required.

```javascript
const response = await fetch('/wp-json/wc/v3/orders?per_page=100&status=completed', {
  headers: {
    'Authorization': 'Basic ' + btoa('ck_consumer_key:cs_consumer_secret')
  }
})
const orders = await response.json()

const cleanOrders = orders.map(o => ({
  id: o.id,
  number: o.number,
  status: o.status,
  date: o.date_created,
  total: o.total,
  currency: o.currency,
  customer_email: o.billing.email,
  customer_name: `${o.billing.first_name} ${o.billing.last_name}`,
  city: o.billing.city,
  country: o.billing.country,
  items: o.line_items.map(i => `${i.name} x${i.quantity}`).join('; ')
}))

copy(JSON.stringify(cleanOrders, null, 2))
```

WooCommerce API keys are generated at **WooCommerce → Settings → Advanced → REST API**.

## Step 5: Handle Pagination for Large Exports

The WordPress REST API returns a maximum of 100 items per request. For larger datasets:

```javascript
async function fetchAll(endpoint) {
  let page = 1
  let allItems = []
  
  while (true) {
    const response = await fetch(`${endpoint}&per_page=100&page=${page}`)
    const items = await response.json()
    
    if (!items.length) break
    allItems = [...allItems, ...items]
    
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages'))
    if (page >= totalPages) break
    page++
  }
  
  return allItems
}

// Usage
const allPosts = await fetchAll('/wp-json/wp/v2/posts?status=publish')
copy(JSON.stringify(allPosts.map(p => ({ id: p.id, title: p.title.rendered })), null, 2))
```

Then paste the JSON output into [/tools/json-to-csv/](/tools/json-to-csv/) for immediate download.
