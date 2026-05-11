# TR Experimental

Protótipo de redação assistida para **Termo de Referência** (TR) de contratações públicas, com editor de campos à esquerda e o documento sendo composto em tempo real à direita, no estilo de um códice tipográfico — a identidade visual *Codex Oficial*.

> Status: experimental. Atualmente implementa o **Capítulo I — Do Objeto da Licitação**. Capítulos subsequentes serão acrescidos em folhas posteriores.

## Stack

- [React 19](https://react.dev/) + TypeScript
- [Vite 7](https://vitejs.dev/) como bundler e dev server
- [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/vite`
- Tipografia: Fraunces (serifa), Geist (sans), JetBrains Mono (mono)
- pnpm como gerenciador de pacotes

## Pré-requisitos

- Node.js compatível com Vite 7 (≥ 20.19 ou ≥ 22.12)
- [pnpm](https://pnpm.io/) instalado globalmente

## Instalação

```bash
pnpm install
```

## Scripts

| Comando            | Descrição                                                |
| ------------------ | -------------------------------------------------------- |
| `pnpm dev`         | Sobe o servidor de desenvolvimento do Vite               |
| `pnpm build`       | Type-check com `tsc -b` e build de produção do Vite      |
| `pnpm preview`     | Serve o build de produção localmente                     |
| `pnpm typecheck`   | Verifica os tipos sem emitir artefatos                   |

## Estrutura

```
.
├── index.html              # Entrada do Vite (importa src/main.tsx)
├── src/
│   ├── main.tsx            # Bootstrap do React
│   ├── App.tsx             # Compõe o SplitLayout (editor + prévia)
│   ├── index.css           # Estilos globais e tokens do Codex
│   ├── codex/              # Sistema de design Codex
│   │   ├── SplitLayout.tsx   # Layout de duas colunas
│   │   ├── Masthead.tsx      # Cabeçalho do códice
│   │   ├── Colophon.tsx      # Rodapé editorial
│   │   ├── PaperLeaf.tsx     # Folha de papel para a prévia
│   │   ├── SectionHeader.tsx # Cabeçalho de seção/capítulo
│   │   ├── Field.tsx         # Campos (Textarea, Select, ...)
│   │   ├── RadioGroup.tsx    # Grupo de opções
│   │   ├── Button.tsx        # Botões em variantes (ghost/seal)
│   │   ├── Rule.tsx          # Régua tipográfica
│   │   ├── Orientacao.tsx    # Bloco de orientação contextual
│   │   ├── Placeholder.tsx   # Placeholder para seções futuras
│   │   ├── cn.ts             # Utilitário de classes
│   │   └── index.ts          # Re-exports do design system
│   └── form/
│       ├── types.ts                       # Tipos e estado inicial do TR
│       ├── sections/Section1Objeto.tsx    # Capítulo I — Do Objeto
│       └── preview/
│           ├── DocumentPreview.tsx        # Moldura do documento
│           └── Section1Preview.tsx        # Renderização do Capítulo I
└── legacy/                 # Protótipo HTML/JS anterior (referência)
```

O alias `@/codex` resolve para `src/codex` (configurado em `vite.config.ts` e `tsconfig.app.json`).

## Modelo do formulário

O Capítulo I cobre os campos previstos no início de um Termo de Referência:

- **1.1** — Objeto da contratação
- **1.2** — Registro de Preços (tipo, órgãos atendidos, eventual redução de escopo)
- **1.3** — Existência de Estudo Técnico Preliminar (ETP) e justificativa de ausência
- **1.4** — Parcelamento do objeto (item único, itens, grupo único, grupos)
- **1.5** — Permissão de consórcios e justificativa de eventual vedação
- **1.6 / 1.7** — Permissão de cooperativas e pessoa física

Referências normativas citadas nos *hints* dos campos (ex.: Decreto Estadual nº 54.700/2023) servem apenas de orientação editorial e não constituem validação jurídica.

## Filosofia de design

A interface é construída como um *códice oficial*: tipografia editorial, numeração hierárquica explícita (1.1, 1.2.1, ...) e uma prévia em folha de papel que ecoa a forma final do documento. Campos condicionais aparecem apenas quando aplicáveis, mantendo a página enxuta.

## Legado

A pasta `legacy/` preserva o protótipo original em HTML/JS de página única, mantido como referência histórica. A reescrita atual em React/TypeScript foi inaugurada no commit `feat: bootstrap Codex redesign with split-pane editor`.
