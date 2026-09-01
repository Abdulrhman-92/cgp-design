# Sub-agent Brief: Sticky CTA bar — appears after scrolling past the purchase panel

## Task
Add a scroll-triggered sticky bottom bar to the Product page: it is HIDDEN while the dossier panel (purchase section) is in view, and APPEARS (fixed at the bottom) as soon as the user scrolls PAST the panel — so the "Commission This Build" button is always reachable. Works on ALL screen sizes (replaces the current mobile-only always-visible bar).

## Project Context (PATHS ONLY — sub-agent reads)
- `AGENTS.md` — hard rules (tokens only, logical properties, cgp- prefix, no inline styles, a11y, lint, reduced-motion)
- `design-system.md` — canonical design system

## Files to Read
- `design/v1/product/js/product.js` — current Alpine component (root `component` object + nested `s`; lightbox methods on root using $refs, `s` delegates via closure — READ the NOTE comment about $refs)
- `design/v1/product/sections/hero.html` — the dossier panel `<aside>` + the current mobile bar at the end of the section
- `wp-content/themes/cgp/assets/css/utilities.css` — `.cgp-mobile-bar` (fixed bottom, z-40) — do NOT modify it (configurator uses it)

## Files You May Modify
- `design/v1/product/js/product.js` — add sticky-bar state + scroll logic
- `design/v1/product/sections/hero.html` — add x-ref to the panel + update the bar markup

## Files You MUST NOT Touch
- Everything else — theme utilities.css (cgp-mobile-bar is shared with configurator), configurator files, other sections, build.js

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/rgba
- Logical properties ONLY
- `cgp-` prefix on ALL custom classes
- NO inline styles
- English only in code/comments
- No CDN, no new dependencies
- `x-cloak` on all x-show elements (no FOUC)
- Alt text on ALL images; single h1; no duplicate IDs
- `prefers-reduced-motion: reduce` — the bar must still WORK (appear/disappear) for reduced-motion users; only the transition animation is optional

### Task-Specific Rules

**1. product.js — add sticky-bar state + scroll logic:**
- Add `showStickyBar: false` to the `s` object (template reads `s.showStickyBar`)
- Add a root-level `init()` method (Alpine lifecycle — runs on component init):
  ```js
  init() {
    var self = this;
    var panel = this.$refs.dossierPanel;
    if (!panel) return;
    var ticking = false;
    var update = function () {
      ticking = false;
      var rect = panel.getBoundingClientRect();
      // Show the bar ONLY once the panel's bottom edge has scrolled
      // above the viewport top (user has fully passed the purchase section).
      self.s.showStickyBar = rect.bottom <= 0;
    };
    var onScroll = function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update(); // initial state (handles anchor/refresh mid-page)
    window.addEventListener('scroll', onScroll, { passive: true });
    this._stickyCleanup = function () {
      window.removeEventListener('scroll', onScroll);
    };
  },
  destroy() {
    if (this._stickyCleanup) this._stickyCleanup();
  },
  ```
- Keep the existing lightbox methods + `s` delegation EXACTLY as-is
- No timers, no localStorage

**2. hero.html — panel ref + bar markup:**
- Add `x-ref="dossierPanel"` to the dossier panel `<aside class="cgp-dossier-card ...">`
- Replace the current mobile bar:
  ```html
  <!-- Sticky CTA bar — appears only after scrolling past the purchase panel -->
  <div class="cgp-mobile-bar" x-show="s.showStickyBar" x-cloak x-transition.opacity.duration.200ms>
    <div class="cgp-container-sm flex items-center justify-between gap-3 px-4 py-3">
      <div class="flex flex-col">
        <span class="font-mono text-cgp-micro uppercase tracking-cgp-04em text-cgp-text-muted">The Hotwheel</span>
        <span class="cgp-num font-mono text-cgp-sm font-bold tabular-nums text-cgp-accent" dir="ltr">25,000 SAR</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="rounded-full border border-cgp-border-strong bg-cgp-bg-overlay px-3 py-1">
          <span class="cgp-stock-in font-mono text-cgp-micro font-bold uppercase tracking-cgp-03em">READY</span>
        </span>
        <a href="{{CONFIG_URL}}" class="cgp-btn-primary min-h-11">
          <span class="md:hidden">Commission</span>
          <span class="hidden md:inline">Commission This Build</span>
        </a>
      </div>
    </div>
  </div>
  ```
- Changes from current: REMOVE `lg:hidden` (now all sizes), ADD `x-show="s.showStickyBar"` + `x-cloak` + `x-transition.opacity.duration.200ms`, button label responsive (short on mobile, full on md+)
- Keep the bar at the END of the hero section (inside `<section x-data="cgpProduct">` so `s.showStickyBar` resolves)

**3. No CSS changes needed** — `cgp-mobile-bar` (theme) already provides fixed bottom + z-40. If the full-width strip looks odd on desktop, that's acceptable for now (content is centered via cgp-container-sm).

## Constraints
- Do NOT run the build (orchestrator runs it after you) — but DO run `node --check design/v1/product/js/product.js`
- Do NOT touch theme utilities.css or the configurator

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
- [ ] Bar hidden while the dossier panel is in view (top of page, panel visible)
- [ ] Bar appears (fixed bottom) once the panel's bottom scrolls above the viewport top
- [ ] Bar hides again when scrolling back up to the panel
- [ ] Works on mobile + tablet + desktop (no lg:hidden)
- [ ] node --check product.js passes
- [ ] x-cloak present, no FOUC, no hardcoded hex