HTML design phase. Follow these steps in order:

---

## Step 0 — Run /project-status
Run `/project-status` before anything else.
This loads: current phase, section decisions, visual identity, and where work left off.
**Never rely on memory — always run this first.**

---

## Step 1 — Collect Section References
Present all agreed sections in a table and ask the user to assign a reference or creative freedom to each:

> | Section | Reference URL | Scope | Notes |
> |---------|--------------|-------|-------|
> | Hero | ? | ? | |
> | About | ? | ? | |
> | ... | | | |

**Wait until all sections have a decision before proceeding.**
Save the completed table to `docs/progress.md`.

---

## Step 2 — Analyze All References
For each section that has a reference URL:
→ Run `analyze-reference` skill (3-layer analysis: technical + design intelligence + creative plan)
→ This creates `docs/references/[section-name]-plan.md` automatically

For sections with creative freedom:
→ Create `docs/references/[section-name]-plan.md` manually (follow rules.md strictly)

**Never write any code before all plan files are created.**

---

## Step 3 — Propose Agent Team
After all plan files are ready, propose one agent per section:

> "All plans are ready. I suggest this team:
> - **Hero-Agent** — builds Hero from `docs/references/hero-plan.md`
> - **About-Agent** — builds About from `docs/references/about-plan.md`
> - I (Main) review every agent output before you see anything
>
> Shall I launch them?"

Wait for approval. Then introduce agents:
> "Agents ready:
> - **Hero-Agent** → `@Hero-Agent your message`
> - **About-Agent** → `@About-Agent your message`"

Each agent must:
1. Read its plan file fully before writing any code
2. Build from the extracted source or screenshot analysis
3. Apply colors and fonts from `docs/rules.md`
4. Complete the review checklist in its plan file
5. Save to `design/v1/sections/[section-name].html`

---

## Step 4 — Required Tools Per Section
Before building each section, ensure these are used:
- `ui-ux-pro-max` — style, colors, font pairing
- `bencium-innovative-ux-designer` or `bencium-controlled-ux-designer` — based on project type
- `magic` MCP — fetch components before writing from scratch
- `unsplash` MCP — real images, no placeholders
- `context7` MCP — library docs if animations needed
- `frontend-design` skill — final code implementation

---

## Step 5 — File Structure (mandatory)
```
design/v1/
├── index.html              ← shell only (head + section loader)
├── sections/               ← one file per section
│   ├── hero.html
│   ├── about.html
│   └── ...
├── components/
│   ├── header.html
│   └── footer.html
├── css/
│   └── custom.css          ← only what Tailwind can't handle
└── js/
    ├── main.js             ← loads and assembles sections
    └── [feature].js
```

**Rules — no exceptions:**
- Each file = one responsibility only
- `index.html` has no section content — only the shell
- Never consolidate sections into one file
- New file not in this structure? Ask user first

---

## Step 6 — Tailwind Setup
```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: { extend: { colors: { primary: '#...' }, fontFamily: { custom: ['...'] } } }
  }
</script>
```
`custom.css` only for complex animations Tailwind can't handle.

---

## Step 7 — Main Agent Review (before user sees anything)
For every section, verify against its plan file:
- [ ] Layout matches reference
- [ ] Animations match — timing, easing, trigger
- [ ] Hover effects match
- [ ] Colors and fonts follow `docs/rules.md`
- [ ] Responsive and clean code

If any fails → return to agent to fix. **Never show the user a section that fails its checklist.**

After fixing → run `playwright` MCP → save screenshots to `screenshots/preview/`
Then run `web-design-guidelines` skill for UX and accessibility review.

---

## Step 8 — End of Phase
Ask:
> "Design phase complete — shall I stop all agents, or do you want to talk to any of them first?"

Update `docs/progress.md` with final section statuses.
**Never stop any agent without user confirmation.**
