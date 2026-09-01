# Sub-agent Brief: Fix — sticky-cta needs x-data to evaluate $store

## Task
The product sticky bar (`design/v1/product/sections/sticky-cta.html`) does not appear after scrolling. Root cause: the `x-show="$store.cgpSticky.showStickyBar"` expression is NOT evaluated because the `<div>` has no `x-data` — Alpine only evaluates expressions inside an Alpine-initialized scope (an element with `x-data` or a descendant of one). The bar is a standalone top-level div with no x-data ancestor.

## Fix
Add an empty `x-data` to the sticky bar div so Alpine initializes it and evaluates `$store`:
```html
<div class="cgp-sticky-cta" x-data x-show="$store.cgpSticky.showStickyBar" x-cloak x-transition.opacity.duration.200ms>
```
- `x-data` (empty) creates a fresh Alpine scope on the element → `$store` magic resolves → `x-show` reacts to store changes
- The store is registered in product.js at alpine:init, so it exists by the time Alpine evaluates

## Files to Read
- `design/v1/product/sections/sticky-cta.html` — the bar div (add x-data)

## Files You May Modify
- `design/v1/product/sections/sticky-cta.html` — ONE attribute addition

## Files You MUST NOT Touch
- Everything else — product.js, hero.html, build.js, configurator files

## Task-Specific Rules
1. Change `<div class="cgp-sticky-cta" x-show=...` → `<div class="cgp-sticky-cta" x-data x-show=...`
2. Nothing else changes
3. English only

## Verification
- `node design/v1/js/build.js` — lint clean
- Browser at 1440px: scroll past the dossier panel → bar appears (display: block); scroll back → hidden

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}