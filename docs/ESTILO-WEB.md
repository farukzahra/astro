# Estilo web — blog.faruk.dev.br

Guia do sistema visual **Lumen · Night Foundry** no blog Astro. Alinhado visualmente com [faruk.dev.br](https://www.faruk.dev.br). **Fonte de verdade do código:** `src/styles/global.css`.

Spec completa do currículo (Vue): `../faruk/docs/ESTILO-WEB.md` (se existir no monorepo local).

---

## Identidade

| Aspecto | Descrição |
|---------|-----------|
| Registro | Atmosférico, técnico, craft — mesma família do site de currículo |
| Mood | Violeta noturno + accent latão (`oklch(76% 0.17 50)`) |
| Textura | Grade blueprint 48×48 px |
| Tipografia | Instrument Serif (display) + Geist Sans (body) + JetBrains Mono (labels) |

O blog é **sempre escuro** (sem toggle light/dark) — igual às rotas públicas do faruk.

---

## Tokens (`:root` em `global.css`)

| Token | Uso |
|-------|-----|
| `--lumen-paper` | Fundo da página + blueprint |
| `--lumen-panel` | Cards, painéis, nav |
| `--lumen-surface` | Ilhas de conteúdo (hero, about, artigo) |
| `--lumen-ink` / `--lumen-ink-2` | Títulos / corpo |
| `--lumen-accent` | Links, labels, CTAs, tags |
| `--lumen-rule` | Bordas e separadores |

Variáveis legadas `--color-*` mapeiam para os tokens Lumen (compatibilidade com estilos inline antigos).

---

## Componentes

| Peça | Arquivo | Padrão |
|------|---------|--------|
| Nav pílula sticky | `Header.astro` | `.app-top-nav` |
| Hero | `Hero.astro` | `.lumen-hero` |
| Cards de artigo | `ArticleCard.astro` | `.lumen-panel` + hover lift |
| Tags / categorias | `CategoryGrid`, tags | `.lumen-tag` |
| Seções | headings | `.lumen-section-heading` |
| Títulos de página | h1 | `.lumen-page-title` |
| Ilhas | about, search, code link | `.lumen-island` |
| Rodapé | `Footer.astro` | `.lumen-footer` |
| Prose MDX | `global.css` | h2 mono accent; h1/h3 serif |

---

## Fontes

Carregadas em `BaseLayout.astro`:

- Instrument Serif + JetBrains Mono — Google Fonts
- Geist Sans — jsDelivr CDN

---

## Navegação

Links da pílula: **Home · Articles · About · Resume** (faruk.dev.br) · **GitHub**.

Link ativo: `aria-current="page"` + fundo accent @ 12%.

---

## Regras para alterações

1. Estender tokens e classes em `global.css` — não inventar paleta paralela.
2. Headings **sem itálico**; ênfase por accent ou peso.
3. `overflow-x: clip` em `html`/`body`.
4. Cards: hover com `translateY(-4px)` e glow accent (`.lumen-panel`).
5. Conteúdo do blog permanece em **inglês**.

---

## Referências

- Currículo (Vue): `C:\repo\faruk\frontend\src\styles.css`
- Skill Hallmark: `.agents/skills/hallmark/`
- Plano do blog: `docs/PLAN.md`
