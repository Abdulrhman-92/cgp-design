# Sub-agent Brief: Redesign sticky CTA bar — distinct, visible, premium

## Task
Redesign the Product page sticky CTA bar. Current problems (verified in browser):
1. **Background blends with page** — `.cgp-mobile-bar` uses `--cgp-bg-elevated` (#0a0a0a) which is nearly identical to the page bg (#050505) → the bar looks like part of the page
2. **Button invisible** — the "Commission This Build" button is squeezed to 50px wide (text clipped, invisible) → renders as an empty cyan blob
3. **Container too narrow** — `cgp-container-sm` (768px) cramps the content on desktop

## Goal
A clearly visible, premium sticky bar: distinct background, strong top accent, clean layout, prominent CTA button with visible text.

## Project Context (PATHS ONLY — sub-agent reads)
- `AGENTS.md` — hard rules (tokens only, logical properties, cgp- prefix, no inline styles, a11y, lint, blur budget)
- `design-system.md` — canonical design system

## Files to Read
- `design/v1/product/sections/hero.html` — the sticky bar markup (end of section, ~line 153)
- `wp-content/themes/cgp/assets/css/utilities.css` — `.cgp-mobile-bar` (line ~503) + `.cgp-btn-primary` (line ~81) + `.cgp-glass`/`.cgp-nav-island` (line ~20) for the glass language
- `wp-content/themes/cgp/assets/css/tokens.css` — bg tokens (bg-card #18181b, bg-elevated #0a0a0a, border, accent, glow)
- `design/v1/product/css/product.css` — page CSS (add the new bar class here)

## Files You May Modify
- `design/v1/product/sections/hero.html` — sticky bar markup
- `design/v1/product/css/product.css` — new `.cgp-sticky-cta` class (page-specific, does NOT touch the shared `.cgp-mobile-bar` used by the configurator)

## Files You MUST NOT Touch
- `wp-content/themes/cgp/assets/css/utilities.css` — the shared `.cgp-mobile-bar` (configurator uses it — do NOT modify)
- Everything else — product.js, other sections, build.js, configurator files

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/rgba
- Logical properties ONLY (start/end, ms/me, ps/pe, border-s/e, text-start/end, gap)
- `cgp-` prefix on ALL custom classes
- NO inline styles — every custom value becomes a class in product.css
- English only in code/comments
- No CDN, no new dependencies
- `x-cloak` on x-show; keep `x-show="s.showStickyBar"` + `x-transition.opacity.duration.200ms`
- Alt text on ALL images; single h1; no duplicate IDs
- Blur budget: the nav island already uses backdrop-blur — the bar should use a SOLID bg (no extra blur)

### Task-Specific Rules — THE NEW STICKY BAR

**1. hero.html — new markup (keep the Alpine bindings):**
```html
<!-- Sticky CTA bar — appears only after scrolling past the purchase panel -->
<div class="cgp-sticky-cta" x-show="s.showStickyBar" x-cloak x-transition.opacity.duration.200ms>
  <div class="cgp-container-lg flex items-center justify-between gap-4 px-4 py-3 md:px-6">
    <!-- Price block -->
    <div class="flex min-w-0 flex-col">
      <span class="font-mono text-cgp-micro uppercase tracking-cgp-04em text-cgp-text-muted">The Hotwheel</span>
      <span class="cgp-num font-mono text-cgp-sm font-bold tabular-nums text-cgp-accent" dir="ltr">25,000 SAR</span>
    </div>
    <!-- Right: stock + CTA -->
    <div class="flex shrink-0 items-center gap-3">
      <span class="hidden rounded-full border border-cgp-border-strong bg-cgp-bg-overlay px-3 py-1 sm:inline-block">
        <span class="cgp-stock-in font-mono text-cgp-micro font-bold uppercase tracking-cgp-03em">READY</span>
      </span>
      <a href="{{CONFIG_URL}}" class="cgp-btn-primary cgp-magnetic shrink-0" data-magnetic>Commission This Build</a>
    </div>
  </div>
</div>
```
- Changes: `cgp-mobile-bar` → `cgp-sticky-cta`; `cgp-container-sm` → `cgp-container-lg` (wider); button label is now a SINGLE "Commission This Build" (no responsive spans — the wider container + shrink-0 lets it fit on mobile too; if it overflows at 375px, use `text-[11px]` via a class or shorten to "Commission" with a `sm:` full label — your call, but the text MUST be visible)
- READY pill hidden on very small screens (`hidden sm:inline-block`) to save space
- Button: add `shrink-0` so it never gets squeezed

**2. product.css — new `.cgp-sticky-cta` class:**
```css
/* Sticky CTA bar — distinct from the page, premium glass-panel look.
   Page-specific (product) — the shared .cgp-mobile-bar stays for the configurator. */
.cgp-sticky-cta {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 40;
  background: var(--cgp-bg-card);            /* #18181b — clearly lighter than page */
  border-block-start: 1px solid var(--cgp-border-strong);
  box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.6);
}
/* cyan accent hairline on top — makes the bar pop */
.cgp-sticky-cta::before {
  content: '';
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--cgp-accent), transparent);
  pointer-events: none;
}
```
- Background `--cgp-bg-card` (#18181b) — clearly distinct from the #050505 page
- Cyan gradient hairline on top — the signature accent
- Stronger upward shadow — makes it float above the page
- Keep `position: fixed; inset-inline: 0; bottom: 0; z-index: 40`

**3. Verify the button text is VISIBLE** — the #1 complaint. After the fix, the button must render with readable "Commission This Build" text (not a 50px blob). Check: button width ≥ 200px on desktop, ≥ 150px on mobile, text color black on cyan.

## Constraints
- Do NOT run the build (orchestrator runs it after you)
- Do NOT touch utilities.css, product.js, other sections, or files

## Tool Policy
- ✅ Read any file
- ✅ Modify ONLY the 2 files listed above
- ❌ Run git commands
- ❌ Touch anything else

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1", "path2"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}

## Success Criteria
- [ ] Bar background clearly distinct from page (bg-card #18181b + cyan top hairline)
- [ ] Button text "Commission This Build" VISIBLE (width ≥ 200px desktop, ≥ 150px mobile, not squeezed)
- [ ] Wider container (cgp-container-lg) — no cramping
- [ ] x-show + x-cloak + transition preserved
- [ ] No hardcoded hex/rgba, no backdrop-blur on the bar
- [ ] Shared .cgp-mobile-bar untouched (configurator unaffected)