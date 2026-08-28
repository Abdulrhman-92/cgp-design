Project workflow activated. New project kickoff.

## 1. Basic Information
Ask the user for:
1. Client name and project name
2. Type of site (e-commerce, corporate, restaurant, etc.)
3. Do they have a logo? (request it if available)
4. Do they have reference sites they like?
5. Approximate budget

## 2. Client Requirements
After the basic answers, ask:
- Do you have screenshots of conversations with the client? (upload them and I'll extract the details)
- Any additional details you'd like to add?

Extract from images or text all important details:
- Required pages
- Features and services
- Preferred colors or style
- Any special notes from the client

## 3. Create Project Folder
Save all requirements in `docs/requirements.md` first, then create the project folder:

```
[client-name]/
├── assets/
│   ├── images/              ← design images only (from Unsplash, client assets)
│   └── logo/
├── design/
│   └── v1/
│       ├── index.html
│       ├── components/
│       ├── css/
│       │   └── custom.css
│       └── js/
│           └── main.js
├── screenshots/             ← ALL screenshots go here, always — never anywhere else
│   ├── preview/             ← internal review during design (Playwright captures)
│   ├── v1/                  ← first client presentation
│   ├── v2/                  ← after revisions
│   └── final/               ← agreed final design
├── docs/
│   ├── requirements.md      ← all client requirements
│   ├── plan.md
│   ├── rules.md             ← project rules (colors, fonts, libraries...)
│   └── RD-report.md
└── PROJECT.md               ← project summary and agreements
```

**Screenshots rule — STRICTLY ENFORCED:**
- Every screenshot taken by Playwright or any tool goes into `screenshots/` — no exceptions
- Never save screenshots inside `assets/`, `design/`, `docs/`, or anywhere else
- `assets/images/` is for design images only (Unsplash photos, client-provided assets)
- Always use the correct subfolder: `preview/` during design, `v1/` or `v2/` for client presentations, `final/` for the agreed design

Show the user the proposed folder structure and ask:
> "This is the folder structure I suggest for this project — do you approve it, or would you like to change anything before I create it?"

**Never create any files or folders until the user explicitly approves the structure.**

After approval, create the structure, then show a summary of `requirements.md` and ask if anything is missing. Then tell the user the next step is `/plan`.
