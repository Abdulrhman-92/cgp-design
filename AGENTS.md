# AGENTS.md — CGP Design Project Rules

> **READ THIS FIRST.** Every agent working on this project MUST follow these rules.
> Violations = rejected output. When in doubt, ask the orchestrator.

---

## 1. Project Overview

- **Client:** CGP (cgp.sa) — Saudi luxury PC building atelier ("The Bespoke Forge")
- **Scope:** Design-only HTML mockups (WordPress implementation comes later)
- **Current focus:** Homepage (design/v1/home/) — then configurator, shop, product, archives, logbook, vision, contact
- **Design system:** `design-system.md` (colors, type, spacing, components, motion — canonical)
- **Client prototypes:** `reference/client-prototypes/` (READ-ONLY reference)

## 2. Single Source of Truth (MANDATORY)

All shared code lives in **`wp-content/themes/cgp/assets/`** — NEVER duplicate it:

| Asset | Location |
|---|---|
| CSS variables | `assets/css/tokens.css` |
| Typography/body/focus | `assets/css/base.css` |
| Buttons/cards/forms/nav | `assets/css/utilities.css` |
| Shared animations | `assets/css/motion.css` |
| Shared JS (cursor, magnetic, tilt, reveals, count-up, nav) | `assets/js/main.js` (bundled per page) |
| Libraries (Alpine, Phosphor) | `assets/vendor/` |
| Fonts (Inter, Space Grotesk, IBM Plex Arabic) | `assets/fonts/` |
| Tailwind config | `tailwind.config.js` |

**Rule:** If code is used by MORE than one page → it goes in the theme. Never copy theme code into design/v1.

## 3. Folder Structure (each page isolated)

```
design/v1/
├── shared/sections/          ← header.html + footer.html (used by ALL pages)
├── <page>/                   ← one folder per page (home, configurator, shop, product, archives, logbook, vision, contact)
│   ├── index.html            ← page template (built by build.js)
│   ├── sections/             ← one file per section
│   ├── css/<page>.css        ← page-level styles (shared between that page's sections)
│   └── js/<page>.js          ← page-level JS (if needed)
├── css/                      ← tailwind.css (compiled) + custom.css
├── js/build.js               ← multi-page build system
└── assets/images/            ← shared images
```

## 4. CSS/JS 3-Level Architecture

| Usage | CSS | JS |
|---|---|---|
| ALL pages | theme (`tokens/base/utilities/motion` + `tailwind.css`) | theme (`main.js`) |
| One page (multiple sections) | `<page>/css/<page>.css` | `<page>/js/<page>.js` |
| One section only | comment block in `<page>.css` | Alpine inline in the section file |

**JS bundling rule (MANDATORY):** a page loads ONLY what it needs, as ONE minified bundle.
- `build.js` concatenates the page's JS (theme `main.js` + `<page>.js` if any) into `js/bundles/<page>.min.js`
- The page's `<head>` references ONLY its bundle (plus Alpine vendor) — never load page JS you don't need
- Manifest: `js: ['main.js']` (theme) or `js: ['main.js', '<page>/js/<page>.js']`

**Decision question:** "Who uses this?" → all = theme, page = page file, section = inline/block.

## 5. Coding Standards

- **Values:** ONLY from `tokens.css` via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/px
- **Layout carve-out:** layout-only values NOT in the token scale (sizes, widths, positions, clamp()) MAY be hardcoded (e.g. `h-[300px]`, `clamp(44px, 11vw, 128px)`) — colors/fonts/spacing/radii/shadows must use tokens
- **Prefix:** all custom classes use `cgp-`
- **Properties:** logical properties (margin-block, padding-inline)
- **Language:** English only in code/comments/docs
- **No CDN:** all libraries/fonts local (assets/vendor/, assets/fonts/)
- **{{THEME_ASSETS}} token:** theme asset paths (build.js computes depth per page — never hardcode `../../`)
- **{{PAGE_ASSETS}} token:** page-root-relative paths (images, page css/js)
- **Paths in sections:** use tokens only — build.js resolves them per page depth

## 6. Design System Compliance

