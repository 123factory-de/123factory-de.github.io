---
title: "fix: correct Brunch publication dates"
date: 2026-07-14
branch: fix/brunch-publication-dates
request-source: "Slack, 2026-07-14"
---

## Request

Correct the publication dates for the two migrated Brunch interview posts. The original Brunch pages show September 24, 2022, while the migrated posts were set to September 23, 2022.

## Changes

- Updated the date front matter from September 23 to September 24, 2022 in the Korean, English, and German variants of both migrated posts.
- Retained the original publication times and `+09:00` offset.

## Verification

- Parsed the front matter in all six affected files and confirmed the expected September 24 timestamps.
- Ran the Hugo build successfully.
