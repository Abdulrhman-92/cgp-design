# STATE — CGP Design v1

- **Identity:** Orchestrator (go-orc v1.3.0) — CGP design/v1 mockups
- **Phase:** Unified header ✅ — single shared header across all 5 pages (Home, Shop, Configurator, Product, Contact)
- **Last completed:** Header unification ✅ — shared/sections/header.html is the single source of truth; page-specific headers deleted (shop/product/configurator/contact); build.js gained {{HEADER_MOBILE_POS}} + {{CTA_HREF}} tokens with per-page headerPos/ctaHref config; all pages rebuild lint-clean
- **In progress:** —
- **Blocked:** —
- **Open issues:** Distro Plate price mismatch (1,200 shop vs 1,500 configurator); gallery thumbnails all reuse hotwheel.webp (REPLACE markers); WhatsApp/phone/email values are TODO placeholders (site settings)
- **Next step:** User review of unified header → About page
