# Sub-agent Brief: Fix — product.js missing `s` proxy wrapper

## Task
Fix `design/v1/product/js/product.js` — the hero template (`design/v1/product/sections/hero.html`) accesses the gallery state via `s.images`, `s.active`, `s.setActive(i)` (the established shop/configurator proxy convention: `Alpine.data('cgpShopPage')` returns `{ s: {...} }`, `Alpine.data('cgpConfigurator')` returns `{ c: {...} }`), but the current product.js returns the state directly — causing `ReferenceError: s is not defined` in the browser.

## Files to Read
- `design/v1/product/js/product.js` — the file to fix
- `design/v1/shop/js/shop.js` — the `{ s: {...} }` proxy pattern to mirror
- `design/v1/product/sections/hero.html` — the template contract (s.images, s.active, s.setActive)

## Files You May Modify
- `design/v1/product/js/product.js` — wrap the returned object in `s` (keep the same state/actions inside)

## Files You MUST NOT Touch
- Everything else — especially hero.html (its contract is correct)

## Task-Specific Rules
- Return shape must be: `{ s: { active: 0, images: [...4 entries...], setActive(i) { this.s.active = i; } } }` — note `this.s.active` inside setActive (Alpine proxies `this` to the root)
- Keep the IMG_BASE relative-path convention and comments
- English only

## Verification
- `node --check design/v1/product/js/product.js` passes
- Rebuild: `node design/v1/js/build.js` (must stay lint clean)
- Browser check: open http://localhost:8080/design/v1/product/index.html — 0 console errors, gallery thumbnails clickable

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}