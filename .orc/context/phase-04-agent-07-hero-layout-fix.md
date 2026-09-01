# Sub-agent Brief: Hero layout fix — breadcrumb pill + smaller panel + fill the gap with thumbnails

## Task
Fix 3 hero issues on the Product page (The Build Dossier) per user feedback:
1. **Breadcrumb not clear** — redesign as a visible pill with solid bg + cyan separators
2. **Dossier panel too big + too low** — make it smaller (width + height) and higher (more overlap over the image)
3. **Big empty gap below the image** — move the thumbnails UP into that empty space, side-by-side with the panel (fills the gap, no dead space)

## Project Context (PATHS ONLY — sub-agent reads)
- `AGENTS.md` — hard rules (tokens only, logical properties, cgp- prefix, no inline styles, a11y, lint, blur budget: max 1-2 backdrop-blur per viewport — badges use SOLID bg-cgp-bg-overlay)
- `design-system.md` — canonical design system

## Files to Read
- `design/v1/product/sections/hero.html` — CURRENT hero (full-bleed stage + overlapping panel + filmstrip below + lightbox + mobile bar)
- `design/v1/product/css/product.css` — current page CSS (hero-stage, hero-image, scrims, dossier-card, gallery-thumb, lightbox)
- `wp-content/themes/cgp/assets/css/tokens.css` — tokens (bg-overlay, border, radius, space, text sizes)

## Files You May Modify
- `design/v1/product/sections/hero.html` — hero layout restructure
- `design/v1/product/css/product.css` — adjust/add classes

## Files You MUST NOT Touch
- Everything else — product.js (lightbox/gallery logic unchanged), other sections, build.js, theme assets

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/rgba
- Logical properties ONLY (start/end, ms/me, ps/pe, border-s/e, text-start/end, gap)
- `cgp-` prefix on ALL custom classes
- NO inline styles — every custom value becomes a class in product.css
- English only in code/comments
- No CDN, no new dependencies
- Alt text on ALL images; single h1 (stays in panel); no duplicate IDs; `x-cloak` on x-show
- `<!-- REPLACE WITH CLIENT PHOTOS -->` before every image
- `<!-- REPEAT: gallery thumbnail — loop over product gallery images -->` on the first thumb
- Section keeps `id="product-hero"`, `aria-labelledby="product-hero-title"`, `x-data="cgpProduct"`, `bg-cgp-bg-page` (lint rhythm unchanged)
- Blur budget: the breadcrumb pill uses SOLID `bg-cgp-bg-overlay` (NOT backdrop-blur — nav island already uses the blur budget)

### Task-Specific Rules — THE NEW HERO LAYOUT

**1. Breadcrumb → clear pill (top-start over the image):**
- Keep `absolute top-0 start-0 z-10 p-6 md:p-10` wrapper
- The `<ol>` becomes a pill: `inline-flex flex-wrap items-center gap-2 rounded-full border border-cgp-border bg-cgp-bg-overlay px-4 py-2 font-mono text-cgp-micro uppercase tracking-cgp-04em`
- Separators `›` in `text-cgp-accent`; links `text-cgp-text-muted hover:text-cgp-accent-bright`; current page `text-cgp-accent`
- This gives it a solid dark pill so it reads clearly over the image

**2. Dossier panel → smaller + higher:**
- Change the panel wrapper from `cgp-container-lg relative z-10 -mt-24 md:-mt-48` (panel only) to a GRID that holds BOTH thumbnails and panel (see #3)
- Panel: `lg:col-span-5` (was max-w-xl ≈ 576px → now ~5/12 of container ≈ 500px), tighter padding `p-5 md:p-6` (was p-6 md:p-8)
- Reduce `.cgp-dossier-name` size: display-4 → display-5 on mobile, display-3 → display-4 on desktop (check tokens for display-5; if none, use a smaller clamp)
- Reduce `.cgp-dossier-price` size: h2 → h3
- Tighten vertical rhythm: `mt-6` → `mt-5`, `mt-8` → `mt-6`, `pt-6` → `pt-5` (keep the structure: serial, eyebrow, h1, subtitle, price+stock, lifecycle, CTAs, trust strip)
- Keep the 1px cyan top accent bar

**3. Thumbnails → fill the empty space, side-by-side with the panel:**
- REMOVE the separate filmstrip section below (`cgp-container-lg mt-10 md:mt-14` with the 4-col grid)
- MOVE the 4 thumbnails INTO the same grid as the panel:
  ```html
  <div class="cgp-container-lg relative z-10 -mt-24 md:-mt-48">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
      <!-- Thumbs: left on desktop (7 cols), below panel on mobile -->
      <div class="order-2 lg:order-1 lg:col-span-7">
        <div class="grid grid-cols-2 gap-3" role="group" aria-label="Build photos">
          ...4 thumb buttons (unchanged markup)...
        </div>
      </div>
      <!-- Panel: right on desktop (5 cols), first on mobile -->
      <aside class="order-1 lg:order-2 lg:col-span-5 cgp-dossier-card" aria-label="Build dossier">
        ...panel content (tighter)...
      </aside>
    </div>
  </div>
  ```
- Thumbnails keep: `@click="s.setActive(i); s.openLightbox(i)"`, `:aria-current`, `aria-label`, aspect-video img (lazy), label below
- On desktop the thumbs fill the left space below the image (no dead gap); on mobile the panel comes first (conversion), thumbs after

**4. CSS adjustments (product.css):**
- `.cgp-dossier-name`: smaller (display-5 mobile / display-4 desktop — use clamp or token)
- `.cgp-dossier-price`: h3 instead of h2
- Add `.cgp-breadcrumb` class if needed for the pill (or use Tailwind utilities inline — prefer utilities for layout, class only if repeated)
- Keep: cgp-hero-stage, cgp-hero-image, scrims, cgp-hero-open, cgp-gallery-thumb (+ active states), cgp-lightbox-*, cgp-lifecycle-*, cgp-num
- Verify the negative margin + items-end produces: panel overlaps image bottom (half over/half below feel), thumbs fill the left space below the image

**5. Mobile bar:** keep at the end of the hero section exactly as-is (price + READY + Commission → {{CONFIG_URL}})

## Constraints
- Do NOT run the build (orchestrator runs it after you) — but DO run `node --check` on nothing (no JS changes)
- Do NOT touch product.js, other sections, or files

## Tool Policy
- ✅ Read any file
- ✅ Modify ONLY the 2 files listed above
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
- [ ] Breadcrumb is a clear solid pill (readable over the image)
- [ ] Panel is smaller (col-span-5, tighter padding, smaller name/price) and overlaps the image more
- [ ] Thumbnails moved into the grid beside the panel — no big empty gap below the image
- [ ] Mobile: panel first, thumbs after (2-col); desktop: thumbs left (7), panel right (5)
- [ ] Single h1, no dup IDs, all imgs have alt, REPLACE/REPEAT markers present
- [ ] No hardcoded hex/rgba, no backdrop-blur on the breadcrumb (solid bg)