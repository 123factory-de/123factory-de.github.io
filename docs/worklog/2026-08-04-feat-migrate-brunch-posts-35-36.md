---
title: "feat: migrate Brunch tech scene interviews"
date: 2026-08-04
branch: feat/migrate-brunch-posts-35-36
request-source: "Slack, 2026-08-04"
---

## Request

Migrate Brunch articles 35 and 36 into Hugo post bundles using the repository's Brunch-to-Hugo migration guide.

## Changes

- Added the two-part "Working in Berlin's Tech Scene" interview as Hugo post bundles.
- Added synchronized Korean, English, and German Markdown variants for each post.
- Localized every article image and cover image in its corresponding post bundle.
- Preserved the original Brunch publication timestamps and set the canonical Brunch URL on each Korean original only.

## Verification

- Compared publication metadata, article text, image sequence, and captions with the live Brunch source pages.
- Ran `hugo --minify` successfully.
- Checked that all six post variants contain valid front matter and that no remote image URL remains in the new bundles.
