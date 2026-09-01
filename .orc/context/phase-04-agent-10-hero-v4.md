# Sub-agent Brief: Hero v4 — panel overlap > half the image

## Task
Raise the dossier panel so it overlaps MORE than half the big image height. Currently `-mt-64` (256px) on desktop where the image is 611px tall (42% overlap). Target: ~63% overlap (384px) on desktop, proportionally on mobile.

## Files to Read
- `design/v1/product/sections/hero.html` — the panel wrapper (find `-mt-32 md:-mt-64`)
- `design/v1/product/css/product.css` — check if any margin is set in CSS (should be Tailwind utilities only)

## Files You May Modify
- `design/v1/product/sections/hero.html` — ONE class change

## Files You MUST NOT Touch
- Everything else — product.css, product.js, other sections, build.js, theme assets

## Task-Specific Rules
1. Panel wrapper: `-mt-32 md:-mt-64` → `-mt-40 md:-mt-96`
   - Mobile: -mt-40 (160px) — mobile image is ~281px tall (aspect-[4/3] at 375px) → 57% overlap
   - Desktop: -mt-96 (384px) — image is 611px tall (aspect-[21/9] at 1440px) → 63% overlap
2. Change ONLY the margin classes — nothing else (panel content, breadcrumb, thumbs, lightbox, mobile bar all unchanged)
3. English only

## Verification
- `node design/v1/js/build.js` — lint clean
- Browser at 1440px: panel overlap > 305px (half of 611px image); breadcrumb pill (top-start) NOT covered by panel (panel is end-anchored, max-w-xl — verify no collision)
- Browser at 375px: panel overlap > 140px (half of ~281px image); mobile bar + nav island not covered

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}