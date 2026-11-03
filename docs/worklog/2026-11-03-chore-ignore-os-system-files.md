---
title: chore: add macOS and Windows system files to gitignore
date: 2026-11-03
branch: chore/ignore-os-system-files
request-source: chat, 2026-11-03
---

## Request

Add automatically generated macOS and Windows system and metadata files to `.gitignore` so they are excluded from source control across local development environments.

## Changes

Updated `.gitignore` to include OS-generated metadata files:
- **macOS system files**:
  - Finder metadata and flags: `.DS_Store`, `._*`, `.AppleDouble`, `.LSOverride`, `Icon`
  - Volumes and filesystem services: `.DocumentRevisions-V100`, `.fseventsd`, `.Spotlight-V100`, `.TemporaryItems`, `.Trashes`, `.VolumeIcon.icns`, `.com.apple.timemachine.donotpresent`
  - Network share directories: `.AppleDB`, `.AppleDesktop`, `Network Trash Folder`, `Temporary Items`, `.apdisk`
- **Windows system files**:
  - Thumbnail cache databases: `Thumbs.db`, `Thumbs.db:encryptable`, `ehthumbs.db`, `ehthumbs_vista.db`
  - Folder configuration and crash dumps: `[Dd]esktop.ini`, `*.stackdump`
  - Recycle bin directory: `$RECYCLE.BIN/`

## Verification

- Inspected repository with `find . -name ".DS_Store" -o -name "._*" -o -name "Thumbs.db"` to confirm clean working tree.
- Verified `npm run build` succeeds cleanly.
- Checked `git status` to verify `.gitignore` modifications and ignore rules behavior.
