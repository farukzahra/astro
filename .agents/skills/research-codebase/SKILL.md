---
name: research-codebase
description: Deep codebase discovery for technical articles. Maps architecture, data flows, components, and technical decisions from real code. Use before writing repo-based articles. Document what exists — do not propose improvements unless asked.
---

# Research Codebase

Conduct comprehensive research across a target repository. Output is evidence for article writing, not refactor suggestions.

## Critical rule

**Document the codebase as it exists today.**

- Do NOT suggest improvements unless explicitly asked
- Do NOT propose future enhancements unless explicitly asked
- ONLY describe what exists, where, how it works, and how components interact

## Workflow

1. **Read user-mentioned files first** — full content in main context before sub-tasks
2. **Identify scope** — which module, feature, or repo path the article covers
3. **Map structure** — entry points, config, tests, docs (`README`, `CONTEXT.md`, ADRs)
4. **Trace flows** — request paths, build pipelines, agent skill chains
5. **Collect evidence** — file paths, line references, commands that reproduce behavior
6. **Write research artifact** — save to `.scratch/<slug>/01-research.md`

## What to capture

| Area | Look for |
|------|----------|
| Architecture | Layers, services, ports, external deps |
| Config | Profiles, env vars, docker-compose |
| Decisions | ADRs, comments, commit messages |
| Tests | Count, scope, how to run |
| Docs | README, CONTEXT, handoff files (`resumo.md`) |
| Gotchas | Migration issues, platform quirks (PowerShell vs bash) |

## Output template

Save to `.scratch/<slug>/01-research.md`:

```markdown
# Research: <topic>

## Target
- Repo path:
- Scope:
- Date:

## Structure
(bullet list with file paths)

## Key components
(table: component | path | role)

## Data / control flows
(mermaid or prose)

## Technical decisions (evidence-backed)
| Decision | Evidence (file:line or ADR) |

## Commands verified
| Command | Expected result |

## Quotes / user requirements (if session transcript exists)

## Open questions
(items that need human confirmation — do not invent)
```

## Sub-agent use

For repos > ~20 relevant files, spawn parallel explore agents by area (config, src, tests, docs). Synthesize into one research file — no duplicate sections.

## Next step

Hand off to `codebase-summary` with path to `01-research.md`.
