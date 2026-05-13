---
title: "Favicon Sizes in 2026: The Complete Cheat Sheet (16px to 512px)"
description: "Every favicon size you need in 2026, what each is used for, and how to generate them. Covers ICO, PNG, SVG, Apple touch icons, and PWA manifest icons."
date: "2026-05-13"
category: "Design Tools"
tags: ["Favicon", "Design", "PWA", "Web Development"]
keywords: ["favicon sizes 2026", "favicon cheat sheet", "apple touch icon size", "pwa favicon sizes", "favicon ico png svg"]
readTime: "9 min read"
tldr: "In 2026 you need: a 32×32 PNG for browsers, a 180×180 Apple touch icon, 192×192 and 512×512 for PWA, and an SVG for modern browsers that scale perfectly. The ICO file is legacy but still needed for some browsers."
author: "WebToolkit Pro Design Team"
image: "/blog/favicon-sizes.jpg"
imageAlt: "Grid showing all favicon sizes from 16px to 512px with their use cases"
---

## Why Favicons Are More Complex Than They Look

A favicon was once just a 16×16 pixel ICO file. In 2026, a properly implemented favicon requires multiple sizes and formats to display correctly across:

- Browser tabs (desktop and mobile)
- Bookmarks and reading lists
- iOS home screen (Add to Home Screen)
- Android home screen (PWA)
- macOS Dock (when pinned as app)
- Windows taskbar (pinned sites)
- Google Search results (favicons appear in mobile results)

## The Complete Size Reference

| Size | Format | Purpose |
|---|---|---|
| 16×16 | PNG / ICO | Browser tab (small) |
| 32×32 | PNG / ICO | Browser tab (standard), Windows taskbar |
| 48×48 | ICO | Windows shortcut icon |
| 64×64 | PNG | Browser tab (HiDPI/Retina) |
| 96×96 | PNG | Google TV, Android Chrome |
| 120×120 | PNG | iPhone (non-Retina, legacy) |
| 128×128 | PNG | Chrome Web Store |
| 144×144 | PNG | IE11 pinned sites, Windows 8 tiles |
| 152×152 | PNG | iPad non-Retina |
| 167×167 | PNG | iPad Pro |
| 180×180 | PNG | iPhone Retina, Apple touch icon (primary) |
| 192×192 | PNG | Android Chrome, PWA manifest |
| 256×256 | ICO / PNG | Windows 10 |
| 512×512 | PNG | PWA install screen, Google Play |
| Any | SVG | Modern browsers (scales perfectly) |

## The Minimum Viable Favicon Set (2026)

If you're not building a PWA and just need browser tabs to look good, you need:

```html
<!-- Primary browser favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon (iOS home screen) -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Optional: SVG for modern browsers -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
```

## The Full PWA Favicon Set

For a full Progressive Web App with a manifest file:

```html
<!-- Browser -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- SVG -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- Manifest -->
<link rel="manifest" href="/manifest.json">
```

**manifest.json:**
```json
{
  "name": "Your App Name",
  "short_name": "App",
  "icons": [
    {
      "src": "/favicon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/favicon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/favicon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "theme_color": "#0B1120",
  "background_color": "#0B1120",
  "display": "standalone"
}
```

## The `maskable` Icon: Critical for Android

The `"purpose": "maskable"` icon is used when Android applies its adaptive icon mask (circle, squircle, etc.). If you don't provide a maskable icon, Android may crop your standard icon in ugly ways.

**Maskable icon safe zone:** Keep all important content within the center 80% of the image. The outer 10% on each side can be clipped by the mask shape.

## SVG Favicon: The Modern Best Practice

An SVG favicon scales perfectly at any resolution and can even respond to dark mode:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <style>
    @media (prefers-color-scheme: dark) {
      .icon-bg { fill: #1E2D47; }
      .icon-text { fill: #00D4B4; }
    }
  </style>
  <rect class="icon-bg" width="100" height="100" rx="20" fill="#00D4B4"/>
  <text class="icon-text" x="50" y="72" text-anchor="middle" 
        font-family="system-ui" font-size="60" font-weight="bold" fill="#0B1120">W</text>
</svg>
```

## Generate Your Favicon Set

Use our [Favicon Generator](/tools/favicon-generator/) to create PNG favicons at all required sizes from a single letter, emoji, or short text. Download the exact sizes you need without any design software.
