---
name: article-from-repo
description: Orchestrates the full technical-article pipeline from a source repository. Runs research-codebase → codebase-summary → c4-architecture → content-research-writer → technical-writing → fact-checker → blog-article. Use when user asks to write an article from a codebase.
---

# Article from Repo — Pipeline Harness

Turn a technical repository into a blog article backed by real evidence.

## Trigger

User provides:
- **Source repo path** (absolute or relative)
- **Topic / angle** (optional)
- **Category** (optional, default infer from topic)

## Pipeline (run in order)

| Step | Skill | Output |
|------|-------|--------|
| 1 | `research-codebase` | `.scratch/<slug>/01-research.md` |
| 2 | `codebase-summary` | `.scratch/<slug>/02-summary.md` |
| 3 | `c4-architecture` | `.scratch/<slug>/03-architecture.md` + Mermaid |
| 4 | `content-research-writer` | `.scratch/<slug>/04-outline.md`, draft sections |
| 5 | `technical-writing` | Polish draft — HOW/WHY, no fluff |
| 6 | `fact-checker` | `.scratch/<slug>/06-fact-check.md` + fixes |
| 7 | `blog-article` | `src/content/articles/<category>/<slug>.mdx` |
| 8 | `verification-before-completion` | `npm run build` |

## Slug naming

- Derive from topic: `matt-pocock-skills-harness-product-crud`
- Lowercase, hyphenated, matches MDX filename

## Step 3 — C4 guidance for articles

Generate **Context + Container** minimum. Add Component only for the module under discussion. Embed Mermaid in final MDX — do not rely on C4-only syntax if blog Mermaid lacks C4 support; use `flowchart TB` when needed.

## Step 4 — Outline defaults for harness/session articles

1. What the repo is
2. The workflow used (`/ask-fmz` → `/grill-with-docs` → `/implement`)
3. One concrete session (decisions table)
4. Implementation delta (before/after)
5. Real gotcha (Liquibase + Docker volume, etc.)
6. When to skip `/to-spec`
7. Takeaways

## Step 7 — Draft policy

- Start with `draft: true`
- Set `draft: false` only after fact-check pass **and** user confirms publish

## External source repos

When source is outside this blog repo (e.g. `../faruk-base2`):

- Link to GitHub in prose
- Do not copy entire codebase into `examples/` unless user asks
- Fact-check against source repo on disk

## Credit

When covering Matt Pocock skills: cite [mattpocock/skills](https://github.com/mattpocock/skills). Note local renames (e.g. `/ask-fmz` vs `/ask-matt`).
