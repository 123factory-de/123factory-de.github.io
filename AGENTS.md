# Agent Instructions

This file provides specific context and operational rules for AI assistants working in this repository.

## Core Directives
- **Source of Truth**: Always refer to the following documents for workflow rules:
    - [docs/branching-strategy.md](docs/branching-strategy.md)
    - [docs/commit-convention.md](docs/commit-convention.md)
    - [docs/pr-convention.md](docs/pr-convention.md)
- **Branching**: Follow GitHub Flow. Use `feat/`, `fix/`, `docs/`, etc. Never commit to `main`.
- **Commits**: Use Conventional Commits as defined in [docs/commit-convention.md](docs/commit-convention.md).
- **Pull Requests**: Follow the template and standards defined in [docs/pr-convention.md](docs/pr-convention.md).
- **Language**: All communication, documentation, and code comments must be in **English**.

## Worklog — mandatory for every PR
- Every PR must include exactly one branch-specific worklog file named
  `docs/worklog/YYYY-MM-DD-<branch-slug>.md` (this count excludes
  [docs/worklog/_template.md](docs/worklog/_template.md)).
- Create the worklog on the same branch as the change and commit it **before opening the PR**.
- **The worklog file is the source of truth for the PR**: PR title = the worklog `title`
  field; PR description = the worklog body (from `## Request` down). Generate the PR from the
  file, never the other way around. If scope changes during review, update the worklog first,
  then sync the PR description.
- Record: the original request (e.g. a chat instruction, summarized), what changed and why,
  and how it was verified.
- No personal data in worklog files — refer to request sources by channel/system and date,
  not by name.
- Never modify another branch's worklog file.

## Project Mission
- **Project**: `123factory-blog`
- **Objective**: Build and maintain the 123factory-de blog.

## Operational Preferences
- Be concise and technical.
- Proactively suggest best practices for Agentic systems.
