# Sub-agent Brief: Product Page — Sections (The Build Dossier)

## Task
Create the 6 section files for the Product page (`design/v1/product/sections/`) implementing the agreed "Build Dossier" design for **The Hotwheel** (flagship, 25,000 SAR, RTX 5090, Ryzen 9 9950X, 64GB DDR5, Dual Cryo-Loop, stock 'in', serial CGP-2026-004).

## Project Context (PATHS ONLY — sub-agent reads)
- `.orc/PROJECT.md` — decisions log (inquiry-first, no cart, WhatsApp share, 10,000 SAR minimum, labor line)
- `AGENTS.md` — hard rules (tokens, logical properties, cgp- prefix, REPEAT/TODO markers, a11y, lint, no inline styles, Alpine.data modules)
- `design-system.md` — canonical design system

## Files to Read
- `design/v1/shop/sections/header.html` — page-specific header pattern (nav island, mobile dropdown)
- `design/v1/shop/sections/catalog.html` — spec rows, badges, stock labels, featured unit
- `design/v1/configurator/sections/commission.html` — inquiry form pattern (honeypot, cgp-btn-submit, simulated success, blueprint panel)
- `design/v1/configurator/sections/matrix.html` — `cgp-mobile-bar` markup (around line 192)
- `design/v1/home/sections/gallery.html` — archive-card luminosity treatment (for related cards)
- `wp-content/themes/cgp/assets/css/utilities.css` — available shared classes (buttons, pills, stock, spec rows, mobile-bar, honeypot, btn-submit, blueprint-*)
- `wp-content/themes/cgp/assets/css/tokens.css` — color/type tokens
- `design/v1/js/build.js` — token names ({{THEME_ASSETS}}, {{PAGE_ASSETS}}, {{HOME_URL}}, {{CONFIG_URL}}, {{SHOP_URL}}, {{PRODUCT_URL}})

## Files You May Modify (CREATE)
- `design/v1/product/sections/header.html`
- `design/v1/product/sections/hero.html`
- `design/v1/product/sections/specs.html`
- `design/v1/product/sections/forge-log.html`
- `design/v1/product/sections/related.html`
- `design/v1/product/sections/inquiry.html`

## Files You MUST NOT Touch
- Everything else — especially `design/v1/js/build.js` (another agent edits it in parallel), theme assets, other pages

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from tokens via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/px for colors/fonts/spacing/radii/shadows (layout-only values like widths/clamp MAY be hardcoded)
- Logical properties ONLY (margin-block, padding-inline, start/end, ms/me, ps/pe, border-s/e, text-start/end, gap) — site ships Arabic/RTL
- `cgp-` prefix on ALL custom classes
- NO inline styles — every custom value becomes a class (Agent 3 implements them in product.css)
- English only in code/comments
- No CDN, no new dependencies
- `prefers-reduced-motion: reduce` respected (no auto-rotate timers without the check; pulse animations disabled via motion.css pattern)
- Alt text on ALL images; single h1 (hero only); no duplicate IDs; `x-cloak` on all x-show
- `<!-- REPLACE WITH CLIENT PHOTOS -->` before every image
- `<!-- TODO: real permalink -->` before every `href="#"`
- `<!-- REPEAT: ... -->` markers on repeated blocks
- Contact data NEVER hardcoded — `<!-- TODO: from site settings -->`
- No `role="menu"`/`role="menuitem"` on nav

### Task-Specific Rules — THE AGREED DESIGN (from consultation, converged)
**CONCEPT: "The Build Dossier"** — the page reads as a case file, not a product listing. Serial identity: `// DOSSIER: CGP-2026-004`, decorative mono `UNIT_04` vertical file-tab (aria-hidden), build name = the single h1.

**Section rhythm (lint: no adjacent same-bg):** hero (bg-cgp-bg-page) → specs (bg-cgp-bg-section) → forge-log (bg-cgp-bg-page) → related (bg-cgp-bg-section) → inquiry (bg-cgp-bg-page). All sections use `.cgp-section` + `aria-labelledby`.

