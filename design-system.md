# CGP Design System — v1.0

> The single source of truth for the CGP theme design. Extracted from the client's
> HTML prototypes (2026-08-27) and resolved into one canonical system.
> Referenced by AGENTS.md. All values are exact — no approximations.

---

## 1. Brand Overview

- **Brand:** CGP — cgp.sa — "Precision Engineering" / "The Bespoke Forge"
- **Positioning:** elite engineering as luxury atelier — a forge of masters, not a PC shop
- **Voice pillars:** (1) Forge/Atelier metaphor (Forge, Masters, Archives, forged),
  (2) material-grade specificity (aerospace-grade, medical acrylic, 48h pressure testing),
  (3) terminal-as-luxury (mono labels, `// NODE`, `SYS_*`, `RENDER_STAGE`)
- **Copy anatomy (every section):** eyebrow (cyan, tracked-out uppercase) → 2-line headline
  with gradient second line → zinc-400 supporting paragraph

## 2. Color Tokens (CSS variables in base.css)

### Backgrounds
| Token | Value | Usage |
|---|---|---|
| `--cgp-bg-page` | `#050505` | page background (canonical) |
| `--cgp-bg-section` | `#09090b` (zinc-950) | alternating section background |
| `--cgp-bg-card` | `#18181b` (zinc-900) | cards, panels |
| `--cgp-bg-card-glass` | `rgba(24,24,27,0.5)` | glass cards + backdrop-blur |
| `--cgp-bg-elevated` | `#0a0a0a` | configurator dashboard |
| `--cgp-bg-overlay` | `rgba(0,0,0,0.8)` | modal overlay, badges |

### Text
| Token | Value | Usage |
|---|---|---|
| `--cgp-text-primary` | `#f4f4f5` (zinc-100) | body default |
| `--cgp-text-heading` | `#ffffff` | headings, brand |
| `--cgp-text-secondary` | `#a1a1aa` (zinc-400) | paragraphs, nav links |
| `--cgp-text-muted` | `#71717a` (zinc-500) | dates, captions, labels |
| `--cgp-text-faint` | `#52525b` (zinc-600) | footer tagline, icons |
| `--cgp-text-disabled` | `#3f3f46` (zinc-700) | placeholders, disabled |

### Accents
| Token | Value | Usage |
|---|---|---|
| `--cgp-accent` | `#06b6d4` (cyan-500) | **canonical brand accent** |
| `--cgp-accent-bright` | `#22d3ee` (cyan-400) | hover, active, glow states |
| `--cgp-accent-deep` | `#0891b2` (cyan-600) | active pills, badges |
| `--cgp-accent-warm` | `#f59e0b` (amber-500) | GPU/configurator selection ONLY |
| `--cgp-accent-grad` | `linear-gradient(90deg, #22d3ee, #2563eb)` | hero gradient text (from-cyan-400 to-blue-600) |

### Borders
| Token | Value | Usage |
|---|---|---|
| `--cgp-border` | `#27272a` (zinc-800) | default card border |
| `--cgp-border-strong` | `#3f3f46` (zinc-700) | badges, hotwheel ring |
| `--cgp-border-subtle` | `#18181b` (zinc-900) | footer, dividers |
| `--cgp-border-accent` | `rgba(6,182,212,0.3)` | accent borders |

### Glows
| Token | Value | Usage |
|---|---|---|
| `--cgp-glow-text` | `0 0 20px rgba(6,182,212,0.5)` | gradient headline glow |
| `--cgp-glow-soft` | `0 0 15px rgba(34,211,238,0.15)` | selected states |
| `--cgp-glow-strong` | `0 0 20px rgba(34,211,238,0.6)` | CTA hover |
| `--cgp-glow-black` | `0 20px 40px rgba(0,0,0,0.5)` | depth shadows |
| `--cgp-selection` | `bg #06b6d4 / text #fff` | text selection |

## 3. Typography

### Families (self-hosted woff2, per AGENTS.md rule 8)
| Token | Family | Weights |
|---|---|---|
| `--cgp-font-display` | Space Grotesk | 400, 700 |
| `--cgp-font-body` | Inter | 300, 400, 600, 800 |
| `--cgp-font-mono` | ui-monospace stack | — |

