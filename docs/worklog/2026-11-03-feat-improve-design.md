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
- **Seamless Landmass Fusion (Zero Faint Country Seams)**:
  - Eliminated faint hairline borders and polygon seams between countries by applying an SVG morphological dilation filter (`feMorphology operator="dilate" radius="0.8"`) to physically expand polygon edges, coupled with `stroke-width: 2.2px; stroke: #191B22; paint-order: stroke fill; stroke-linejoin: round;`.
  - All landmasses now appear as a single, completely smooth and unified continent silhouette without any internal outlines or seam artifacts.
- **Sophisticated Monochromatic Neutral Palette**:
  - Replaced yellow and green fills with a luminous, refined bright neutral platinum tone (`#D8DFE8`) for both Germany (Berlin) and South Korea (Seoul).
  - Hovering scales up the country geometry smoothly and illuminates it with a pure white glow (`drop-shadow(0 0 12px rgba(255, 255, 255, 0.95))`).
  - Switched the flowing flight arc animation to a bright neutral gradient (`#FFFFFF` to `#D8DFE8`) with subtle pulsing radiance.
- **Floating Office Cards with Photos & Addresses**:
  - Added two floating architectural glass cards anchored directly above Berlin and Seoul on the map:
    - **Berlin HQ**: High-resolution exterior photography (`/offices/berlin.jpg`), badge tag `Berlin HQ ↗`, and street address (`Bismarckstraße 10-12, 10625 Berlin, Germany`).
    - **Seoul Office**: Updated high-resolution exterior building photography (`/offices/seoul.jpg`), badge tag `Seoul Office ↗`, and street address (`Saimdang-ro 8-gil 13, Seocho-gu, Seoul, Korea`).
  - Linked each card directly to Google Maps.
  - Implemented bidirectional hover states: hovering over a card highlights the country territory below, and hovering over a country highlights its respective office card.

## Verification

- Built application via `npm run build` with zero warnings or errors.
- Verified real-time updates and responsive layout on dev server at `http://localhost:5175/about#offices`.
- Verified map spans wide across the viewport with seamless borderless landmasses, zero hairline seams between countries, natural gradient dissolution on all four edges, bright neutral platinum highlighting, and floating photo cards for Berlin and Seoul with the updated Seoul office exterior image.