- **Copy anatomy:** eyebrow (cyan, tracked uppercase) → 2-line headline (gradient 2nd line) → zinc-400 paragraph
- **Colors:** `#050505` bg, zinc grays, cyan `#06b6d4` accent (amber = configurator/GPU only)
- **Fonts:** Space Grotesk (display) + Inter (body) + IBM Plex Sans Arabic (fallback)
- **Buttons:** 5 variants from utilities.css (primary/outline/ghost/white/link) — never invent new
- **Section rhythm:** `.cgp-section` (py-20) / `.cgp-section-secondary` (py-16)
- **Terminal voice:** mono labels (`// NODE`, `SYS_*`, `RENDER_STAGE`) — configurator pages only for nano type
- **Max 2 ambient glows per viewport**

## 7. Accessibility (MANDATORY)

- Contrast ≥ 4.5:1 for text (zinc-400+ on #050505; never zinc-600 for readable text)
- Touch targets ≥ 44×44px
- Visible focus states (base.css handles)
- Single h1 per page (hero only)
- `aria-labelledby` on sections, `aria-label` on icon-only elements
- `prefers-reduced-motion: reduce` — ALL animations disabled (motion.css handles)
- Semantic HTML (header/main/section/article/time/nav)
- Alt text on ALL images
- `x-cloak` on all x-show elements (no FOUC)

## 8. SEO/GEO (MANDATORY)

- Keyword-rich title + meta description per page
- Schema.org JSON-LD (Organization/LocalBusiness/Service)
- OG + Twitter meta with real image paths
- Geo meta (SA/Riyadh) on all pages
- `noindex, nofollow` until launch (TODO comment to flip)
- Semantic headings (H1 once, H2-H3 hierarchy)

## 9. Performance Budget

- Total ≤ 1.5MB raw / ≤ 700KB gzip
- Images: WebP, `loading="lazy"` + `decoding="async"` + explicit width/height (CLS)
- Fonts: self-hosted woff2, `font-display: swap`, preload only critical weights
- JS: deferred, no render-blocking
- No Chart.js (use telemetry/SVG per design-system §8)

## 10. Build System

- `node design/v1/js/build.js` — multi-page manifest (PAGES object)
- Manifest OWNS the head: per-page `{ title, description, canonical, ogImage, schema, css: [], js: [] }` — build.js generates `<head>` (no SEO drift)
- Each page: template + ordered section list (shared header/footer first/last, OUTSIDE `<main>`)
- Per-page overrides: `sections: { header: 'shared' | '<page>/sections/header.html', ... }` (mirrors WP header-{slug}.php)
- Idempotent via marker replacement (`<!-- SECTIONS -->`)
- Resolves `{{THEME_ASSETS}}` + `{{PAGE_ASSETS}}` per page depth (path.relative — never hardcoded)
- **Lint pass (build fails on violations):** single h1, duplicate IDs, unresolved tokens, hardcoded hex that exists in tokens, CDN links, `<img>` without alt, adjacent same-bg sections, sections not using .cgp-section
- Homepage output stays at `design/v1/index.html` (root — clean client URL); other pages at `design/v1/<page>/index.html`
- After section edits: rebuild + recompile Tailwind:
  `npx -y tailwindcss@3.4.17 -c wp-content/themes/cgp/tailwind.config.js -i design/v1/css/tailwind-input.css -o design/v1/css/tailwind.css`

## 11. Verification (before reporting done)

- `node design/v1/js/build.js` runs clean (exit 0, 0 lint warnings)
- Open page in browser (http://localhost:8080) — 0 console errors
- Check: single h1, no duplicate sections, images load, count-up works, nav works, nav links resolve to existing pages
- Mobile 375px + desktop 1440px check
- Screenshots → screenshots/preview/ (batched in ONE browser session)
- Report: files changed + verification command + issues

## 12. Content Quality (MANDATORY)

- NO lorem ipsum — real forge-voice copy only
- Placeholder images: `<!-- REPLACE WITH CLIENT PHOTOS -->` convention
- Placeholder links: `href="#"` acceptable in mockup (note in issues[])
- Mockup forms: simulated success state (no real submission)
- "Client-ready" = lint passes + 0 console errors + screenshots captured + copy is on-brand

## 12. Agent Output Contract

Return JSON:
```json
{
  "status": "success" | "error" | "needs_clarification",
  "files_changed": ["path1"],
  "summary": "1-2 sentences",
  "verification_command": "exact command",
  "issues": []
}
```

## 13. Do NOT

- ❌ Touch `reference/client-prototypes/` (read-only)
- ❌ Modify `design-system.md` without orchestrator approval
- ❌ Run git commands (orchestrator handles)
- ❌ Install dependencies without permission
- ❌ Touch files outside your "may modify" list
- ❌ Use CDN links
- ❌ Hardcode colors/sizes that exist in tokens