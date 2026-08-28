---
name: project-status
description: Reads project state from PROJECT.md and docs/progress.md to understand exactly where work left off — current phase, completed sections, pending tasks, agent states, and next action. Run automatically at the start of any session on an existing project.
---

# Project Status Skill

## When to trigger automatically

Run this skill **immediately** in any of these cases:
- Starting a new conversation on an existing project (any project folder that has `PROJECT.md`)
- User says "where were we?", "continue", "let's resume", or "what's next?"
- Before starting any new phase (design, review, etc.)
- After `/add-section` command completes

---

## Execution Steps

### Step 1 — Check if project files exist

Look for these files in the current project directory:
- `PROJECT.md` — quick summary
- `docs/progress.md` — full detailed log
- `docs/rules.md` — visual identity
- `docs/requirements.md` — what was agreed

If `PROJECT.md` does not exist → this is a new project, skip this skill.

---

### Step 2 — Read PROJECT.md

Extract:
- Current phase (mockup / plan / design / review)
- Last completed action
- Next pending action
- Total sections count and how many are done

---

### Step 3 — Read docs/progress.md

Extract the full sections table:
- Section name
- Reference URL or "creative"
- Scope (full / animation only / layout only / creative)
- Status (✅ Done / 🔄 In Progress / ⏳ Pending / ❌ Blocked)
- Agent assigned (if any)
- Plan file exists? (docs/references/[section]-plan.md)

---

### Step 4 — Read docs/rules.md

Load the visual identity into context:
- Primary colors
- Fonts
- Button styles
- Spacing rules
- Any client-specific rules

**These rules must be active for the entire session.**

---

### Step 5 — Read docs/requirements.md

Confirm:
- Agreed pages and sections
- Any special client requirements
- Features that must be present

---

### Step 6 — Check active agents

Look in `docs/progress.md` for any agents listed as 🔄 Running.
If found, inform the user:
> "There are active agents from the previous session: [Agent names]. Do you want to resume working with them or start fresh?"

---

### Step 7 — Present status report

Output a clear, structured summary:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT STATUS: [Project Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Current Phase: [phase]
✅ Last completed: [action]
▶️  Next action: [action]

SECTIONS PROGRESS ([X]/[total] done):
┌─────────────┬──────────────┬──────────┬─────────┐
│ Section     │ Reference    │ Scope    │ Status  │
├─────────────┼──────────────┼──────────┼─────────┤
│ Hero        │ url1         │ anim only│ ✅ Done │
│ About       │ url2         │ full     │ 🔄 WIP  │
│ Services    │ creative     │ —        │ ⏳ Next │
└─────────────┴──────────────┴──────────┴─────────┘

VISUAL IDENTITY LOADED:
- Colors: [primary, secondary, accent]
- Fonts: [font names]
- Rules file: docs/rules.md ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ready to continue. Shall I proceed with [next action]?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Step 8 — Wait for user confirmation

After presenting the status, wait for the user to:
- Confirm to continue with the suggested next action
- Or redirect to a different task

**Never start any work before user confirms.**

---

## What this skill does NOT do

- It does not make any changes to files
- It does not start any agents
- It does not write any code
- It only reads and reports — all decisions stay with the user
