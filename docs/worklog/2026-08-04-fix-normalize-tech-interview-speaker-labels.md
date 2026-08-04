---
title: "fix: normalize tech interview speaker labels"
date: 2026-08-04
branch: fix/normalize-tech-interview-speaker-labels
request-source: "Slack, 2026-08-04"
---

## Request

Correct the abbreviated interviewee labels in the Korean part-two interview and keep the English and German translations consistent with those labels.

## Changes

- Changed An Seri's Korean label from `안` to `세`.
- Added Clementin Jin-hee's missing Korean label, `클`.
- Updated the English and German introductory labels to `Se` and `Cle`, matching subsequent speaker labels.

## Verification

- Confirmed Korean, English, and German introductions use the expected Hyo, Se, and Cle abbreviations.
- Confirmed English and German speaker labels contain no `An:` abbreviation.
- Ran `git diff --check` successfully.
- Attempted `hugo --minify`; the project theme fails with the installed Hugo version while rendering JSON-LD (`wrong type for value; expected bool; got *hugolib.pageState`).
