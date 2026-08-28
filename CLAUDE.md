# Project Assistant Guide

## Who I Am and How I Work

I assist with designing and planning web projects. The project owner is a professional full-stack developer. When WordPress-based, he works with Gutenberg. He presents an HTML design to the client before implementation, and every project ends with a PDF for R&D documentation.

---

## Session Start Rules

### New project:
1. Ask: are there additional skills or tools needed?
2. Ask: are there installed tools not needed for this project?

### Existing project (has PROJECT.md):
- Run `/project-status` **immediately** — before anything else
- Never rely on memory from a previous conversation

### During any session — run /project-status immediately if:
- Context was compacted (memory compressed notification appeared)
- Unsure about any previous decision or agreement
- About to start a new section or phase
- User says "continue", "where were we", or "what's next"
- Any doubt about project state — when in doubt, always run it

---

## Available Tools

| Tool | Purpose |
|------|---------|
| `ui-ux-pro-max` skill | style, colors, font pairings — always first |
| `bencium-innovative-ux-designer` skill | bold creative designs |
| `bencium-controlled-ux-designer` skill | structured formal designs |
| `frontend-design` skill | HTML/CSS implementation |
| `web-design-guidelines` skill | UX and accessibility review |
| `analyze-reference` skill | analyze any reference URL (auto-triggered) |
| `magic` MCP | ready-made components |
| `context7` MCP | library docs (GSAP, Three.js, etc.) |
| `playwright` MCP | screenshots and design preview |
| `Figma` MCP | extract designs from Figma |
| `unsplash` MCP | professional project images |

**Design workflow order:**
1. `ui-ux-pro-max` → 2. `bencium` skill → 3. `magic` MCP → 4. `frontend-design` → 5. `web-design-guidelines`

---

## Reference Links — Auto-trigger Rule

Run `analyze-reference` skill **immediately** (no instruction needed) when:
- User shares a URL with "I like this", "replicate", "inspired by", "like this one"
- User mentions a section in a link they like
- Any URL in a design/UI context as reference or example

**Never screenshot only** — extract animations, transitions, hover effects, scroll triggers, libraries.

---

## Section Design Rules — Permanent (every session)

### Section with a reference:
- Never write code until `analyze-reference` completes (3-layer analysis)
- Flow: analyze → implementation plan → build

### Section with creative freedom ("be creative", "your choice"):
- Strictly follow `docs/rules.md` — same colors, fonts, buttons, spacing
- Never introduce anything new that breaks visual consistency

---

## Subagents (Teams) — Rules

- I suggest the team → **you approve** → I launch
- After launch: I introduce each agent by name with how to address them directly (`@Agent-Name message`)
- I review all output before you see anything
- Phase complete → I ask before stopping anyone — **never stop without your confirmation**

---

## Workflow Commands

| Command | Purpose |
|---------|---------|
| `/mockup` | Project kickoff |
| `/plan` | Full planning |
| `/design` | HTML design phase |
| `/review` | Review and delivery |
| `/project-status` | Check current progress and resume |
| `/add-section` | Add a new section mid-project |

---

## Important Notes

- Client pays for premium themes and plugins
- Budget usually ~$400 — suggest free solutions first
- Design must be implementable in WordPress + Gutenberg
- Every project ends with a PDF for R&D documentation
