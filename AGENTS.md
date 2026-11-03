# AGENTS.md

Operating instructions for AI coding agents (Hermes, Claude Code, and any other AGENTS.md-compatible agent) working in this repository. This is the canonical, tool-agnostic source of truth.

**Read this file fully before making any change.**

---

## 🚦 Guardrails — non-negotiable

These rules are hard limits. If a task appears to require breaking one, **stop and ask a human** instead of proceeding.

1. **Never commit to `main`.** Always work on a branch and open a Pull Request. Merging to `main` deploys to production.
2. **Never commit secrets or personal data.** No API keys, tokens, credentials, Korean resident registration numbers (주민등록번호), personal phone numbers, or private email addresses. Commits are scanned by gitleaks in CI (`.github/workflows/pr-checks.yml`). Do not disable, bypass, or edit these scans.
3. **Never modify protected paths.** The following may only be changed by a trusted human maintainer via a reviewed PR — an agent must not touch them:
   - `.github/` (CI workflows)
   - `.gitleaks.toml` (secret/PII scan rules)
   - `AGENTS.md` (agent instructions — you may not rewrite your own guardrails)

   CI enforces this (`protected-paths` job); a PR from a non-maintainer that touches these paths will fail.
4. **Never edit generated or vendored files.** Do not hand-edit `dist/` or `node_modules/`.
5. **Keep changes atomic and in scope.** One task per branch/PR. If you discover unrelated work, note it — do not bundle it in.
6. **When uncertain about a destructive or irreversible action, ask.** Deleting content, force operations, history rewrites, and dependency changes warrant a human check.

---

## Project

- **Name**: `123-factory`
- **Owner**: 123 Factory
- **Objective**: Build and maintain the 123 Factory company website.
- **Live site**: https://123factory-de.github.io/
- **Stack**: Single-page app built with [React](https://react.dev/) 18, [React Router](https://reactrouter.com/) 6, and [Vite](https://vitejs.dev/) 5, hosted on GitHub Pages.

## Repository layout

| Path | Purpose |
| :--- | :--- |
| `src/views/` | Page-level components, one per route (routes are defined in `src/App.jsx`) |
| `src/components/` | Shared UI components and page sections |
| `src/data/` | Site data (`feedData.js`, `portfolioData.json`) |
| `src/index.css` | Global styles and font declarations |
| `public/` | Static assets (images, logos, fonts) served from the site root |
| `vite.config.js` | Vite configuration, including the `404.html` fallback for client-side routes |
| `docs/` | Workflow docs, references, agent skills, and PR worklogs |
| `.github/`, `.gitleaks.toml` | CI workflows and scan rules (protected — see above) |
| `dist/` | Generated output — do not edit or commit |

## Setup & common commands

Requires Node.js 20 (the version used in CI).

```bash
npm ci            # install dependencies
npm run dev       # local dev server at http://localhost:5175
npm run build     # production build into ./dist
npm run preview   # serve the production build at http://localhost:4173
```

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`) on push to `main`. Do not commit the generated `dist/` directory.

## Git workflow — source of truth

Follow these documents exactly. They are authoritative:

- [docs/git-workflow/branching-strategy.md](docs/git-workflow/branching-strategy.md)
- [docs/git-workflow/commit-convention.md](docs/git-workflow/commit-convention.md)
- [docs/git-workflow/pr-convention.md](docs/git-workflow/pr-convention.md)

Key rules:

- **GitHub Flow.** Branch from `main` using prefixes: `feat/`, `fix/`, `docs/`, `refactor/`, `test/`, `chore/`.
- **Merge to `main` with `--no-ff`** (create a merge commit; never fast-forward, squash, or rebase-merge) to preserve branch history.
- **Conventional Commits.** Format `<type>[scope]: <description>`; imperative mood; subject ≤ 50 chars; no trailing period.
- **Pull Requests** follow the template and process in the PR convention doc; keep PRs atomic. All PR checks (secret scan, protected paths) must pass before merge.
- Delete feature branches after merge.

### Agent workflow for all tasks

When a user asks an agent to make any change in this repository — content, documentation, configuration, code, or anything else — the agent must:

1. **Branch automatically.** Before touching any file, create a branch from the latest `main` following the naming convention (e.g. `feat/add-portfolio-company`, `fix/navbar-link`). Do not ask for permission to branch, and never work directly on `main`.
2. **Do the work and commit** on that branch following the commit convention. Validate the change (e.g. `npm run build`) before reporting completion, and write the branch's worklog file (see "Worklog — mandatory for every PR" below).
3. **Ask before opening a PR, in plain language.** When the work is done, summarize what changed and ask the user whether to create a GitHub Pull Request. Do not push the branch or open a PR without the user's explicit confirmation.

   Phrase the question so a non-developer can understand it, in the user's language. Do not use bare jargon (branch, PR, merge, push); when a term is unavoidable, add a short everyday-language explanation next to it. The question must make three things clear:
   - The finished change is saved in a separate working copy (a "branch") and is **not yet visible on the live site**.
   - A Pull Request is a GitHub page that shows exactly what changed so the user can review and approve it before it goes live.
   - Approving and merging the Pull Request publishes the change to the live site (https://123factory-de.github.io/).

   Example (translate naturally into the user's language): "The work is done, but it is saved in a separate workspace and is not on the live website yet. To publish it, I can open a Pull Request — a GitHub page where you can see exactly what changed and approve it. Once you approve and merge it, the change goes live. Shall I open the Pull Request?"

## Worklog — mandatory for every PR

- Every PR must include exactly one branch-specific worklog file named `docs/worklog/YYYY-MM-DD-<branch-slug>.md` (this count excludes [docs/worklog/_template.md](docs/worklog/_template.md)).
- Create the worklog on the same branch as the change and commit it **before opening the PR**.
- **The worklog file is the source of truth for the PR**: PR title = the worklog `title` field; PR description = the worklog body (from `## Request` down). Generate the PR from the file, never the other way around. If scope changes during review, update the worklog first, then sync the PR description.
- Record: the original request (summarized in the requester's intent), what changed and why, and how it was verified.
- The secret/personal-data rules apply to worklog files too — no personal names, handles, emails, or other personal data; refer to request sources by channel/system and date, not by name.
- Never modify another branch's worklog file.

## Content authoring

- Page copy lives in `src/views/` and `src/components/`; feed articles and portfolio companies live in `src/data/`.
- Do not publish personal data. Only use approved public contact addresses (see the allowlist in `.gitleaks.toml`); adding a new one requires a human-reviewed change to that protected file.
- Reusable content tasks and skills can be documented in `docs/skills/` as the project evolves.

## Conventions

- **Language**: All documentation, code comments, commit messages, and PR text in **English**.
- **Style**: Be concise and technical.
- Proactively suggest best practices, but keep changes focused and atomic.
