# Consultation Brief — Agent 01: Design & UX

## Role
Design & UX consultant for the CGP **Product page** (design/v1/product/) — the single-build detail page.

## Problem
Design a Product page that is: beautiful + distinctive (not generic e-commerce), marketing-strong, fast, and professional. It is the destination of the Shop page's "View the Build" buttons. Must feel like a luxury atelier showcase, not Amazon.

## Project Context (READ FIRST)
- `.orc/PROJECT.md` — project state + decisions log
- `AGENTS.md` — hard rules (single source of truth, tokens, logical properties, cgp- prefix, no CDN, reduced-motion, a11y, SEO/GEO, performance budget)
- `design-system.md` — canonical design system (colors, type, spacing, motion)
- `design/v1/shop/sections/catalog.html` — the Shop page the Product page links FROM (spec-sheet cards, cgp-spec-rows, badges, stock)
- `design/v1/shop/js/shop-data.js` — product data shape (id, type, name, subtitle, price, priceFrom, image, badge, stock, leadTime, featured, configurable, specs[])
- `design/v1/configurator/sections/` — terminal voice patterns (SYS_*, mono labels) used on configurator
- `wp-content/themes/cgp/assets/css/utilities.css` — shared classes available (pills, stock, spec rows, buttons)
- `wp-content/themes/cgp/assets/css/tokens.css` — color/type tokens

## Explore Freely
Read any file. No forced files. You are read-only.

## Deliverable (JSON)
Return findings + hypotheses + proposed_solutions + confidence. Focus on:
1. **Layout & composition** — distinctive hero for a single build (gallery? split? terminal spec sheet? cinematic?). How to make it feel "bespoke forge" not "product listing".
2. **Visual language** — how to reuse the established cyan/terminal/forge voice without repeating the Shop page. What makes THIS page feel different.
3. **Gallery & imagery** — how to present multiple build photos (thumbnails, angles, water-loop detail) within the performance budget (no heavy JS).
4. **Mobile experience** — sticky CTA bar? gallery swipe? spec accordion?
5. **RTL/Arabic readiness** — logical properties, direction-neutral layout.
6. **Accessibility** — contrast, focus, reduced-motion, semantic structure.

## Constraints
- English only in code/comments
- No new dependencies, no CDN
- Respect performance budget (≤1.5MB raw, images webp lazy)
- Must be WordPress-migratable (Gutenberg) — think in sections
- REPEAT markers for repeated blocks, `<!-- TODO: real permalink -->` for links

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
