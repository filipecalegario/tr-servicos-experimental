# Passagem de Bastão — TR de Fornecimento

> Documento de briefing para o agente que assumirá a construção do **Termo de Referência de Fornecimento** em um repositório irmão. Este repositório atual (`TR-experimental`) implementa a versão de **Serviços** e serve como referência viva de arquitetura, design e filosofia editorial. Ambos os TRs são instrumentos da **administração pública do Estado de Pernambuco**, regidos pela Lei nº 14.133/2021 e pelo Decreto Estadual de Pernambuco nº 54.700/2023.

---

## 1. O que é o projeto

O projeto é um **protótipo de redação assistida para Termos de Referência (TR)** de contratações públicas no **Estado de Pernambuco** — instrumento previsto pela Lei nº 14.133/2021 (Nova Lei de Licitações) e, no recorte estadual, pelo Decreto Estadual de Pernambuco nº 54.700/2023, que regulamenta a aplicação da nova lei no âmbito da administração pública estadual pernambucana.

Em vez de oferecer um editor de texto livre (Word, Google Docs) ou um formulário burocrático e desconectado do produto final, a ferramenta funciona como **mesa de redação editorial**: o usuário responde campos guiados à esquerda e vê o documento sendo composto em tempo real à direita, em formato de folha de papel — como se assistisse a um *códice oficial* sendo impresso clausula a cláusula.

A premissa é simples: **um bom TR é, sobretudo, um bom texto jurídico-administrativo**. A ferramenta cuida da tipografia, da numeração hierárquica (1.1, 1.2.1, …), do encadeamento condicional de cláusulas e da consistência editorial, deixando o redator livre para se concentrar no conteúdo material da contratação.

### Por que dois TRs (Serviços e Fornecimento)?

A Lei nº 14.133/2021 e seus regulamentos tratam **contratação de serviços** e **contratação para fornecimento de bens** como objetos com naturezas distintas. As cláusulas obrigatórias, as condições de participação, os critérios de aceitação, as regras de garantia, de entrega, de fiscalização, de pagamento e de recebimento mudam substancialmente entre os dois. Tentar unificar tudo em um único TR genérico produziria um documento confuso e cheio de campos condicionais que se anulam.

Por isso a estratégia é manter **duas implementações irmãs**, com:

- **mesma filosofia editorial** (códice oficial),
- **mesmo sistema de design** (Codex),
- **mesma arquitetura técnica** (split-pane, estado-único, prévia derivada),
- **conteúdos e modelagens próprias** (campos, cláusulas, condicionais e validações específicas de cada natureza).

Este repositório de Serviços é a referência canônica de *como construir*. O repositório de Fornecimento deve ser uma adaptação fiel da forma, com conteúdo próprio.

---

## 2. Filosofia editorial — o "Codex Oficial"

A identidade visual da ferramenta é deliberadamente **livresca, editorial e tipográfica**, não administrativa nem corporativa. As decisões de design partem das seguintes diretrizes:

- **Tipografia como protagonista**: Fraunces (serifa expressiva, para títulos e citações em itálico), Geist (sans humanista, para corpo de interface) e JetBrains Mono (para numeração e marcações técnicas).
- **Numeração hierárquica explícita**: cada cláusula tem seu número visível (1.1, 1.2.1, 1.2.2, …) tanto no editor quanto na prévia. Isso reforça a sensação de documento normativo e ajuda o redator a manter a estrutura.
- **Prévia como folha de papel**: o painel direito imita uma folha de códice, com margens generosas e composição em uma única coluna de texto justificável.
- **Cláusulas condicionais em itálico cinza**: quando um campo ainda não foi preenchido, a cláusula correspondente aparece em cinza-itálico (componente `ClauseDim`) com instrução do que falta decidir. Quando o campo é preenchido, a cláusula assume sua forma definitiva, em tinta cheia.
- **Placeholders visíveis**: trechos faltantes dentro de uma cláusula já decidida aparecem com marcação leve (componente `Placeholder`), indicando onde ainda precisa entrar texto livre.
- **Orientação contextual**: cada bloco editorial pode trazer um *Orientacao* — uma nota lateral italicizada, em tom editorial, com diretriz de redação ou referência normativa. Não é validação jurídica, é guia de estilo.
- **Hierarquia de seção**: capítulos são introduzidos por `SectionHeader` (número grande, *eyebrow* "Capítulo I", título com palavras-chave em itálico) e separados internamente por `Rule` (régua tipográfica com pequeno marcador, ex.: `§ Registro de Preços`).
- **Enxugamento condicional**: campos só aparecem quando aplicáveis. Se o usuário diz "não há ETP", surge o campo de justificativa. Se diz "há ETP", o campo some. A página nunca exibe campo inútil.

