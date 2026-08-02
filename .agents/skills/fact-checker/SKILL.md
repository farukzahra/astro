---
name: fact-checker
description: Verifies claims, statistics, file paths, and commands in technical articles against the source repository. Separates facts from opinions. Use after draft, before setting draft false.
---

# Fact Checker

Validate article claims against evidence. Block publish if critical facts fail.

## Input

- Article draft (MDX or markdown)
- Source repo path
- Research/summary artifacts in `.scratch/<slug>/`

## Workflow

1. Extract every **factual claim** from the draft:
   - Numbers (test count, ports, questions asked)
   - File paths and class names
   - Command outputs
   - Version strings (Java, Spring Boot)
   - Quotes attributed to users
   - External URLs
2. Verify each claim against repo or transcript
3. Classify: **verified** | **unverified** | **wrong** | **opinion**
4. Save `.scratch/<slug>/06-fact-check.md`
5. Fix draft — remove or correct failed claims

## Verification methods

| Claim type | How to verify |
|------------|---------------|
| File exists | Read or glob |
| Code snippet | Grep exact string |
| Test count | Count `@Test` |
| Port numbers | docker-compose, application.yml |
| ADR content | Read ADR file |
| Commit SHA | `git log` in source repo |
| Command works | Run if safe (read-only) |

## Output template

```markdown
# Fact check: <slug>

## Summary
- Verified: N
- Fixed in draft: N
- Removed from draft: N
- Opinions (OK, label as such): N

## Claims

| # | Claim in article | Status | Evidence |
|---|------------------|--------|----------|

## Required fixes
(bullet list — agent must apply before done)

## Safe opinions (no verification needed)
(recommendations, "in my experience")
```

## Rules

- **Wrong** → fix or delete; never publish
- **Unverified** → soften language ("typically", "in this session") or verify
- Distinguish **Matt Pocock upstream** vs **local fork** (`/ask-fmz` alias)
- Do not invent metrics (token counts, session duration) unless sourced

## Next step

After all **wrong** items fixed: `npm run build`, then set `draft: false` only if user asked to publish.
