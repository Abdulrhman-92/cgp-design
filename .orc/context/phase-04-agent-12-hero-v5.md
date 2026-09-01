# Sub-agent Brief: Hero v5 — responsive purchase panel (70% overlap desktop / no overlap mobile+tablet)

## Task
Make the dossier panel responsive per user feedback:
1. **Desktop (lg+):** panel overlaps the big image **~70%** (currently 63% via -mt-96)
2. **Mobile + tablet (< lg):** panel does NOT overlap the image at all — it appears AFTER the product display (image + thumbnails) as a full-width purchase card, in a different style (standalone buy-box below the gallery)

## Project Context (PATHS ONLY — sub-agent reads)
- `AGENTS.md` — hard rules (tokens only, logical properties, cgp- prefix, no inline styles, a11y, lint, layout carve-out: layout-only values like widths/clamp/vw MAY be hardcoded)
- `design-system.md` — canonical design system

## Files to Read
- `design/v1/product/sections/hero.html` — CURRENT hero (full-bleed stage + panel wrapper `-mt-40 md:-mt-96` + bento thumbs below + lightbox + mobile bar)
- `design/v1/product/css/product.css` — current page CSS (dossier-card, gallery-thumb, lightbox)

## Files You May Modify
- `design/v1/product/sections/hero.html` — hero layout restructure (responsive)
- `design/v1/product/css/product.css` — ONLY if a mobile-specific style tweak is needed (prefer Tailwind utilities)

## Files You MUST NOT Touch
- Everything else — product.js (lightbox/gallery logic unchanged), other sections, build.js, theme assets, the mobile bar

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/rgba (layout-only values like `30vw`, `rem`, `clamp` MAY be hardcoded per AGENTS.md carve-out)
- Logical properties ONLY (start/end, ms/me, ps/pe, border-s/e, text-start/end, gap)
- `cgp-` prefix on ALL custom classes
- NO inline styles — every custom value becomes a class in product.css
- English only in code/comments
- No CDN, no new dependencies
- Alt text on ALL images; single h1 (stays in panel); no duplicate IDs; `x-cloak` on x-show
- `<!-- REPLACE WITH CLIENT PHOTOS -->` before every image
- `<!-- REPEAT: gallery thumbnail — loop over product gallery images -->` on the first thumb
- Section keeps `id="product-hero"`, `aria-labelledby="product-hero-title"`, `x-data="cgpProduct"`, `bg-cgp-bg-page` (lint rhythm unchanged)

### Task-Specific Rules — THE RESPONSIVE HERO v5

**1. Panel wrapper — responsive overlap:**
- Current: `<div class="cgp-container-lg relative z-10 -mt-40 md:-mt-96">`
- New: `<div class="cgp-container-lg relative z-10 flex flex-col gap-6 lg:block lg:-mt-[30vw]">`
  - Mobile/tablet (< lg): `flex flex-col gap-6` — NO negative margin, panel flows normally below the image
  - Desktop (lg+): `lg:block lg:-mt-[30vw]` — 30vw ≈ 70% of the image height (image is full-bleed 21/9, so 0.7 × (9/21) × vw = 0.3 × vw — scales exactly at any desktop width)

**2. DOM order + mobile reorder (thumbs first, panel second on mobile):**
- Keep the PANEL `<aside>` FIRST in DOM (so on desktop `lg:block` the negative margin pulls the panel up over the image)
- Keep the THUMBNAILS div SECOND in DOM
- Add order classes for mobile flex:
  - Panel `<aside>`: add `order-2 lg:order-none` (mobile: second; desktop: block flow = first)
  - Thumbs div: add `order-1 lg:order-none lg:mt-14` (mobile: first; desktop: after panel with top margin)
- Result:
  - **Mobile/tablet:** image → thumbnails (bento) → purchase panel (full-width, below)
  - **Desktop:** image → panel overlapping 70% (end-anchored) → thumbnails below

**3. Panel — responsive styling:**
- Desktop: keep `md:ms-auto md:max-w-xl` (end-anchored dossier card)
- Mobile/tablet: full-width card (no max-w), NO overlap — it reads as a standalone purchase section below the gallery
- Keep the inner content EXACTLY as-is (serial, eyebrow, h1, subtitle, price+stock, lifecycle, CTAs, trust strip) — including the existing `p-5 pb-28 md:p-6 md:pb-6` (pb-28 keeps the trust strip clear of the sticky mobile bar)
- Keep the 1px cyan top accent bar

**4. Thumbnails — keep the bento grid as-is** (2-col mobile with full-width first/last, 4-col desktop with 2x2 + 2x1 + 1x1 + 1x1)

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
- [ ] Desktop (1440px): panel overlap ≈ 70% of image height (30vw)
- [ ] Mobile (375px) + tablet (768px): panel does NOT overlap the image; order = image → thumbnails → panel
- [ ] Panel full-width on mobile, end-anchored max-w-xl on desktop
- [ ] Single h1, no dup IDs, all imgs have alt, REPLACE/REPEAT markers present
- [ ] No hardcoded hex/rgba