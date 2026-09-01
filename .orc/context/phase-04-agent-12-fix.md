# Sub-agent Brief: Fix — move thumbnails INSIDE the flex wrapper so order works

## Task
The mobile/tablet reorder (thumbs first, panel second) is NOT working because the thumbnails div is a SIBLING of the panel wrapper, not a child. The `order-1` on the thumbs div does nothing (it's not a flex item). Fix: move the thumbnails div INSIDE the panel wrapper (as the second child, after the aside).

## Problem (verified at 768px)
- Panel wrapper: `<div class="cgp-container-lg relative z-10 flex flex-col gap-6 lg:block lg:-mt-[30vw]">` contains ONLY the `<aside>` (order-2)
- Thumbs div: `<div class="cgp-container-lg order-1 lg:order-none mt-10 md:mt-14 lg:mt-14">` is a SEPARATE sibling AFTER the wrapper
- Result: mobile/tablet renders panel first, thumbs second (WRONG — user wants image → thumbnails → panel)

## Files to Read
- `design/v1/product/sections/hero.html` — the panel wrapper (line ~44) + the thumbs div (line ~106)

## Files You May Modify
- `design/v1/product/sections/hero.html` — restructure the wrapper to contain both aside + thumbs

## Files You MUST NOT Touch
- Everything else — product.css, product.js, other sections, build.js, theme assets, the mobile bar

## Task-Specific Rules
1. MOVE the entire thumbnails div (the `cgp-container-lg order-1 lg:order-none mt-10 md:mt-14 lg:mt-14` block containing the bento grid) INSIDE the panel wrapper, right after the `</aside>` and before the wrapper's closing `</div>`
2. When moving it inside, REMOVE the `cgp-container-lg` class from the thumbs div (it's now inside the container — nested container would double-constrain). New class: `order-1 lg:order-none mt-10 md:mt-14 lg:mt-14`
3. Final structure:
   ```html
   <div class="cgp-container-lg relative z-10 flex flex-col gap-6 lg:block lg:-mt-[30vw]">
     <aside class="cgp-dossier-card order-2 lg:order-none md:ms-auto md:max-w-xl">...</aside>
     <div class="order-1 lg:order-none mt-10 md:mt-14 lg:mt-14">
       <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[200px]" role="group" aria-label="Build photos">...4 thumbs...</div>
     </div>
   </div>
   ```
4. Result:
   - Mobile/tablet (flex-col): thumbs (order-1) first, panel (order-2) second → image → thumbnails → panel ✓
   - Desktop (lg:block): aside first (pulled up by -mt-[30vw] → 70% overlap), thumbs after with lg:mt-14 ✓
5. Change ONLY this structure — nothing else (bento grid, thumb buttons, panel content, lightbox, mobile bar all unchanged)
6. English only

## Verification
- `node design/v1/js/build.js` — lint clean
- Browser at 375px + 768px: thumbs render BEFORE the panel (thumbs.top < panel.top); panel below image (no overlap)
- Browser at 1440px: panel overlaps image ~70%; thumbs below panel

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}