Full planning phase. Follow these steps in order:

## 1. Review Client Requirements
**Always refer back to `docs/requirements.md` — it is the primary reference for the project.**
If it doesn't exist, ask the user to upload screenshots of client conversations or summarize them, then extract:
- Required pages
- Core features
- Preferred colors and style

## 2. WordPress — Ask these questions:
- Is this a WordPress project? (if no, skip this section)
- Does it need WooCommerce?
- Is the work Gutenberg-only or is there another page builder?
- What is the budget for themes and plugins?

### Based on the answers, recommend:
**Theme:** suggest a suitable theme (free first) with reasoning
**Plugins:** break them down and evaluate each:
| Plugin | Purpose | Free/Paid | Required/Optional | Performance Impact | Lighter Alternative |
|--------|---------|-----------|-------------------|-------------------|---------------------|

> Rule: if there's a heavy plugin and a free lighter alternative that does the same job — always suggest the alternative.

## 3. Tools & Skills
- Need 2D animations? — GSAP or Framer Motion (use `context7` for docs)
- Need 3D? — Three.js or Spline embed (use `context7` for docs)
- Need background or hero video? — use direct links from Pexels (pexels.com/videos) or Mixkit (mixkit.co) without MCP
- Is there a Figma reference? — use `Figma` MCP to extract the design
- Any additional skill or tool not listed here?

### Icons — ask and choose:
| Case | Choice |
|------|--------|
| General UI icons | **Lucide** or **Heroicons** — lightweight SVG via CDN |
| Brand icons | SVG directly from the official site |
| Many varied icons | **Font Awesome** — slightly heavier |
| Custom illustrations | SVG files in `assets/` |

### Fonts — ask and choose:
| Option | Speed | Usage |
|--------|-------|-------|
| **Google Fonts** | good — fast CDN | most common |
| **System Fonts** | excellent — no download | when performance is top priority |
| **Tailwind defaults** | excellent | when custom font isn't important |
| **Adobe Fonts** | moderate | if client has a subscription |

> Rule: use Google Fonts only (one or two fonts max) to avoid performance impact.

### Design Libraries — choose based on project type:
| Project | Suitable Libraries | Notes |
|---------|-------------------|-------|
| WordPress + Gutenberg | Tailwind CDN, GSAP, Alpine.js | 100% compatible |
| WordPress + WooCommerce | same as above + SwiperJS for slider | lightweight and compatible |
| React / Next.js | Tailwind, Framer Motion, shadcn/ui | |
| HTML/CSS only | Tailwind CDN, GSAP, AOS | simplest and lightest |
| Site with 3D | Three.js or Spline embed | Spline is easier for mockup |

**Rule:** always choose the lightest library that achieves the goal — especially in WordPress to avoid performance issues.

**Reminder — Available Tools:**
| Tool | Usage |
|------|-------|
| `ui-ux-pro-max` skill | style, colors, fonts |
| `bencium-innovative-ux-designer` skill | creative designs |
| `bencium-controlled-ux-designer` skill | formal and structured designs |
| `frontend-design` skill | HTML/CSS implementation |
| `web-design-guidelines` skill | UX and accessibility review |
| `magic` MCP | ready-made components |
| `context7` MCP | docs for any library (GSAP, Three.js, Framer Motion) |
| `playwright` MCP | screenshots and design preview |
| `Figma` MCP | extract design from Figma |

## 4. Planning Summary
At the end, save everything agreed upon in `docs/plan.md`.

Then create `docs/rules.md` containing:
```
# Project Rules

## Visual Identity
- Primary colors:
- Fonts:
- General style:

## Technical Decisions
- Icons:
- Libraries:
- Fonts source:

## Client-specific Rules
-
```

Tell the user the next step is `/design`.
