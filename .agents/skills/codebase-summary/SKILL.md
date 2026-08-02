---
name: codebase-summary
description: Produces a structured project summary from research output. Consolidates architecture, components, workflows, and interfaces for article writers. Use after research-codebase.
---

# Codebase Summary

Transform raw research into a writer-ready consolidated context.

## Input

- `.scratch/<slug>/01-research.md` from `research-codebase`
- Optional: user brief, `resumo.md`, session handoff docs

## Workflow

1. Read research artifact fully
2. Deduplicate and group findings
3. Identify the **one story** the article should tell
4. List **must-include facts** (numbers, file names, commands)
5. Flag **optional depth** (can be cut if article runs long)
6. Save to `.scratch/<slug>/02-summary.md`

## Output template

```markdown
# Summary: <topic>

## Elevator pitch (2 sentences)

## Audience
who reads this and what they already know

## Core narrative arc
1. Problem
2. Approach / methodology
3. Concrete implementation
4. Lesson learned

## System overview
| Layer | Technology | Notes |

## Components (top 5–8)
| Name | Purpose | Key file |

## Workflows
(describe agent flows, build flows, HTTP flows)

## Interfaces / contracts
(API ports, skill commands, frontmatter fields)

## Evidence checklist (must appear in article)
- [ ] fact with source path
- [ ] ...

## Suggested section outline (draft)
1. ...
2. ...

## Do not claim (unverified)
(list anything not found in repo)
```

## Rules

- Every fact must trace to research evidence
- Prefer tables and short prose over long dumps
- Separate **repo facts** from **session narrative** (user quotes, decision count)

## Next step

Hand off to `c4-architecture` for diagram material, then `content-research-writer`.
