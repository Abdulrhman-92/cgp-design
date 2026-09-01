# Sub-agent Brief: Hero v3 — panel higher + thumbnails below image in a bento grid

## Task
Adjust the Product page hero (The Build Dossier) per user feedback:
1. **Dossier panel higher** — increase the negative margin so the panel overlaps the image more (sits higher)
2. **Thumbnails BELOW the image** — remove them from overlapping the big image; place them in their own section below the image
3. **Bento (asymmetric) thumbnail grid** — NOT a uniform grid; mixed sizes for a nicer, more editorial look

## Project Context (PATHS ONLY — sub-agent reads)
- `AGENTS.md` — hard rules (tokens only, logical properties, cgp- prefix, no inline styles, a11y, lint)
- `design-system.md` — canonical design system

## Files to Read
- `design/v1/product/sections/hero.html` — CURRENT hero (full-bleed stage + grid combining thumbs+panel + lightbox + mobile bar)
- `design/v1/product/css/product.css` — current page CSS (hero-stage, hero-image, scrims, dossier-card, gallery-thumb, lightbox)
- `wp-content/themes/cgp/assets/css/tokens.css` — tokens

## Files You May Modify
- `design/v1/product/sections/hero.html` — hero layout restructure
- `design/v1/product/css/product.css` — bento grid classes + panel tweaks

## Files You MUST NOT Touch
- Everything else — product.js (lightbox/gallery logic unchanged), other sections, build.js, theme assets

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/rgba (layout-only values like widths/heights/clamp MAY be hardcoded per AGENTS.md carve-out)
- Logical properties ONLY (start/end, ms/me, ps/pe, border-s/e, text-start/end, gap)
- `cgp-` prefix on ALL custom classes
- NO inline styles — every custom value becomes a class in product.css
- English only in code/comments
- No CDN, no new dependencies
- Alt text on ALL images; single h1 (stays in panel); no duplicate IDs; `x-cloak` on x-show
- `<!-- REPLACE WITH CLIENT PHOTOS -->` before every image
- `<!-- REPEAT: gallery thumbnail — loop over product gallery images -->` on the first thumb
- Section keeps `id="product-hero"`, `aria-labelledby="product-hero-title"`, `x-data="cgpProduct"`, `bg-cgp-bg-page` (lint rhythm unchanged)

### Task-Specific Rules — THE NEW HERO v3

**1. Panel higher (more overlap):**
- Panel wrapper: change `-mt-24 md:-mt-48` → `-mt-32 md:-mt-64` (128px mobile / 256px desktop overlap)
- Panel: `md:ms-auto md:max-w-xl` (end-anchored, NOT in a grid with thumbs anymore)
- Keep the panel content EXACTLY as-is (serial, eyebrow, h1, subtitle, price+stock, lifecycle, CTAs, trust strip) — do not change sizes/padding this round

**2. Thumbnails → own section BELOW the image (no overlap):**
- REMOVE the thumbnails from the panel grid (the `lg:grid-cols-12` wrapper with order-1/order-2)
- Create a NEW section after the panel wrapper:
  ```html
  <div class="cgp-container-lg mt-10 md:mt-14">
    <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[200px]" role="group" aria-label="Build photos">
      ...4 thumb buttons (bento spans below)...
    </div>
  </div>
  ```
- The 4 thumb buttons keep: `@click="s.setActive(i); s.openLightbox(i)"`, `:aria-current`, `aria-label`, img (lazy, object-cover, h-full w-full), label below

**3. Bento (asymmetric) grid — mixed sizes:**
- Desktop (md:grid-cols-4, md:auto-rows-[200px]):
  - Thumb 1: `md:col-span-2 md:row-span-2` (large — the hero shot)
  - Thumb 2: `md:col-span-2` (wide)
  - Thumb 3: `md:col-span-1`
  - Thumb 4: `md:col-span-1`
  - (Layout: row1 = big(2x2) + wide(2x1); row2 = big continues + 2 small(1x1 each) → fills 4×2 grid)
- Mobile (grid-cols-2):
  - Thumb 1: `col-span-2` (full width)
  - Thumb 2: `col-span-1`
  - Thumb 3: `col-span-1`
  - Thumb 4: `col-span-2` (full width)
- Images fill their cell: `h-full w-full object-cover` (aspect-video removed — the auto-rows + spans control the shape)
- Labels: keep below each image (`.cgp-gallery-thumb-label`), centered, mono micro

**4. CSS (product.css):**
- Update `.cgp-gallery-thumb` for bento: the button fills its grid cell (`h-full`), image `h-full w-full object-cover`, label below
- Keep active state (`[aria-current='true']` cyan border + glow) and hover
- Keep: cgp-hero-stage, cgp-hero-image, scrims, cgp-hero-open, cgp-dossier-card, cgp-lightbox-*, cgp-lifecycle-*, cgp-num
- No new hardcoded colors

**5. Mobile bar:** keep at the end of the hero section exactly as-is

## Constraints
- Do NOT run the build (orchestrator runs it after you)
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
- [ ] Panel overlaps image more (-mt-32 md:-mt-64), end-anchored, content unchanged
- [ ] Thumbnails in their own section BELOW the image (no overlap with the big image)
- [ ] Bento grid: desktop 4-col with 1 big (2x2) + 1 wide (2x1) + 2 small (1x1); mobile 2-col with full-width first/last
- [ ] Single h1, no dup IDs, all imgs have alt, REPLACE/REPEAT markers present
- [ ] No hardcoded hex/rgba