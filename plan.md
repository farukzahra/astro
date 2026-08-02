# Building a Technical Blog with Astro

## Goal

Create a modern, fast, SEO-friendly technical blog to publish articles about:

* Java
* Spring Boot
* AI Engineering
* MCP
* LLMs
* RAG
* Software Architecture
* System Design
* Career Notes
* Study Notes

The entire website should be generated statically and deployed automatically to a VPS.

---

# Why Astro?

Astro is an excellent choice because it offers:

* Excellent performance
* Static Site Generation (SSG)
* Native Markdown support
* MDX support
* Great SEO
* RSS generation
* Sitemap generation
* Dark mode support
* Syntax highlighting
* Component Islands (interactive React/Vue components only where needed)

This allows us to focus on writing instead of maintaining a CMS.

---

# Technology Stack

```
Astro
Tailwind CSS
MDX
TypeScript
Shiki
Mermaid
GitHub
GitHub Actions
Docker
Nginx
Ubuntu VPS
```

---

# Project Structure

```
blog/

├── public/
│
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │    index.astro
│   │    about.astro
│   │    articles/
│   │
│   ├── content/
│   │
│   ├── styles/
│   │
│   └── config.ts
│
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

# Content Organization

```
src/content/articles

java/

spring/

architecture/

mcp/

llm/

rag/

career/

projects/
```

Example:

```
src/content/articles/

java/

    java-memory-model.mdx

spring/

    spring-ai-introduction.mdx

mcp/

    building-an-mcp-server.mdx

llm/

    transformers-explained.mdx
```

---

# Article Metadata

Each article should contain frontmatter.

```md
---
title: Building an MCP Server with Spring Boot
description: Learn how to expose a Spring Boot application as an MCP Server.
publishDate: 2026-07-28
updatedDate: 2026-07-28
author: Faruk
tags:
  - Java
  - Spring
  - MCP
  - AI
draft: false
---
```

---

# Home Page

The homepage should include:

* Hero section
* Latest Articles
* Categories
* Search
* Featured Articles
* Recent Series
* Newsletter
* GitHub Link
* LinkedIn Link

---

# Categories

```
Java

Spring Boot

Software Architecture

AI Engineering

Machine Learning

LLMs

Prompt Engineering

MCP

RAG

Agents

Career

Projects
```

---

# Features

## Search

Use Pagefind.

Benefits:

* Offline search
* Extremely fast
* Zero backend

---

## Syntax Highlighting

Use Shiki.

Supported languages:

* Java
* Kotlin
* SQL
* JavaScript
* TypeScript
* Bash
* YAML
* JSON
* Dockerfile

---

## Diagrams

Support Mermaid.

Example:

```
graph TD

Client --> MCP Server

MCP Server --> Spring Boot

Spring Boot --> PostgreSQL
```

---

## Math

Support KaTeX.

Useful for AI and machine learning articles.

---

## Dark Mode

Automatic

Light

Dark

System preference

---

# SEO

Generate automatically:

* sitemap.xml
* robots.txt
* Open Graph
* Twitter Cards
* Canonical URLs
* RSS Feed

---

# Performance Goals

Lighthouse

Performance > 95

SEO > 100

Accessibility > 95

Best Practices > 95

---

# Deployment

```
Git Push

↓

GitHub Actions

↓

Build Astro

↓

Docker Image

↓

Push to VPS

↓

Restart Container
```

---

# Docker

```
Node Builder

↓

Generate Static Site

↓

Nginx Container

↓

Serve HTML
```

---

# VPS Architecture

```
Internet

↓

Cloudflare (optional)

↓

Caddy (host — HTTPS)

↓

Nginx (Docker, 127.0.0.1:8085)

↓

Astro Static Files (/dist)

↓

