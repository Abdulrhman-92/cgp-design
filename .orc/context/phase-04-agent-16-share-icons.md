# Sub-agent Brief: Sticky bar — replace READY pill with share icons (WhatsApp + Facebook)

## Task
In the Product page sticky CTA bar: REMOVE the READY stock pill and put TWO share icon buttons in its place — WhatsApp + Facebook. Keep the Commission button.

## Files to Read
- `design/v1/product/sections/hero.html` — the sticky bar markup (end of section, ~line 153): currently has price block + READY pill (`hidden sm:inline-block` span) + Commission button
- `design/v1/product/sections/hero.html` — the hero WhatsApp share link (for the exact wa.me URL pattern)
- `wp-content/themes/cgp/assets/css/utilities.css` — footer social icon button pattern (h-11 w-11 rounded-full border) for reference
- `AGENTS.md` — approved Phosphor icons list (needs facebook-logo added — user requested it)

## Files You May Modify
- `design/v1/product/sections/hero.html` — sticky bar markup
- `AGENTS.md` — add `facebook-logo` to the approved Phosphor icons list (user/client requested Facebook — authorized)

## Files You MUST NOT Touch
- Everything else — product.css, product.js, other sections, build.js, theme assets

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/rgba
- Logical properties ONLY
- `cgp-` prefix on ALL custom classes
- NO inline styles
- English only in code/comments
- No CDN, no new dependencies
- `x-cloak` on x-show; keep `x-show="s.showStickyBar"` + `x-transition.opacity.duration.200ms`
- Touch targets ≥ 44×44px; aria-label on icon-only elements
- `<!-- TODO: from site settings -->` before any contact data; `<!-- TODO: real permalink -->` before any href="#"

### Task-Specific Rules

**1. hero.html — sticky bar right side:**
Replace the READY pill:
```html
<span class="hidden rounded-full border border-cgp-border-strong bg-cgp-bg-overlay px-3 py-1 sm:inline-block">
  <span class="cgp-stock-in font-mono text-cgp-micro font-bold uppercase tracking-cgp-03em">READY</span>
</span>
```
With two share icon buttons (44px circular, footer-social style):
```html
<!-- TODO: from site settings (WhatsApp number) -->
<a href="https://wa.me/?text=The%20Hotwheel%20%E2%80%94%20CGP%20Build%20Dossier%20CGP-2026-004%20%E2%80%94%2025%2C000%20SAR" target="_blank" rel="noopener" aria-label="Share on WhatsApp" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cgp-border text-cgp-text-secondary transition-colors hover:border-cgp-accent hover:text-cgp-accent-bright">
  <i class="ph ph-fill ph-whatsapp-logo text-lg" aria-hidden="true"></i>
</a>
<!-- TODO: real permalink -->
<a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcgp.sa%2Fproduct%2Fthe-hotwheel%2F" target="_blank" rel="noopener" aria-label="Share on Facebook" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cgp-border text-cgp-text-secondary transition-colors hover:border-cgp-accent hover:text-cgp-accent-bright">
  <i class="ph ph-fill ph-facebook-logo text-lg" aria-hidden="true"></i>
</a>
```
- WhatsApp URL: copy the EXACT pattern from the hero's existing WhatsApp link (same text)
- Facebook: sharer URL with the canonical product URL (https://cgp.sa/product/the-hotwheel/) — `<!-- TODO: real permalink -->` above it
- Keep the Commission button (`cgp-btn-primary shrink-0`) as-is
- Keep the price block as-is
- The share icons show on ALL screen sizes (no hidden classes) — they're compact

**2. AGENTS.md — approved icons:**
Add `facebook-logo` to the approved Phosphor icon list (the line that lists: `list, x, gear-six, snowflake, lightning, drop, cpu, arrow-up-right, caret-left, caret-right, instagram-logo, twitter-logo, whatsapp-logo, envelope-simple, map-pin`) → add `facebook-logo` after `twitter-logo`. Add a note: `(facebook-logo added 2026-09-01 — client request for share icons)`.

**3. Verify** the vendored Phosphor set includes `facebook-logo` (grep `wp-content/themes/cgp/assets/vendor/phosphor/` for facebook-logo — if missing, report in issues[]).

## Constraints
- Do NOT run the build (orchestrator runs it after you)
- Do NOT touch product.css, product.js, or other files

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
- [ ] READY pill removed from the sticky bar
- [ ] WhatsApp + Facebook share icon buttons in its place (44px, aria-labels, hover states)
- [ ] Commission button + price block unchanged
- [ ] facebook-logo added to AGENTS.md approved icons
- [ ] No hardcoded hex/rgba, no inline styles