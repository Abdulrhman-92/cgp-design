# Project Rules

## Visual Identity

- Primary colors: page `#050505`, section `#09090b` (zinc-950), card `#18181b` (zinc-900), text `#f4f4f5` / `#a1a1aa` (zinc-400), accent `#06b6d4` (cyan-500), hover `#22d3ee` (cyan-400), gradient `from-cyan-400 to-blue-600`, amber `#f59e0b` for GPU/configurator selection only (full token set in `design-system.md` §2)
- Fonts: Inter (body) + Space Grotesk (display) + IBM Plex Sans Arabic fallback (future Arabic content)
- General style: dark forge/atelier, terminal-as-luxury (mono labels `// NODE`, `SYS_*`, `RENDER_STAGE`), glass cards, ambient cyan glows, eyebrow → 2-line gradient headline → zinc-400 paragraph copy anatomy
- Section rhythm: `py-32` (128px) major, `py-24` (96px) secondary; containers 768–1440px
- Radius: pills/buttons `rounded-full`, cards `rounded-2xl`, inputs `rounded-xl`, form submit `rounded-sm`

## Technical Decisions

- Icons: Phosphor (local — js + css + woff2 vendored together)
- Libraries: Tailwind (compiled locally, pinned 3.4.x) + Alpine.js (local)
- Fonts source: self-hosted woff2 in theme assets (`assets/fonts/`)
- Images: webp, lazy loaded (`loading="lazy"` + `decoding="async"` + width/height for CLS)
- Single source of truth: `wp-content/themes/cgp/assets/` — all shared code lives there, no duplication in `design/v1`
- Shared animations: `assets/css/motion.css` only — transform/opacity only, `prefers-reduced-motion` respected
- Metrics: live telemetry (SVG/CSS) — no Chart.js in production
- `{{THEME_ASSETS}}` token convention in section files → build.js resolves relative; WP later resolves `get_template_directory_uri()`
- Performance budget: ≤1.5MB raw / ≤700KB gzip; images ≤1MB

## Client-specific Rules

- Design-only scope, homepage only (client wants design, not implementation — WordPress + Gutenberg comes later)
- Assistant is the design decision maker; client prototypes are reference only
- Budget ~$400 — prefer free solutions (no premium plugins/themes)
- Design must be implementable in WordPress + Gutenberg
- SEO + GEO from the start (meta, semantic HTML, schema.org, OG/Twitter, geo meta) — target 100% scores
- Currency: SAR only; WhatsApp contact; KSA-based copy ("Based in KSA")
- Every project ends with a PDF for R&D documentation
- UI/UX rules applied: contrast 4.5:1, touch targets 44px, focus rings, single h1, `min-h-dvh`, reduced-motion