<!--
Worklog template.

Copy this file to docs/worklog/YYYY-MM-DD-<branch-slug>.md and fill it in
BEFORE opening the PR, committed on the same branch as the change itself.
This branch-specific file count excludes `docs/worklog/_template.md`.

The worklog file is the source of truth for the pull request:
  - PR title       = the `title` field below
  - PR description = everything from "## Request" down
If the scope changes during review, update this file first, then sync the
PR description to match.

Do not include personal data or secrets — refer to request sources by
channel/system and date, not by name.
-->

---
title: <concise summary of the change — becomes the PR title>
date: YYYY-MM-DD
branch: <feat|fix|docs|chore>/<slug>
request-source: <request source and date, e.g. "Slack, 2026-07-14" or "repo-maintenance, 2026-07-14" — no personal names/handles>
---

## Request

<What was asked for, in the requester's intent — not a paraphrase of the
diff. For chat-driven tasks, summarize the original instruction so the
context survives outside the chat.>

## Changes

<What was changed and why. Include decisions made, alternatives considered
and rejected, and anything a reviewer would otherwise have to reconstruct.>

## Verification

<How the change was verified: hugo build passed, affected pages checked
locally, etc. Be specific — "it works" is not a verification.>
