# Sub-agent Brief: Product Page — Build System Infrastructure

## Task
Extend `design/v1/js/build.js` with the `product` page manifest entry, product-aware Open Graph output, and a `{{PRODUCT_URL}}` token; then wire The Hotwheel's "View the Build" link in the shop to the new page.

## Project Context (PATHS ONLY — sub-agent reads)
- `.orc/PROJECT.md` — project state + decisions log
- `AGENTS.md` — hard rules (build system, lint, tokens, no hardcoded paths)

## Files to Read
- `design/v1/js/build.js` — PAGES manifest, buildHead(), resolveSection(), lint (read FULLY)
- `design/v1/shop/sections/catalog.html` — the "View the Build" links (featured unit + grid cards)
- `design/v1/template.html` — page skeleton

## Files You May Modify
- `design/v1/js/build.js` — add product entry + og extension + productUrl token
- `design/v1/shop/sections/catalog.html` — Hotwheel featured-unit link only

## Files You MUST NOT Touch
- Everything else — especially `design/v1/product/**` (created by another agent in parallel), theme assets, other pages' sections

## Rules (Mandatory)

### Project-Wide Rules
- English only in code/comments
- No hardcoded paths — use the existing path.relative patterns
- Backward compatible: existing pages must build identically

### Task-Specific Rules
1. **PAGES.product entry** (exact values):
   - `output: 'product/index.html'`
   - `title: 'The Hotwheel | CGP Bespoke Water-Cooled PC — Riyadh'`
   - `description: 'The Hotwheel — CGP\'s legendary circular chassis. RTX 5090, Ryzen 9 9950X, dual cryo-loop. 25,000 SAR, forged in Riyadh. Inquire at The Bespoke Forge.'`
   - `canonical: 'https://cgp.sa/product/the-hotwheel/'`
   - `ogImage: 'https://cgp.sa/assets/images/hotwheel.webp'` (absolute — deep page)
   - `ogType: 'product'`, `ogPrice: { amount: '25000', currency: 'SAR' }`
   - `css: ['product/css/product.css']`
   - `js: ['main.js', 'product/js/product.js']`
   - `sections: { header: 'product/sections/header.html', main: ['product/sections/hero.html', 'product/sections/specs.html', 'product/sections/forge-log.html', 'product/sections/related.html', 'product/sections/inquiry.html'], footer: 'shared' }`
2. **Schema @graph** — reuse the Organization + ComputerStore/LocalBusiness nodes VERBATIM from the shop entry (same @ids), then add:
   - Product node: `{ '@type': 'Product', '@id': 'https://cgp.sa/product/the-hotwheel/#product', name: 'The Hotwheel', description: 'Legendary circular chassis — RTX 5090, Ryzen 9 9950X, dual cryo-loop.', image: 'https://cgp.sa/assets/images/hotwheel.webp', sku: 'unit-hotwheel', brand: { '@id': 'https://cgp.sa/#organization' }, offers: { '@type': 'Offer', url: 'https://cgp.sa/product/the-hotwheel/', priceCurrency: 'SAR', price: '25000', availability: 'https://schema.org/InStock', itemCondition: 'https://schema.org/NewCondition', seller: { '@id': 'https://cgp.sa/#store' }, areaServed: { '@type': 'Country', name: 'Saudi Arabia' } } }`
   - NO AggregateRating, NO priceValidUntil (fake ratings/dates are forbidden)
   - BreadcrumbList node: Home (https://cgp.sa/) > Shop (https://cgp.sa/shop/) > The Hotwheel (canonical)
3. **buildHead() og extension** (backward compatible): `const ogType = page.ogType || 'website';` emit `og:type` from it; when `ogType === 'product'` also emit `og:price:amount` + `og:price:currency` from `page.ogPrice`.
4. **resolveSection()**: add `productUrl` token following the exact `shopUrl` pattern (path.relative from pageRoot to `design/v1/product/index.html`).
5. **catalog.html**: The Hotwheel featured-unit "View the Build" → `href="{{PRODUCT_URL}}"` (remove the `<!-- TODO: real permalink -->` above it). Grid-card "View the Build" links stay `href="#"` + TODO (template-driven, other units have no page yet).

### File-Specific Rules
- Match existing code style in build.js (const, arrow functions, template literals)
- Keep the manifest comment conventions (`// absolute — page lives one level deep`)

## Constraints
- Do NOT run `node design/v1/js/build.js` — it will fail (product sections don't exist yet; another agent creates them in parallel). Verify syntax with `node --check design/v1/js/build.js` instead.
- No new dependencies

## Tool Policy
- ✅ Read any file
- ✅ Modify only the 2 files listed above
- ❌ Run git commands
- ❌ Touch anything else

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1", "path2"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}

## Success Criteria
- [ ] `node --check design/v1/js/build.js` passes
- [ ] PAGES.product present with all fields above
- [ ] og:type/og:price emitted only for product page
- [ ] {{PRODUCT_URL}} token resolves like the others
- [ ] Hotwheel featured link → {{PRODUCT_URL}}, grid links untouched