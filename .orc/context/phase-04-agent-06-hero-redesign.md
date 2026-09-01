# Sub-agent Brief: Hero redesign — full-bleed image + overlapping dossier panel + filmstrip + lightbox

## Task
Redesign the Product page hero (The Build Dossier) per user feedback: full-width main image, dossier panel straddling the image bottom edge (half over image / half below), new thumbnail grid (filmstrip), and a native `<dialog>` lightbox that opens when clicking ANY image.

## Project Context (PATHS ONLY — sub-agent reads)
- `AGENTS.md` — hard rules (tokens only, logical properties, cgp- prefix, no inline styles, a11y, lint, reduced-motion, approved Phosphor icon set)
- `design-system.md` — canonical design system

## Files to Read
- `design/v1/product/sections/hero.html` — CURRENT hero (gallery stage 7/5 split + dossier panel + mobile bar) — this is the file to redesign
- `design/v1/product/css/product.css` — current page CSS (dossier card, gallery stage/thumbs, lifecycle, cgp-num)
- `design/v1/product/js/product.js` — current Alpine component (s.images, s.active, s.setActive)
- `wp-content/themes/cgp/assets/css/tokens.css` — tokens (bg, border, radius, glow, motion)
- `design/v1/shop/sections/catalog.html` — reference for cgp-card-spotlight usage

## Files You May Modify
- `design/v1/product/sections/hero.html` — full hero redesign
- `design/v1/product/css/product.css` — new/updated classes (remove dead ones)
- `design/v1/product/js/product.js` — add lightbox state + methods

## Files You MUST NOT Touch
- Everything else — other sections, build.js, theme assets, configurator, shop

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` — NEVER hardcode hex/rgba (for the dialog backdrop use `color-mix(in srgb, var(--cgp-bg-page) 85%, transparent)` or a suitable token)
- Logical properties ONLY (start/end, ms/me, ps/pe, border-s/e, text-start/end, gap)
- `cgp-` prefix on ALL custom classes
- NO inline styles — every custom value becomes a class in product.css
- English only in code/comments
- No CDN, no new dependencies — native `<dialog>` ONLY
- `prefers-reduced-motion: reduce` respected (dialog is native — no animation needed)
- Approved Phosphor icons ONLY: `x`, `caret-left`, `caret-right` (for lightbox close/nav) — NO new icons
- Alt text on ALL images; single h1 (stays in the panel); no duplicate IDs; `x-cloak` on x-show
- `<!-- REPLACE WITH CLIENT PHOTOS -->` before every image
- `<!-- REPEAT: gallery thumbnail — loop over product gallery images -->` on the first thumb
- `<!-- TODO: real permalink -->` before any href="#"
- Section keeps `id="product-hero"`, `aria-labelledby="product-hero-title"`, `x-data="cgpProduct"`, `bg-cgp-bg-page` (lint rhythm: page/section/page/section unchanged)

### Task-Specific Rules — THE NEW HERO (user-approved direction)

**1. Full-bleed image stage (top of hero):**
- `relative aspect-[4/3] md:aspect-[21/9] overflow-hidden` — full viewport width (NOT inside cgp-container)
- Main img: `h-full w-full object-cover`, `loading="eager"` + `fetchpriority="high"` (LCP), explicit width/height, `:src="s.images[s.active].src"` + `:alt="s.images[s.active].alt"` bindings
- `cgp-card-spotlight` glow overlay (keep)
- Bottom scrim: gradient from page bg (e.g. `bg-gradient-to-t from-cgp-bg-page via-cgp-bg-page/40 to-transparent`) — helps the panel blend
- Subtle top scrim for breadcrumb contrast (e.g. `bg-gradient-to-b from-black/40 to-transparent` — check tokens for a black/40 equivalent; if none, use a cgp-* utility or color-mix)
- Breadcrumb OVERLAID top-start: `absolute top-0 start-0 p-6 md:p-10` (same breadcrumb markup as current)
- Whole image clickable: `absolute inset-0` `<button type="button" @click="s.openLightbox(s.active)" aria-label="Open photo preview">` (no icon — keep clean)

**2. Dossier panel — straddles the image bottom edge:**
- Panel container: `cgp-container-lg relative z-10 -mt-24 md:-mt-48` (negative margin pulls it up over the image — roughly half the panel over the image on desktop)
- Panel: `cgp-dossier-card md:ms-auto md:max-w-xl` (end-anchored desktop, full-width mobile)
- Content UNCHANGED from current: serial eyebrow (// DOSSIER: CGP-2026-004), // Flagship Unit eyebrow, h1 The Hotwheel, subtitle, price 25,000 SAR + READY pill, lifecycle FORGED→TESTED→READY, CTAs (primary `Commission This Build` → {{CONFIG_URL}} + WhatsApp share link — NO ghost button), trust strip (SYS_TEST/SYS_ACRY)

**3. Thumbnails — filmstrip (below the panel):**
- `cgp-container-lg mt-10 md:mt-14`
- `grid grid-cols-2 gap-3 md:grid-cols-4` (2 cols mobile / 4 cols desktop — NOT the old 4-square grid)
- Each thumb: `<button type="button" @click="s.setActive(i); s.openLightbox(i)" :aria-current="..." aria-label="View IMG_0X — ..." class="cgp-gallery-thumb">` with `aspect-video` img (lazy, width/height) + label BELOW the image (`IMG_01 // FRONT` etc.)
- Active state: cyan border + cyan label (CSS)

