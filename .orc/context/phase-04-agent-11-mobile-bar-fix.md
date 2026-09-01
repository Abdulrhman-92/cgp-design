# Sub-agent Brief: Fix — mobile bar covers panel trust strip

## Task
Fix a mobile overlap: the sticky mobile bar (fixed bottom-0, ~80px) covers the bottom of the dossier panel (the trust strip) on mobile. Verified at 375px: panel bottom = 849px, bar top = 733px → 117px overlap; the trust strip (715-828px) is partially hidden behind the bar.

## Solution
Add bottom padding to the panel wrapper on mobile so the panel content clears the sticky bar. The panel wrapper is the `cgp-container-lg relative z-10 -mt-40 md:-mt-96` div.

## Files to Read
- `design/v1/product/sections/hero.html` — the panel wrapper + panel card

## Files You May Modify
- `design/v1/product/sections/hero.html` — ONE class addition

## Files You MUST NOT Touch
- Everything else — product.css, product.js, other sections, build.js, theme assets, the mobile bar itself

## Task-Specific Rules
1. Panel wrapper: `cgp-container-lg relative z-10 -mt-40 md:-mt-96` → `cgp-container-lg relative z-10 -mt-40 pb-24 md:-mt-96 md:pb-0`
   - Mobile: pb-24 (96px) — clears the ~80px bar with margin
   - Desktop: md:pb-0 — unchanged (no bar on desktop)
2. Change ONLY the wrapper classes — nothing else
3. English only

## Verification
- `node design/v1/js/build.js` — lint clean
- Browser at 375px: panel bottom ≤ bar top (no overlap); trust strip fully visible; CTA + WhatsApp visible
- Desktop 1440px unchanged

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}