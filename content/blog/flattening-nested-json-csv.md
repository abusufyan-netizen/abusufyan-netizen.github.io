---
title: "Flattening Nested JSON for CSV Export: A Developer's Guide"
description: "How to handle nested JSON objects and arrays when converting to CSV. Covers dot notation flattening, array serialization, and handling deeply nested API responses."
date: "2026-05-13"
category: "Developer Tools"
tags: ["JSON", "CSV", "Data Processing", "JavaScript"]
keywords: ["flatten nested json csv", "json nested object to csv", "dot notation json flatten", "convert nested json javascript", "json to csv api response"]
readTime: "11 min read"
tldr: "Flatten nested JSON by recursively building dot-notation keys (user.address.city). Serialize arrays as semicolon-joined strings. Handle null values explicitly. This approach produces CSVs that import cleanly into Excel, Google Sheets, and databases."
author: "WebToolkit Pro Engineering Team"
image: "/blog/flatten-nested-json.jpg"
imageAlt: "Diagram showing JSON nested object being flattened to CSV columns"
---

## The Problem: Nested JSON Doesn't Map to CSV

CSV is fundamentally flat — rows and columns. JSON can be arbitrarily deep. The mismatch is the problem every data engineer faces when extracting API data to spreadsheets.

Consider a typical REST API user object:

```json
{
  "id": 1,
  "name": "Alice Johnson",
  "role": "Admin",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  },
  "permissions": ["read", "write", "admin"],
  "metadata": {
    "created": "2026-01-15",
    "lastLogin": "2026-05-10"
  }
}
```

A naive CSV export gives you: `id, name, role, address, permissions, metadata` — with `[object Object]` in the address column. Useless.

## Solution 1: Dot Notation Flattening (Best)

Recursively walk the object, building keys by joining parent and child keys with dots:

```javascript
function flattenObject(obj, prefix = '') {
  const result = {}
  
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
    
    const newKey = prefix ? `${prefix}.${key}` : key
    const value = obj[key]
    
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // Recurse into nested objects
      Object.assign(result, flattenObject(value, newKey))
    } else if (Array.isArray(value)) {
      // Serialize arrays as semicolon-separated strings
      result[newKey] = value.join('; ')
    } else {
      result[newKey] = value === null ? '' : String(value)
    }
  }
  
  return result
}
```

Applied to our example:
```
id               → 1
name             → Alice Johnson
role             → Admin
address.street   → 123 Main St
address.city     → New York
address.state    → NY
address.zip      → 10001
permissions      → read; write; admin
metadata.created → 2026-01-15
metadata.lastLogin → 2026-05-10
```

This is exactly what our [JSON to CSV Converter](/tools/json-to-csv/) does.

## Solution 2: Array Expansion (One Row per Array Item)

For deeply nested arrays of objects (like order line items), dot notation isn't enough. You may need to expand arrays into multiple rows:

```json
{
  "orderId": "ORD-001",
  "customer": "Alice",
  "items": [
    { "sku": "A1", "qty": 2, "price": 10.00 },
    { "sku": "B2", "qty": 1, "price": 25.00 }
  ]
}
```

**Expanded output:**
```
orderId | customer | items.sku | items.qty | items.price
ORD-001 | Alice    | A1        | 2         | 10.00
ORD-001 | Alice    | B2        | 1         | 25.00
```

```javascript
function expandArrays(record) {
  // Find first array-type value
  const arrayKey = Object.keys(record).find(k => Array.isArray(record[k]))
  if (!arrayKey) return [record]
  
  return record[arrayKey].map(item => ({
    ...Object.fromEntries(
      Object.entries(record).filter(([k]) => k !== arrayKey)
    ),
    ...Object.fromEntries(
      Object.entries(item).map(([k, v]) => [`${arrayKey}.${k}`, v])
    )
  }))
}
```

## Building the CSV String

Once you have flattened records, converting to CSV is straightforward:

```javascript
function jsonToCsv(records) {
  const flat = records.flatMap(r => expandArrays(r)).map(r => flattenObject(r))
  
  // Collect all unique headers
  const headers = [...new Set(flat.flatMap(Object.keys))]
  
  // Escape a CSV cell value
  const escape = val => `"${String(val ?? '').replace(/"/g, '""')}"`
  
  const rows = flat.map(row => 
    headers.map(h => escape(row[h] ?? '')).join(',')
  )
  
  return [headers.map(escape).join(','), ...rows].join('\n')
}
```

Key escaping rules for RFC 4180-compliant CSV:
- Wrap every value in double quotes
- Escape internal double quotes by doubling them: `"` → `""`
- Newlines within values must be wrapped in quotes (already handled)

## Handling Common API Response Patterns

### GraphQL Responses
GraphQL wraps data in `{ "data": { ... } }`. Before flattening:
```javascript
const records = Array.isArray(response.data) ? response.data : [response.data]
```

### Paginated Responses
Many APIs return `{ "results": [...], "next": "...", "count": 123 }`:
```javascript
const records = response.results || response.data || response.items || response
```

### Null and Undefined Values
Always replace nulls with empty strings in your CSV output, otherwise tools like Excel will show `null` as literal text.

Use our [JSON to CSV Converter](/tools/json-to-csv/) to handle all of this automatically — paste your API response and download a clean CSV in seconds.
