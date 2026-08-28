# CGP — Requirements (extracted from client prototypes)

> Source: `reference/client-prototypes/` (home.html, CGP.html, 3.html, CGP configuration.html, 111.html).
> Extracted 2026-08-27. Prototypes are reference only — final design decisions live in `design-system.md` and `.orc/PROJECT.md`.

## 1. Scope

- **Deliverable:** homepage HTML mockup (`design/v1`) for client presentation.
- **Out of scope (now):** WordPress implementation, WooCommerce, inner pages. Shop/blog markup is prepared for later migration.

## 2. Required Pages

| Page | Source prototype | Status |
|---|---|---|
| Homepage (single-page scroll) | home.html | In scope — the only page |
| Commission configurator | 3.html | Reference only (future page) |
| Compatibility Forge terminal | CGP configuration.html | Reference only (future page) |
| Full configurator (React) | 111.html | Reference only (future page) |

## 3. Homepage Sections (from home.html)

| # | Section | Content in prototype |
|---|---|---|
| 1 | Header | Floating island nav: glass pill, `CGP.` logo, links (Vision, Gallery, Shop, Blog), cyan `Inquire` CTA. Bottom-center on mobile, top-center on desktop |
| 2 | Hero | "Beyond Standard" — 2-line h1, gradient second line + glow, tagline "Mastercrafted PC architecture…" |
| 3 | Vision | Eyebrow "The Vision", headline "Zero compromises. Infinite possibilities.", 2 cards: Bespoke Loops, Elite Hardware |
| 4 | Showcase | Hotwheel interactive (see §5) |
| 5 | Metrics | Thermal comparison (see §6) |
| 6 | Gallery | Eyebrow "Portfolio", "Recent Masterpieces", 4 build cards (2 large + 2 small), hover zoom + overlay |
| 7 | Shop | Eyebrow "Hardware", "The Shop", 2 product rows + "Browse All Products →" |
| 8 | Blog | Eyebrow "Logbook", "Latest Articles", 3 posts + "Read the Blog →" |
| 9 | Inquiry | Eyebrow "Commission a Build", "Start Your Project", form (Name, Email, Budget SAR, Details), white submit "Submit Request" |
| 10 | Footer | `CGP.` + "Precision Engineering" + socials (Instagram, Twitter, WhatsApp) |

## 4. Services & Features (from prototypes)

- **Bespoke custom water-cooled builds** — hand-bent hardline tubing, custom loops (home.html, CGP.html)
- **Elite hardware** — highest-binned CPUs, flagship ROG GPUs (home.html, CGP.html)
- **Commission configurator** — "Master Configuration Matrix": Aesthetic DNA (Fashion House / Horology / Hypercar / Cybernetic), Exotic Materials (24K Gold Plating, Exotic Wood Trims, Italian Leather Canvas, Forged Carbon Fiber, Carrara Marble Base, Machined Titanium, Sapphire Glass, Malachite Stone), Thermodynamic Architecture (Dual Cryo-Loop, Bespoke Distro, Embedded Mechanics) — 3.html
- **Compatibility checker** — "Compatibility Forge v2.0" terminal with GPU search + live telemetry — CGP configuration.html
- **Full build configurator** — Standard / Bespoke Water Loop modes, 8 standard categories (CPU, GPU, RAM, Storage, Motherboard, Cooling, Case, PSU) + 6 water-loop categories (Block, Pump, Radiator, Fittings, Tubing, Coolant), sticky BUILD SUMMARY — 111.html
- **Pre-built systems** — e.g. "Pre-Built: The Wraith" (home.html)
- **Signature components** — e.g. "CGP Custom Distro Plate" (home.html)
- **Inquiry/commission form** — home.html §9

## 5. Flagship Interactive: The Hotwheel (CGP.html)

- CSS circular abstraction of the Gamemax Hotwheel case: 300px → 450px (md), 4px zinc-700 ring, radial `#18181b → #09090b` fill, dashed inner ring spinning 60s
- 4 numbered hotspots (cooling, fittings, board, chassis) — click swaps adjacent detail panel (300ms fade protocol)
- Node data: `// NODE 01 : COOLANT LOOP` … `// NODE 04 : THE CHASSIS`
- Build: "The Gamemax Hotwheel" — ROG foundation, custom CNC-milled acrylic blocks, open-air circular chassis

## 6. Metrics Data (CGP.html — exact values)

Thermal comparison, °C — Standard Premium Air vs CGP Custom Loop:

| Metric | Air | CGP Loop |
|---|---|---|
| CPU Idle | 35 | 28 |
| CPU 100% Load | 85 | 55 |
| GPU Idle | 40 | 32 |
| GPU 100% Load | 82 | 48 |

- Prototype used Chart.js — **resolved: replaced with live telemetry (SVG/CSS)** per design-system §8 (saves ~200KB).

## 7. Special Notes (client-specific)

| Note | Detail | Source |
|---|---|---|
| Currency | SAR only (USD dropped) — budget tiers: 10,000–15,000 / 15,000–25,000 / 25,000+ SAR | home.html, decision log |
| Location | KSA — "Legendary Builds. Based in KSA." | CGP.html footer |
| Contact | WhatsApp in footer socials; email contact@cgp.sa | home.html, CGP.html |
| Guarantee copy | "Do not worry about physics, thermodynamics, or compatibility. Select what you desire. Our elite masters will construct the framework to make it reality." | 3.html |
| Build names | The Hotwheel · Project Obsidian · Titanium Core · Neon Genesis · The Monolith · The Horology Core · The Wraith | home.html, 3.html |
| Archive chips | Open-Air Architecture · Mechanical Horology · Extreme Scale | 3.html |
| Craftsmanship claims | 48h pressure testing, medical acrylic / surgical steel fittings, aerospace-grade fittings | 111.html, CGP.html |
| Voice | Forge/atelier metaphor, terminal-as-luxury (`// NODE`, `SYS_*`, `RENDER_STAGE`) | all |

## 8. Visual Requirements (from prototypes, resolved in design-system.md)

- **Colors:** deep void black `#050505`, zinc grays, cyan accent `#06b6d4` (canonical), gradient `from-cyan-400 to-blue-600`
- **Fonts:** Inter (body) + Space Grotesk (display) + IBM Plex Sans Arabic (fallback, future Arabic)
- **Style:** dark forge/atelier, terminal-as-luxury, glass cards, ambient cyan glows, mono labels
- **Icons:** Phosphor (3.html, CGP configuration.html)
- **Interactivity:** Alpine.js (3.html, CGP configuration.html), Web Audio opt-in (CGP configuration.html)
- **Images:** high-quality webp, lazy loaded, Unsplash placeholders marked "replace with client photos"

## 9. Non-Functional Requirements

- Performance budget: ≤1.5MB raw / ≤700KB gzip; images ≤1MB
- SEO + GEO from the start (meta, semantic HTML, schema.org, OG/Twitter, geo meta)
- Accessibility: contrast 4.5:1, touch targets 44px, focus rings, single h1, `prefers-reduced-motion`
- Libraries local (no CDN) — Tailwind compiled, Alpine.js, Phosphor (js+css+woff2)