### Scale (exact px)
| Token | Size | Usage |
|---|---|---|
| `--cgp-text-display-1` | 128px (md) / 72px (mobile) | hero h1 |
| `--cgp-text-display-2` | 60px | hero h1 (mobile alt) |
| `--cgp-text-display-3` | 48px | section titles (md) |
| `--cgp-text-display-4` | 36px | section titles |
| `--cgp-text-h2` | 30px | sub-section titles |
| `--cgp-text-h3` | 24px | card titles |
| `--cgp-text-h4` | 20px | card sub-titles |
| `--cgp-text-lg` | 18px | detail text, icons |
| `--cgp-text-base` | 16px | body |
| `--cgp-text-sm` | 14px | body alt, nav |
| `--cgp-text-xs` | 12px | eyebrows, labels, buttons |
| `--cgp-text-micro` | 10px | option labels, terminal |
| `--cgp-text-nano` | 8-9px | terminal only (configurator) |

### Styles
- **Eyebrow (signature):** 12px / uppercase / `tracking: 0.3em` / cyan-500 / `mb-4` — as `<p>`/`<span>`, NEVER `<h2>` (AGENTS.md rule 9)
- **Hero h1:** Space Grotesk bold / `tracking-tighter` / uppercase / 2 lines, second line gradient text
- **Section title:** Space Grotesk bold / 36-48px / `leading-tight`
- **Body:** Inter / 14-16px / zinc-400 / `leading-relaxed`
- **Buttons:** 12-14px / uppercase / `tracking-widest` / bold
- **Mono labels:** `font-mono` / cyan-500 / `// NODE 01` style

## 4. Spacing Scale (exact px)

| Token | Value | Usage |
|---|---|---|
| `--cgp-space-1` | 4px | micro gaps |
| `--cgp-space-2` | 8px | chips, icon gaps |
| `--cgp-space-3` | 12px | option gaps |
| `--cgp-space-4` | 16px | card gaps, form fields |
| `--cgp-space-6` | 24px | card padding, list gaps |
| `--cgp-space-8` | 32px | section header gaps, form rows |
| `--cgp-space-10` | 40px | configurator steps |
| `--cgp-space-12` | 48px | hero sub margin |
| `--cgp-space-16` | 64px | grid gaps, section header mb |
| `--cgp-space-20` | 80px | showcase header mb |
| `--cgp-space-24` | 96px | secondary section padding (py-24) |
| `--cgp-space-32` | 128px | **major section padding (py-32)** |

### Containers
| Token | Value | Usage |
|---|---|---|
| `--cgp-container-sm` | 768px (max-w-3xl) | inquiry form |
| `--cgp-container-md` | 1152px (max-w-6xl) | philosophy, metrics, vision |
| `--cgp-container-lg` | 1280px (max-w-7xl) | showcase, gallery, shop |
| `--cgp-container-xl` | 1440px (max-w-[90rem]) | commission, configurator |

## 5. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--cgp-radius-full` | 9999px | pills, buttons, badges, nav island |
| `--cgp-radius-3xl` | 24px | summary panels, banners |
| `--cgp-radius-2xl` | 16px | cards, mode switcher, dashboard |
| `--cgp-radius-xl` | 12px | inputs, options, archive images |
| `--cgp-radius-lg` | 8px | chart card, gallery, shop rows |
| `--cgp-radius-sm` | 2px | form submit button |
| `--cgp-radius-none` | 0 | underline inputs |

## 6. Effects

- **Glass:** `rgba(24,24,27,0.4-0.5)` + `backdrop-blur(4-12px)` + 1px zinc-800 border
- **Ambient glow:** 600-800px radial blobs, cyan-900/20 + blue-900/10, `blur(120-150px)`, fixed corners (max 2 per viewport — AGENTS.md rule 8)
- **Image fade:** `linear-gradient(to top, #050505 0%, transparent 100%)`
- **Image hover:** `scale(1.05)` @ 0.7s + overlay opacity 0→1 @ 0.3s
- **Archive reveal:** `scale(1.1)` + `mix-blend-luminosity` → normal @ 0.7s
- **Grid overlay (terminal):** 30px grid, cyan `rgba(34,211,238,0.02)` lines
- **Custom scrollbar:** 3px, thumb `rgba(34,211,238,0.3)` → 0.6 hover

