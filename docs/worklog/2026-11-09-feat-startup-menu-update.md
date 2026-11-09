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

## Verification

- Ran `npm run build` locally; production build succeeded without issues.
- Checked styles and verified clean layout with no console or syntax errors.

