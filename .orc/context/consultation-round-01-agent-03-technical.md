# Consultation Brief — Agent 03: Technical, SEO/GEO & Security

## Role
Technical consultant for the CGP **Product page** (design/v1/product/) — the single-build detail page. Covers performance, SEO/GEO, security, and WordPress migration.

## Problem
The Product page must be fast (performance budget), rankable (SEO) + locally relevant (GEO — Riyadh/SA), and secure-by-design (no real data submission in mockup, no leaks, no tracking). It must integrate with the existing build system and Alpine patterns.

## Project Context (READ FIRST)
- `.orc/PROJECT.md` — project state + decisions log
- `AGENTS.md` — hard rules (SEO/GEO section, performance budget, build system, lint pass, no CDN, no hardcoded contact data)
- `design/v1/js/build.js` — the multi-page build system (PAGES manifest, tokens {{THEME_ASSETS}}/{{PAGE_ASSETS}}/{{HOME_URL}}/{{CONFIG_URL}}/{{SHOP_URL}}, head generation, lint)
- `design/v1/template.html` — page template skeleton
- `design/v1/shop/js/shop-data.js` — product data shape (id, type, name, subtitle, price, priceFrom, image, badge, stock, leadTime, featured, configurable, specs[])
- `design/v1/configurator/js/configurator.js` — Alpine.store pattern + localStorage + WhatsApp share
- `wp-content/themes/cgp/assets/js/main.js` — theme JS (cursor, magnetic, tilt, reveals, count-up, nav)
- `wp-content/themes/cgp/assets/css/tokens.css` + `base.css` — tokens + base rules

## Explore Freely
Read any file. No forced files. You are read-only.

## Deliverable (JSON)
Return findings + hypotheses + proposed_solutions + confidence. Focus on:
1. **SEO** — schema.org for a product/build (Product + Offer + AggregateRating? — careful: no fake reviews), title/meta pattern, canonical, OG/Twitter with real image, semantic headings (single h1), JSON-LD placement.
2. **GEO (local)** — geo meta (SA/Riyadh), LocalBusiness/Organization schema tie-in, how the Product page reinforces local relevance without spam.
3. **Performance** — image strategy (webp, lazy, width/height, CLS), JS budget (Alpine store vs static data), no render-blocking, how many sections/requests.
4. **Security** — mockup form safety (honeypot, no real submission, no PII collection), no external requests, no tracking pixels, safe WhatsApp share (no data exfiltration), CSP-friendly.
5. **Build system integration** — PAGES.product entry, page-specific header, tokens, lint compliance (single h1, no dup IDs, no hardcoded token hex, alt on imgs, no adjacent same-bg sections).
6. **WordPress migration** — how the page maps to Gutenberg (single-product template, CPT, ACF/JSON post meta), data source (reuse shop-data.js shape → WP product CPT).

## Constraints
- English only in code/comments
- No new dependencies, no CDN
- Respect performance budget (≤1.5MB raw / ≤700KB gzip)
- Must pass build.js lint (exit 0, 0 warnings)
- No fake reviews/ratings in schema

## Output Format
Return a JSON object:
{
  "status": "success",
  "findings": ["..."],
  "hypotheses": ["..."],
  "proposed_solutions": ["..."],
  "confidence": "high|medium|low",
  "summary": "1-2 sentences"
}
