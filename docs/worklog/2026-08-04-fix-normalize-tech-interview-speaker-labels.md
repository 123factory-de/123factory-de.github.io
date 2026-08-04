---
title: "fix: normalize tech interview speaker labels"
date: 2026-08-04
branch: fix/normalize-tech-interview-speaker-labels
request-source: "Slack, 2026-08-04"
---

## Request

Correct the abbreviated interviewee labels in the Korean part-two interview and normalize every translated speaker label across both interview posts.

## Changes

- Changed An Seri's Korean label from `안` to `세`.
- Added Clementin Jin-hee's missing Korean label, `클`.
- Standardized every English and German short speaker label across both posts to exactly `Hyo:`, `Se:`, or `Cl:`.
- Restored the missing `Se:` label before the thesis passage in the English and German part-two posts.
- Corrected Se's spouse reference from wife to husband in the English and German part-two posts.
- Replaced erroneous machine-translated labels such as `Club:`, `Cle:`, `cl:`, and `ese:`.

## Verification

- Confirmed every detected English and German short speaker label in both posts is exactly `Hyo`, `Se`, or `Cl`.
- Confirmed the English text uses `My husband and I` and the German text uses `Mein Mann und ich`.
- Confirmed no empty bold speaker label (`<b>:</b>`) remains in either translated post.
- Confirmed English and German speaker labels contain no `An:` abbreviation.
- Ran `git diff --check` successfully.
- Attempted `hugo --minify`; the project theme fails with the installed Hugo version while rendering JSON-LD (`wrong type for value; expected bool; got *hugolib.pageState`).