**4. Lightbox — native `<dialog>` (end of hero section, before mobile bar):**
- `<dialog x-ref="lightbox" class="cgp-lightbox" aria-label="Build photo preview" @click.outside="s.closeLightbox()" @keydown.arrow-right.prevent="s.next()" @keydown.arrow-left.prevent="s.prev()">`
- Content: img (`:src="s.images[s.lightboxIndex].src"` `:alt="..."`, max-h-[80vh] object-contain), caption (`x-text="s.images[s.lightboxIndex].label"`), prev button (ph-caret-left, aria-label "Previous photo"), next button (ph-caret-right, aria-label "Next photo"), close button (ph-x, aria-label "Close preview")
- All buttons ≥ 44px touch targets
- CSS: `.cgp-lightbox` (bg elevated, border accent, radius 2xl, max-width ~min(90vw, 1100px), padding), `.cgp-lightbox::backdrop` (dark — color-mix with --cgp-bg-page + optional blur), `.cgp-lightbox-img`, `.cgp-lightbox-caption` (mono micro), `.cgp-lightbox-btn` (nav/close — border, hover cyan)

**5. JS (product.js) — add to the `s` object:**
- `lightboxIndex: 0`
- `openLightbox(i) { this.lightboxIndex = i; this.$refs.lightbox.showModal(); }`
- `closeLightbox() { this.$refs.lightbox.close(); }`
- `next() { this.lightboxIndex = (this.lightboxIndex + 1) % this.images.length; }`
- `prev() { this.lightboxIndex = (this.lightboxIndex - 1 + this.images.length) % this.images.length; }`
- Keep setActive(i) and the images array as-is
- No timers, no localStorage

**6. CSS cleanup (product.css):**
- Remove dead classes: `.cgp-gallery-stage`, `.cgp-gallery-main` (replaced by hero stage/image)
- Update `.cgp-gallery-thumb` for the filmstrip (aspect-video, label below, active cyan border)
- Keep: cgp-dossier-card, cgp-dossier-name, cgp-dossier-price, cgp-dossier-trust, cgp-lifecycle-*, cgp-num, cgp-spec-table, cgp-telemetry, cgp-forge-log, cgp-related-*, cgp-bespoke-band, cgp-blueprint-*
- New: cgp-hero-stage, cgp-hero-image, cgp-hero-scrim (if needed), cgp-lightbox + ::backdrop + cgp-lightbox-img/caption/btn

**7. Mobile bar:** keep at the end of the hero section exactly as-is (price + READY + Commission → {{CONFIG_URL}})

## Constraints
- Do NOT run the build (orchestrator runs it after you) — but DO run `node --check design/v1/product/js/product.js`
- Do NOT touch other sections or files

## Tool Policy
- ✅ Read any file
- ✅ Modify ONLY the 3 files listed above
- ❌ Run git commands
- ❌ Touch anything else

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1", "path2", "path3"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}

## Success Criteria
- [ ] Hero: full-bleed image stage + panel straddling bottom edge (negative margin) + filmstrip thumbs + lightbox dialog
- [ ] Clicking main image OR any thumb opens the dialog; prev/next wrap; Escape closes
- [ ] Single h1, no dup IDs, all imgs have alt, x-cloak on x-show
- [ ] No hardcoded hex/rgba (color-mix or tokens for backdrop)
- [ ] node --check product.js passes
- [ ] Mobile 375px: panel full-width, thumbs 2-col, mobile bar visible