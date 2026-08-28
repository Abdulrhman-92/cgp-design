# design/v1/sections — Homepage Sections

One file per homepage section. `design/v1/js/build.js` reads these files in
manifest order and injects them into `design/v1/index.html` at the
`<!-- SECTIONS -->` marker.

## Rules

- **One section per file** — name it after the section: `header.html`,
  `hero.html`, `vision.html`, `showcase.html`, `metrics.html`, `gallery.html`,
  `shop.html`, `blog.html`, `inquiry.html`, `footer.html`.
- **No document wrappers** — each file contains a single `<section>` (or
  `<header>` / `<footer>`) element. No `<!DOCTYPE>`, `<html>`, `<head>`, or
  `<body>`.
- **Paths are relative to design/v1/** — e.g. `css/custom.css`, `js/main.js`,
  `assets/images/...`.
- **Theme assets use the `{{THEME_ASSETS}}` token** — build.js replaces it with
  `../../wp-content/themes/cgp/assets` (single source of truth). Example:
  `{{THEME_ASSETS}}/images/hero.webp`.
- **English only** in markup and comments.
- **No CDN** — all asset links must be local relative paths.

## Build

From the project root:

    node design/v1/js/build.js

Missing section files are skipped with a warning — the build still succeeds.
The `<!-- SECTIONS -->` marker is re-emitted after the injected sections, so
re-running the build is safe (sections are replaced, never duplicated).