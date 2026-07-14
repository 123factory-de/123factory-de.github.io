---
title: "feat: add MBition engineer interview"
---

## Request

Migrate the Brunch article "[인터뷰] '개방, 참여, 공유'가 내 일의 핵심" into a new Hugo post bundle, following the Brunch-to-Hugo migration guide. Include Korean, English, and German versions with localized images.

## Changes

- Added the `interview-mbition-baechanghyuk` post bundle with Korean, English, and German Markdown files.
- Preserved the Korean original's canonical Brunch URL and added localized cover and body images.
- Updated the migration guide to require Korean, English, and German post variants and synchronized image structure.

## Verification

- Ran `git diff --check` successfully.
- Parsed front matter and verified the local cover and two body-image references in all language variants.
- Hugo was not installed in the execution environment, so a Hugo build could not be run.
