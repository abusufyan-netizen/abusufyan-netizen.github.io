---
title: "How Diff Algorithms Work: Myers Algorithm Explained Simply"
description: "A clear explanation of the Myers diff algorithm — the algorithm behind git diff, GitHub code review, and every major diff checker tool."
date: "2026-05-13"
category: "Developer Tools"
tags: ["Algorithms", "Git", "Diff", "Computer Science"]
keywords: ["myers diff algorithm", "how git diff works", "diff algorithm explained", "LCS algorithm", "git diff algorithm"]
readTime: "12 min read"
tldr: "Git diff uses the Myers algorithm — an optimized path-finding algorithm that finds the smallest set of changes (edit script) between two sequences. It's been the default since 1986 and remains the best balance of speed and output quality."
author: "WebToolkit Pro Engineering Team"
image: "/blog/diff-algorithms.jpg"
imageAlt: "Visual diagram showing the Myers diff algorithm edit graph"
---

## Why Diff Algorithms Matter

Every time you run `git diff`, open a pull request on GitHub, or use a code review tool, an algorithm is calculating the minimum number of additions and deletions to transform one text into another. The quality of that algorithm determines how readable the output is.

A bad diff algorithm produces output that's technically correct but cognitively useless — showing that a function was "deleted" and "added" when it was really just indented. A good algorithm produces the diff a human would write.

## The Core Problem: Edit Distance

Given two sequences A and B, find the shortest sequence of operations (insert/delete) to transform A into B.

This is known as the **edit distance** problem. The naive solution — trying every possible sequence of edits — has exponential complexity. Real-world text files have thousands of lines. We need something smarter.

## Step 1: The Longest Common Subsequence (LCS)

The key insight: **if we find the longest sequence of lines that appear in both A and B (in order), everything else is either an insertion or deletion.**

For example:
```
A: [apple, banana, cherry, date]
B: [apple, blueberry, cherry, elderberry]
```

The LCS is `[apple, cherry]`. Everything not in the LCS is changed:
- `banana` → deleted
- `blueberry` → inserted
- `date` → deleted
- `elderberry` → inserted

**Computing LCS** uses dynamic programming with an O(mn) table where m and n are the lengths of the two sequences.

## Step 2: The Myers Algorithm

LCS-based diffing has one problem: it's O(mn) in time and space — too slow for large files. In 1986, Eugene Myers published a significantly faster algorithm in *"An O(ND) Difference Algorithm and Its Applications"*.

The Myers algorithm reframes the problem as a **shortest path through a graph**:
- Rows = lines in file A
- Columns = lines in file B
- Moving **right** = inserting a line from B
- Moving **down** = deleting a line from A
- Moving **diagonally** = keeping a matching line

The algorithm finds the path from the top-left to the bottom-right that has the fewest non-diagonal moves (edits). This is provably the minimum edit script.

**Time complexity:** O(ND) where N is the total length and D is the edit distance. For typical code changes where D is small, this is dramatically faster than O(mn).

## Why Git Uses Myers

`git diff` has used the Myers algorithm as its default since its inception. Git also offers two alternatives:

```bash
git diff --diff-algorithm=patience  # Better for refactored code
git diff --diff-algorithm=histogram # Myers variant, often cleaner
git diff --diff-algorithm=minimal   # Smallest possible diff
```

**Patience diff** was developed at Bazaar and is famous for producing more human-readable diffs when code is refactored. It prioritizes unique lines as anchors, producing better results when functions are moved or classes are reorganized.

## The Real-World Impact on Code Review

Here's an example where algorithm choice matters:

**Original:**
```python
def process(data):
    result = []
    for item in data:
        result.append(item * 2)
    return result
```

**Refactored:**
```python
def process(data):
    return [item * 2 for item in data]
```

The Myers algorithm might show this as 4 deletions and 1 insertion. The Patience algorithm might correctly identify that only the body changed, producing a cleaner diff.

## Our Implementation

The [Diff Checker](/tools/diff-checker/) on WebToolkit Pro uses an LCS-based algorithm implemented in pure JavaScript, running entirely in your browser. For most text and code comparison tasks, it produces clean, accurate line-by-line diffs comparable to `git diff`.
