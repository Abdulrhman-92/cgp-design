# Sub-agent Brief: Fix — CTA button not full width (w-full + inline-flex conflict)

## Task
The Commission button in the buy-box is 398px but its parent is 446px — `w-full` (width: 100%) doesn't stretch an `inline-flex` element correctly. Fix: add `flex` (display: flex) alongside `w-full` so the button fills the parent width.

## Problem (verified)
- `.cgp-btn-primary` has `display: inline-flex` (from utilities.css)
- `w-full` = `width: 100%` — on an inline-flex element, the width resolves against the parent's content box, but the button's own `padding-inline: 24px` + `box-sizing: border-box` makes it render at 398px instead of 446px
- Adding `flex` (display: flex) makes the width: 100% resolve correctly

## Files to Read
- `design/v1/product/sections/hero.html` — line 86: `<a href="{{CONFIG_URL}}" class="cgp-btn-primary cgp-magnetic w-full" data-magnetic>Commission This Build</a>`

## Files You May Modify
- `design/v1/product/sections/hero.html` — ONE class addition

## Files You MUST NOT Touch
- Everything else — utilities.css (do NOT change .cgp-btn-primary), product.css, product.js, other sections

## Task-Specific Rules
1. Change `class="cgp-btn-primary cgp-magnetic w-full"` → `class="cgp-btn-primary cgp-magnetic flex w-full"`
2. Nothing else changes
3. English only

## Verification
- `node design/v1/js/build.js` — lint clean
- Browser at 1440px: button width ≈ parent inner width (446px, not 398px)

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}