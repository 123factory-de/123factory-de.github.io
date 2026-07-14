---
title: "chore: consolidate agent config and add worklog convention"
date: 2026-07-14
branch: chore/update-agent-settings
request-source: "IDE chat, 2026-07-14"
---

## Request

Consolidate the repository's AI-agent configuration into a single canonical
file, and adopt the mandatory per-PR worklog convention already used in the
`open-innovation-directory` repo so that agents record their work here too.

## Changes

- **`AGENTS.md` (new/updated)**: Established as the canonical, tool-agnostic
  source of truth for agent operating rules (core directives, git workflow
  references, project mission, conventions). Added a **"Worklog — mandatory
  for every PR"** section porting the convention from the
  `open-innovation-directory` repo, adapted to this repo (no gitleaks/githooks
  references, which this repo does not have).
- **`CLAUDE.md` (updated)**: Reduced to a single `@AGENTS.md` import so Claude
  Code defers to the shared rules file instead of duplicating content.
- **`.agent/rules/general.md` (updated)**: Trimmed to a pointer that references
  `AGENTS.md` as the source of truth.
- **`docs/worklog/_template.md` (new)**: Added the worklog template that every
  PR copies to `docs/worklog/YYYY-MM-DD-<branch-slug>.md`.
- **`docs/worklog/2026-07-14-update-agent-settings.md` (new)**: This worklog —
  the first application of the new convention.

## Verification

- Confirmed the reference chain resolves: `CLAUDE.md` → `@AGENTS.md`;
  `.agent/rules/general.md` → `AGENTS.md`.
- Verified no personal data or secrets in the added files.
- Worklog template and this branch worklog follow the naming/format defined in
  `AGENTS.md`.
