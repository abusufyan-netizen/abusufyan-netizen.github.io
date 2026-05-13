---
title: "Cron Syntax Explained: The Complete Field-by-Field Reference"
description: "A comprehensive reference for every cron expression field, operator, and special character. Covers Linux crontab, AWS EventBridge, and GitHub Actions with real examples."
date: "2026-05-13"
category: "Developer Tools"
tags: ["Cron", "Reference", "DevOps", "Linux"]
keywords: ["cron syntax explained", "cron expression fields", "crontab reference 2026", "cron special characters", "cron operators guide"]
readTime: "14 min read"
tldr: "A standard cron expression has 5 fields: minute, hour, day-of-month, month, and day-of-week. Each supports *, /, -, and , operators. AWS EventBridge adds a 6th seconds field and non-standard L and W operators."
author: "WebToolkit Pro Engineering Team"
image: "/blog/cron-syntax.jpg"
imageAlt: "Diagram showing cron expression field breakdown"
---

## The Anatomy of a Cron Expression

A standard (Linux crontab) cron expression has exactly 5 fields, separated by spaces:

```
┌───────────── minute (0–59)
│ ┌───────────── hour (0–23)
│ │ ┌───────────── day of month (1–31)
│ │ │ ┌───────────── month (1–12 or JAN–DEC)
│ │ │ │ ┌───────────── day of week (0–7 or SUN–SAT, 0 and 7 are both Sunday)
│ │ │ │ │
* * * * *
```

Build any expression visually with our [Cron Expression Generator](/tools/cron-generator/).

## Field 1: Minute (0–59)

| Expression | Meaning |
|---|---|
| `0` | At the top of the hour (minute 0) |
| `30` | At 30 minutes past the hour |
| `*/5` | Every 5 minutes |
| `0,30` | At 0 and 30 minutes |
| `15-45` | From minute 15 to 45 inclusive |

## Field 2: Hour (0–23)

| Expression | Meaning |
|---|---|
| `0` | At midnight (12 AM) |
| `9` | At 9 AM |
| `*/6` | Every 6 hours (0, 6, 12, 18) |
| `9-17` | Every hour from 9 AM to 5 PM |
| `0,12` | At midnight and noon |

## Field 3: Day of Month (1–31)

| Expression | Meaning |
|---|---|
| `1` | First day of every month |
| `15` | 15th of every month |
| `*/5` | Every 5 days (1, 6, 11, 16, 21, 26, 31) |
| `L` | Last day of month (**AWS EventBridge only**) |
| `15W` | Nearest weekday to the 15th (**AWS only**) |

## Field 4: Month (1–12)

| Expression | Meaning |
|---|---|
| `*` | Every month |
| `1` | January only |
| `1,7` | January and July |
| `3-5` | March, April, May |
| `JAN-JUN` | January through June (name aliases) |

Month name aliases (3-letter uppercase): `JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC`

## Field 5: Day of Week (0–7)

| Expression | Meaning |
|---|---|
| `0` or `7` | Sunday (both work in Linux crontab) |
| `1` | Monday |
| `1-5` | Monday through Friday (weekdays) |
| `MON-FRI` | Monday through Friday (name aliases) |
| `L` | Last occurrence of a weekday in month (**AWS only**) |

Day name aliases: `SUN, MON, TUE, WED, THU, FRI, SAT`

## The 4 Core Operators

### `*` — Any Value (Wildcard)
Matches every possible value for that field. In the minute field, it means "every minute." In the hour field, "every hour."

### `/` — Step Values
`*/5` means "every 5 steps." `2/5` means "starting at 2, then every 5 steps" (2, 7, 12, 17...).

### `-` — Range
`1-5` means "values 1 through 5 inclusive."

### `,` — List
`1,15,30` means "at values 1, 15, and 30."

## Common Expression Reference

```bash
# Every minute
* * * * *

# Every hour at minute 0
0 * * * *

# Every day at 2:00 AM
0 2 * * *

# Every weekday (Mon-Fri) at 9:00 AM
0 9 * * 1-5

# Every 15 minutes during business hours (9 AM–5 PM weekdays)
*/15 9-17 * * 1-5

# First day of every month at midnight
0 0 1 * *

# Every Sunday at 3:30 AM (database backup)
30 3 * * 0

# Every quarter (Jan, Apr, Jul, Oct) on the 1st at 6 AM
0 6 1 1,4,7,10 *

# Every 5 minutes, Monday through Friday
*/5 * * * 1-5
```

## Special Shortcuts (Linux crontab only)

| Shortcut | Equivalent | Description |
|---|---|---|
| `@reboot` | — | Runs once at startup |
| `@yearly` | `0 0 1 1 *` | Once a year |
| `@monthly` | `0 0 1 * *` | Once a month |
| `@weekly` | `0 0 * * 0` | Once a week |
| `@daily` | `0 0 * * *` | Once a day at midnight |
| `@hourly` | `0 * * * *` | Once an hour |

Generate and verify any expression at [/tools/cron-generator/](/tools/cron-generator/).
