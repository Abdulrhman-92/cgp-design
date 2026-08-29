# design/v1/home/sections — Homepage Sections

One file per homepage section. `design/v1/js/build.js` reads these files in
manifest order (PAGES.home.sections) and injects them into the homepage
template at the `<!-- SECTIONS -->` marker.

## Rules

- **One section per file** — name it after the section: `hero.html`,
  `vision.html`, `showcase.html`, `metrics.html`, `guarantee.html`,
  `gallery.html`, `shop.html`, `blog.html`, `inquiry.html`.
- **Header/footer are shared** — they live in `design/v1/shared/sections/`
  (used by ALL pages; per-page overrides go in the PAGES manifest).
- **No document wrappers** — each file contains a single `<section>` element.
  No `<!DOCTYPE>`, `<html>`, `<head>`, or `<body>`.
- **Paths use tokens only** — build.js resolves them per page depth via
  `path.relative` (never hardcode `../../`):
  - `{{PAGE_ASSETS}}` → page root (e.g. `../..` from this folder → `design/v1/`)
  - `{{THEME_ASSETS}}` → `wp-content/themes/cgp/assets` (single source of truth)
- **English only** in markup and comments.
- **No CDN** — all asset links must be local relative paths.

## Build

From the project root:

    node design/v1/js/build.js

The build is idempotent (markers are re-emitted) and runs a strict lint pass
(single h1, duplicate IDs, unresolved tokens, hardcoded hex in tokens, CDN
links, img without alt, adjacent same-bg sections) that fails on violations.
