---
title: Update Startup page layout and hero section styling
date: 2026-11-09
branch: feat/startup-menu-update
request-source: "Chat, 2026-11-09"
---

## Request

1. Remove the top sticky subnavigation that split the startups page into Overview, Early‑Stage, etc.
2. Remove hover zoom effect on the hero photography.
3. Remove the photo caption text ("123 Factory Berlin & Seoul · Bridging innovative Asian & European ventures with global markets.").
4. Remove the thin divider line above the 01/02 track cards grid.
5. Increase spacing/margin between the photo and the track cards grid.
6. Remove small track/platform subheadings (`01 // TRACK`, `04 // PLATFORM`, etc.) and the "Explore Program ↓" links from the 6 program cards.
8. Remove the faint horizontal divider line under the overview grid.
9. Replace section numbers `01`, `02`, `03` with 1, 2, and 3 glowing orange dots (`#FFAB00`), and remove the "Startup Programs · " prefix from each eyebrow.
10. Increase margin below the display headline (`We back early-stage founders...`) before the two-column lede paragraph.
12. In Section 3 (Funding & Investment), remove the photo caption ("Investor syndication, roadshows, and capital allocation across European and Asian venture networks.").
13. In Sections 4 and 5, remove the "04 // Proprietary Platform · " and "05 // Open Innovation Hub · " prefixes, leaving clean labels (`Bilateral R&D Intelligence`, `Corporate Venture & Pilots`).
14. In Section 4, replace the generic photo next to fundingdb with a compact preview widget of Funding DB adapted from the Home page's "On Your Radar" section.
15. In Section 6 (Mobani), change the eyebrow from "European Market Entry" to "European Sales Infrastructure", and replace the cluttered nested-box card layout with a clean, open layout matching the rest of the site (clean link header, borderless photo frame, and 3-column deliverables grid).

## Changes

- In `src/views/StudioView.jsx`:
  - Removed `<nav className="startups-subnav-sticky">` block.
  - Removed `.startups-photo-frame:hover img` zoom scale and transition.
  - Removed `<span className="startups-photo-caption">` text element under the hero image.
  - Removed `border-top` divider and top padding on `.startups-programs-grid`.
  - Increased `margin-top` on `.startups-programs-grid` to `clamp(60px, 8vh, 100px)` for cleaner, airy spacing.
  - Removed `<span className="startups-program-num">` and `<span className="startups-program-link">` from all 6 overview cards.
  - Styled `.startups-program-card` with an invisible border (`border: 1.5px solid transparent`), smooth transition, and an orange border (`border-color: #FFAB00`), subtle tint, and lift on hover.
  - Removed the faint divider line between the overview cards grid and Section 1.
  - Added `.startups-dots-wrap` and `.startups-dot` CSS, styling glowing orange indicator dots.
  - Updated Section 1, 2, and 3 eyebrows to display 1, 2, and 3 orange dots respectively, with cleanly formatted titles (`Early-Stage Support`, `Accelerators & Scale-ups`, `Funding & Investment`).
  - Increased `.startups-display-h2` bottom margin to `clamp(44px, 5.5vh, 72px)` for clean separation above the lede paragraph.
  - Set `.startups-feature-split.has-feature-list` to `align-items: stretch` with `justify-content: space-between` on `.startups-feature-list`, perfectly aligning the top of the first item and bottom of the last item with the adjacent photo frame.
  - Removed the photo caption in Section 3 (`Funding & Investment`).
  - Simplified eyebrows in Section 4 (`Bilateral R&D Intelligence`) and Section 5 (`Corporate Venture & Pilots`).
  - Replaced the Section 4 photo with a styled `.fundingdb-mini-box` containing live window dots, title badge, live pulse indicator, and active grant cards linking directly to `fundingdb.123factory.de`.
  - Changed Section 6 eyebrow to `European Sales Infrastructure` and restructured Mobani layout into an open, unnested design with a top platform link header, clean photo frame, and 3-column deliverables grid.

## Verification

- Ran `npm run build` locally; production build succeeded without issues.
- Checked styles and verified clean layout with no console or syntax errors.

