# Sub-agent Brief: Fix — inquiry.html comment triggers lint false positive

## Task
Reword the header comment in `design/v1/product/sections/inquiry.html` so it no longer contains the literal text `id="inquiry"` (the build lint regex `\bid="([^"]+)"` matches IDs inside HTML comments — the comment text is being counted as a duplicate of the real section ID).

## Files You May Modify
- `design/v1/product/sections/inquiry.html` — comment lines 1-5 ONLY

## Task-Specific Rules
- Change the comment text `id="inquiry" is the footer CTA target.` to something like `The section id is 'inquiry' — footer CTA target.` (avoid the exact `id="..."` pattern)
- Do NOT touch the actual `<section id="inquiry">` markup or anything else in the file
- English only

## Verification
- `node design/v1/js/build.js` — must complete with `✓ product → product/index.html (5 sections, lint clean)`

## Required Output (JSON)
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1"],
"summary": "[1-2 sentences]",
"verification_command": "[exact command]",
"issues": []
}