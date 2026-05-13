---
title: "Linear vs Radial vs Conic Gradients: A Complete CSS Guide"
description: "Most developers use linear-gradient and stop there. This guide covers all three CSS gradient types with real-world examples from Stripe, Vercel, and Apple."
date: "2026-05-13"
category: "Design Tools"
tags: ["CSS", "Gradients", "Frontend", "Design"]
keywords: ["linear vs radial gradient css", "conic gradient css", "css gradient types", "css gradient tutorial 2026", "stripe gradient css"]
readTime: "13 min read"
tldr: "Linear gradients create directional transitions. Radial gradients create circular glows and depth. Conic gradients create pie charts and angular sweeps. Each has a distinct visual purpose — using the right one is the difference between amateur and professional UI."
author: "WebToolkit Pro Design Team"
image: "/blog/gradient-types.jpg"
imageAlt: "Three panels showing linear radial and conic gradient examples"
---

## Why Most Developers Only Use One Gradient Type

Search GitHub for CSS gradient usage and you'll find `linear-gradient` in over 90% of cases. Radial and conic gradients are technically supported in all modern browsers, but developers rarely reach for them because they learned linear gradients first and never explored further.

This guide changes that. Build along in our [CSS Gradient Generator](/tools/css-gradient-generator/).

## Linear Gradient: Directional Transitions

`linear-gradient()` transitions colors along a straight line at a specified angle.

```css
/* Basic: top to bottom */
background: linear-gradient(#00D4B4, #0094FF);

/* Angled */
background: linear-gradient(135deg, #00D4B4, #8B5CF6);

/* Multi-stop with explicit positions */
background: linear-gradient(
  90deg,
  #00D4B4 0%,
  #0094FF 50%,
  #8B5CF6 100%
);
```

**Real-world use:** Stripe's hero sections use layered linear gradients. The key technique is using `background-blend-mode` to layer multiple gradients for depth.

```css
/* Stripe-style layered gradient */
background:
  linear-gradient(135deg, rgba(0, 212, 180, 0.15) 0%, transparent 50%),
  linear-gradient(225deg, rgba(0, 148, 255, 0.15) 0%, transparent 50%),
  #0B1120;
```

## Radial Gradient: Glows and Depth

`radial-gradient()` radiates from a center point outward in a circular or elliptical pattern.

```css
/* Simple glow */
background: radial-gradient(circle at 50% 50%, #00D4B4 0%, transparent 70%);

/* Elliptical — different x and y radii */
background: radial-gradient(ellipse 60% 40% at 50% 50%, #8B5CF6, #0B1120);

/* Off-center spotlight effect */
background: radial-gradient(circle at 30% 20%, rgba(0,212,180,0.4), transparent 60%), #0B1120;
```

**Real-world use:** Vercel's homepage uses radial gradients to create the glowing orb effect behind their hero text. Apple uses radial gradients on product pages to create the illusion of a light source reflecting off a product surface.

**CSS trick — animated radial glow:**
```css
.glow {
  background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(0,212,180,0.3), transparent 60%);
  transition: background 0.1s;
}
/* Update --x and --y with mouse position via JS */
```

## Conic Gradient: Pies, Wheels, and Sweeps

`conic-gradient()` sweeps colors around a center point like the hands of a clock. It's the newest addition (Chrome 69+, Firefox 83+, Safari 12.1+).

```css
/* Pie chart — 60% one color, 40% another */
background: conic-gradient(#00D4B4 0% 60%, #0094FF 60% 100%);

/* Color wheel — full spectrum */
background: conic-gradient(
  hsl(0, 100%, 50%),
  hsl(60, 100%, 50%),
  hsl(120, 100%, 50%),
  hsl(180, 100%, 50%),
  hsl(240, 100%, 50%),
  hsl(300, 100%, 50%),
  hsl(360, 100%, 50%)
);

/* Angular sweep from a specific start point */
background: conic-gradient(from 45deg at 50% 50%, #8B5CF6, #EC4899, #0094FF);
```

**Real-world use:** Conic gradients are the correct CSS tool for:
- Pie/donut charts without JavaScript
- Loading spinners with gradient fills
- Angular color selectors (HSL wheels)
- Starburst / sunray backgrounds

## Combining All Three: The Modern Approach

The most sophisticated UIs layer all three types:

```css
.hero {
  background:
    /* Conic sweep at top */
    conic-gradient(from 200deg at 50% -20%, transparent 0deg, rgba(0,212,180,0.08) 60deg, transparent 60deg),
    /* Radial glow in center */
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,148,255,0.15), transparent),
    /* Linear base */
    linear-gradient(180deg, #0D1526 0%, #0B1120 100%);
}
```

Try layering gradients in our [CSS Gradient Generator](/tools/css-gradient-generator/) — start with a linear base, then add radial glows on top.
