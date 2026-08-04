---
title: "fix: remove Korean labels from tech interviews"
date: 2026-08-04
branch: fix/remove-korean-labels-from-tech-interviews
request-source: "Slack, 2026-08-04"
---

## Request

Remove Korean proper-name labels that remain in the English and German versions of the two newly migrated Berlin tech scene interview posts.

## Changes

- Replaced Korean company labels with their Latin-script brand names: Finleap, ImmoScout24, Zalando, and Nota AI.
- Replaced the Korean outlet name in the English and German attributions with Wanted.
- Applied the same corrections to the repeated interviewee introductions in both post bundles and both translated language variants.

## Verification

- Confirmed that neither English nor German post contains Hangul characters.
- Ran `hugo --minify` successfully.
