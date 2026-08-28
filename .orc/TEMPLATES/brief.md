# Sub-agent Brief: [Task Name]

## Task

[ONE sentence: exactly what to do, in present tense]

## Project Context (PATHS ONLY — sub-agent reads)

- `.orc/PROJECT.md` — Project state + decisions (read first)
- `design-system.md` — Canonical design system (colors, type, spacing, motion)

## Files to Read (paths only)

- `path/to/file1` — [why]

## Files You May Modify

- `path/to/output1` — [what]

## Files You MUST NOT Touch

- [everything else in the project — including configs, tests, lockfiles]

## Rules (Mandatory)

### Project-Wide Rules

- Single source of truth: `wp-content/themes/cgp/assets/` — all shared code lives there ONLY
- Values ONLY from `tokens.css` via `var()` — never hardcode hex
- Logical properties (margin-block, padding-inline)
- `cgp-` prefix for all custom classes
- English only in code/comments
- No CDN — everything local
- Respect `prefers-reduced-motion: reduce` (disable ALL animations)

### Task-Specific Rules

- [from phase README / task description]

### File-Specific Rules

- [from patterns in target files]

## Constraints

- [tech stack, patterns, style]
- [do not add new dependencies]
- [language: English only in code/comments]

## Tool Policy

- ✅ Read any file in the project
- ✅ Modify files in "Files You May Modify" list
- ✅ Grep/search for context if brief permits
- ❌ Run git commands
- ❌ Install dependencies or modify environment
- ❌ Touch files outside the "may modify" list

## Required Output (JSON)

Return this exact JSON object (no prose, no markdown fences):
{
"status": "success" | "error" | "needs_clarification",
"files_changed": ["path1", "path2"],
"summary": "[1-2 sentences: what you did]",
"verification_command": "[exact command the orchestrator can run to verify]",
"issues": [] | [{"type": "string", "severity": "low|medium|high", "message": "string", "repro": "string"}]
}

## Success Criteria

- [ ] [Specific, testable criterion 1]
- [ ] [Specific, testable criterion 2]

## Escape Hatch

If you cannot complete this task without more context, return:
{"status": "needs_clarification", "question": "[what you need]"}

DO NOT guess file contents. DO NOT invent patterns. DO NOT modify files outside the "may modify" list.