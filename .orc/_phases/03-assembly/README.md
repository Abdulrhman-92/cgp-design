# Phase 3 + 4: Assembly & Verification

**Objective:** Tailwind compile, integration fixes, browser verification, responsive check.
**Status:** ✅ complete
**Started:** 2026-08-27
**Completed:** 2026-08-27

## Work Done

- Tailwind compiled locally: `npx tailwindcss@3.4.17 -c wp-content/themes/cgp/tailwind.config.js -i design/v1/css/tailwind-input.css -o design/v1/css/tailwind.css` (29.7KB)
- build.js fixed: {{THEME_ASSETS}} resolved in head too (styles/scripts/preloads)
- build.js made IDEMPOTENT (strips old sections between <main> and </main> before re-injecting)
- Phosphor: style.css linked directly in head (loader script removed — relative path broke)
- Phosphor v2: added base `.ph` class to all 8 icons
- Skip link: class fixed to `.cgp-skip-link` (hidden until focus)
- NEW section: guarantee.html (The CGP Guarantee — signature trust section)
- Footer redesigned: 3-column luxury layout + marquee (text-zinc-500, was invisible at white/10) + bottom bar
- Gallery redesigned: mono index numbers 01-04 + cyan border hover

## Verification Results (Playwright)

- ✅ 9 sections, NO duplicates (idempotent build)
- ✅ Hero: "Engineer / The Impossible." + dual CTA + hotwheel ring + boot sequence
- ✅ Nav island: top-8 desktop (32px), bottom-6 mobile
- ✅ Hotwheel: auto-rotate works (NODE 01→04), 300ms swap, 44px buttons
- ✅ Telemetry: count-up values + static SVG chart (35/85/40/82 vs 28/55/32/48)
- ✅ Guarantee section: 48h / Aero / Med data points + Summon The Masters CTA
- ✅ Gallery: 4 cards + mono index + chips
- ✅ Footer: marquee visible + 3 columns + bottom bar
- ✅ Phosphor icons: font-family "Phosphor" applied, glyphs render
- ✅ Skip link: hidden (translateY -200%)
- ✅ 0 console errors
- ⚠️ Images lazy-load (ok:false until scrolled — expected)
- ⚠️ Font preload warnings (harmless — fonts load via @font-face)

## Handoff Notes

- Serve via `python3 -m http.server 8080` for preview (file:// breaks relative paths)
- Rebuild after section edits: `node design/v1/js/build.js`
- Recompile Tailwind after class changes: npx tailwindcss command above
- Screenshots: screenshots/preview/ (Playwright sandbox couldn't write — use browser manually)