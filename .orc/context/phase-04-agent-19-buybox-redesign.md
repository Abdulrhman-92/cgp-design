# Sub-agent Brief: Redesign the dossier panel (purchase buy-box)

## Task
Redesign the dossier panel (the purchase card) in the Product page hero. The user dislikes the current layout, content, marketing, and internal UI/UX. The big image + thumbnails + lightbox + sticky bar stay UNCHANGED — only the `<aside class="cgp-dossier-card">` content is redesigned.

## Current problems (user feedback + UX analysis)
1. 8 stacked blocks (serial, eyebrow, h1, 2-line description, price, lifecycle, 2 stacked CTAs, trust strip) = tall, cluttered card
2. The FORGED→TESTED→READY lifecycle is technical noise at the purchase moment (it belongs in the forge-log section below)
3. The 2-line description is heavy, not punchy
4. The price "25,000 SAR" has no marketing context
5. The trust strip is 2 faint mono lines
6. CTAs stacked vertically

## Files to Read
- `design/v1/product/sections/hero.html` — the `<aside class="cgp-dossier-card">` block (lines ~46-110) — THE FILE TO REDESIGN (only the aside content)
- `design/v1/product/css/product.css` — current dossier classes (cgp-dossier-card, cgp-dossier-name, cgp-dossier-price, cgp-dossier-trust, cgp-lifecycle-*)
- `wp-content/themes/cgp/assets/css/tokens.css` — tokens
- `wp-content/themes/cgp/assets/css/utilities.css` — buttons, pills, stock classes

## Files You May Modify
- `design/v1/product/sections/hero.html` — ONLY the aside content (keep the aside element, x-ref, classes, h1, aria-label)
- `design/v1/product/css/product.css` — update/add dossier classes (remove dead lifecycle classes if unused elsewhere — CHECK first: lifecycle is only in the hero)

## Files You MUST NOT Touch
- Everything else — the hero stage (image/breadcrumb), thumbnails, lightbox, sticky-cta.html, product.js, build.js, other sections

## Rules (Mandatory)

### Project-Wide Rules
- Values ONLY from `tokens.css` via `var(--cgp-*)` or Tailwind `cgp-*` utilities — NEVER hardcode hex/rgba
- Logical properties ONLY (start/end, ms/me, ps/pe, border-s/e, text-start/end, gap)
- `cgp-` prefix on ALL custom classes
- NO inline styles — every custom value becomes a class in product.css
- English only in code/comments
- No CDN, no new dependencies
- Alt text on ALL images; single h1 (stays in the panel); no duplicate IDs; `x-cloak` on x-show
- `<!-- TODO: from site settings -->` before any contact data; `<!-- TODO: real permalink -->` before any href="#"
- Approved Phosphor icons ONLY (list, x, gear-six, snowflake, lightning, drop, cpu, arrow-up-right, caret-left, caret-right, instagram-logo, twitter-logo, facebook-logo, whatsapp-logo, envelope-simple, map-pin)
- Keep `x-ref="dossierPanel"` on the aside (the sticky bar logic depends on it)

### Task-Specific Rules — THE NEW BUY-BOX (top to bottom)

**1. Top row — serial + badge (replaces the stacked serial + eyebrow):**
```html
<div class="flex items-center justify-between gap-3">
  <p class="font-mono text-cgp-micro uppercase tracking-cgp-04em text-cgp-text-muted">
    // DOSSIER: <span class="cgp-num" dir="ltr">CGP-2026-004</span>
  </p>
  <span class="rounded-full border border-cgp-border-strong bg-cgp-bg-overlay px-3 py-1 font-mono text-cgp-micro font-bold uppercase tracking-cgp-03em text-cgp-accent">// Flagship</span>
</div>
```

**2. Name + ONE-line value prop:**
- h1 stays: `The Hotwheel` (keep id="product-hero-title", cgp-dossier-name)
- Description → ONE punchy line: `The legendary circular chassis — forged in Riyadh, ready for its owner.` (text-sm, text-cgp-text-secondary, mt-2)

