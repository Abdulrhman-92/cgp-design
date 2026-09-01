# Consultation Brief — Agent 02: Marketing & Conversion

## Role
Marketing & conversion consultant for the CGP **Product page** (design/v1/product/) — the single-build detail page.

## Problem
Design the commercial layer of the Product page: it must convert a browser into a commission request. CGP is a luxury atelier (Riyadh, SAR pricing, inquiry-first — NO cart/checkout). The page must build trust, justify premium pricing, and drive the "Commission This Build" action.

## Project Context (READ FIRST)
- `.orc/PROJECT.md` — project state + decisions log (see Configurator Consultation Decisions: inquiry-first, no cart, WhatsApp share, minimum 10,000 SAR nudge, labor line)
- `AGENTS.md` — hard rules (no hardcoded contact data, `<!-- TODO: from site settings -->`, YEAR token, honeypot, cgp-btn-submit)
- `design-system.md` — canonical design system
- `design/v1/shop/sections/catalog.html` — how the Shop page presents price/stock/CTA ("View the Build", "Commission Your Own")
- `design/v1/shop/js/shop-data.js` — product data shape (price, priceFrom, stock, leadTime, badge, featured, configurable, specs[])
- `design/v1/configurator/sections/commission.html` — existing inquiry form pattern (honeypot + cgp-btn-submit "Submit Request")
- `design/v1/configurator/js/configurator.js` — WhatsApp share + localStorage blueprint patterns

## Explore Freely
Read any file. No forced files. You are read-only.

## Deliverable (JSON)
Return findings + hypotheses + proposed_solutions + confidence. Focus on:
1. **Pricing psychology** — how to display price (from-price? exact? "from X SAR"), price anchoring, the 10,000 SAR minimum nudge, labor/forging time transparency.
2. **Trust & credibility** — what builds trust for a luxury atelier: forge time, stock status, guarantee, craftsmanship story, client-proof (without fake testimonials — mockup).
3. **Primary CTA** — "Commission This Build" pre-filled inquiry (which build, which specs). Secondary CTAs (WhatsApp share, "Configure Your Own" cross-link to configurator).
4. **Urgency & scarcity** — stock levels (in/low/order), lead time, limited builds — how to use without being cheap/tacky.
5. **Cross-sell / upsell** — related builds, bespoke upgrade nudge, "this build + custom loop" upsell.
6. **Commercial compliance** — SAR only, no fake prices, no fake reviews, honest stock labels, no cart (inquiry model), GDPR-ish form notes (mockup).

## Constraints
- English only in code/comments
- No hardcoded contact data (phone/email/socials → `<!-- TODO: from site settings -->`)
- No fake testimonials/reviews — real forge-voice copy only
- Must be WordPress-migratable (Gutenberg)
- REPEAT markers for repeated blocks

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
