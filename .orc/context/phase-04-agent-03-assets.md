# Sub-agent Brief: Product Page — CSS + JS Assets

## Task
Create `design/v1/product/css/product.css` and `design/v1/product/js/product.js` implementing every page-specific class and the Alpine gallery component for the Product page (The Build Dossier).

## Project Context (PATHS ONLY — sub-agent reads)
- `AGENTS.md` — hard rules (tokens only, logical properties, cgp- prefix, no inline styles, Alpine.data modules, reduced-motion)
- `design-system.md` — canonical design system

## Files to Read
- `design/v1/product/sections/hero.html` — gallery contract + dossier classes (header comment lists them)
- `design/v1/product/sections/specs.html` — spec table + telemetry classes
- `design/v1/product/sections/forge-log.html` — timeline classes
- `design/v1/product/sections/related.html` — related card classes
- `design/v1/product/sections/inquiry.html` — blueprint classes to port (header comment lists them)
- `design/v1/configurator/css/configurator.css` — SOURCE of cgp-commission-blueprint, cgp-blueprint-row/cat/name/price/total (port them)
- `wp-content/themes/cgp/assets/css/utilities.css` — what's already defined (do NOT redefine)
- `wp-content/themes/cgp/assets/css/tokens.css` — tokens (var(--cgp-*) ONLY)
- `wp-content/themes/cgp/assets/css/motion.css` — animation patterns (reduced-motion)
- `design/v1/configurator/js/configurator.js` — Alpine.data registration pattern (alpine:init)
- `design/v1/shop/js/shop.js` — Alpine.data proxy pattern

## Files You May Modify (CREATE)
- `design/v1/product/css/product.css`
- `design/v1/product/js/product.js`

## Files You MUST NOT Touch
- Everything else — sections, build.js, theme assets, other pages

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` — NEVER hardcode hex/px for colors/fonts/spacing/radii/shadows (layout-only values like widths/clamp MAY be hardcoded)
- Logical properties ONLY (margin-block, padding-inline, start/end, ms/me, ps/pe, border-s/e, text-start/end, gap)
- `cgp-` prefix on ALL custom classes
- English only in code/comments
- No CDN, no new dependencies
- `prefers-reduced-motion: reduce` — disable ALL animations (use the motion.css pattern: `@media (prefers-reduced-motion: reduce) { ... }`)

### Task-Specific Rules — product.css
1. Extract EVERY class used in the 6 section files that is NOT defined in theme (utilities.css/tokens/base/motion) or Tailwind — implement each one. Known list (verify against markup): cgp-dossier-card, cgp-dossier-name, cgp-dossier-price, cgp-dossier-trust, cgp-gallery-stage, cgp-gallery-main, cgp-gallery-thumbs, cgp-gallery-thumb, cgp-gallery-thumb-label, cgp-lifecycle, cgp-lifecycle-node, cgp-lifecycle-done, cgp-lifecycle-active, cgp-lifecycle-label, cgp-lifecycle-dot, cgp-num, cgp-spec-table + its row classes, cgp-telemetry, cgp-forge-log + timeline classes, cgp-related-* (if used), cgp-bespoke-band (if used), cgp-mobile-bar tweaks (if the hero's mobile bar needs page-specific bits — check what utilities.css already provides)
2. PORT from configurator.css: cgp-commission-blueprint, cgp-blueprint-row, cgp-blueprint-cat, cgp-blueprint-name, cgp-blueprint-price, cgp-blueprint-total (copy the exact rules — do NOT modify configurator.css)
3. `.cgp-num` MUST include `unicode-bidi: isolate` (RTL safety for numeric readouts)
4. Gallery: `.cgp-gallery-main` transition (opacity ~300ms swap), `.cgp-gallery-thumb` active state (cyan border), `.cgp-gallery-thumb-label` mono micro
5. Lifecycle: horizontal 3-node layout with connecting hairlines; `.cgp-lifecycle-done` cyan; `.cgp-lifecycle-active` bright + pulsing dot (pulse via motion.css pattern or `animate-pulse` Tailwind — check what hero.html uses); reduced-motion disables pulse
6. Spec table: hairline rows, mono uppercase keys, `th scope="row"` styling, responsive (mobile: table collapses — check if sections use `<details>` or a wrapper class; style accordingly)
7. Telemetry SVG: static chart styling (mono labels, cyan line, grid hairlines)
8. Forge log: vertical timeline with hairline connector + mono timestamps
9. Related cards: archive-card treatment (luminosity reveal on hover — check home gallery CSS pattern in home/css/home.css for cgp-archive-card; if it's page-specific there, port it)

### Task-Specific Rules — product.js
1. `Alpine.data('cgpProduct', ...)` registered on `alpine:init` (exact pattern from configurator.js/shop.js)
2. Contract (from hero.html): `s.images` = 4 entries `{ src, alt, label }` (all use `{{PAGE_ASSETS}}`-style relative path — but JS can't use build tokens! Use the same relative path convention as shop-data.js: image filenames + a base. Check how shop.js/shop-data.js resolve image paths — mirror it), `s.active` (0-3), `s.setActive(i)` (sets active, no timers needed — click-driven)
3. NO auto-rotate timer (click-driven only — no reduced-motion concern, but if you add any timer, guard it)
4. No localStorage, no external calls
5. Keep it tiny (~2-3KB) — it's bundled with main.js

## Constraints
- Do NOT run the build (orchestrator runs it after you)
- Do NOT modify the section files
- Do NOT modify configurator.css

## Tool Policy
- ✅ Read any file
- ✅ Create ONLY the 2 files listed above
- ❌ Run git commands
- ❌ Touch anything else

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1", "path2"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}

## Success Criteria
- [ ] Every class used in sections is defined (grep the sections for class="...", cross-check)
- [ ] No hardcoded hex — all var(--cgp-*)
- [ ] .cgp-num has unicode-bidi: isolate
- [ ] Blueprint classes ported (identical rules)
- [ ] product.js registers cgpProduct on alpine:init with the exact contract
- [ ] `node --check design/v1/product/js/product.js` passes