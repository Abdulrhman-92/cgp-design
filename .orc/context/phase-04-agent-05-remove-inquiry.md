# Sub-agent Brief: Remove inquiry section from Product page

## Task
Remove the "Commission This Build" inquiry section (form + blueprint) from the Product page and repoint all its CTAs to the configurator. User decision: the section is not needed; buttons go to {{CONFIG_URL}}.

## Files to Read
- `design/v1/js/build.js` — PAGES.product sections.main (remove the inquiry entry)
- `design/v1/product/sections/hero.html` — CTA block (primary + ghost + WhatsApp) + mobile bar
- `design/v1/product/sections/header.html` — "Inquire" CTA
- `design/v1/product/css/product.css` — ported blueprint classes (now unused)
- `design/v1/product/sections/inquiry.html` — the file to DELETE

## Files You May Modify
- `design/v1/js/build.js` — remove `'product/sections/inquiry.html'` from PAGES.product sections.main (keep the other 4)
- `design/v1/product/sections/hero.html` — repoint CTAs (below)
- `design/v1/product/sections/header.html` — repoint "Inquire" → {{CONFIG_URL}}
- `design/v1/product/css/product.css` — remove the ported blueprint classes (cgp-commission-blueprint, cgp-blueprint-row, cgp-blueprint-cat, cgp-blueprint-name, cgp-blueprint-price, cgp-blueprint-total) — they are now unused on this page (configurator.css keeps its own copies — do NOT touch it)
- DELETE `design/v1/product/sections/inquiry.html`

## Files You MUST NOT Touch
- Everything else — shared footer (its #inquiry link stays — it's shared across pages), configurator files, theme assets, other pages

## Task-Specific Rules
1. **hero.html CTA block** (the 3-button stack in the dossier panel):
   - Primary `Commission This Build` → change `href="#inquiry"` → `href="{{CONFIG_URL}}"`
   - REMOVE the ghost `Configure Your Own` button (redundant — both would go to the configurator)
   - KEEP the WhatsApp share link as-is
2. **hero.html mobile bar**: `Commission` → change `href="#inquiry"` → `href="{{CONFIG_URL}}"`
3. **header.html**: `Inquire` → change `href="#inquiry"` → `href="{{CONFIG_URL}}"`
4. **build.js**: remove the inquiry section from the manifest ONLY
5. **product.css**: remove ONLY the ported blueprint block (keep everything else — cgp-num, dossier, gallery, lifecycle, spec table, telemetry, forge log, related, bespoke band)
6. English only in code/comments

## Verification
- `node design/v1/js/build.js` — all 4 pages lint clean (product now 4 sections: hero, specs, forge-log, related — bg rhythm page/section/page/section still alternates)
- `grep -rn "inquiry" design/v1/product/` — no references to #inquiry remain in product sections (the shared footer still has it — that's fine)
- Browser: http://localhost:8080/design/v1/product/index.html — 0 console errors, hero CTA + mobile bar + header Inquire all point to ../configurator/index.html

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1", ...],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}