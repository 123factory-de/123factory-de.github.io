---
title: feat(corporate): add green hover boxes, dot indicators, and spacing polish
date: 2026-11-09
branch: feat/corporate-menu-update
request-source: chat, 2026-11-09
---

## Request

Apply subtle polish and styling consistency to the Corporate Venturing page (`src/views/VenturesView.jsx`) mirroring the recent refinements made to the Startups page without drastically changing the overall layout:
- Remove image mouse hover zoom effects.
- Clean up the 3-pillar focus overview cards by removing small category numbers/labels (`01 // FOCUS`) and arrow links (`Explore Scouting ↓`), replacing them with interactive cards showing an emerald/green (`#3CC79B`) border, subtle background, and soft shadow on mouse hover.
- Replace numeric section indicators (`01`, `02`, `03`) with glowing emerald dot indicators (1 dot for Scouting, 2 dots for Governance, 3 dots for Investment).
- Refine layout spacing: remove photo captions, remove the faint divider line below the overview cards, increase headline bottom margins, align 3-item methodology lists vertically with the adjacent photos, and increase breathing room between the methodology lists and deliverables cards.

## Changes

- `src/views/VenturesView.jsx`:
  - Added `.corp-dots-wrap` and `.corp-dot` CSS rules using the corporate emerald color `#3CC79B` with soft glow box shadow (`rgba(60, 199, 155, 0.55)`).
  - Updated `.corp-eyebrow` to `display: inline-flex; align-items: center; gap: 10px;`.
  - Removed hover scale transform on `.corp-photo-frame:hover img`.
  - Updated `.corp-display-h2` margin-bottom to `clamp(44px, 5.5vh, 72px)`.
  - Converted `.corp-pillars-grid` cards into hoverable cards with `border: 1.5px solid transparent`, smooth transition, and emerald border/shadow on `:hover` (`#3CC79B`, `rgba(60, 199, 155, 0.03)` background, `0 10px 30px rgba(60, 199, 155, 0.08)` shadow).
  - Stripped `.corp-pillar-num` and `.corp-pillar-link` from overview cards.
  - Removed faint divider line directly below the overview grid.
  - In Sections 1, 2, and 3, replaced the prefixed section headers (`01 // Corporate Ventures · Startup Scouting`, etc.) with dot-based eyebrow indicators (1 dot, 2 dots, 3 dots).
  - Applied `.corp-feature-split.has-feature-list` and `.corp-feature-list-wrap` to Sections 1 and 2, setting `align-items: stretch` and `justify-content: space-between` to make the 3 methodology items align vertically flush with the top and bottom of the adjacent photo.
  - Increased `.corp-deliverables-grid` margin-top from `clamp(48px, 6vh, 80px)` to `clamp(76px, 10vh, 136px)` to provide generous spacing between the core methodologies and the deliverables cards.
  - Removed static photo captions below full-width hero and Section 3 photography.

## Verification

- Ran `npm run build` locally with Vite 5.4.21; build succeeded with exit code 0.
- Verified responsive CSS behavior across mobile and desktop breakpoints.
- Checked git diff to ensure no secrets, personal data, or protected files (`.github/`, `.gitleaks.toml`, `AGENTS.md`) were touched.