## 7. Breakpoints

| Breakpoint | Value | Behavior |
|---|---|---|
| `sm` | 640px | grids 1→2 cols, nav island width |
| `md` | 768px | hero type jumps (72→128px), grids 1→2/3/4, nav links show, hotwheel 300→450px |
| `lg` | 1024px | 12-col layouts (5/7, 7/5, 8/4), showcase row, archives 4 cols |
| `xl` | — | NOT used (design stops at lg) |

## 8. Component Inventory

### Navbar (canonical: floating island)
- Fixed, `bottom-6` on mobile / `top-8` centered on desktop
- `rounded-full` + glass (`rgba(24,24,27,0.7)` + blur 12px) + `0 20px 40px rgba(0,0,0,0.5)`
- Logo: `CGP` + cyan dot `.` + `border-r` divider
- Links: 12px / uppercase / `tracking-widest` / zinc-400 → cyan-400 hover
- CTA: filled cyan pill `Inquire`
- Scroll state: bg `rgba(5,5,5,0.9)` + blur 10px + bottom border (fixed-top variant)

### Buttons (variant system — one component, 5 variants)
| Variant | Style |
|---|---|
| `primary` | filled cyan pill, black text, glow hover, `-translate-y-1` |
| `outline` | cyan border, cyan text, hover fills cyan |
| `ghost` | `bg-cyan-500/10` + cyan border/50, hover fills |
| `white` | filled white, hover fills cyan (form submit) |
| `link` | underline `border-b zinc-500` → cyan hover |

### Cards (atoms + local compositions — no generic card/)
- **Vision card:** `bg-zinc-900` / `rounded-2xl` / border zinc-800 / icon + h4 + xs text
- **Philosophy card:** borderless, `border-t zinc-800` only
- **Gallery card (canonical media):** image + bottom gradient + hover scale + title + cyan sub
- **Archive card:** `h-64` image `opacity-40 mix-blend-luminosity` → full on hover + badge chip + uppercase title
- **Shop row:** `p-4` / `rounded-lg` / hover `border-cyan-500` + mono "View"
- **Blog item:** date (xs zinc-500) + title (lg bold, cyan hover) — no chrome
- **Selection card:** `rounded-xl` / selected = cyan border + `bg-cyan-500/10` + glow shadow

### Forms
- **Input:** underline style — transparent bg, `border-bottom 1px #3f3f46`, focus `#06b6d4`, `padding 10px 0`
- **Label:** 12px / uppercase / `tracking-wide` / zinc-500 / `mb-2`
- **Select/textarea:** same underline treatment
- **Submit:** filled white → cyan hover
- **Commission steps:** numbered headers `1. Select Aesthetic DNA` + chips (multi-select) + cards
- **Modal:** `bg-zinc-950` / border cyan-500/30 / top accent bar h-1 cyan + glow / icon circle / ghost button

### Interactive (flagship)
- **Hotwheel:** 300→450px circle, 4px zinc-700 ring, radial `#18181b→#09090b`, dashed inner ring (60s spin), 4 numbered hotspots (24px cyan, glow, hover scale 1.3 + white), detail panel (glass, mono ID + title + text, 300ms swap)
- **Metrics:** static SVG bar chart (per AGENTS.md rule 8 — NO Chart.js in production). Data: CPU/GPU Idle vs 100% Load — Air `35/85/40/82°C` vs CGP Loop `28/55/32/48°C`
- **GPU search + telemetry:** search input (amber focus), staggered results (40ms), telemetry rows (Silicon Engine amber / Core Frequencies cyan / Memory Architecture purple / VBIOS zinc), SVG chassis schematic
- **Configurator:** 12-col (8/4), mode switcher (Standard / Bespoke Water Loop), category pills, part cards, sticky BUILD SUMMARY, total

