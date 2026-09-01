# Project: CGP — Homepage Design v1 (HTML mockup)

## Description

CGP (cgp.sa) is a Saudi luxury PC building atelier ("The Bespoke Forge") — custom water-cooled, handcrafted PC architectures for elite clients. We are designing a stunning homepage HTML mockup (design/v1) that will be presented to the client. WordPress implementation comes later.

## Approved Plan

- **Phase 0: Consultation** ✅ — 3 agents (design direction, brand/images, technical) + ui-ux-pro-max skill applied
- **Phase 1: Foundation** — base.css + motion.css (SHARED rules + SHARED animations), vendor libs (local), design/v1 scaffold + build.js, docs
- **Phase 2: Sections** — 10 section files (header, hero, vision, showcase, metrics, gallery, shop, blog, inquiry, footer) + kinetic layer
- **Phase 3: Assembly** — index.html + main.js + custom.css + SEO/GEO meta
- **Phase 4: Verification** — Playwright screenshots → screenshots/preview/, interactions, responsive, performance budget, SEO audit

## Current State

- **Last completed:** Homepage ✅ (3cb7772) + Configurator ✅ (7113f89) + CSS de-dup cleanup ✅ (2d4f35c) + Shop ✅ (4dfbb70, a295c13, 6cf430d) + Product page ✅ (10b9af6)
- **In progress:** Contact page build (consultation ✅ 2026-09-01, build started — SEO content first per user)
- **Blocked:** —

## Next Step

> Contact page build → About page → Blog page. (Archives page DROPPED — user decision 2026-09-01.)

## Contact Page Consultation Decisions (2026-09-01, /go-cons Round 1 — converged)