> **Diretriz para o agente irmão**: replique fielmente esta linguagem. Não introduza novas paletas, ícones decorativos, emojis, sombras pesadas, gradientes ou widgets de bibliotecas externas. A consistência visual entre as duas ferramentas é parte da identidade do produto.

---

## 3. Arquitetura técnica

### 3.1. Stack

- **React 19** + **TypeScript** estrito
- **Vite 7** como bundler e dev server
- **Tailwind CSS 4** via `@tailwindcss/vite` (tokens customizados em `src/index.css`)
- **pnpm** como gerenciador de pacotes
- Fontes: Fraunces, Geist, JetBrains Mono (via `@fontsource` ou import direto — conferir `src/index.css`)
- Sem dependências de UI externas. Sem state manager. Sem roteador. Sem testes (ainda).

### 3.2. Padrão geral

A aplicação é uma **single-page** com layout em duas colunas (`SplitLayout`):

```
┌────────────────────────────┬────────────────────────────┐
│ Editor (esquerda)          │ Prévia (direita)           │
│ — Formulário em campos     │ — Folha de papel           │
│ — Numeração explícita      │ — Cláusulas em tempo real  │
│ — Hints e orientações      │ — Itálico cinza p/ vazio   │
└────────────────────────────┴────────────────────────────┘
```

O **estado é único** (`Section1Data` em `src/form/types.ts`), mantido em `App.tsx` via `useState`, e propagado para o editor por callback `onChange(key, value)` e para a prévia por leitura direta. **A prévia é uma função pura do estado**: dado o mesmo `data`, sempre produz o mesmo HTML.

### 3.3. Camadas de código

```
src/
├── main.tsx                 # Bootstrap React
├── App.tsx                  # Estado raiz + montagem do SplitLayout
├── index.css                # Tokens Codex (cores, fontes, espaçamentos)
├── codex/                   # Sistema de design — components agnósticos
│   ├── SplitLayout.tsx
│   ├── Masthead.tsx
│   ├── Colophon.tsx
│   ├── PaperLeaf.tsx
│   ├── SectionHeader.tsx
│   ├── Field.tsx            # Textarea, Select, Input
│   ├── RadioGroup.tsx
│   ├── Button.tsx           # variants: ghost, seal
│   ├── Rule.tsx
│   ├── Orientacao.tsx
│   ├── Placeholder.tsx      # Placeholder + ClauseDim
│   ├── cn.ts                # util de classes
│   └── index.ts             # re-exports
└── form/                    # Camada de conteúdo — específica do TR
    ├── types.ts             # Tipos e estado inicial
    ├── sections/
    │   └── Section1Objeto.tsx     # Capítulo I (editor)
    └── preview/
        ├── DocumentPreview.tsx    # Moldura do documento
        └── Section1Preview.tsx    # Capítulo I (prévia)
```

O alias `@/codex` resolve para `src/codex` (ver `vite.config.ts` e `tsconfig.app.json`).

> **Recomendação forte para o agente irmão**: **copie integralmente** a pasta `src/codex/`, `src/index.css` e a moldura `src/form/preview/DocumentPreview.tsx` para o novo repositório, sem mudanças. A camada que deve diferir é exclusivamente `src/form/` (tipos, seções, prévias) — essa é a *content layer*, intencionalmente isolada para permitir variantes do TR.

### 3.4. Padrão de uma seção (capítulo)

Cada capítulo do TR é composto por **três artefatos coordenados**:

1. **Tipos** (em `src/form/types.ts`) — declaram os campos, suas uniões literais (ex.: `'sim' | 'nao' | ''`) e o estado inicial.
2. **Editor** (em `src/form/sections/SectionNXxx.tsx`) — recebe `data` e `onChange`, renderiza `SectionHeader` + campos do Codex (`Textarea`, `Select`, `RadioGroup`), com `Orientacao` e `Rule` para guiar a leitura. **Campos condicionais** são renderizados via `data.x === 'sim' ? <Campo /> : null`.
3. **Prévia** (em `src/form/preview/SectionNPreview.tsx`) — recebe `data` e devolve cláusulas (`<Clause number="1.1">…</Clause>`). Quando um campo está vazio, usa `<ClauseDim>` para a cláusula inteira ou `<Placeholder>` para o trecho específico, sempre com texto-guia do que falta decidir.

