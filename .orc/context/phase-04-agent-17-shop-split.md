# Sub-agent Brief: Split shop catalog section into 3 files (featured + filters + grid)

## Task
Split `design/v1/shop/sections/catalog.html` (110 lines — the biggest section file) into 3 smaller section files so the shop page source is more granular:
1. `featured.html` — section header (eyebrow + title) + featured unit spotlight
2. `filters.html` — filter bar + sort + count
3. `grid.html` — product grid + empty state

## Why it's safe
The shop's Alpine state lives in `Alpine.store('cgpShop')` and the `cgpShopPage` proxy exposes it via `get s() { return Alpine.store('cgpShop'); }` — so MULTIPLE elements with `x-data="cgpShopPage"` share the SAME store. Splitting into multiple sections keeps filters/grid/featured in sync.

## Lint constraint
The build lint fails on ADJACENT same-bg sections (`bg-cgp-bg-section`). Solution: the FIRST sub-section (featured) carries `bg-cgp-bg-section`; the other two use a new `cgp-section-continue` class (same background, lint-safe).

## Files to Read
- `design/v1/shop/sections/catalog.html` — the file to split (read FULLY)
- `design/v1/js/build.js` — PAGES.shop sections.main (update the list)
- `design/v1/shop/css/shop.css` — where to add the continue class
- `design/v1/shop/js/shop.js` — confirm the shared store pattern

## Files You May Modify
- CREATE `design/v1/shop/sections/featured.html`
- CREATE `design/v1/shop/sections/filters.html`
- CREATE `design/v1/shop/sections/grid.html`
- DELETE `design/v1/shop/sections/catalog.html`
- `design/v1/js/build.js` — PAGES.shop sections.main list
- `design/v1/shop/css/shop.css` — add `.cgp-section-continue`

## Files You MUST NOT Touch
- Everything else — theme assets, other pages, shop.js, shop-data.js

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/rgba
- Logical properties ONLY
- `cgp-` prefix on ALL custom classes
- NO inline styles
- English only in code/comments
- No CDN, no new dependencies
- `x-cloak` on all x-show; alt on all imgs; no duplicate IDs
- Keep ALL existing REPEAT/REPLACE/TODO markers in the moved content

### Task-Specific Rules

**1. featured.html** (keeps id="catalog" — the header nav links to #catalog):
```html
<!-- Featured unit — flagship spotlight (catalog part 1/3) -->
<section id="catalog" class="cgp-section bg-cgp-bg-section" aria-labelledby="catalog-title" x-data="cgpShopPage">
  <div class="cgp-container-lg">
    <div class="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p class="cgp-eyebrow">The Collection</p>
        <h2 id="catalog-title" class="text-cgp-display-4 font-bold leading-tight text-cgp-text-heading md:text-cgp-display-3">Fresh from the forge</h2>
      </div>
      <p class="font-mono text-cgp-micro uppercase tracking-cgp-04em text-cgp-text-muted">// RENDER_STAGE: ACTIVE</p>
    </div>
    <!-- featured unit block (x-show="s.featured && s.category === 'all'") — copy EXACTLY from catalog.html -->
  </div>
</section>
```

**2. filters.html**:
```html
<!-- Filter bar + sort (catalog part 2/3 — continues the section bg) -->
<section class="cgp-section cgp-section-continue" aria-label="Filter and sort" x-data="cgpShopPage">
  <div class="cgp-container-lg">
    <!-- filter bar + sort + count — copy EXACTLY from catalog.html -->
  </div>
</section>
```

**3. grid.html**:
```html
<!-- Product grid + empty state (catalog part 3/3 — continues the section bg) -->
<section class="cgp-section cgp-section-continue" aria-label="Product collection" x-data="cgpShopPage">
  <div class="cgp-container-lg">
    <!-- product grid + empty state — copy EXACTLY from catalog.html -->
  </div>
</section>
```

**4. shop.css** — add:
```css
/* Continues the previous section's background (multi-part sections) */
.cgp-section-continue {
  background: var(--cgp-bg-section);
}
```

**5. build.js** — PAGES.shop sections.main:
```js
main: [
  'shop/sections/hero.html',
  'shop/sections/featured.html',
  'shop/sections/filters.html',
  'shop/sections/grid.html',
  'shop/sections/upsell.html',
],
```

**6. Content fidelity:** copy the moved blocks EXACTLY (classes, bindings, markers, comments) — do NOT rewrite or "improve" them. Only the section wrapper + container change.

## Constraints
- Do NOT run the build (orchestrator runs it after you)
- Do NOT touch shop.js, shop-data.js, theme assets, or other pages

## Tool Policy
- ✅ Read any file
- ✅ Modify ONLY the files listed above
- ❌ Run git commands
- ❌ Touch anything else

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1", ...],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}

## Success Criteria
- [ ] 3 new section files created, catalog.html deleted
- [ ] Content copied EXACTLY (no rewrites, markers preserved)
- [ ] featured.html keeps id="catalog" + aria-labelledby="catalog-title" + bg-cgp-bg-section
- [ ] filters.html + grid.html use cgp-section-continue (lint-safe)
- [ ] build.js PAGES.shop updated with the 5-section list
- [ ] .cgp-section-continue added to shop.css
- [ ] No hardcoded hex/rgba, no inline styles