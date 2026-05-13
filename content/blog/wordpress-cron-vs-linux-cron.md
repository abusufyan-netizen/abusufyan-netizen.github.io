---
title: "WordPress Cron vs Real Linux Cron: Key Differences and When to Use Each"
description: "WP-Cron is not a real cron job. Learn its limitations, how it fires, why it fails on low-traffic sites, and how to replace it with a real Linux cron for reliable scheduling."
date: "2026-05-13"
category: "Developer Tools"
tags: ["WordPress", "Cron", "Server", "Performance"]
keywords: ["wordpress cron vs linux cron", "wp-cron limitations", "disable wp-cron", "wordpress real cron", "wp-cron not firing"]
readTime: "10 min read"
tldr: "WP-Cron fires on page load — if no one visits your site, scheduled posts don't publish, emails don't send, and backups don't run. Replace it with a real Linux cron for any production site."
author: "WebToolkit Pro Engineering Team"
image: "/blog/wordpress-cron.jpg"
imageAlt: "WordPress dashboard showing scheduled posts and server terminal"
---

## What Is WP-Cron and How Does It Actually Work?

WordPress ships with a pseudo-cron system called **WP-Cron**. Every time someone visits your WordPress site, the `wp-cron.php` file is executed. It checks a list of pending scheduled tasks and runs any that are overdue.

The critical word here is "every time someone visits." WP-Cron has no independent clock. It runs on **visitor-triggered page loads**, not on a schedule.

This creates a fundamental problem: **if no one visits your site at the scheduled time, the job doesn't run.**

## The WP-Cron Problems

### Low-Traffic Sites Miss Scheduled Events
A WordPress site with 10 visitors per day may go hours between page loads. A post scheduled to publish at 9 AM might not publish until 11 AM — when the first visitor finally triggers the cron check.

### High-Traffic Sites Run It Too Often
On a popular site with thousands of visitors per minute, `wp-cron.php` runs on every single request. This creates unnecessary server load and can trigger the same cron job multiple times in race conditions.

### HTTP Request Overhead
Each WP-Cron check spawns an internal HTTP request back to the server — `wp-cron.php?doing_wp_cron`. On Apache/Nginx servers, this counts as an additional connection, adding latency and resource usage to every page load.

## The Solution: Disable WP-Cron and Use Real Linux Cron

### Step 1: Disable WP-Cron in wp-config.php

```php
// Add this line to wp-config.php BEFORE the "That's all, stop editing!" line
define('DISABLE_WP_CRON', true);
```

This prevents WordPress from triggering the cron file on every page load.

### Step 2: Add a Real Linux Cron Job

SSH into your server and edit the crontab:

```bash
crontab -e
```

Add the following line to run WordPress cron every 5 minutes:

```bash
*/5 * * * * curl -s https://yoursite.com/wp-cron.php?doing_wp_cron > /dev/null 2>&1
```

Or use the `wp-cli` method (recommended if wp-cli is installed):

```bash
*/5 * * * * cd /var/www/html && wp cron event run --due-now --quiet
```

The `wp-cli` method is more reliable because it doesn't depend on the HTTP stack and runs with the same PHP environment as WordPress.

### Step 3: Verify It's Working

```bash
# Check that wp-cron.php responds correctly
curl -I https://yoursite.com/wp-cron.php?doing_wp_cron

# List scheduled WordPress events
wp cron event list
```

Build and verify your cron schedule expression with [/tools/cron-generator/](/tools/cron-generator/).

## When to Keep WP-Cron

**Keep WP-Cron enabled if:**
- You're on shared hosting with no SSH access
- Your site receives consistent traffic throughout the day
- You use a managed WordPress host (Kinsta, WP Engine) — they typically replace WP-Cron for you

**Replace with real cron if:**
- You have SSH access to your server
- Your site has irregular traffic patterns
- You run background jobs (emails, payments, reports) that are time-sensitive
- You're experiencing "scheduled posts not publishing on time" issues

## How Long to Run WordPress Scheduled Tasks

| Task | Recommended Frequency |
|---|---|
| General WP-Cron trigger | Every 5 minutes |
| Email queue dispatch | Every 1-2 minutes |
| Database optimization | Weekly (Sunday 3 AM) |
| Full backup | Daily (2 AM) |
| Sitemap generation | Every 4 hours |
