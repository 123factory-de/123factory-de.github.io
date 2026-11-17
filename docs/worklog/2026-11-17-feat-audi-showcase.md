---
title: feat(showcase): add dedicated Audi open innovation deep-tech showcase page
date: 2026-11-17
branch: feat/audi-showcase
request-source: chat, 2026-11-17
---

## Request

Create a dedicated, confidential-grade corporate innovation showcase page for an upcoming Audi event:
1. **Hero Entry Point**:
   - Link the word "startups." in the main landing hero headline (`Empowering bold startups.`) directly to the showcase page (`/audi`), enabling presenters at the event booth to naturally transition from the 123 Factory homepage into the dedicated presentation.
2. **Context & Framing**:
   - Frame the page elegantly as a curated corporate innovation pipeline bridging 123 Factory's Berlin & Seoul ecosystem with European automotive transformation, rather than a generic or blatant marketing pitch.
3. **Structured Categorization**:
   - Curate and present portfolio companies in three strategic automotive transformation pillars:
     1) **Mobility & SDV**: Sensors, SDV hypervisor virtualization, contactless in-cabin UI, automotive cybersecurity, and automated ECU testing.
     2) **Energy & Battery Circularity**: Direct lithium-ion battery recycling, second-life EV battery diagnosis & ESS, and switchable solar smart glass.
     3) **Edge & Industrial AI**: On-device AI model compression for ADAS/DMS, physical AI digital twin factory simulation, and neuro-symbolic decision engines.
4. **Interactive Deep Dive & IR Deck Experience**:
   - Provide an in-depth modal for each company featuring automotive/Audi strategic fit, core technology architecture, proposed pilot/PoC scope, and OEM validation references.
   - Include an interactive IR Pitch Deck modal with multi-slide presentation previews and Google Drive URL integration (with placeholder support for later configuration).

## Changes

- `src/views/AudiShowcaseView.jsx`:
  - Created a comprehensive showcase view featuring 18 curated deep-tech companies (7 Mobility, 6 Energy, 5 AI).
  - Built an interactive control bar with category filter tabs and real-time keyword search.
  - Added enriched metadata (`CURATED_DETAILS`) specifying Audi strategic fit, OEM/Tier-1 validation benchmarks, and tailored PoC scopes for every startup.
  - Implemented `IR_DECK_LINKS` configuration map for seamless Google Drive URL linking.
  - Built a 4-tab Company Deep-Dive modal (Overview & Audi Fit, Technology & Architecture, Proposed PoC, Traction & References).
  - Built an interactive 4-slide IR Deck Viewer modal with slide controls, confidential header, and Google Drive connect/copy actions.
- `src/components/GiantStatementBanner.jsx`:
  - Enhanced the word "startups." in `KineticOption` to render as a React Router `<Link to="/audi">` with subtle hover lift and amber glow, allowing seamless navigation from the main hero.
- `src/App.jsx`:
  - Imported `AudiShowcaseView` and registered routes `/audi`, `/showcase`, and `/audi-showcase`.

## Verification

- Ran `npm run build` with Vite 5.4.21; build passed with exit code 0.
- Verified on local dev server (`http://localhost:5175/`) using browser automation:
  - Confirmed `/audi` loads with executive hero, metrics bar, and filter tabs.
  - Confirmed category filtering and search input function smoothly.
  - Confirmed Deep-Dive modal renders company details, tabs, and action buttons.
  - Confirmed IR Deck modal opens, navigates through presentation slides, and supports Google Drive link copying.
- Scanned changes for secrets and personal data; no credentials or sensitive PII included.
