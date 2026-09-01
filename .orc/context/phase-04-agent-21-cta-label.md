# Sub-agent Brief: Buy-box — symmetric CTA spacing + purchase-indicating label

## Task
Two changes to the dossier panel (buy-box) in `design/v1/product/sections/hero.html`:
1. **Symmetric spacing around the CTA button** — the button has `mt-6` (24px) above but the share row below has `mt-3` (12px). Make the space below equal the space above: share row `mt-3` → `mt-6`
2. **Purchase-indicating label** — change the CTA text from "Commission This Build" to "Reserve This Unit" (the unit is READY to ship — "commission" implies ordering a new build; "reserve" matches the ready status and indicates purchase). User-approved direction.

## Files to Read
- `design/v1/product/sections/hero.html` — the CTA button (line ~86) + the share row below it (line ~88)
- `design/v1/product/sections/sticky-cta.html` — the sticky bar button (has responsive spans: "Commission" mobile / "Commission This Build" sm+)

## Files You May Modify
- `design/v1/product/sections/hero.html` — CTA label + share row margin
- `design/v1/product/sections/sticky-cta.html` — CTA label (keep consistency between the buy-box and the sticky bar)

## Files You MUST NOT Touch
- Everything else — product.css, product.js, build.js, other sections

## Rules (Mandatory)

### Project-Wide Rules
- English only in code/comments
- No CDN, no new dependencies
- Keep: single h1, x-ref="dossierPanel", markers, no hardcoded hex

### Task-Specific Rules

**1. hero.html — spacing:**
- The share row: `<div class="mt-3 flex items-center justify-center gap-3">` → `<div class="mt-6 flex items-center justify-center gap-3">`
- Result: button has 24px above (mt-6 from chips) and 24px below (mt-6 to share row) — symmetric

**2. hero.html — label:**
- `<a href="{{CONFIG_URL}}" class="cgp-btn-primary cgp-magnetic flex w-full" data-magnetic>Commission This Build</a>`
- → text: `Reserve This Unit`

**3. sticky-cta.html — label (consistency):**
- `<span class="sm:hidden">Commission</span>` → `<span class="sm:hidden">Reserve</span>`
- `<span class="hidden sm:inline">Commission This Build</span>` → `<span class="hidden sm:inline">Reserve This Unit</span>`

**4. Check for other "Commission This Build" references** in the product page sections (grep) — if the same label appears elsewhere (e.g., related.html bespoke band), leave those (they're about commissioning a NEW build — different context). Only change the buy-box + sticky bar.

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
- [ ] Share row mt-3 → mt-6 (symmetric with button's mt-6)
- [ ] Buy-box CTA: "Reserve This Unit"
- [ ] Sticky bar CTA: "Reserve" (mobile) / "Reserve This Unit" (sm+)
- [ ] Other "Commission" references untouched (different context)