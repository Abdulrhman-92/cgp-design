# Sub-agent Brief: Fix 2 — product.js setActive binding

## Task
Fix `design/v1/product/js/product.js` — `setActive` currently does `this.s.active = i`, but when the template calls `s.setActive(i)`, `this` binds to the `s` proxy itself (receiver binding), so `this.s` is undefined → `TypeError: Cannot set properties of undefined (setting 'active')`.

## Files to Read
- `design/v1/shop/js/shop.js` — the CORRECT pattern: state lives INSIDE `s`, actions use `this.<prop> = ...` directly (e.g. `setCategory(id) { this.category = id; }`)
- `design/v1/product/js/product.js` — the file to fix

## Files You May Modify
- `design/v1/product/js/product.js` — change `setActive(i) { this.s.active = i; }` → `setActive(i) { this.active = i; }` (state `active` lives inside `s`, and `this` = `s` when invoked as `s.setActive(i)`)

## Files You MUST NOT Touch
- Everything else

## Task-Specific Rules
- ONE-LINE change only (plus comment if needed)
- English only

## Verification
- `node --check design/v1/product/js/product.js` passes
- `node design/v1/js/build.js` stays lint clean
- Browser: http://localhost:8080/design/v1/product/index.html — click a thumbnail → `s.active` updates, `aria-current` moves, 0 console errors

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}