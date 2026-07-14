---
title: "feat: migrate two Brunch interviews"
date: 2026-07-14
branch: feat/migrate-brunch-interviews
request-source: "Slack, 2026-07-14"
---

## Request

Migrate the Brunch articles at `https://brunch.co.kr/@123factory/33` and `https://brunch.co.kr/@123factory/34` into Hugo post bundles using the repository's Brunch-to-Hugo migration guide.

## Changes

- Added Korean, English, and German post bundles for the DLR researcher Seunghui Ko and Ford Aachen researcher Seonhi Ro interviews.
- Localized each article's cover and two in-body images, preserving body image order and captions.
- Preserved the original Korean metadata, publication timestamps, and canonical Brunch URLs. Canonical URLs are intentionally present only in the Korean originals.

## Verification

- Parsed the front matter in all six Markdown files.
- Confirmed every referenced local image exists and canonical URLs are limited to the Korean variants.
- Ran `hugo --destination /tmp/blog-migration-public --cleanDestinationDir` successfully.
