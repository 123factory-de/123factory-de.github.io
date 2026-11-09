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
  - Completely removed all internal country borders and anti-aliasing seams (`stroke: #191B22; stroke-width: 0.8px; stroke-linejoin: round;`), seamlessly fusing landmasses into unified, borderless continent silhouettes.
  - Added natural, soft gradient dissolution on all four edges (top, bottom, left, right) using SVG linear/radial vignette gradient overlays and CSS `mask-image`, eliminating hard rectangular cut lines.
  - Added interactive hover highlights for Berlin and Seoul: hovering over either city scales the marker/pin up slightly and produces a radiant glow (golden-orange for Berlin, emerald-green for Seoul).
  - Streamlined the connecting corridor line between Berlin and Seoul to a thinner stroke (`0.8px`) with a calm, peaceful 8-second flowing dash animation (`animation: corridorFlow 8s linear infinite`).
  - Maintained direct Google Maps links on the clean pin cards for Berlin HQ and Seoul Office.
  - Connected the section to the sticky subnav bar for seamless navigation.

## Verification

- Built application via `npm run build` with zero warnings or errors.
- Verified real-time updates and responsive layout on dev server at `http://localhost:5175/about#offices`.
- Verified map spans wide across the viewport with seamless borderless landmasses, natural gradient dissolution on all four edges, calm flowing flight arc, and city hover glows.


