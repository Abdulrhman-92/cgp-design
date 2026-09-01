# Sub-agent Brief: Extract sticky bars into separate section files (product + configurator)

## Task
Extract the two sticky bottom bars from their parent sections into standalone section files, so the parent files stay clean and each bar is independently maintainable:
1. **Product sticky CTA bar** → `design/v1/product/sections/sticky-cta.html` (state moves to an Alpine store)
2. **Configurator mobile bar** → `design/v1/configurator/sections/mobile-bar.html` (reads the shared cgpConfig store)

## Why this is the right architecture
- The product bar currently lives inside `hero.html` and depends on `s.showStickyBar` from the `cgpProduct` component scope. Moving it out requires the state to live in a shared `Alpine.store('cgpSticky')` — the hero's scroll logic writes to the store, the bar reads it via `$store`.
- The configurator bar currently lives inside `matrix.html` and uses `c.*` from the `cgpConfigurator` proxy — which reads `Alpine.store('cgpConfig')`. The proxy is registered globally, so a standalone file with `x-data="cgpConfigurator"` works anywhere.

## Files to Read
- `design/v1/product/sections/hero.html` — the sticky bar markup at the end (inside `<section x-data="cgpProduct">`) + the `x-ref="dossierPanel"` on the aside
- `design/v1/product/js/product.js` — the `init()` scroll logic (sets `self.s.showStickyBar`) + the `s` object (has `showStickyBar: false`)
- `design/v1/configurator/sections/matrix.html` — the mobile bar markup at the end (inside `<section x-data="cgpConfigurator">`)
- `design/v1/configurator/js/configurator.js` — the `Alpine.store('cgpConfig')` + `Alpine.data('cgpConfigurator')` proxy pattern
- `design/v1/js/build.js` — PAGES.product + PAGES.configurator sections.main lists

## Files You May Modify
- CREATE `design/v1/product/sections/sticky-cta.html`
- CREATE `design/v1/configurator/sections/mobile-bar.html`
- `design/v1/product/sections/hero.html` — REMOVE the bar markup
- `design/v1/configurator/sections/matrix.html` — REMOVE the bar markup
- `design/v1/product/js/product.js` — move showStickyBar to a store
- `design/v1/js/build.js` — add the new sections to both manifests

## Files You MUST NOT Touch
- Everything else — theme assets, shop files, other sections, configurator.js (the store/proxy stay as-is)

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

**1. Product — new `sticky-cta.html`:**
```html
<!-- Sticky CTA bar — appears only after scrolling past the purchase panel.
     Standalone section: state lives in Alpine.store('cgpSticky') (product.js);
     the hero's scroll logic writes showStickyBar, this bar reads it via $store. -->
<div class="cgp-sticky-cta" x-show="$store.cgpSticky.showStickyBar" x-cloak x-transition.opacity.duration.200ms>
  <!-- copy the EXACT inner markup from the current bar in hero.html:
       cgp-container-lg flex ... price block + WhatsApp/Facebook share icons + Commission button -->
</div>
```
- `$store` works anywhere in the Alpine tree (no x-data needed on this div)
- Copy the inner content EXACTLY (price block, share icons with their TODO comments, Commission button with responsive spans)

**2. Product — `product.js` changes:**
- At `alpine:init`, register: `Alpine.store('cgpSticky', { showStickyBar: false });` (before or after the cgpProduct data — order doesn't matter)
- In the `s` object: REMOVE `showStickyBar: false` (no longer needed there)
- In the root `init()`: replace `self.s.showStickyBar = rect.bottom <= 0;` with `Alpine.store('cgpSticky').showStickyBar = rect.bottom <= 0;`
- Keep everything else (lightbox methods, s delegation, destroy cleanup)

**3. Product — `hero.html`:** remove the entire sticky bar block (the `<!-- Sticky CTA bar -->` comment + the div) from the end of the section. Keep the lightbox + `</section>`.

**4. Configurator — new `mobile-bar.html`:**
```html
<!-- Mobile sticky bar — standalone section (the #1 mobile conversion fix).
     Reads the shared cgpConfig store via the cgpConfigurator proxy (registered
     globally in configurator.js) — works outside the matrix section. -->
<div class="cgp-mobile-bar lg:hidden" x-data="cgpConfigurator">
  <!-- copy the EXACT inner markup from the current bar in matrix.html:
       cgp-container-sm flex ... Estimated Commission + total + toggle button + Summon CTA
       + expandable summary (x-show="c.summaryOpen" ...) -->
</div>
```

**5. Configurator — `matrix.html`:** remove the entire mobile bar block (the `<!-- Mobile sticky bar -->` comment + the div) from the end of the section. Keep `</section>`.

**6. `build.js` manifests:**
- PAGES.product sections.main: add `'product/sections/sticky-cta.html'` — AFTER `'product/sections/hero.html'` (first position after hero keeps the bar near its trigger; it's fixed-position so visual order is unaffected)
- PAGES.configurator sections.main: add `'configurator/sections/mobile-bar.html'` — AFTER `'configurator/sections/matrix.html'`
- Keep all other entries in order

**7. Lint safety:** both new files are `<div>`s (not `<section>`) — the lint bg-rhythm check only inspects `<section>` elements, so no adjacent-bg issues. No `id` attributes needed on the bars (avoid duplicate-ID risk).

## Constraints
- Do NOT run the build (orchestrator runs it after you) — but DO run `node --check design/v1/product/js/product.js`
- Do NOT touch configurator.js, shop files, theme assets, or other pages

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
- [ ] sticky-cta.html + mobile-bar.html created with EXACT copied content
- [ ] hero.html + matrix.html no longer contain the bar markup
- [ ] product.js: cgpSticky store registered, init() writes to the store, s.showStickyBar removed
- [ ] build.js: both manifests updated (product 5 sections, configurator 4 sections)
- [ ] node --check product.js passes
- [ ] No hardcoded hex/rgba, no inline styles, markers preserved