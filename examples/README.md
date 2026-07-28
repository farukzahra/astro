# Article code examples

Each published article with runnable code lives in its own folder here.

## Layout

```
examples/
└── <article-slug>/
    ├── README.md       # how to run, prerequisites, expected output
    ├── pom.xml         # or build.gradle / package.json
    └── src/            # application source
```

The slug must match the article file name (without extension), e.g.:

- Article: `src/content/articles/mcp/adapting-spring-boot-rest-to-mcp.mdx`
- Code: `examples/adapting-spring-boot-rest-to-mcp/`

## GitHub link

Articles reference examples via frontmatter:

```yaml
exampleSlug: adapting-spring-boot-rest-to-mcp
```

The blog renders a link to:

`https://github.com/farukzahra/astro/tree/main/examples/<exampleSlug>`

## Rules

1. Code must run locally with the steps in the folder README.
2. Keep snippets in the MDX article in sync with the example project.
3. Do not commit build artifacts (`target/`, `build/`, `node_modules/`).
4. Prefer one self-contained project per article; split into a separate repo only for large standalone products.
