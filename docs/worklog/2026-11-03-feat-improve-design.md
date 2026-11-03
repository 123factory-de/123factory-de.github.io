---
title: feat: make About partners grid full-width 6 cols
date: 2026-11-03
branch: feat/improve-design
request-source: chat, 2026-11-03
---

## Request

Update the "Built Alongside Industry Leaders" partners section on the About Us page (`/about`) so that the partner logos are displayed edge-to-edge without left/right margins, arranged in a square grid with 6 companies per row, referencing the design and layout of the portfolio menu (`/portfolio`).

## Changes

- **Full-Width Edge-to-Edge Grid**: Moved `.about-partners-grid` outside `.about-container` so the continuous border grid spans the full viewport width without horizontal constraints, matching the portfolio page's grid behavior.
- **6-Column Square Layout**:
  - Maintained 6 columns (`repeat(6, 1fr)`) with square cells (`aspect-ratio: 1 / 1`), displaying 18 partners across 3 full rows.
  - Added clean responsive breakpoints (`repeat(3, 1fr)` at `<= 1280px`, `repeat(2, 1fr)` at `<= 768px`).
- **Portfolio-Inspired Details & Minimalist Styling**:
  - Removed corner country badges, hover country labels (`KR` / `DE`), and hover arrow (`↗`) for a pure, distraction-free visual presentation.
- **Dual-Hub Presence Section (Berlin HQ & Seoul Office)**:
  - Added dedicated global hubs section (`#offices`) under the partners grid.
  - Implemented custom architectural blueprint SVGs (`BerlinBlueprintSvg` & `SeoulBlueprintSvg`) featuring fine vector drafting elevations, dimension markers, and coordinate grids instead of standard photos.
  - Added live ticking digital clocks with status pulse indicators for Berlin (CET, UTC+1) and Seoul (KST, UTC+9).
  - Included precise geo-coordinates, core cross-border function tags, and direct Google Maps navigation links.
  - Connected the new section to the sticky subnav bar for smooth navigation.

## Verification

- Built application via `npm run build` with zero warnings or errors.
- Verified real-time clock updates and responsive layout on dev server at `http://localhost:5175/about#offices`.
