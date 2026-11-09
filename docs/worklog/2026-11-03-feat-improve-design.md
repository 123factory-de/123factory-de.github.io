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
- **Dual-Hub Presence Section (Minimalist Zoomed Corridor Map)**:
  - Added dedicated global hubs section (`#offices`) under the partners grid featuring a zoomed Eurasia corridor map (`WorldOfficeMap.jsx`).
  - Cropped the viewport to focus directly on the corridor between Germany (Europe) and South Korea (Asia), removing non-relevant continents.
  - Removed all enclosing rectangular borders, background container boxes, and bottom duplicate cards for an unconstrained, ultra-minimal aesthetic.
  - Styled landmasses in subtle matte slate-gray with clean highlights on Germany and Korea, connected by a dashed bilateral geodesic flight arc.
  - Streamlined office pins to essential information only:
    - **Berlin HQ**: `Bismarckstraße 10-12` (Gold dot `#FFAB00`).
    - **Seoul Office**: `Saimdang-ro 8-gil 13` (Emerald dot `#3CC79B`).
  - Direct native link: clicking either location directly opens the Google Maps address in a new tab without complex modals or popups.
  - Connected the new section to the sticky subnav bar for seamless navigation.

## Verification

- Built application via `npm run build` with zero warnings or errors.
- Verified real-time clock updates and responsive layout on dev server at `http://localhost:5175/about#offices`.