O **número da cláusula** aparece nos três lugares (campo, editor e prévia) — isso é deliberado e dá ao usuário uma âncora de leitura consistente.

---

## 4. Modelo do TR de Serviços (Capítulo I implementado)

Como referência concreta do padrão, eis o que o Capítulo I — *Do Objeto da Licitação* — cobre na versão de Serviços:

| Item    | Campo                                                  | Tipo                          | Condicionais                       |
| ------- | ------------------------------------------------------ | ----------------------------- | ---------------------------------- |
| 1.1     | Objeto da contratação                                  | Textarea                      | —                                  |
| 1.2     | É Registro de Preços?                                  | Select sim/não                | abre 1.2.1, 1.2.2, 1.2.3 se "sim"  |
| 1.2.1   | Tipo de RP (corporativo / simples / unificado)         | Select                        | só se 1.2 = sim                    |
| 1.2.2   | Órgãos atendidos                                       | Textarea                      | só se 1.2 = sim                    |
| 1.2.3   | Redução de escopo?                                     | Select sim/não                | só se 1.2 = sim                    |
| 1.2.3.1 | Justificativa da redução                               | Textarea                      | só se 1.2.3 = sim                  |
| 1.3     | Existe ETP?                                            | Select sim/não                | abre 1.3.1 se "não"                |
| 1.3.1   | Justificativa da ausência de ETP                       | Textarea                      | só se 1.3 = não                    |
| 1.4     | Haverá parcelamento?                                   | Select sim/não                | abre 1.4.1 se "sim"                |
| 1.4.1   | Forma de parcelamento (item único, itens, grupo, …)   | Select                        | só se 1.4 = sim                    |
| 1.5     | Permite consórcios?                                    | RadioGroup com 3 opções       | abre 1.5.1 se "não"                |
| 1.5.1   | Justificativa da vedação ao consórcio                  | Textarea                      | só se 1.5 = não                    |
| 1.6     | Permite cooperativa?                                   | Select sim/não                | —                                  |
| 1.7     | Permite pessoa física?                                 | Select sim/não                | —                                  |

Os capítulos subsequentes (II em diante) ainda **não foram implementados** e devem ser acrescidos como "folhas posteriores" — o `App.tsx` já antecipa essa expansão com o botão "Avançar →" e a nota "Próximas seções serão acrescidas em folhas subsequentes."

---

## 5. Conteúdo específico do TR de Fornecimento

O conteúdo material do TR de Fornecimento — capítulos, cláusulas, campos, condicionais e redação — **será fornecido pelo usuário a partir do documento-padrão oficial disponibilizado pelo Governo do Estado de Pernambuco**. O ponto de partida do conteúdo é esse documento-padrão; não cabe ao agente irmão inferir, propor ou inventar estrutura por analogia ao TR de Serviços.

> **Diretriz para o agente irmão**: aguarde o usuário entregar o documento-padrão antes de modelar cláusulas. A fidelidade ao documento oficial do Estado é o critério de correção do conteúdo.

Independentemente da estrutura específica que o documento-padrão estabelecer, cada capítulo deve seguir **rigorosamente o mesmo padrão tripartite** (tipos → editor → prévia) descrito em §3.4, e respeitar a filosofia editorial e o sistema de design das seções 2 e 3.

---

## 6. Como começar (sequência recomendada)

1. **Clone este repositório como referência** (somente leitura) e abra o repositório novo do TR de Fornecimento.
2. **Copie a infraestrutura** para o novo repo:
   - `package.json` (ajustar `name` para `tr-fornecimento` ou equivalente)
   - `pnpm-lock.yaml`, `tsconfig*.json`, `vite.config.ts`, `index.html`, `.gitignore`
   - Pasta inteira `src/codex/`
   - `src/index.css` (tokens, fontes, classes globais `doc-*`, `codex-*`)
   - `src/main.tsx`
   - `src/form/preview/DocumentPreview.tsx` (moldura genérica do documento)
3. **Instale**: `pnpm install` e rode `pnpm dev` para confirmar que o boilerplate sobe.
4. **Aguarde o documento-padrão do Estado de Pernambuco** entregue pelo usuário, que definirá os capítulos, cláusulas e campos do TR de Fornecimento.
5. **Modele o primeiro capítulo** seguindo o padrão tripartite (§3.4) com base no documento-padrão. Use o Capítulo I do TR de Serviços apenas como **referência de forma** (numeração, condicionais, uso de `ClauseDim` e `Placeholder`), não como fonte de conteúdo.
6. **Valide com o usuário** antes de avançar — confirme nomes de campos, condicionais e redação das cláusulas a cada capítulo.
7. **Itere capítulo a capítulo**, sempre validando com o usuário a estrutura proposta antes de codificar.