1. **header.html** — page-specific (mirrors WP header-product.php): same nav-island structure as shop header, links: Home ({{HOME_URL}}), The Shop ({{SHOP_URL}}), The Blueprint (#specs), From the Same Forge (#related), Commission ({{CONFIG_URL}}). NO homepage anchors (#hero/#showcase etc. — they don't exist here). Inquire CTA → #inquiry. 44px touch targets, aria-label on nav.

2. **hero.html** — THE DOSSIER HERO:
   - Breadcrumb: {{HOME_URL}} › {{SHOP_URL}} › The Hotwheel (visible, mono, small)
   - `lg:grid-cols-12` split: left 7 cols = gallery stage, right 5 cols = dossier panel
   - Gallery stage: main image 4/3 (1280×853, `loading="eager"` + `fetchpriority="high"` — LCP element, explicit width/height), `cgp-card-spotlight` glow, 4 thumbnail `<button>`s with mono angle labels (`IMG_01 // FRONT`, `IMG_02 // LOOP DETAIL`, `IMG_03 // GPU SEAT`, `IMG_04 // REAR`) + `aria-label` + `aria-current`; Alpine swap (x-data="cgpProduct", active index state)
   - Dossier panel (file-card): 1px cyan top accent bar, mono header row (`// DOSSIER: CGP-2026-004`), hairline dividers, eyebrow `// FLAGSHIP UNIT`, h1 "The Hotwheel", subtitle, price `25,000 SAR` (tabular-nums, `dir="ltr"` + class `cgp-num` for unicode-bidi isolate), stock pill (READY — ships 3-5 days, use cgp-stock-* classes), forge-time lifecycle readout (3 nodes: FORGED → TESTED → READY, current state = READY with pulsing dot, CSS-only, reduced-motion safe)
   - CTAs: primary `Commission This Build` (cgp-btn-primary cgp-magnetic, → #inquiry) + ghost `Configure Your Own` (→ {{CONFIG_URL}}) + WhatsApp share link (wa.me/?text= — no phone number, `<!-- TODO: from site settings -->` for the number)
   - Compact trust strip: `// SYS_TEST: 48H PRESSURE TESTED` · `// SYS_ACRY: 100% LEAK TESTED`
   - Mobile sticky bar at end of hero: `cgp-mobile-bar lg:hidden` (copy the configurator markup pattern) — price + stock + `Commission This Build` → #inquiry

3. **specs.html** — "The Blueprint" (bg-cgp-bg-section):
   - Full spec dossier: real `<table>` with `th scope="row"`, grouped rows (CORE / MEMORY / STORAGE / LOOP / CHASSIS), mono uppercase keys, hairline rows. Specs: CPU Ryzen 9 9950X, GPU RTX 5090, RAM 64GB DDR5, LOOP Dual Cryo-Loop, plus STORAGE 2TB NVMe Gen5, CHASSIS Circular Hotwheel Chassis (invented-but-plausible values OK for mockup)
   - Price breakdown panel: parts subtotal + `LABOR: Precision Assembly + 48h Pressure Testing — 1,500 SAR` + total 25,000 SAR (mirrors configurator blueprint rows) + `// SYS_VERIFIED` stamp
   - Static SVG thermal telemetry mini-chart (IDLE/LOAD temps — NO Chart.js, no JS charting): small inline SVG with mono labels, aria-hidden + text alternative
   - `<!-- REPEAT: spec row — loop over product attributes -->`

4. **forge-log.html** — provenance timeline (bg-cgp-bg-page):
   - `<ol>` + `<time>` elements: FORGED → LEAK TEST → BURN-IN → SEALED with mono timestamps (dir="ltr" + cgp-num)
   - Master signature line: "Assembled by [Master] — signed & sealed" (`<!-- TODO: from site settings -->` for the name)
   - The CGP Guarantee strip: 48h pressure test · 0.01mm machining tolerance · 100% leak tested (reuse guarantee data points from home/guarantee.html if readable)
   - Build-log promise: "Every unit ships with a serialized build log — signed by the master who forged it"

5. **related.html** — "From the Same Forge" (bg-cgp-bg-section):
   - 3 units: The Wraith (18,000 SAR), Titanium Core (14,000 SAR), Neon Genesis (22,000 SAR) — archive-card luminosity treatment (NOT the shop spec-card grid), mono index numbers, lazy images
   - `<!-- REPEAT: related unit — loop over wc_get_related_products() -->`
   - "This Build, But Yours" bespoke band: cross-link to {{CONFIG_URL}}, "Commissions start at 10,000 SAR", cgp-btn-outline

6. **inquiry.html** — "Commission This Build" (bg-cgp-bg-page, `id="inquiry"` — footer CTA target):
   - Pre-filled blueprint panel (read-only): build name, spec rows, labor line, total, `// FORGE TIME: 3-5 DAYS` (mirror configurator commission blueprint rows)
   - Form: honeypot (`name="company_website"`, tabindex=-1, autocomplete=off, aria-hidden, class cgp-honeypot) + `@submit.prevent` simulated success, NO action attribute, cgp-btn-submit "Submit Request", success state `// TRANSMISSION RECEIVED — THE MASTERS HAVE BEEN SUMMONED` + "Expect a consultation within 24 hours"
   - Fields: Name, Email, Phone/WhatsApp, Budget range select (10,000-15,000 / 15,000-25,000 / 25,000+ SAR) — reuse configurator form markup pattern
   - `<!-- TODO: from site settings -->` for any contact data

### File-Specific Rules
- Match the exact class usage patterns from the files you read (cgp-eyebrow, cgp-section, cgp-container-lg/md, cgp-btn-*, cgp-magnetic, cgp-spec-*, cgp-stock-*, cgp-blueprint-*, cgp-mono-label, cgp-scanline, cgp-input-underline, cgp-honeypot, cgp-btn-submit, cgp-mobile-bar, cgp-card-spotlight, cgp-minimum-nudge)
- New page-specific classes: prefix `cgp-` and use consistently (e.g., cgp-dossier-*, cgp-gallery-*, cgp-lifecycle-*, cgp-spec-table, cgp-telemetry, cgp-forge-log, cgp-num, cgp-related-*, cgp-bespoke-band). Agent 3 implements them in product.css — so be consistent and minimal.
- Numeric readouts (prices, serials, timestamps): `dir="ltr"` + `class="cgp-num"` (unicode-bidi isolate — RTL safety)

## Constraints
- Do NOT create product.css or product.js (Agent 3 does that after you)
- Do NOT run the build
- No Alpine.data() definitions in sections — inline x-data objects ≤5 lines only; the gallery state lives in product.js (Agent 3)

## Tool Policy
- ✅ Read any file
- ✅ Create ONLY the 6 files listed above
- ❌ Run git commands
- ❌ Touch anything else

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1", ...],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}

## Success Criteria
- [ ] 6 files created, all sections use .cgp-section + aria-labelledby
- [ ] Exactly 1 h1 (hero), no duplicate IDs, all imgs have alt
- [ ] Section bg rhythm alternates (page/section/page/section/page)
- [ ] All tokens used ({{THEME_ASSETS}}, {{PAGE_ASSETS}}, {{HOME_URL}}, {{CONFIG_URL}}, {{SHOP_URL}}, {{PRODUCT_URL}})
- [ ] Honeypot + cgp-btn-submit + simulated success in inquiry
- [ ] REPEAT/TODO/REPLACE markers present
- [ ] No inline styles, no hardcoded hex, no CDN