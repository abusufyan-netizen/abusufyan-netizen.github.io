---
title: "How to Decode a JWT Without a Library (And When Not To)"
seoTitle: "Decoding JWT Without a Library: A Step-by-Step Guide"
description: "Learn how to decode a JWT token in plain JavaScript using atob(), what the security implications are, and when you need a proper verification library instead."
date: "2026-05-13"
category: "Security"
tags: ["JWT", "JavaScript", "Security", "Authentication"]
keywords: ["decode jwt javascript", "atob jwt decode", "jwt without library", "parse jwt payload", "jwt base64 decode"]
readTime: "8 min read"
tldr: "Decoding a JWT payload requires only atob() and JSON.parse — no library needed. But decoding is NOT verification. Only a library can verify the signature. Know the difference before shipping."
author: "WebToolkit Pro Security Team"
image: "/blog/decode-jwt.jpg"
imageAlt: "Code editor showing JWT decoding in JavaScript"
steps:
  - name: "Extract the Payload segment"
    text: "Split the JWT string by the dot character (.) and retrieve the middle element (index 1), which contains the Base64URL-encoded payload."
  - name: "Convert Base64URL to Standard Base64"
    text: "Replace hyphen characters (-) with plus (+) and underscore characters (_) with forward slash (/) to conform to traditional Base64 standards."
  - name: "Decode and parse the JSON string"
    text: "Use atob() combined with decodeURIComponent() to decode the Base64 string, then use JSON.parse() to convert the resulting string into a usable JavaScript object."
---

## What's Actually Inside a JWT?

A JWT (JSON Web Token) is three Base64URL-encoded strings joined by dots:

```
header.payload.signature
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIzIn0.abc123
```

The **header** and **payload** are just JSON objects encoded in Base64URL. They contain no encryption — anyone with the token string can read them. Only the **signature** requires knowledge of the secret key to generate or verify.

## Decoding the Payload in Plain JavaScript

```javascript
function decodeJWT(token) {
  const [, payload] = token.split('.')
  // Base64URL → Base64 → JSON string → Object
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
  const jsonStr = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  )
  return JSON.parse(jsonStr)
}

const payload = decodeJWT('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIzIn0.abc123')
console.log(payload) // { sub: 'user123' }
```

The `replace` calls handle Base64URL encoding — JWT uses `-` and `_` instead of `+` and `/`. The `decodeURIComponent` wrapper handles multi-byte UTF-8 characters correctly.

## When Can You Use This?

✅ **Debugging** — inspecting what claims are in a token during development  
✅ **UI display** — showing the user's name from the `name` claim  
✅ **Client-side routing** — reading roles/permissions to show/hide UI elements  
✅ **Checking expiry before making a request** — reading `exp` to avoid a 401

## When You MUST Use a Verification Library

❌ **Never trust a decoded payload for authorization decisions on a server.** An attacker can craft any payload they want and sign it with a weak key — or exploit the `alg: none` vulnerability.

For server-side verification, use a proper library:
- **Node.js:** `jsonwebtoken` or `jose`
- **Python:** `python-jose` or `PyJWT`
- **PHP:** `firebase/php-jwt`

These libraries verify the signature, check the expiry (`exp`), and validate the issuer (`iss`) and audience (`aud`) claims.

## The `alg: none` Attack

One of the most notorious JWT vulnerabilities is the `alg: none` attack. Some older JWT libraries would trust a token that declared `"alg": "none"` in its header — effectively a token with no signature at all.

**The fix:** Always explicitly specify the expected algorithm in your verification call:
```javascript
jwt.verify(token, secret, { algorithms: ['HS256'] })
```

Use our [JWT Decoder](/tools/jwt-decoder/) to inspect the `alg` claim in any token you receive, and verify it matches what you expect.

## Checking Token Expiry Without a Library

```javascript
function isTokenExpired(token) {
  const { exp } = decodeJWT(token)
  if (!exp) return false // No expiry claim = doesn't expire
  return Date.now() >= exp * 1000 // exp is in seconds, Date.now() in ms
}
```

This is safe because you're only reading the claim — you haven't trusted it for any security decision. You're just using it to optimize UX (e.g., redirecting to login before making a doomed API call).
