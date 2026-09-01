# Sub-agent Brief: Fix — mobile nav island covers the panel CTA

## Task
Fix a mobile overlap regression: after raising the dossier panel (-mt-32 mobile), the floating nav island (fixed bottom-24) now covers the panel's primary CTA button ("Commission This Build") and the WhatsApp link on mobile. Verified at 375px: nav spans 645-716px, CTA spans 622-667px → overlap.

## Solution
Move the nav island to the TOP on mobile (standard pattern: top nav + bottom CTA bar). The mobile bar stays at the bottom. Push the hero breadcrumb down on mobile so it clears the top nav.

## Files to Read
- `design/v1/product/sections/header.html` — nav island positioning (line ~4: `fixed bottom-24 start-1/2 z-50 w-[90%] -translate-x-1/2 rtl:translate-x-1/2 md:bottom-auto md:top-8 md:w-auto`)
- `design/v1/product/sections/hero.html` — breadcrumb wrapper (`absolute top-0 start-0 z-10 p-6 md:p-10`)
- `design/v1/configurator/sections/header.html` — reference (has the same bottom-24 pattern — DO NOT change it, its content scrolls normally)

## Files You May Modify
- `design/v1/product/sections/header.html` — nav island mobile position
- `design/v1/product/sections/hero.html` — breadcrumb mobile top padding

## Files You MUST NOT Touch
- Everything else — configurator header (keep bottom-24), shop header, mobile bar, panel content, product.js, build.js

## Task-Specific Rules
1. **header.html** — change the nav island wrapper:
   - `fixed bottom-24 start-1/2 z-50 w-[90%] -translate-x-1/2 rtl:translate-x-1/2 md:bottom-auto md:top-8 md:w-auto`
   - → `fixed top-4 start-1/2 z-50 w-[90%] -translate-x-1/2 rtl:translate-x-1/2 md:top-8 md:w-auto`
   - (mobile: top-4; desktop: md:top-8 — unchanged)
2. **hero.html** — breadcrumb wrapper: `absolute top-0 start-0 z-10 p-6 md:p-10` → `absolute top-0 start-0 z-10 p-6 pt-24 md:p-10` (mobile pt-24 = 96px clears the ~71px top nav; desktop unchanged)
3. Keep everything else identical (nav content, mobile dropdown, mobile bar, panel)

## Verification
- `node design/v1/js/build.js` — lint clean
- Browser at 375px: nav island at top (16-87px), breadcrumb below it (≥96px), panel CTA (622-667px) NOT covered by nav, mobile bar at bottom (733-812px) — no overlaps
- Desktop 1440px unchanged (nav top-8, breadcrumb p-10)

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1", "path2"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}