Add a new section to an existing project. Follow these steps in order:

## Step 1 — Gather section details

Ask the user:
1. What is the section name?
2. Where should it appear in the page order? (e.g. after Hero, before Footer)
3. Is there a reference URL for this section, or should it be designed with creative freedom?
4. Any specific notes or requirements for this section?

**Wait for all answers before proceeding.**

---

## Step 2 — Update all project files

Update these files in order:

### 2a — docs/requirements.md
Add the new section to the sections list in the correct position with all details provided.

### 2b — docs/progress.md
Add a new row to the sections table:
```
| [Section Name] | [reference url or "creative"] | [scope] | ⏳ Pending | — | ❌ No plan yet |
```

### 2c — PROJECT.md
Update the total sections count:
```
## Sections Status: X/[new total] done
```

### 2d — docs/plan.md
If the new section requires a new library, font, or technical decision — add it to the plan.

---

## Step 3 — Handle the reference

### If reference URL provided:
→ Run `analyze-reference` skill immediately for this section
→ This will create `docs/references/[section-name]-plan.md` automatically

### If creative freedom:
→ Create `docs/references/[section-name]-plan.md` with this structure:

```markdown
# Implementation Plan: [Section Name]

## Source
- Type: Creative (no reference)
- Must follow: docs/rules.md strictly

## Layout
- To be determined during design phase
- Ask user for layout direction before building

## Constraints
- Colors: strictly from docs/rules.md
- Fonts: strictly from docs/rules.md
- Button styles: match existing sections
- Spacing: match existing sections
- Must look like it belongs to the same site

## Build Instructions for Agent
1. Read docs/rules.md before writing any code
2. Ask user: "What feeling should this section give?" before starting
3. Present a layout proposal and wait for approval
4. Save output to design/v1/sections/[section-name].html

## Review Checklist
- [ ] Visually consistent with other sections
- [ ] Colors match docs/rules.md exactly
- [ ] Fonts match docs/rules.md exactly
- [ ] Button styles match rest of site
- [ ] Fully responsive
```

---

## Step 4 — Update progress tracking

Update `docs/progress.md` to show:
- Section added ✅
- Plan file created ✅ (or reference analyzed ✅)

---

## Step 5 — Confirm with user

Show a summary:
> "Section **[name]** has been added in position [X].
> All project files updated.
> Plan file created at `docs/references/[section-name]-plan.md`
>
> Ready to include this section in the next design session."

---

## Important rules

- Never create the section files (`design/v1/sections/[name].html`) — that's the design phase's job
- Always update ALL files listed in Step 2 — never skip any
- If the user adds multiple sections at once, repeat Steps 1–4 for each one before moving to Step 5
