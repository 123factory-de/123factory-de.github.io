---
title: Remove top sticky subnavigation from Startup page
date: 2026-11-09
branch: feat/startup-menu-update
request-source: "Chat, 2026-11-09"
---

## Request

User asked to delete the top navigation section that splits the startups page into Overview, Early‑Stage, etc., i.e., remove the sticky sub‑navigation bar at the top of the startups page.

## Changes

- Deleted the entire sticky navigation block (`<nav className=\"startups-subnav-sticky\">…</nav>`) from `src/views/StudioView.jsx` (lines 652‑668).
- Updated the JSX accordingly; no other files were touched.

## Verification

- Ran `npm run build` locally; the build completed successfully with no errors.
- Verified that the site builds and the navigation bar no longer appears on the startups page.