SSL (Let's Encrypt via Caddy)
```

---

# VPS — Infra compartilhada (Faruk)

Credenciais e acesso SSH/PAT: **`secrets.local.md`** (gitignored, na raiz deste repo).

Documentação canônica:

* `C:\repo\financeiro\planos\guia-deploy-vps.local.md`
* `C:\repo\faruk_base\docs\deploy-vps.md` (referência job-hunter)

## Recursos reservados para o blog

| Item | Valor |
|------|-------|
| VPS IP | `66.23.231.218` |
| Path na VPS | `/opt/blog` |
| Porta interna | `8085` (Caddy → Nginx Docker) |
| Domínio sugerido | `blog.faruk.dev.br` |
| Repo GitHub | `farukzahra/blog` |
| Branch deploy | `main` |

## Primeiro deploy na VPS (checklist)

1. Repositório `farukzahra/blog` no GitHub
2. Configurar secrets Actions (`VPS_HOST`, `VPS_USER`, `VPS_PORT`, `VPS_SSH_KEY`, `DEPLOY_PATH`) — ver `secrets.local.md`
3. DNS Registro.br: `A blog 66.23.231.218`
4. SSH na VPS: `mkdir -p /opt/blog` + clone do repo
5. Adicionar bloco Caddy para `blog.faruk.dev.br` → `127.0.0.1:8085`
6. `docker compose -f docker-compose.prod.yml up -d --build`
7. Validar: `curl -sI https://blog.faruk.dev.br/`

## Arquivos de deploy a implementar

```
.github/workflows/deploy.yml   # build Astro + SSH deploy
Dockerfile                     # multi-stage: node build → nginx serve
docker-compose.prod.yml        # nginx:8085 → /usr/share/nginx/html
nginx.conf                     # gzip, cache estático, SPA fallback off
scripts/deploy-vps.sh          # pull, build, restart container
```

## Fluxo GitHub Actions (target)

```yaml
# Pseudocódigo do workflow
on: push to main
jobs:
  build:
    - npm ci
    - npm run build          # astro build + pagefind
    - docker build -t blog .
  deploy:
    - ssh to VPS
    - cd /opt/blog
    - git pull
    - docker compose -f docker-compose.prod.yml up -d --build
    - curl health local :8085
```

## Portas em uso na VPS (não conflitar)

| Porta | Serviço |
|-------|---------|
| 3000 | faruk |
| 8081 | financeiro |
| 8082 | nfe_bot |
| 8083 | job-hunter |
| **8085** | **blog** |

---

# Future Features

* Comments (Giscus)
* Reading time
* Tags
* Series
* Article recommendations
* Full-text search
* RSS
* Newsletter
* Related articles
* Code copy button
* Mermaid diagrams
* Image optimization
* Table of contents
* Pagination

---

# AI Features (Future)

Integrate an AI assistant capable of:

* Explaining articles
* Answering questions
* Recommending related articles
* Searching semantic content
* Creating summaries
* Generating quizzes
* Chatting with readers

Possible architecture:

```
Astro

↓

Search Index

↓

Embedding Database

↓

LLM

↓

Chat Interface
```

---

# CI/CD Pipeline

```
Developer

↓

Git Commit

↓

GitHub

↓

GitHub Actions

↓

npm install

↓

astro build

↓

Docker Build

↓

SSH Deploy VPS

↓

docker compose up -d --build

↓

Caddy (HTTPS já configurado)
```

---

# Implementation Phases

## Fase 1 — Scaffold (atual)

- [x] Repo `C:\repo\blog` com plano, AGENTS.md, README
- [x] Documentação VPS/PAT em `secrets.local.md`
- [x] `npm create astro@latest` (template minimal + Tailwind)
- [x] Content collections + frontmatter schema
- [x] Layout base + dark mode

## Fase 2 — Conteúdo e features

- [x] Pagefind, Shiki, Mermaid, KaTeX
- [x] RSS, sitemap, robots.txt, OG tags
- [x] Homepage (hero, categorias, busca, featured)
- [x] Primeiro artigo de exemplo

## Fase 3 — Deploy

- [x] Dockerfile multi-stage
- [x] docker-compose.prod.yml
- [x] GitHub Actions deploy.yml
- [x] DNS + Caddy na VPS
- [x] Primeiro deploy manual (Docker + HTTPS)
- [x] Secrets GitHub configurados
- [x] Deploy automático via Actions (workflow run #2 — success)

## Fase 4 — Polish

- [x] Giscus (comentários via GitHub Discussions)
- [ ] Lighthouse audit (>95 performance)
- [ ] Reading time, TOC, copy button
- [ ] Newsletter (form estático ou serviço externo)

---

# Long-Term Vision

The website should evolve into a personal technical knowledge base rather than only a blog.

Goals:

* Publish one article every week.
* Build a searchable knowledge repository.
* Document personal learning.
* Share practical software engineering experience.
* Create reusable references for interviews and projects.
* Demonstrate expertise in Java, AI Engineering, and modern backend development.
