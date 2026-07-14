---
title: "docs: convert migration guide to proper skill"
date: 2026-07-14
branch: docs/improve-brunch-to-hugo-migration
request-source: chat, 2026-07-14
---

## Request

The `docs/skills/brunch-to-hugo-migration.md` file did not follow the skill
convention: it was a plain Markdown file rather than a `SKILL.md` inside a
skill directory. Fix it to conform to the convention.

## Changes

- Moved `docs/skills/brunch-to-hugo-migration.md` to
  `docs/skills/brunch-to-hugo-migration/SKILL.md` via `git mv` so the skill
  lives in a directory named after the skill with a `SKILL.md` entry point
  (history preserved).
- Added YAML frontmatter with `name` and `description` fields. The
  `description` states both what the skill does and when to trigger it
  (migrating/porting/importing a Brunch article into a Hugo post bundle,
  localizing images, verifying styling parity).
- Dropped the redundant `SKILL:` prefix from the H1, now that the frontmatter
  identifies it as a skill.
- Content of the guide itself is unchanged.

## Verification

- Confirmed no other files reference the old path
  (`grep -rl "brunch-to-hugo-migration"` returns no stale links).
- `git status` shows the change recorded as a rename, confirming history is
  preserved.
