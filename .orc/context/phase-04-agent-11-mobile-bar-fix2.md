# Sub-agent Brief: Fix 2 — mobile bar covers panel trust strip (correct fix)

## Task
The previous fix (pb-24 on the panel WRAPPER) did NOT work — the wrapper's padding-bottom adds space AFTER the panel, so the panel content stays in place. The real fix: add bottom padding to the panel's INNER content div so the trust strip moves UP above the sticky bar.

## Problem (verified at 375px)
- Panel card: 190-849px; sticky bar: 733-812px → 116px overlap
- Trust strip (last element): 715-828px → partially hidden behind the bar
- CTA (590-635) + WhatsApp (647-691) are fine — only the trust strip is covered

## Files to Read
- `design/v1/product/sections/hero.html` — the panel card: `<aside class="cgp-dossier-card md:ms-auto md:max-w-xl">` containing `<div class="p-5 md:p-6">` (the inner content div with serial, h1, price, lifecycle, CTAs, trust strip)

## Files You May Modify
- `design/v1/product/sections/hero.html` — the inner content div class + REVERT the wrapper pb-24

## Files You MUST NOT Touch
- Everything else — product.css, product.js, other sections, build.js, theme assets, the mobile bar

## Task-Specific Rules
1. REVERT the wrapper: `cgp-container-lg relative z-10 -mt-40 pb-24 md:-mt-96 md:pb-0` → `cgp-container-lg relative z-10 -mt-40 md:-mt-96` (remove the pb-24/md:pb-0 — it did nothing)
2. Inner content div: `p-5 md:p-6` → `p-5 pb-28 md:p-6 md:pb-6`
   - Mobile: pb-28 (112px) — pushes the trust strip up above the ~80px bar with margin
   - Desktop: md:pb-6 — unchanged
3. Change ONLY these two class strings — nothing else
4. English only

## Verification
- `node design/v1/js/build.js` — lint clean
- Browser at 375px: trust strip fully above the bar (trust.bottom ≤ bar.top); CTA + WhatsApp visible
- Desktop 1440px unchanged (panel overlap still ~63%)

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}