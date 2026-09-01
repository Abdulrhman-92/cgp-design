# Sub-agent Brief: Fix — add cache-busting to page CSS in buildHead

## Task
Add cache-busting (`?v=<mtime>`) to the per-page CSS links in `buildHead()` of `design/v1/js/build.js`. Currently only `tailwind.css` and `theme.css` get `?v=` — the page CSS (e.g. `product/css/product.css`) does NOT, so browsers serve stale cached CSS after edits (verified: server serves new CSS, browser uses old).

## Files to Read
- `design/v1/js/build.js` — the `buildHead()` function, specifically the `css` line:
  ```js
  const css = page.css.map((c) => `  <link rel="stylesheet" href="${rel(path.join(DESIGN_DIR, c))}">`).join('\n');
  ```
  and the `assetVersion()` helper (already used for tailwind/theme)

## Files You May Modify
- `design/v1/js/build.js` — ONE line change

## Files You MUST NOT Touch
- Everything else

## Task-Specific Rules
1. Change the `css` line to add `?v=${assetVersion(c)}`:
   ```js
   const css = page.css.map((c) => `  <link rel="stylesheet" href="${rel(path.join(DESIGN_DIR, c))}?v=${assetVersion(c)}">`).join('\n');
   ```
   - `assetVersion(c)` already takes a design/v1-relative path (same as the tailwind/theme calls) — verify it works for `product/css/product.css` etc.
2. This affects ALL pages (home, configurator, shop, product) — that's correct and desired (any page CSS edit now busts cache)
3. English only

## Verification
- `node --check design/v1/js/build.js` passes
- `node design/v1/js/build.js` — all 4 pages lint clean
- `grep "product.css" design/v1/product/index.html` → shows `product.css?v=<digits>`
- Browser hard-reload: `.cgp-sticky-cta` rule now applies (bar bg = #18181b, cyan hairline visible)

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}