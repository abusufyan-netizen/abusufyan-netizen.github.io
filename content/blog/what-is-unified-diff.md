---
title: "What is a Unified Diff? (And Why it Matters for Code Reviews)"
description: "Everything you need to know about the Unified Diff format. Learn how to read those plus and minus signs, what 'hunks' are, and why this format is the industry standard."
date: "2026-05-13"
category: "Developer Tools"
tags: ["Diff", "Git", "Code Review", "Tutorial"]
keywords: ["unified diff format explained", "how to read a diff", "diff hunk header", "git diff output format", "unified diff vs context diff"]
readTime: "9 min read"
tldr: "The Unified Diff format is the industry standard for showing changes between text files. It uses '+' for additions, '-' for deletions, and '@@' headers to indicate context. Understanding this format is essential for effective code reviews."
author: "WebToolkit Pro Engineering Team"
image: "/blog/unified-diff-format.jpg"
imageAlt: "Example of a unified diff output with highlighting"
---

## The Language of Change

If you've ever used `git diff` or opened a Pull Request, you've seen a Unified Diff. It's the compact, text-based format used to represent changes between two versions of a file. While it looks like a wall of code at first, it's designed to be extremely efficient for human reviewers and automated tools alike.

## The Anatomy of a Unified Diff

A typical unified diff looks like this:

```diff
--- original.js
+++ modified.js
@@ -1,5 +1,5 @@
 function hello() {
-  console.log("Goodbye World");
+  console.log("Hello World");
   return true;
 }
```

### 1. The File Headers
- `--- original.js`: Indicates the "from" or source file.
- `+++ modified.js`: Indicates the "to" or destination file.

### 2. The Hunk Header (`@@`)
The lines starting with `@@` are the most technical part. They define a "hunk" — a specific block of changes.
- `-1,5`: In the original file, this hunk starts at line 1 and spans 5 lines.
- `+1,5`: In the modified file, this hunk starts at line 1 and spans 5 lines.

### 3. Change Indicators
- ` ` (space): A line that didn't change (context).
- `-`: A line that was removed from the original.
- `+`: A line that was added to the original.

## Why "Unified"?

Before the unified format was standardized in the early 90s, the "Context Diff" was common. Context diffs showed the "before" and "after" versions in two separate blocks. The **Unified** format "unifies" them into a single interleaved list, which is much easier to read and significantly more compact.

## Key Concepts to Master

### Context Lines
By default, diff tools show 3 lines of unchanged code above and below the change. This "context" is vital for the reviewer to understand *where* the change is happening without reading the entire file.

### Why It Matters for Git
Git stores "commits" as snapshots, but it calculates "diffs" on the fly. When you "apply a patch," Git reads the unified diff and uses the context lines to find exactly where to insert the changes, even if the line numbers have shifted slightly due to other edits.

## Common Diff Symbols

| Symbol | Meaning |
|---|---|
| `---` | Original file indicator |
| `+++` | New file indicator |
| `@@` | Hunk start/meta info |
| `-` | Removed line |
| `+` | Added line |
| ` ` | Unchanged context line |
| `\ No newline at end of file` | The file ends without a trailing newline character |

## Reading Complex Diffs

When a file has multiple changes far apart, the diff will contain multiple `@@` hunks.
```diff
@@ -10,4 +10,6 @@
 ... context ...
-old line
+new line
@@ -50,3 +52,3 @@
 ... context ...
```

This prevents you from having to scroll through 40 lines of unchanged code between edits.

---

Want to see your code in unified diff format? Paste two versions into our [Diff Checker](/tools/diff-checker/) to get a color-coded visual representation and a downloadable diff file.
