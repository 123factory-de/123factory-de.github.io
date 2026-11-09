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
  - Replaced floating pin cards and beacon dots with direct territory highlighting of Germany and South Korea:
    - **Germany (Berlin Hub)**: Filled in radiant amber/orange (`#FFAB00`), scaling up smoothly and glowing vividly on hover.
    - **South Korea (Seoul Hub)**: Filled in radiant emerald/green (`#3CC79B`), scaling up smoothly and glowing vividly on hover.
  - Directly connected Germany and South Korea across the seamless continent via the thin, peaceful flowing flight arc (`0.8px`, `animation: corridorFlow 8s linear infinite`).
  - Maintained direct Google Maps links on click for both hub countries.
  - Connected the section to the sticky subnav bar for seamless navigation.

## Verification

- Built application via `npm run build` with zero warnings or errors.
- Verified real-time updates and responsive layout on dev server at `http://localhost:5175/about#offices`.
- Verified map spans wide across the viewport with seamless borderless landmasses, natural gradient dissolution on all four edges, clean territory highlighting for Germany (orange) and South Korea (green), and smooth hover scale and glow effects.



