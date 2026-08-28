Review and delivery phase. Follow these steps:

## 0. Run /project-status First
Run `/project-status` before anything else to load current phase, sections progress, and visual identity.

---

## 1. Propose Subagents

Before starting, propose a review team:

> "For the review phase I suggest:
> - **Revisions-Agent** — applies requested changes
> - **QA-Agent** — checks UX, accessibility, and requirements coverage
>
> Shall I launch them?"

Wait for user approval. Then introduce them:
> "Agents are ready:
> - **Revisions-Agent** → say `@Revisions-Agent your message`
> - **QA-Agent** → say `@QA-Agent your message`"

At the end of this phase, ask:
> "Review phase complete — shall I stop all agents, or do you want to talk to any of them first?"

**Never stop any agent without user confirmation.**

---

## 2. Design Review
**Confirm the design covers everything in `docs/requirements.md` before anything else.**
Ask the user:
- What did you like?
- What needs revision?
- Has the client seen the design? What was their feedback?

## 2. Revisions — Required Tools
- Apply requested revisions
- **Run `web-design-guidelines` skill** — UX and accessibility review before client presentation
- **Run `playwright` MCP** to capture screenshots after each significant revision — always save in `screenshots/v2/` (or `screenshots/final/` when approved)
- If revisions are major: **run `frontend-design` skill** again and save in `design/v2/`

## 3. R&D File — PDF
Once the design is agreed upon, create `docs/RD-report.md` containing:

### R&D Content:

#### 1. Project Summary
- Client name, site type, goal

#### 2. Requirements
- List of all agreed pages and features

#### 3. WordPress — Chosen Tools
- **Theme:** name, reason for selection, link
- **Plugins:**

| Plugin | Purpose | Free/Paid | Performance Impact | Lighter Alternative |
|--------|---------|-----------|-------------------|---------------------|

#### 4. Expected Performance After Implementation
Based on the design, libraries, and chosen theme, estimate realistically:

| Metric | Expected Score | Reason |
|--------|---------------|--------|
| **Page Speed (PageSpeed)** | e.g. 85-90/100 | Tailwind CDN + optimized Unsplash images |
| **SEO** | e.g. 80-90/100 | Theme + Yoast + proper HTML structure |
| **Accessibility** | e.g. 90+/100 | web-design-guidelines review |
| **Design Quality** | e.g. 88/100 | ui-ux-pro-max + bencium |

> Note: these are estimates based on tools and libraries used — actual scores appear after implementation on Google PageSpeed Insights.

#### 5. WordPress Performance Recommendations
- List any project-specific recommendations (caching, image optimization, etc.)

#### 6. Final Design
- Screenshots of the agreed final design

---

## 4. Prepare Assets for Implementation
After client approval of the final design, download and prepare all assets:

**Use `unsplash` MCP to download all images into:**
```
assets/
├── images/        ← all project images, clearly named (hero.jpg, about.jpg...)
├── logo/          ← client logo
└── media/         ← video if present (background-video.mp4...)
```

**Create `assets/README.md` containing:**
| File Name | Usage | Location in WordPress |
|-----------|-------|----------------------|

This file is the reference when you start implementation in WordPress.

---
Then tell the user to convert the markdown to PDF using their preferred tool.
