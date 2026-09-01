# Phase 04 — Product Page (The Build Dossier)

## Objective
Build `design/v1/product/` — the single-build detail page for The Hotwheel, destination of the Shop's "View the Build" links. Concept: "The Build Dossier" (serial-numbered case file, not a product listing).

## Agreed Design (consultation Round 1 — converged)
- Dossier hero (gallery stage + file-card panel + forge-time lifecycle) → The Blueprint (spec table + price breakdown + telemetry SVG) → Forge Log (provenance timeline + guarantee) → From the Same Forge (related + bespoke band) → Commission This Build (pre-filled inquiry)
- Conversion via transparency: exact SAR price + visible labor line + honest stock labels; no fake reviews/urgency
- Schema: Product + Offer + BreadcrumbList (reuse @ids, NO AggregateRating)
- LCP: eager hero image + fetchpriority=high; RTL: cgp-num (unicode-bidi isolate) on numeric readouts
- Mobile: sticky bar (theme cgp-mobile-bar) + spec table → details accordions

## Agents
- Agent 1 (infrastructure): build.js PAGES.product + og:type/og:price + {{PRODUCT_URL}} + shop Hotwheel link
- Agent 2 (sections): 6 section files under product/sections/
- Agent 3 (assets): product/css/product.css + product/js/product.js

## Checklist
- [ ] build.js lint clean (exit 0, 0 warnings)
- [ ] 0 console errors in browser
- [ ] Single h1, no dup IDs, images load
- [ ] Gallery swap + WhatsApp share work
- [ ] Mobile 375px + desktop 1440px check
- [ ] Screenshots → screenshots/preview/

## Handoff Notes
- NO git commit without user authorization
- Distro Plate price mismatch (1,200 vs 1,500) still open — do not touch