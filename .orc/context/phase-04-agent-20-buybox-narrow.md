# Sub-agent Brief: Buy-box — narrower width + share icons in a separate row

## Task
Two changes to the dossier panel (buy-box) in `design/v1/product/sections/hero.html`:
1. **Narrower width** — the panel is currently `lg:max-w-xl` (576px). Reduce to ~3/4 → `lg:max-w-md` (448px)
2. **Share icons in a separate row** — currently the WhatsApp icon sits NEXT TO the Commission button. Move the share icons to their OWN row below the CTA, with the SAME icons as the sticky bar (WhatsApp + Facebook circles)

## Files to Read
- `design/v1/product/sections/hero.html` — the aside (lines ~46-110): the CTA row (`mt-6 flex items-center gap-3` with the flex-1 button + WhatsApp circle)
- `design/v1/product/sections/sticky-cta.html` — the share icons to mirror (WhatsApp + Facebook, h-11 w-11 rounded-full border circles)

## Files You May Modify
- `design/v1/product/sections/hero.html` — ONLY the aside content

## Files You MUST NOT Touch
- Everything else — product.css, product.js, sticky-cta.html, build.js, other sections

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/rgba
- Logical properties ONLY
- `cgp-` prefix on ALL custom classes
- NO inline styles
- English only in code/comments
- No CDN, no new dependencies
- Touch targets ≥ 44×44px; aria-label on icon-only elements
- `<!-- TODO: from site settings -->` before contact data; `<!-- TODO: real permalink -->` before href="#"
- Keep: single h1, x-ref="dossierPanel", the aside wrapper classes, the 1px cyan accent bar, p-5 pb-28 md:p-6 md:pb-6

### Task-Specific Rules

**1. Width:**
- `<aside x-ref="dossierPanel" class="cgp-dossier-card order-2 lg:order-none lg:ms-auto lg:max-w-xl" aria-label="Build dossier">`
- → change `lg:max-w-xl` → `lg:max-w-md` (448px ≈ 3/4 of 576px)
- Nothing else in the aside wrapper changes

**2. CTA + share rows (replace the current side-by-side row):**
Current:
```html
<!-- CTA row — side by side -->
<div class="mt-6 flex items-center gap-3">
  <a href="{{CONFIG_URL}}" class="cgp-btn-primary cgp-magnetic flex-1" data-magnetic>Commission This Build</a>
  <!-- TODO: from site settings (WhatsApp number) -->
  <a href="https://wa.me/?text=..." target="_blank" rel="noopener" aria-label="Share on WhatsApp" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cgp-border text-cgp-text-secondary transition-colors hover:border-cgp-accent hover:text-cgp-accent-bright">
    <i class="ph ph-fill ph-whatsapp-logo text-lg" aria-hidden="true"></i>
  </a>
</div>
```
New:
```html
<!-- CTA — full width -->
<a href="{{CONFIG_URL}}" class="cgp-btn-primary cgp-magnetic w-full" data-magnetic>Commission This Build</a>

<!-- Share row — same icons as the sticky bar -->
<div class="mt-3 flex items-center justify-center gap-3">
  <!-- TODO: from site settings (WhatsApp number) -->
  <a href="https://wa.me/?text=The%20Hotwheel%20%E2%80%94%20CGP%20Build%20Dossier%20CGP-2026-004%20%E2%80%94%2025%2C000%20SAR" target="_blank" rel="noopener" aria-label="Share on WhatsApp" class="flex h-11 w-11 items-center justify-center rounded-full border border-cgp-border text-cgp-text-secondary transition-colors hover:border-cgp-accent hover:text-cgp-accent-bright">
    <i class="ph ph-fill ph-whatsapp-logo text-lg" aria-hidden="true"></i>
  </a>
  <!-- TODO: real permalink -->
  <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcgp.sa%2Fproduct%2Fthe-hotwheel%2F" target="_blank" rel="noopener" aria-label="Share on Facebook" class="flex h-11 w-11 items-center justify-center rounded-full border border-cgp-border text-cgp-text-secondary transition-colors hover:border-cgp-accent hover:text-cgp-accent-bright">
    <i class="ph ph-fill ph-facebook-logo text-lg" aria-hidden="true"></i>
  </a>
</div>
```
- The share icons are IDENTICAL to the sticky bar (same hrefs, same classes, same icons)
- The trust line below stays as-is

## Constraints
- Do NOT run the build (orchestrator runs it after you)
- Do NOT touch product.css, product.js, sticky-cta.html, or other files

## Tool Policy
- ✅ Read any file
- ✅ Modify ONLY the 1 file listed above
- ❌ Run git commands
- ❌ Touch anything else

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}

## Success Criteria
- [ ] Panel width: lg:max-w-md (448px ≈ 3/4 of 576px)
- [ ] CTA button full-width (w-full)
- [ ] Share row below the CTA: WhatsApp + Facebook circles (identical to sticky bar)
- [ ] Single h1, x-ref kept, markers present, no hardcoded hex