## 9. Motion System

| Token | Value | Usage |
|---|---|---|
| `--cgp-motion-fast` | 0.3s | hover states, transitions |
| `--cgp-motion-med` | 0.5s | panel swaps |
| `--cgp-motion-image` | 0.7s | image zoom, archive reveal |
| `--cgp-ease-expo` | `cubic-bezier(0.16,1,0.3,1)` | entrances |
| `fadeIn` | 0.6s expo, translateY 15px | hero/panel entrance |
| `spin-slow` | 60s linear | hotwheel inner ring |
| `breathe` | 10s ease-in-out | ambient glows |
| `scanline` | 3s linear | terminal scanner |
| `reveal` | 0.4s expo + 40ms stagger | list items |
| `gear-spin` | 25s linear | telemetry gear |

- **Selection state:** cyan border + `bg-cyan-500/10` + 15px glow shadow
- **Panel swap protocol:** opacity 0 → 300ms → swap content → opacity 1
- **Sound (opt-in only):** tick sine 150-400Hz / 0.05-0.1s; pneumatic 0.2s bandpass 1200Hz
- **a11y:** `prefers-reduced-motion: reduce` disables ALL animations + glows (AGENTS.md rule 8)

## 10. Voice & Copy Bank

### Hero headlines (2-line, gradient second line)
- "Pure / Performance" — "Beyond / Standard" — "Engineer / The Impossible."

### Eyebrows (canonical set)
Our Philosophy · Case Study · Metrics · The Vision · Portfolio · Hardware · Logbook · Commission a Build · The Archives

### Button labels
Explore The Legendary Build · Inquire · Submit Request · Summon The Masters · Return to Forge · View Full Gallery · Browse All Products → · Read the Blog → · Finalize Order

### Guarantee copy
"The CGP Guarantee" — "Do not worry about physics, thermodynamics, or compatibility. Select what you desire. Our elite masters will construct the framework to make it reality."

### Build names (The [Noun] pattern)
The Hotwheel · Project Obsidian · Titanium Core · Neon Genesis · The Monolith · The Horology Core · The Wraith

### Archive chips
Open-Air Architecture · Mechanical Horology · Extreme Scale

## 11. Terminology Glossary

| Term | Usage |
|---|---|
| CGP | brand, always `CGP.` with cyan dot |
| The Forge | workshop metaphor (commission context) |
| The Archives | portfolio gallery |
| The Masters | the engineers |
| Bespoke | custom-made |
| Cryo-Loop | custom water-cooling loop |
| Distro | distribution plate, routed acrylic channels |
| DNA | aesthetic direction (Fashion House / Horology / Hypercar / Cybernetic) |
| Master Configuration Matrix | commission configurator |
| Compatibility Forge | compatibility checker |
| The CGP Guarantee | trust promise |
| Terminal labels | `// NODE`, `SYS_*`, `RENDER_STAGE`, `Phase N` |

## 12. Resolved Decisions (conflicts from prototypes)

1. **Cyan:** `#06b6d4` (cyan-500) is canonical; `#22d3ee` (cyan-400) = hover/active/glow only
2. **Gradient:** `from-cyan-400 to-blue-600` everywhere
3. **Palette:** zinc-* only (gray-* from 111.html dropped)
4. **Fonts:** Inter + Space Grotesk on ALL pages (3.html/config loaded none — fixed)
5. **Currency:** SAR (USD from 111.html dropped)
6. **Blue accent:** dropped — unify to cyan with opacity variants
7. **Amber:** configurator/GPU selection states only
8. **Button radius:** primary CTA `rounded-full`; form submit `rounded-sm`; cards `rounded-2xl`
9. **Section rhythm:** `py-32` (128px) major, `py-24` (96px) secondary
10. **Terminal micro-type (8-11px):** configurator/compatibility pages only
11. **Web Audio:** opt-in toggle, no autoplay
12. **Section naming:** "The Archives" for gallery (client's own term)