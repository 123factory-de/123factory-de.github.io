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
  - Replaced the previous gradient flight line with a clean, elegant dotted arc (`stroke: #D8DFE8; stroke-dasharray: 2 6; stroke-linecap: round;`) directly matching the exact neutral color of Germany and Korea, removing the clunky backing track and animating with a peaceful, calm 14s stream.
- **Floating Office Cards with Photos & Addresses**:
  - Added two floating architectural glass cards anchored directly above Berlin and Seoul on the map:
    - **Berlin HQ**: High-resolution exterior photography (`/offices/berlin.jpg`), badge tag `Berlin HQ ↗`, and street address (`Bismarckstraße 10-12, 10625 Berlin, Germany`).
    - **Seoul Office**: Updated high-resolution exterior building photography (`/offices/seoul.jpg`), badge tag `Seoul Office ↗`, and street address (`Saimdang-ro 8-gil 13, Seocho-gu, Seoul, Korea`).
  - Linked each card directly to Google Maps.
  - Implemented bidirectional hover states: hovering over a card highlights the country territory below, and hovering over a country highlights its respective office card.
- **Direct Map View in Footer Office Cards**:
  - Removed photos and photo/map toggle buttons from the Footer office modal for both Berlin and Seoul.
  - Clicking on Berlin (HQ) or Seoul Office in the footer now directly opens the interactive dark-mode Google Maps view with the office address and an "Open Maps ↗" button.
  - Unified modal dimensions and media aspect ratio (`aspect-ratio: 16 / 10`) for consistent map viewing.
- **Ecosystem Metric Photo Cards (The Numbers Behind Our Ecosystem)**:
  - Replaced the previous timeline layout with 4 sleek rectangular cards featuring dark black-and-white background photography corresponding to each ecosystem metric:
    - **100+ Workshops & Executive Seminars**: `/corporates/corporate-hero.jpg` (Executive corporate workshop)
    - **200+ Matchmaking & Industry Showcases**: `/corporates/scouting-demoday.jpg` (Startup demo day & industry showcase hall)
    - **300+ Go-to-Market & Market Access**: `/startups/startups-scaleups.jpg` (Tech founders collaborating on scaleup market access; spelled out as Go-to-Market for 2-line visual balance across all cards)
    - **400+ Strategic Insights & Market Intelligence**: `/about/about-hero-keynote.jpg` (Keynote presentation with market intelligence screen)
  - Applied dark B&W photo filtering (`grayscale(100%) contrast(115%) brightness(0.36)`) with subtle gradient vignettes for optimal readability.
  - Rendered big bold white counters (`100+`, `200+`, `300+`, `400+`) and white descriptive typography directly over the photo cards with subtle lift and zoom effects on hover.
- **Expanding Horizontal Accordion Metric Cards with Full-Color Hover & Methodology Copy**:
  - Implemented an interactive horizontal accordion layout on desktop: hovering over any of the 4 cards expands its width dynamically (`flex: 2.75`), while the other 3 cards compress smoothly (`flex: 0.75; opacity: 0.65;`).
  - **Grayscale to Full-Color Transition**: The background photography smoothly transitions from moody dark black-and-white (`grayscale(100%)`) to vibrant full color (`grayscale(0%) contrast(108%) brightness(0.68) saturate(1.15)`) exclusively on the hovered card.
  - **Methodology Detail Reveal**: Unveils tailored descriptive copy on hover explaining how 123 Factory conducts each respective pillar:
    - **100+ Workshops & Executive Seminars**: Tailored bilateral masterclasses, C-level executive roundtables, and cross-border innovation sprints aligning German industrial leaders with Korean deep-tech pioneers.
    - **200+ Matchmaking & Industry Showcases**: Curated demo days, closed-door corporate pitching sessions, and 1-on-1 bilateral buyer matchmaking connecting pre-vetted scaleups directly with European enterprise buyers.
    - **300+ Go-to-Market & Market Access**: Full-lifecycle market entry: local entity formation, European and Asian regulatory roadmaps, commercial pilot deployment, and localized enterprise sales distribution.
    - **400+ Strategic Insights & Market Intelligence**: Actionable deep-tech scouting dossiers, proprietary cross-border intelligence briefs, and strategic venture landscape assessments for corporate decision-makers.
  - **Brand Accent Illuminations**: Each card features a distinct brand accent color (`#FF5A36`, `#00D2B4`, `#FFAB00`, `#4D7CFE`) for tag highlights, border transitions, and subtle atmospheric glows on hover.
  - **Ultra-Wide Breakout Layout (`.about-container-wide`)**: Expanded the section container from `1360px` to `1840px` (`padding: 0 clamp(20px, 3.5vw, 56px)`), dramatically reducing left/right margins and allowing the accordion cards to stretch wide (~390px in idle, ~850px when expanded).
  - **Enhanced Card Heights & Proportions**: Scaled card height to `clamp(480px, 34vw, 540px)` and expanded description text width to `max-width: 640px` for high-end editorial proportions.
  - **Generous Bottom Breathing Space**: Increased margin before the workshop photo from `clamp(56px, 7vw, 96px)` to `clamp(140px, 16vw, 240px)`, eliminating visual congestion between the cards and the photo beneath.
  - **Responsive Fallback**: Automatically shifts to a 2-column (tablet) or 1-column (mobile) grid where explanatory text remains naturally formatted.

## Verification

- Built application via `npm run build` with zero warnings or errors.
- Verified real-time updates and responsive layout on dev server at `http://localhost:5175/about#impact`.
- Verified "The Numbers Behind Our Ecosystem" spans wide across the viewport (`max-width: 1840px`) with expansive accordion cards and generous bottom breathing room before the workshop photo.
- Verified map spans wide across the viewport with seamless borderless landmasses, zero hairline seams between countries, natural gradient dissolution on all four edges, bright neutral platinum highlighting, clean `#D8DFE8` dotted arc line connecting Berlin and Seoul, and floating photo cards for Berlin and Seoul with the updated Seoul office exterior image.
- Verified clicking Footer office items (Berlin and Seoul) directly opens Google Maps without photo tabs or photo previews.
- Verified closing CTA section renders cleanly in dark mode without any eyebrow text.



