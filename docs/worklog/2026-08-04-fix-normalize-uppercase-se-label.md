---
title: "fix: normalize uppercase Se speaker labels"
date: 2026-08-04
branch: fix/normalize-uppercase-se-label
request-source: "Slack, 2026-08-04"
---

## Request

Correct the uppercase `SE` speaker label in the English and German part-two interview posts to the established `Se:` form.

## Changes

- Replaced the malformed `<b>SE</b>:` label in the English and German “In my case” passages with `<b>Se:</b>`.

## Verification

- Confirmed neither translated interview post contains an uppercase `SE` speaker label.
- Confirmed both “In my case” passages start with `<b>Se:</b>`.
- Ran `git diff --check` successfully.
