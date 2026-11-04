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
- **Dual-Hub Presence Section (Interactive Grayish World Map)**:
  - Added dedicated global hubs section (`#offices`) under the partners grid featuring a cohesive, interactive world map component (`WorldOfficeMap.jsx`).
  - Styled continental landmasses in a sleek, muted tech grayish tone (`#1A1C23`) with high-precision ISO country vectors, graticule reference grid lines, and subtle highlights for Germany and Korea.
  - Rendered a dynamic bilateral geodesic corridor arc bridging Berlin and Seoul with animated data packet pulses.
  - Pinned exact locations for both hubs with pulsing radar beacon animations:
    - **Berlin HQ**: Bismarckstraße 10-12, 10625 Berlin (Gold accent `#FFAB00`).
    - **Seoul Office**: Saimdang-ro 8-gil 13, Seocho-gu, Seoul (Emerald accent `#3CC79B`).
  - Added floating address badges directly on/above each pin showing hub title, full address, and coordinates.
  - Implemented interactive hover effects (scale-up, elevation, glow) and on-click actions:
    - Clicking a pin or badge triggers a browser Google Maps popup window and opens an in-page Google Maps modal popup featuring full address copy, tags, and direct map navigation.
  - Connected the new section to the sticky subnav bar for seamless navigation.

## Verification

- Built application via `npm run build` with zero warnings or errors.
- Verified real-time clock updates and responsive layout on dev server at `http://localhost:5175/about#offices`.