---

## 7. Regras de ouro

1. **Não mude o Codex**. Se sentir necessidade de um componente novo (ex.: tabela editável para itens de fornecimento), proponha-o como adição ao `src/codex/` mantendo o mesmo vocabulário visual; não use bibliotecas de UI prontas.
2. **Não use bibliotecas de formulário** (Formik, React Hook Form, Zod, etc.). O padrão `useState` + `onChange(key, value)` é deliberadamente cru e legível.
3. **Não introduza roteamento** até existir mais de uma rota real. Capítulos serão páginas/seções dentro da mesma SPA por enquanto.
4. **Numeração é sagrada**: cada cláusula tem um número e ele aparece em todos os três lugares (editor, prévia, tipos como comentário se útil).
5. **Cláusula vazia ≠ cláusula ausente**: quando o usuário ainda não decidiu, a cláusula aparece em `<ClauseDim>` com a instrução do que falta. Nunca esconda silenciosamente uma cláusula obrigatória.
6. **Hints e Orientações ≠ validação jurídica**: as referências normativas (ex.: art. 45 do Decreto 54.700/2023) são apoio editorial. Não implemente lógica de validação legal automática.
7. **Português brasileiro, registro formal**: todas as cláusulas, hints e orientações devem soar como texto jurídico-administrativo. Nada de informalidade, exclamações, ícones decorativos ou emojis.
8. **Acessibilidade**: o componente `Field` já faz o trabalho de label, hint e numeração. Use-o sempre — não rederize `<input>` ou `<textarea>` cru.
9. **Sem testes automatizados por ora**: o protótipo prioriza forma e fluxo editorial. Testes virão depois, quando o modelo estiver estável.

---

## 8. Referências normativas (apenas para apoio editorial)

- **Lei nº 14.133/2021** — Nova Lei de Licitações e Contratos Administrativos (federal)
- **Decreto Estadual de Pernambuco nº 54.700/2023** — regulamento principal da Lei nº 14.133/2021 no âmbito do Estado de Pernambuco; citado em hints do TR de Serviços e referência normativa primária do projeto
- **Decretos e instruções normativas complementares do Estado de Pernambuco** — verificar normativa estadual aplicável ao escopo de fornecimento (compras, registro de preços corporativo, sustentabilidade, etc.)
- **Manuais e modelos da SAD-PE** (Secretaria de Administração do Estado de Pernambuco) e da Procuradoria Geral do Estado (PGE-PE) — referenciais práticos de TRs adotados pela administração estadual
- **IN SEGES/ME nº 65/2021** e correlatas — referenciais federais, úteis como modelo de estrutura quando o regramento estadual for omisso
- **Manuais de TR/ETP** publicados pelo TCE-PE e órgãos centrais de compras

> Estas referências são insumos de redação, não de validação. Não embuta jurisprudência no app.

---

## 9. Critério de "pronto" para o MVP

O MVP do TR de Fornecimento estará pronto quando:

- A aplicação sobe com `pnpm dev` no novo repositório.
- Os capítulos definidos no documento-padrão do Estado estão implementados (ou ao menos o(s) primeiro(s) capítulo(s) acordados com o usuário como escopo inicial), seguindo o padrão tripartite (tipos → editor → prévia).
- A prévia compõe o documento em tempo real, com `ClauseDim` para cláusulas indecidas e `Placeholder` para trechos faltantes.
- A identidade visual é indistinguível do TR de Serviços (mesma tipografia, mesma paleta, mesmas réguas, mesmo cabeçalho de seção, mesma folha de papel).
- O README do novo repositório é uma adaptação direta do README deste, citando este projeto como irmão de referência.

---

## 10. Mensagem final ao agente irmão

Este projeto começou como um exercício de **levar a sério a forma de um documento público**. O usuário não quer um gerador automático de TRs nem um wizard burocrático. Quer uma ferramenta que respeite a tradição editorial do documento administrativo brasileiro — numeração, hierarquia, sobriedade tipográfica — e que ao mesmo tempo o liberte da tarefa mecânica de copiar templates do Word.

Boa redação.
