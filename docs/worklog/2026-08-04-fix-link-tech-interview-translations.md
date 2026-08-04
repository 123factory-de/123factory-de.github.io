---
title: "fix: link tech interview translations"
date: 2026-08-04
branch: fix/link-tech-interview-translations
request-source: "Slack, 2026-08-04"
---

## Request

Change the link to part one in the multilingual part-two interview post so it opens the corresponding local blog translation rather than the original Brunch article.

## Changes

- Replaced the Brunch link in the Korean, English, and German part-two posts with a relative link to the local part-one Hugo post bundle.
- Used the same relative route in every language variant so the browser retains the active language prefix.

## Verification

- Confirmed the three Markdown links use the local relative part-one route.
- Resolved each link against its Korean, English, or German part-two URL and verified that it targets the matching local part-one URL.
- Ran `git diff --check` successfully.
- Attempted `hugo --minify`; the project theme fails with the installed Hugo version while rendering JSON-LD (`wrong type for value; expected bool; got *hugolib.pageState`).
