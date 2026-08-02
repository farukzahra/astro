---
name: blog-article
description: Write and format technical articles for this Astro blog. MDX frontmatter, English content, Mermaid diagrams, exampleSlug linking. Use when creating or editing src/content/articles/**/*.mdx.
---

# Blog Article (Astro MDX)

Articles live in `src/content/articles/<category>/<slug>.mdx`.

## Frontmatter (required)

```yaml
---
title: string
description: string          # SEO, ~150 chars
publishDate: YYYY-MM-DD
updatedDate: YYYY-MM-DD
author: Faruk
tags: string[]               # 4–8 tags
draft: true                  # false only after build + fact-check + user approval
featured: false              # true for homepage highlight
series: string               # optional, e.g. "Agents in Production"
exampleSlug: string        # optional — folder under examples/
---
```

Schema: `src/content.config.ts`.

## Bilingual articles (en + pt-BR)

Every public article has **two MDX files** linked by `translationId`:

| Version | File pattern | Example |
|---------|--------------|---------|
| English (primary) | `<category>/<slug>.mdx` | `agents/my-post.mdx` |
| Portuguese | `<category>/<slug>-pt-BR.mdx` | `agents/my-post-pt-BR.mdx` |

Required frontmatter on **both** files:

```yaml
lang: en          # or pt-BR
translationId: agents/my-post   # same id on both versions
```

- Write the English version first, then create the `-pt-BR.mdx` translation.
- Listings (homepage, RSS) show English only; the 🇺🇸/🇧🇷 toggle on the article page switches languages.
- Code blocks stay in English in both versions.

## Content rules

- **Language:** English for the primary `.mdx`; Portuguese for `-pt-BR.mdx`
- **User quotes:** If the author wrote in Portuguese (chat with the LLM), **translate to English** in the article. Fix spelling/grammar in the translation (e.g. *denovo* → *again*, *nao* → *don't*). Keep original repo artifact names (README headings, ADRs) only when citing files—add English gloss in parentheses if helpful.
- **Tone:** Direct, developer-to-developer — see `technical-writing` skill
- **Structure:** Hook → what you build → architecture → implementation → lessons
- **Diagrams:** Mermaid fenced blocks (blog renders them)
- **Code:** Real snippets from source repo; cite paths in prose
- **No fluff:** Skip "In today's fast-paced world", generic pros/cons lists

## Runnable examples

If the article includes runnable code:

1. Create `examples/<exampleSlug>/` with README + project
2. Set `exampleSlug` in frontmatter
3. GitHub link auto-renders: `github.com/farukzahra/blog/tree/main/examples/<exampleSlug>`

For **external repos** (e.g. faruk-base2): link directly in prose — no `exampleSlug` unless code is copied into this repo.

## Article categories

| Folder | Use for |
|--------|---------|
| `agents/` | AI agents, skills, orchestration |
| `mcp/` | Model Context Protocol |
| `java/` | Spring, JVM |
| `architecture/` | System design |

Pick category from primary topic.

## Post-publish (draft: false)

Follow `.cursor/rules/publish-article-linkedin.mdc`:

1. `npm run build` passes
2. Commit/push only if user asked
3. Verify prod URL 200
4. `npm run linkedin:post -- --slug <category/slug> --dry-run` first

## Scratch workspace

Pipeline artifacts: `.scratch/<slug>/`

Do not commit scratch files unless user wants research preserved in repo.
