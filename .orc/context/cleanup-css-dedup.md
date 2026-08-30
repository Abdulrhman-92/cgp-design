# Brief: CSS de-duplication — move shared classes to theme (Phase: cleanup)

## Task

Move page-level CSS classes that are used by 2+ pages into the theme's
`utilities.css` (single source of truth per AGENTS.md §2), remove them from
the page CSS files, and fix a duplicate token declaration. This fixes a real
bug: the configurator page uses `.cgp-honeypot` and `.cgp-btn-submit` but does
NOT load `home/css/home.css` where they are defined — the honeypot is visible
and the submit button is unstyled there.

## Files you MAY modify

- `wp-content/themes/cgp/assets/css/utilities.css` — ADD the shared classes below
- `wp-content/themes/cgp/assets/css/tokens.css` — REMOVE the duplicate `--cgp-glow-spotlight` line (line 112; keep line 111)
- `design/v1/home/css/home.css` — REMOVE the moved classes
- `design/v1/configurator/css/configurator.css` — REMOVE the moved classes

## Files you MUST NOT touch

- `design/v1/js/build.js`, `design/v1/js/bundles/*`, any `sections/*.html`, any `js/*.js`, `AGENTS.md`, `docs/*`, `.orc/*`

## What to move (exact list)

From `design/v1/home/css/home.css` → `utilities.css`:
- `.cgp-honeypot` (visually-hidden spam trap)
- `.cgp-btn-submit` (44px min-height + radius-sm)
- `.cgp-shop-card` (preserve-3d + hover translateY)
- `.cgp-shop-card:hover .tabular-nums` (price glow)
- `.cgp-card-stage` (product spotlight stage bg)
- `.cgp-card-spotlight` (spotlight overlay)

KEEP in home.css: `.cgp-slider-card-active` (homepage slider only), `.cgp-hero-title`, `.cgp-boot-line*`.

From `design/v1/configurator/css/configurator.css` → `utilities.css`:
- `.cgp-pill-scroll-wrap` + `::after` (fade edge)
- `.cgp-pill-row` + `::-webkit-scrollbar` + the `@media (min-width: 1024px)` block (wrap + vertical scroll cap)
- `.cgp-pill`, `.cgp-pill:hover`, `.cgp-pill-active`, `.cgp-pill-gpu.cgp-pill-active`, `.cgp-pill-dot`, `.cgp-pill-gpu .cgp-pill-dot`
- `.cgp-stock-in`, `.cgp-stock-low`, `.cgp-stock-order`
- `.cgp-mobile-bar`

KEEP in configurator.css: `.cgp-configurator-hero-title`, `.cgp-mode-*`, `.cgp-part-card*`, `.cgp-vision-*`, `.cgp-dna-*`, `.cgp-material-chip*`, `.cgp-blueprint*`, `.cgp-sys-check`, `.cgp-minimum-nudge`, `.cgp-commission-blueprint`.

## Rules (3 levels)

1. **Project-wide (AGENTS.md):** tokens only via `var(--cgp-*)` — never hardcode hex/px; logical properties only; `cgp-` prefix; English comments; no duplication (single source of truth).
2. **Task-specific:** moved classes must be byte-identical (same selectors, same declarations) — no refactoring, no renaming, no "improvements". Group them in utilities.css under clear section headers matching the existing style (`/* ============ ... ============ */`). Do NOT reorder or merge selectors.
3. **File-specific:** utilities.css uses 2-space indent, section-header comments, tokens only. home.css/configurator.css keep their remaining content untouched.

## Verification (run yourself)

```bash
node design/v1/js/build.js
```
Must exit 0 with lint clean (regenerates theme.css from tokens+base+utilities+motion).

Then verify:
- `grep -c "cgp-honeypot\|cgp-btn-submit\|cgp-shop-card\|cgp-card-stage\|cgp-card-spotlight" design/v1/home/css/home.css` → 0
- `grep -c "cgp-pill\|cgp-stock-\|cgp-mobile-bar" design/v1/configurator/css/configurator.css` → 0
- `grep -c "glow-spotlight" wp-content/themes/cgp/assets/css/tokens.css` → 1
- `grep -c "cgp-honeypot\|cgp-pill-row\|cgp-mobile-bar\|cgp-card-stage" wp-content/themes/cgp/assets/css/utilities.css` → ≥ 1 each

## Output contract

Return JSON:
```json
{
  "status": "success" | "error",
  "files_changed": ["..."],
  "summary": "1-2 sentences",
  "verification_command": "node design/v1/js/build.js",
  "issues": []
}
```

## Escape hatch

If any moved class has a dependency you didn't expect (e.g., a class in home.css references another class you're not moving), STOP and report it in `issues[]` — do not improvise.