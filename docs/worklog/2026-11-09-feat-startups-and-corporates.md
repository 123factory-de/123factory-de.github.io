---
title: feat(site): combine and polish startup and corporate venturing pages
date: 2026-11-09
branch: feat/startups-and-corporates
request-source: chat, 2026-11-09
---

## Request

Combine the refined Startups and Corporate Venturing page updates into a unified feature branch (`feat/startups-and-corporates`):
1. **Startups Page (`StudioView.jsx`)**:
   - Removed sticky top subnavigation bar.
   - Removed image hover scale effects, captions, and horizontal dividers.
   - Converted 6 track cards into interactive amber hover cards (`#FFAB00`).
   - Replaced numeric track headers (`01`, `02`, `03`) with glowing amber dot indicators (🟠).
   - Replaced photo in Bilateral R&D with compact dark glassmorphism Funding DB preview widget.
   - Simplified Mobani sales platform section, updated copy to "European Sales Infrastructure", and replaced photo with watermark-cropped AsiaBerlin event photography.
2. **Corporate Page (`VenturesView.jsx`)**:
   - Removed sticky top subnavigation bar.
   - Removed image hover scale effects and static photo captions.
   - Replaced 3-pillar focus cards with interactive emerald hover cards (`#3CC79B`) and stripped tags/links.
   - Replaced numeric section headers with glowing emerald dot indicators (🟢 1 dot, 2 dots, 3 dots).
   - Expanded headline and section spacing, and aligned methodology lists vertically with adjacent photos.
   - Increased breathing room between methodology lists and deliverables cards.

## Changes

- Merged `feat/startup-menu-update` and `feat/corporate-menu-update` into `feat/startups-and-corporates`.
- `src/views/StudioView.jsx`: applied startups styling, dot indicators, Funding DB preview widget, and Mobani layout polish.
- `src/views/VenturesView.jsx`: applied corporate styling, dot indicators, hover cards, and spacing polish.
- `public/startups/startups-mobani.jpg`: added cropped event photo.

## Verification

- Tested merge cleanly with zero conflicts.
- Ran `npm run build` locally with Vite 5.4.21; build succeeded with exit code 0.
- Verified both `/startups` and `/corporates` return HTTP 200 on local dev server (port 5175).
- Scanned with gitleaks rules to ensure no secrets or personal data were introduced.
