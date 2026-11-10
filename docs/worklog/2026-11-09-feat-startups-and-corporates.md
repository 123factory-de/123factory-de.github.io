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
3. **Cross-Page Design Alignment**:
   - Synchronized page top starting position, container width (`1400px`), padding (`0 clamp(24px, 4.5vw, 64px)`), and hero title styling with Feed (`FeedView.jsx`) and Portfolio (`CompaniesView.jsx`).
   - Expanded vertical spacing and completely standardized spacing tokens (section padding, lede margins, cards grids, dividers, feature splits, and closing CTAs) identically across both Startups and Corporates.
4. **Bottom Closing CTA Harmonization (About Us, Startups, Corporates)**:
   - Removed category eyebrows (`Get Started // Global Scale`, `Get Started // Corporate Innovation`).
   - Unified headline typography across all three pages: `clamp(36px, 5vw, 76px)`, line-height 1.05, letter-spacing -0.04em, weight 700, and `word-break: keep-all;`.
   - Balanced each headline into a clean 2-line layout on desktop/tablet with responsive `.cta-line-break` (`display: none` under 768px):
     - Startups: `Ready to scale<br />across borders?`
     - Corporates: `Let’s build your<br />venture capability.`
     - About Us: shortened from 3 lines / orphan word down to `Let’s turn your vision<br />into real momentum.`, matching the 2-line rhythm while keeping distinct messaging.
   - Aligned About Us closing CTA container margins (`clamp(140px, 18vh, 240px)`) and top border separator with Startups and Corporates.

## Changes

- Merged `feat/startup-menu-update` and `feat/corporate-menu-update` into `feat/startups-and-corporates`.
- `src/views/StudioView.jsx` & `src/views/VenturesView.jsx`:
  - Updated page padding-top to `clamp(100px, 8vw, 120px)` and overview section padding-top to `clamp(48px, 6vw, 88px)` to match Feed and Portfolio exact top start.
  - Set container max-width to `1400px` and padding to `0 clamp(24px, 4.5vw, 64px)`.
  - Harmonized hero titles (`.startups-display-h1`, `.corp-display-h1`) with `max-width: 960px` and identical typography.
  - Expanded and unified section gaps to `clamp(130px, 16vh, 220px)`, lede grid margins to `clamp(64px, 8vh, 108px)`, feature split spacing to `clamp(64px, 8vh, 108px)`, deliverables grid margins to `clamp(88px, 11vh, 148px)`, and closing CTA margins to `clamp(140px, 18vh, 240px)`.
  - Removed small eyebrow tags from closing CTA sections.
  - Standardized `.startups-cta-title` and `.corp-cta-title` font, line breaks, and responsive handling.
- `src/views/TeamView.jsx`:
  - Aligned `.about-cta-wrap` margins and border to match Startups and Corporates.
  - Standardized `.about-cta-title` typography and adjusted headline text to 2 lines (`Let’s turn your vision<br className="cta-line-break" />into real momentum.`).
- `public/startups/startups-mobani.jpg`: added cropped event photo.

## Verification

- Tested merge cleanly with zero conflicts.
- Ran `npm run build` locally with Vite 5.4.21; build succeeded with exit code 0.
- Verified `/startups`, `/corporates`, and `/about` in dev server (port 5175).
- Scanned with gitleaks rules to ensure no secrets or personal data were introduced.
