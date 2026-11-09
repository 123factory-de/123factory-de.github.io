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
  - Removed "Dual-Hub Infrastructure" eyebrow label above the section heading per minimalist design request.
  - Expanded map wrapper into a wide breakout container with minimal side margins (`clamp(16px, 2.5vw, 36px)`), allowing the map to stretch broadly across the screen.
  - Removed internal country and continent border strokes (`stroke: none`), presenting landmasses as seamless silhouettes.
  - Removed hover effects on countries (`pointer-events: none`) so mouse movement is completely neutral across the map.
  - Replaced the rapid moving dash animation on the Berlin-Seoul flight line with a calm, gentle breathing opacity glow.
  - Removed pulsating radar ring animations from Berlin and Seoul beacons, replacing them with clean static pin rings and dots.
  - Retained direct Google Maps links on the clean pin cards for Berlin HQ and Seoul Office.
  - Connected the section to the sticky subnav bar for seamless navigation.

## Verification

- Built application via `npm run build` with zero warnings or errors.
- Verified real-time updates and responsive layout on dev server at `http://localhost:5175/about#offices`.
- Verified map spans wide across the viewport with clean borderless silhouettes, calm flight arc, and static beacon markers.

