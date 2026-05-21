# SKILL: Brunch to Hugo Migration Guide

This guide outlines the standardized process for migrating blog posts from Brunch (brunch.co.kr) to a Hugo-based website, ensuring 1:1 content parity, visual fidelity, and multilingual synchronization.

## 1. Preparation & Metadata

- **Original URL**: Always reference the source Brunch URL in the `canonicalUrl` frontmatter.
- **Date**: Use the original publication date found on Brunch (e.g., `2022-03-22T10:00:00+09:00`).
- **Multilingual Support**: Create both `index.ko.md` and `index.en.md` within a post bundle directory.

## 2. Asset Management (Localize Images)

- **Cover Image**: Save the main header image as `cover.jpg` (or `.webp`). Ensure it is set in the `image` frontmatter.
- **Body Images**: 
    - Download all images from the Brunch source.
    - Name them sequentially: `image1.webp`, `image2.webp`, etc.
    - **CRITICAL**: Do not repeat the cover image at the beginning of the body if the theme already displays the cover image as a hero.
- **Captions**: Place captions immediately below the image using Markdown italics (`*Caption text*`).

## 3. Content Styling Standards

To ensure consistency across different Markdown parsers and themes, follow these HTML/Markdown hybrid rules:

- **Emphasis (Bold)**: Always use `<b>text</b>` instead of `**text**`. This ensures 1:1 visual parity with Brunch and prevents Markdown parsing issues when text contains special characters (like parentheses or symbols).
- **Underline**: Use `<u>text</u>` for passages that are underlined in the original Brunch article.
- **Sub-headers**: 
    - Use standard Markdown headers (`##`) for all sections you want to appear in the **Table of Contents (TOC)**.
    - **Lead Highlights**: Convert the main lead quote or summary (often found as a blockquote `>` at the top in Brunch) to a `##` (h2) header.
    - For Brunch section titles (usually starting with `#`), remove the `#` prefix and use `## Title` (e.g., `## 제목`).
    - Using `##` (h2) is recommended as the primary section header since the post title is typically `h1`.
    - The `#` is redundant when using standard Markdown header tags and looks cleaner in the Table of Contents.
- **Description Field**: Set this exactly to the Brunch subtitle/description. Do not append body text, lead highlights, or subsequent headers (e.g., do not combine the subtitle with the first `##` header text).
- **Cover Photo Credit**: If the Brunch post has a cover photo credit (e.g., *커버사진 출처 = ...*), add it as an italicized line immediately following the first header (h2) of the body content.
  - Korean: `*커버 사진 출처 = ...*`
  - English: `*Cover photo source = ...*`
- **Paragraphs**: Maintain the exact paragraph breaks as the original.
- **Lists**: Use standard Markdown lists, but check if they were intended as plain paragraphs with symbols in Brunch.

## 4. Visual Parity Checklist (1:1 Matching)

Before finalizing, verify the following against the live Brunch page:

1.  **Image Placement**: Does each image appear after the exact same paragraph as the original?
2.  **Text Continuity**: Are there any missing paragraphs? (Check for technical mentions like "Rocket Internet" or "Microsoft").
3.  **Style Parity**:
    - Are the correct sentences bolded?
    - Are the correct sentences underlined?
    - Are there unnecessary bold tags that weren't in the original?
4.  **Captions**: Are captions associated with the correct images?
5.  **Language Sync**: Does the English version reflect the same layout and image sequence as the Korean version?

## 5. Workflow Example

1.  `curl` the Brunch URL.
2.  Extract text and image URLs.
3.  Download images to the post directory.
4.  Draft `index.ko.md` following the styling rules.
5.  Translate/Adapt to `index.en.md`, keeping image paths (`image1.webp`, etc.) identical.
6.  Review in local Hugo dev server (`localhost:1313`).
7.  Commit only after full verification.

## 6. Commit Strategy

To maintain a clean repository history:
- **Group by Post**: Commit each post migration separately (e.g., `feat: add post-title`).
- **Group by Action**: If refining existing posts, group those changes together (e.g., `refactor: refine styling for existing posts`).
- **Wait for Confirmation**: Do not commit minor incremental changes (like single bold tag fixes) unless the entire post review is complete.
- **Squash if Needed**: If many small fixes occurred, squash them into a single descriptive commit before pushing.

---
*Created based on the Berlin Startup Series migration experience (2026-05-13).*