**3. Price block — the money moment (with marketing context):**
```html
<div class="mt-5 border-t border-cgp-border pt-5">
  <div class="flex flex-wrap items-end justify-between gap-3">
    <div>
      <p class="cgp-dossier-price cgp-num tabular-nums" dir="ltr">25,000 SAR</p>
      <p class="mt-1 font-mono text-cgp-micro uppercase tracking-cgp-04em text-cgp-text-muted">Incl. precision assembly + 48h pressure test</p>
    </div>
  </div>
  <!-- Status line — visual, replaces the lifecycle -->
  <p class="mt-3 flex items-center gap-2 font-mono text-cgp-micro font-bold uppercase tracking-cgp-03em text-cgp-accent">
    <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-cgp-accent motion-reduce:animate-none" aria-hidden="true"></span>
    Ready to ship — 3-5 days
  </p>
</div>
```

**4. Spec chips — scannable (replaces the lifecycle):**
```html
<div class="mt-4 flex flex-wrap gap-2" role="list" aria-label="Key specifications">
  <!-- REPEAT: spec chip — loop over product attributes -->
  <span class="rounded-full border border-cgp-border bg-cgp-bg-card px-3 py-1 font-mono text-cgp-micro uppercase tracking-cgp-03em text-cgp-text-secondary">CPU · Ryzen 9 9950X</span>
  <span class="rounded-full border border-cgp-border bg-cgp-bg-card px-3 py-1 font-mono text-cgp-micro uppercase tracking-cgp-03em text-cgp-text-secondary">GPU · RTX 5090</span>
  <span class="rounded-full border border-cgp-border bg-cgp-bg-card px-3 py-1 font-mono text-cgp-micro uppercase tracking-cgp-03em text-cgp-text-secondary">LOOP · Dual Cryo</span>
</div>
```

**5. CTA row — side by side (not stacked):**
```html
<div class="mt-6 flex items-center gap-3">
  <a href="{{CONFIG_URL}}" class="cgp-btn-primary cgp-magnetic flex-1" data-magnetic>Commission This Build</a>
  <!-- TODO: from site settings (WhatsApp number) -->
  <a href="https://wa.me/?text=The%20Hotwheel%20%E2%80%94%20CGP%20Build%20Dossier%20CGP-2026-004%20%E2%80%94%2025%2C000%20SAR" target="_blank" rel="noopener" aria-label="Share on WhatsApp" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cgp-border text-cgp-text-secondary transition-colors hover:border-cgp-accent hover:text-cgp-accent-bright">
    <i class="ph ph-fill ph-whatsapp-logo text-lg" aria-hidden="true"></i>
  </a>
</div>
```

**6. Trust line — ONE compact line (replaces the 2-line strip):**
```html
<p class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-cgp-micro uppercase tracking-cgp-04em text-cgp-text-muted">
  <span>48H Pressure Tested</span>
  <span class="h-1 w-1 rounded-full bg-cgp-accent" aria-hidden="true"></span>
  <span>100% Leak Tested</span>
  <span class="h-1 w-1 rounded-full bg-cgp-accent" aria-hidden="true"></span>
  <span>0.01mm Tolerance</span>
</p>
```

**7. CSS (product.css):**
- Keep: cgp-dossier-card, cgp-dossier-name (maybe slightly smaller), cgp-dossier-price
- REMOVE if now unused: cgp-dossier-trust, cgp-lifecycle, cgp-lifecycle-node, cgp-lifecycle-done, cgp-lifecycle-active, cgp-lifecycle-label, cgp-lifecycle-dot (CHECK they're not used elsewhere in the page — grep first)
- Keep the 1px cyan top accent bar (the `h-1 bg-cgp-accent` div)
- Keep the inner padding `p-5 pb-28 md:p-6 md:pb-6` (pb-28 keeps the trust line clear of the sticky bar on mobile)

**8. Keep the aside wrapper EXACTLY as-is:**
`<aside x-ref="dossierPanel" class="cgp-dossier-card order-2 lg:order-none lg:ms-auto lg:max-w-xl" aria-label="Build dossier">`

## Constraints
- Do NOT run the build (orchestrator runs it after you)
- Do NOT touch product.js, sticky-cta.html, the hero stage, thumbnails, lightbox, or other sections

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
- [ ] Buy-box structure: top row (serial+badge) → h1 + 1-line prop → price+context+status → spec chips → CTA row (side-by-side) → trust line
- [ ] Lifecycle removed from the panel (it lives in forge-log below)
- [ ] Single h1, no dup IDs, x-ref kept, REPEAT/TODO markers present
- [ ] No hardcoded hex/rgba, no inline styles
- [ ] Dead CSS classes removed (after grep check)