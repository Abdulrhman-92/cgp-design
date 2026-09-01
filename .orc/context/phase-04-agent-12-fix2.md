# Sub-agent Brief: Fix — tablet panel should be full-width (lg-only max-w)

## Task
On tablet (768px, md breakpoint), the dossier panel is 576px (md:max-w-xl applies) instead of full-width. The user wants mobile AND tablet to show the purchase panel full-width below the gallery. Fix: make the panel's `ms-auto` + `max-w-xl` apply only at lg+ (1024px).

## Files to Read
- `design/v1/product/sections/hero.html` — the panel `<aside>` class

## Files You May Modify
- `design/v1/product/sections/hero.html` — ONE class change

## Files You MUST NOT Touch
- Everything else

## Task-Specific Rules
1. Panel `<aside>`: `cgp-dossier-card order-2 lg:order-none md:ms-auto md:max-w-xl` → `cgp-dossier-card order-2 lg:order-none lg:ms-auto lg:max-w-xl`
   - md: → lg: on both ms-auto and max-w-xl
   - Result: mobile + tablet = full-width panel below gallery; desktop (lg+) = end-anchored max-w-xl overlapping 70%
2. Change ONLY this class string — nothing else
3. English only

## Verification
- `node design/v1/js/build.js` — lint clean
- Browser at 768px: panel width ≈ container width (full-width, not 576px)
- Browser at 1440px: panel still 576px end-anchored, 70% overlap

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}