- **Concept:** "Open A Channel" — Forge Comms Console. Voice sequence: boot (home) → matrix (configurator) → dossier (product) → channel (contact).
- **Priority:** Contact → About → Blog (user decision; Archives dropped). User priority: SEO-appropriate marketing content FIRST.
- **Structure (4 sections, user removed FAQ + detailed success):** hero (`// SYS_CONTACT`, "Open A Channel / To The Forge.", CSS signal rings, status strip FORGE OPERATIONAL · RESPONSE < 24H · RIYADH, dual CTA) → The Commission Desk (split: form + "what happens next" 3-step panel; fields: name/email/phone-WhatsApp optional/project-type chips/budget SAR select/preferred channel/details; honeypot; simple one-line success "TRANSMISSION RECEIVED — THE MASTERS HAVE BEEN SUMMONED" — NO echo summary) → The Direct Lines (3 channel cards: WhatsApp primary/phone/email, `<!-- TODO: from site settings -->`) → The Forge Door (Riyadh address, hours Su-Th 10:00-22:00, "Visits by appointment", stylized SVG map ~2KB, socials).
- **Conversion:** form = ONE primary action (structured data); WhatsApp = secondary escape hatch with pre-filled `wa.me/<number>?text=` template (number behind site-settings TODO); email tertiary. Response promise "within 24 hours" in hero + form microcopy + success. No countdowns, no pressure.
- **Form:** terminal frame evolution — label `// SYS_COMMISSION_DESK`, split layout, chips for project type + timeline feel tactile (budget stays select), ≤6 visible fields, honeypot mandatory, simulated success only.
- **Schema:** ContactPage (@id /contact/#page, mainEntity→#store, about→#store) + ContactPoint on #store (contactType sales, telephone placeholder, areaServed SA, availableLanguage en/ar) + BreadcrumbList Home→Contact. Reuse #organization/#store verbatim. NO AggregateRating.
- **SEO:** title 'Contact CGP | The Bespoke Forge — Riyadh, Saudi Arabia' (~55 chars); description ~155 chars (commission bespoke water-cooled PC, Riyadh, 24 hours); canonical https://cgp.sa/contact/; ogImage absolute; geo meta inherited from buildHead.
- **Map:** stylized SVG (dark, cyan pin, ~2-5KB inline) in mockup — NO Google Maps embed (no-CDN + budget). WP: lazy iframe or keep SVG.
- **Build:** PAGES entry `contact` (output contact/index.html, css ['contact/css/contact.css'], js ['main.js'] — form is inline Alpine, no page JS); NEW {{CONTACT_URL}} token in resolveSection; page-specific header contact/sections/header.html (configurator pattern); footer CTA fix: "Summon The Masters" href="#inquiry" → {{CONTACT_URL}} (pre-existing subpage bug — #inquiry anchor doesn't exist on subpages).
- **A11y upgrades:** visible error messages (aria-describedby + aria-invalid), focus() to success panel, labels + autocomplete, x-cloak, single h1.
- **WP migration:** Contact Form 7 (free, wpcf7mailsent → terminal success panel) + Customizer (get_theme_mod) for contact data + theme-owned JSON-LD in wp_head — $0 spent.

## Product Page Consultation Decisions (2026-09-01, /go-cons Round 1 — converged)

- **Concept:** "The Build Dossier" — serial-numbered case file (CGP-2026-004), NOT a product listing. Anti-Amazon device: serial identity + provenance + forge log.
- **Unit:** The Hotwheel (flagship, 25,000 SAR, RTX 5090, Ryzen 9 9950X, 64GB DDR5, Dual Cryo-Loop, stock 'in' → READY — ships 3-5 days)
- **Structure:** dossier hero (gallery stage 7 cols + file-card panel 5 cols + forge-time lifecycle FORGED→TESTED→READY) → The Blueprint (spec table grouped CORE/MEMORY/STORAGE/LOOP/CHASSIS + price breakdown parts 23,500 + labor 1,500 = 25,000 + static SVG telemetry) → Forge Log (provenance timeline FORGED→LEAK TEST→BURN-IN→SEALED + master signature + CGP Guarantee strip) → From the Same Forge (3 related archive cards + "This Build, But Yours" bespoke band) → Commission This Build (pre-filled dossier blueprint + honeypot form + simulated success)
- **Conversion:** transparency not pressure — exact SAR price, visible labor line, honest stock labels (READY/LAST UNIT/IN THE FORGE), no countdowns, no fake reviews
- **CTA:** "Commission This Build" → #inquiry (pre-filled); secondary: Configure Your Own (configurator), WhatsApp share (wa.me/?text=, no phone)
- **Schema:** Product + Offer (SAR, InStock, seller→#store, areaServed SA) + BreadcrumbList — NO AggregateRating, NO priceValidUntil; reuses existing @ids
- **SEO:** og:type=product + og:price (buildHead extension, backward compatible); canonical /product/the-hotwheel/; eager hero image + fetchpriority=high (LCP)
- **RTL:** .cgp-num (unicode-bidi: isolate) + dir="ltr" on all numeric readouts
- **Mobile:** sticky bar (price + READY + Commission) + nav island lifted to bottom-24 (overlap fix — applied to configurator too)
- **Data:** static HTML (crawler-visible) + product.js Alpine.data('cgpProduct') { s: { images[4], active, setActive } } — click-driven, no timers
- **WP migration:** WooCommerce single-product template; REPEAT markers → wc_get_related_products() + product attributes; gallery → product_gallery; header override → header-product.php

## Configurator Consultation Decisions (2026-08-29, /go-cons Round 1 — converged)

- **Fusion design:** 111.html functional skeleton (mode switcher, category pills, sticky summary) + 3.html luxury matrix (DNA/materials/architecture) + CGP configuration.html terminal voice (SYS_*, amber GPU)
- **Page title:** "Master Configuration Matrix" (client's own term) — `// SYS_COMMISSION`
- **Structure:** hero (branding + guarantee strip) → matrix (Phase 0 vision collapsed + mode switcher + pills + cards + sticky blueprint) → commission (blueprint handoff + inquiry form)
- **Amber scope:** GPU category + GPU part selection + Bespoke Water Loop mode active state; cyan everywhere else
- **No compatibility warnings:** guarantee copy is the UX — `SYS_CHECK // FORGE VERIFIED` readout + amber master-note badges, never blocks
- **CTA:** "Summon The Masters" → commission section with blueprint attached (NOT cart/checkout — quote request model)
- **Pricing:** Total = Σ(parts) + labor (visible line: standard 1,500 / bespoke 3,500 SAR) + Σ(luxury options); SAR only; soft nudge below 10,000 SAR minimum
- **Data model:** window.CGP_PARTS = { parts[], options[], labor{}, minimum } — flat JSON, WP-absorbable (commission CPT + JSON post meta, no premium plugins)
- **Alpine:** Alpine.store('cgpConfig') + thin Alpine.data('cgpConfigurator') proxy; parts-data.js separate file; localStorage persistence; WhatsApp share
- **Mode switch:** NEVER clears selections (111.html bug fixed) — both cooling states coexist, visibility toggles
- **Mobile:** sticky bottom bar (total + progress + CTA, expandable) — the #1 mobile conversion fix
- **Images:** typographic part cards (no per-part images — performance); category icons via Phosphor; REPLACE markers for future product photos
- **Entry points:** "Commission" link in shared header ({{CONFIG_URL}} token) + configurator-specific header + shared footer via {{HOME_URL}} token
- **Business controls in mockup:** lead-time + stock badges, labor line, minimum-commission nudge, upsell nudge, simulated commission-received modal
- **Deferred:** Compatibility Forge terminal (separate page later), concierge path (later), auto-advance (matches client's own prototype — no)

## Critical Files (paths the orchestrator MUST read for context)

- `design-system.md` — canonical design system (colors, type, spacing, components)
- `reference/client-prototypes/home.html` — client homepage prototype (floating island header the user likes)
- `reference/client-prototypes/CGP.html` — hotwheel showcase + metrics (Chart.js)
- `reference/client-prototypes/3.html` — commission configurator + archives
- `reference/client-prototypes/CGP configuration.html` — compatibility forge terminal
- `reference/client-prototypes/111.html` — React configurator (blue/cyan, USD — resolved to cyan/SAR)
- `wp-content/themes/cgp/assets/css/tokens.css` — single source of truth (CSS variables)
- `wp-content/themes/cgp/assets/css/utilities.css` — composed classes (buttons, nav island, cards)
- `wp-content/themes/cgp/tailwind.config.js` — Tailwind config source
- `CLAUDE.md` — project assistant guide (workflow rules)

## Decisions Log

- 2026-08-27 — Design-only scope, homepage only for now (client wants design, not implementation)
- 2026-08-27 — I (assistant) am the design decision maker; client prototypes are reference only
- 2026-08-27 — Single source of truth: wp-content/themes/cgp/assets/ (all shared code lives there)
- 2026-08-27 — Libraries LOCAL (assets/vendor/, assets/fonts/) — no CDN floating
- 2026-08-27 — Libraries: Tailwind (compiled) + Alpine.js + Phosphor icons (js+css+woff2 together)
- 2026-08-27 — Images: high quality + webp format (future site speed)
- 2026-08-27 — Each section in its own file; shared rules (h1-h6) in one file (base.css)
- 2026-08-27 — frontend HTML/ moved to reference/client-prototypes (read-only)
- 2026-08-27 — UI/UX rules from ui-ux-pro-max applied (contrast 4.5:1, touch 44px, focus rings, single h1, reduced-motion, min-h-dvh)
- 2026-08-27 — Metrics: LIVE TELEMETRY (SVG/CSS) instead of Chart.js (design-system §8 compliant, saves ~200KB)
- 2026-08-27 — Images: Unsplash webp placeholders marked "replace with client photos" (client photos unavailable now)
- 2026-08-27 — Arabic: IBM Plex Sans Arabic added to font stack (English content only now)
- 2026-08-27 — Kinetic layer (SHARED in motion.css + theme js): custom cursor + magnetic buttons + 3D tilt + scroll reveals + marquee — transform/opacity only, reduced-motion respected, ~3KB JS
- 2026-08-27 — SHARED ANIMATIONS live in wp-content/themes/cgp/assets/css/motion.css (single source — ALL agents use it, no duplication)
- 2026-08-27 — Performance budget: ≤1.5MB raw / ≤700KB gzip; images ≤1MB; lazy loading + width/height (CLS)
- 2026-08-27 — SEO + GEO from the start (meta, semantic HTML, schema.org, OG/Twitter, geo meta) — target 100% scores
- 2026-08-27 — {{THEME_ASSETS}} token convention for WP migration (build.js → relative; WP → get_template_directory_uri())
- 2026-08-27 — NEW section added: The CGP Guarantee (signature trust section with data points)
- 2026-08-27 — Footer redesigned: 3-column luxury layout + build-name marquee + bottom bar
- 2026-08-27 — Gallery redesigned: mono index numbers (01-04) + cyan border hover
- 2026-08-27 — build.js made idempotent (strips old sections before re-injecting — no duplication)
- 2026-08-27 — Phosphor v2 requires base .ph class on icons (fixed all 8)
- 2026-08-27 — Phosphor style.css linked directly in head (loader script removed — relative path broke on subpages)
- 2026-09-01 — Archives page DROPPED (user decision); new page order: Contact → About → Blog
- 2026-09-01 — Contact page concept "Open A Channel" approved (4 sections; FAQ + echo-summary success removed per user)
- 2026-09-01 — Contact page build: SEO content & copy is the #1 priority (user instruction)