---
title: "20 Cron Expression Examples for Common Developer Tasks"
description: "Real-world cron expressions for database backups, queue workers, cache clearing, report generation, and more. Copy-paste ready patterns for Linux, AWS, and GitHub Actions."
date: "2026-05-13"
category: "Developer Tools"
tags: ["Cron", "Backend", "DevOps", "Tutorial"]
keywords: ["cron expression examples", "cron job examples", "database backup cron", "laravel queue cron", "github actions schedule"]
readTime: "11 min read"
tldr: "20 production-ready cron expressions covering backups, queue workers, cache management, reports, cleanups, and monitoring — each explained with the reasoning behind the timing choice."
author: "WebToolkit Pro Engineering Team"
image: "/blog/cron-examples.jpg"
imageAlt: "Terminal showing multiple cron jobs running in a production server"
---

## Database Backups

### 1. Daily Database Backup at 2 AM
```
0 2 * * *
```
The classic. 2 AM is the global sweet spot — after the US night and before European morning. Low traffic, low risk. Run at 3 AM if you need the extra buffer after 2 AM maintenance windows.

### 2. Hourly Incremental Backup During Business Hours
```
0 9-17 * * 1-5
```
For databases with high write volumes, hourly incrementals during working hours (9 AM to 5 PM, weekdays) complement a full 2 AM backup.

### 3. Weekly Full Backup on Sunday
```
0 1 * * 0
```
Run the full backup on Sunday at 1 AM — the lowest traffic day in most applications.

## Queue Workers (Laravel, Horizon, Sidekiq)

### 4. Laravel Queue Worker — Every Minute
```
* * * * * cd /var/www/html && php artisan queue:work --max-time=55
```
`--max-time=55` ensures the worker exits before the next cron tick to prevent overlapping processes.

### 5. Clear Failed Queue Jobs — Weekly
```
0 3 * * 0
```
Run `php artisan queue:flush` weekly to clean failed job logs that accumulate over time.

### 6. Dispatch a Scheduled Job Every 5 Minutes
```
*/5 * * * *
```
Standard poll interval for background processing. More frequent than this and you should consider a persistent worker instead of cron.

## Cache Management

### 7. Clear Application Cache — Nightly
```
0 0 * * *
```
Midnight cache clear ensures fresh content for the next day while minimizing user impact.

### 8. Warm Cache Before Business Hours
```
0 7 * * 1-5
```
Trigger cache warming at 7 AM weekdays — 2 hours before business hours so users never hit a cold cache.

### 9. Clear Temp Files Every Sunday
```
0 4 * * 0
```
Weekly temp file cleanup at 4 AM Sunday. Common targets: `/tmp`, session files, log rotations.

## Reporting and Analytics

### 10. Daily Report Email at 8 AM
```
0 8 * * *
```
Reports land in inboxes at the start of the business day. Adjust hour for your team's timezone.

### 11. Monthly Executive Report — First Day of Month
```
0 6 1 * *
```
First of the month at 6 AM gives the report time to generate before the team arrives.

### 12. Weekly Analytics Digest — Every Monday Morning
```
0 7 * * 1
```
Monday morning digest of the previous week's data. Pairs well with Slack notifications.

## Content and SEO

### 13. Sitemap Regeneration — Every 4 Hours
```
0 */4 * * *
```
For high-volume blogs or e-commerce stores where content changes frequently.

### 14. WordPress Post Scheduling Check (WP-Cron replacement)
```
*/5 * * * * curl -s https://yoursite.com/wp-cron.php?doing_wp_cron > /dev/null 2>&1
```
Replace unreliable WP-Cron with a real cron trigger. Disable `DISABLE_WP_CRON` in `wp-config.php` first.

## Monitoring and Health Checks

### 15. Uptime Ping — Every 5 Minutes
```
*/5 * * * * curl -s https://api.uptimerobot.com/v2/getMonitors -d 'api_key=YOUR_KEY' > /dev/null
```
Send a keep-alive ping to your monitoring service.

### 16. Log Rotation — Daily at Midnight
```
0 0 * * * /usr/sbin/logrotate /etc/logrotate.conf
```
Standard log rotation to prevent disk fill.

## GitHub Actions Scheduled Workflows

### 17. Nightly Build and Test
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM UTC every night
```

### 18. Weekly Dependency Audit
```yaml
on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM UTC
```

### 19. Stale Issue Cleanup — Daily
```yaml
on:
  schedule:
    - cron: '0 1 * * *'
```

### 20. Release Candidate Build — Every Friday Afternoon
```yaml
on:
  schedule:
    - cron: '0 15 * * 5'  # 3 PM UTC every Friday
```

---

Build and validate any of these expressions visually at [/tools/cron-generator/](/tools/cron-generator/).
