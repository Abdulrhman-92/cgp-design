# Sub-agent Brief: Fix — nav island overlaps mobile bar on mobile

## Task
Fix the mobile overlap between the floating nav island and the sticky mobile bar on the configurator and product pages.

## Problem
Both page-specific headers use `fixed bottom-6 start-1/2 z-50 ... md:bottom-auto md:top-8` for the nav island, while the `cgp-mobile-bar` is `fixed bottom-0 z-40` (~80px tall). On mobile, the nav island (bottom-6 = 24px) sits INSIDE the mobile bar's zone and covers its right side — hiding the conversion CTA ("Commission" / "Summon") behind the "INQUIRE" pill. Verified at 375px: nav island spans 717-788px, mobile bar 733-812px → 55px overlap.

## Files to Read
- `design/v1/configurator/sections/header.html` — line 4 (the fixed positioning)
- `design/v1/product/sections/header.html` — line 4 (the fixed positioning)
- `wp-content/themes/cgp/assets/css/utilities.css` — .cgp-mobile-bar (bottom: 0, ~80px tall)

## Files You May Modify
- `design/v1/configurator/sections/header.html` — ONE class change
- `design/v1/product/sections/header.html` — ONE class change

## Files You MUST NOT Touch
- Everything else — home/shop headers (they have NO mobile bar — keep bottom-6), utilities.css, sections

## Task-Specific Rules
- Change ONLY the mobile bottom offset: `bottom-6` → `bottom-24` (96px — floats the island ABOVE the ~80px mobile bar with ~16px clearance)
- Keep `md:bottom-auto md:top-8` (desktop unchanged)
- Keep z-50, start-1/2, -translate-x-1/2, rtl:translate-x-1/2, w-[90%] exactly as-is
- English only

## Verification
- `node design/v1/js/build.js` — lint clean
- Browser at 375px: nav island bottom ≤ mobile bar top (no overlap), both visible, "Commission"/"Summon" button fully visible

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1", "path2"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}