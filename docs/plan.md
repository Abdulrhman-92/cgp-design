# CGP Homepage Design v1 — Plan

> Current approved plan. Phase 0 complete; Phases 1–4 remaining. Source of truth for decisions: `.orc/PROJECT.md`.

## Phases

| Phase | Name | Status | Deliverables |
|---|---|---|---|
| 0 | Consultation | ✅ done | 3-agent consultation (design direction, brand/images, technical) + ui-ux-pro-max skill applied; prototypes moved to `reference/client-prototypes/` |
| 1 | Foundation | 🔄 in progress | `base.css` + `motion.css` (shared rules + shared animations), vendor libs local (`assets/vendor/`, `assets/fonts/`), `design/v1` scaffold + `build.js`, docs (this set) |
| 2 | Sections | ⏳ | 10 section files + kinetic layer (custom cursor, magnetic buttons, 3D tilt, scroll reveals, marquee) |
| 3 | Assembly | ⏳ | `index.html` + `main.js` + `custom.css` + SEO/GEO meta |
| 4 | Verification | ⏳ | Playwright screenshots → `screenshots/preview/`, interactions, responsive, performance budget, SEO audit |

## Homepage Sections (10, in order)

| # | File | Content |
|---|---|---|
| 1 | `header.html` | Floating island nav (home.html): glass pill, `CGP.` logo, links, Inquire CTA, scroll state |
| 2 | `hero.html` | "Beyond Standard" — 72/128px h1, gradient second line + glow |
| 3 | `vision.html` | Eyebrow + headline + 2 cards (Bespoke Loops, Elite Hardware) + 3 philosophy pillars (border-t) |
| 4 | `showcase.html` | Hotwheel interactive (CGP.html): CSS circle 300/450px, 4 hotspots, detail panel swap |
| 5 | `metrics.html` | Live telemetry (SVG/CSS): Air 35/85/40/82 vs CGP 28/55/32/48 °C |
| 6 | `gallery.html` | 4 archive cards (2 large + 2 small), hover scale + overlay, build names |
| 7 | `shop.html` | 2 product rows + "Browse All Products →" (WooCommerce-ready) |
| 8 | `blog.html` | 3 logbook items + "Read the Blog →" |
| 9 | `inquiry.html` | Form: underline inputs, SAR budget select, white submit |
| 10 | `footer.html` | `CGP.` + tagline + socials (Instagram, Twitter, WhatsApp) |

## Decisions Summary

- Design-only scope, homepage only; assistant is design decision maker
- Single source of truth: `wp-content/themes/cgp/assets/` (tokens.css, utilities.css, base.css, motion.css)
- Libraries local: Tailwind (compiled) + Alpine.js + Phosphor (js+css+woff2)
- Metrics: live telemetry (SVG/CSS) instead of Chart.js (~200KB saved)
- Images: Unsplash webp placeholders marked "replace with client photos"
- Arabic: IBM Plex Sans Arabic in font stack (English content only now)
- Kinetic layer shared in `motion.css` + theme JS (~3KB, reduced-motion respected)
- Performance budget: ≤1.5MB raw / ≤700KB gzip; images ≤1MB
- SEO + GEO from the start; `{{THEME_ASSETS}}` token convention for WP migration

## Verification Plan (Phase 4)

- Full-page screenshot → `screenshots/preview/` (Playwright)
- Hotwheel clicks swap detail panel; nav scroll state; chart/telemetry renders
- Responsive: 375px mobile (nav bottom), 768px, 1280px
- Hex spot-check vs `tokens.css`; performance budget; SEO audit (100% target)
- Client presentation: screenshots → `screenshots/v1/`; final PDF for R&D documentation