# CGP — Homepage Design Project

## Client

**CGP** (cgp.sa) — a Saudi luxury PC building atelier ("The Bespoke Forge"). Custom water-cooled, handcrafted PC architectures for elite clients. Based in KSA; commissions priced in SAR.

## Scope

- **Design only, homepage only** — a stunning HTML mockup (`design/v1`) to present to the client.
- WordPress + Gutenberg implementation comes later, after design approval.
- The homepage showcases: floating island navigation, hero, vision, the Hotwheel interactive showcase, thermal metrics, gallery of builds, shop preview, blog preview, commission inquiry form, and footer.

## Structure

```
reference/client-prototypes/   ← client's original HTML prototypes (read-only)
design-system.md               ← canonical design system (colors, type, spacing, components)
docs/                          ← requirements, rules, plan
wp-content/themes/cgp/assets/  ← single source of truth (CSS tokens, utilities, fonts, vendor libs)
design/v1/                     ← the deliverable homepage mockup (built from sections)
```

## Agreements

- The assistant is the design decision maker; client prototypes are reference only.
- All shared code lives in `wp-content/themes/cgp/assets/` — no duplication.
- Libraries are local (no CDN): Tailwind (compiled), Alpine.js, Phosphor icons, self-hosted fonts.
- Images: high-quality webp, lazy loaded; Unsplash placeholders marked "replace with client photos".
- Performance budget: ≤1.5MB raw / ≤700KB gzip; SEO + GEO from the start.
- Design must be implementable in WordPress + Gutenberg; budget ~$400 (free solutions first).

## Progress

- ✅ Phase 0 — Consultation (design direction, brand/images, technical)
- 🔄 Phase 1 — Foundation (shared CSS, local libraries, scaffold, docs)
- ⏳ Phase 2 — Sections (10 homepage sections + kinetic layer)
- ⏳ Phase 3 — Assembly (index.html + SEO/GEO)
- ⏳ Phase 4 — Verification (screenshots, interactions, performance, SEO audit)

## Next Steps

1. Complete Phase 1: shared CSS, vendor libs, `design/v1` scaffold + `build.js`, docs.
2. Build the 10 sections (Phase 2).
3. Assemble and verify (Phases 3–4), then present screenshots to the client.