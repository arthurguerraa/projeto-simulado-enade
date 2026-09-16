# Simulado ENADE 2021 — Ciência da Computação

Simulado digital com as 35 questões objetivas do componente específico da prova do
ENADE 2021 para o Bacharelado em Ciência da Computação. Refatoração completa de um
projeto acadêmico legado (HTML/CSS/JS vanilla) para uma stack moderna.

**Projeto acadêmico** — FATEC Carapicuíba, curso de Análise e Desenvolvimento de
Sistemas (ADS), disciplina de Programação em Microinformática (PMI), sob orientação
da Profa. MSc. Rita Felix.

## Funcionalidades

- 35 questões com 5 alternativas cada, correção imediata e bloqueio de resposta
  após corrigida.
- Duas questões oficialmente anuladas pelo INEP (29 e 33) não penalizam a pontuação.
- Cronômetro de 2 horas, persistente entre reloads de página.
- Comparativo de estatísticas oficiais de acerto (SP, Sudeste, Brasil) por questão.
- Barra de navegação rápida entre as 35 questões, com indicação visual de
  respondida/pendente/atual.
- Tela de resultados com aproveitamento geral, métricas de acerto/erro e tempo total.
- Gabarito comparativo (sua resposta vs. gabarito oficial) questão a questão.
- Modo escuro (padrão) e modo claro, com preferência persistida.
- Acessibilidade: navegação completa por teclado, focus trap em modais,
  `radiogroup` nativo nas alternativas, `aria-live` no timer nos minutos finais.

## Stack

- **React 19 + TypeScript** — via Vite.
- **Tailwind CSS v4** (`@tailwindcss/vite`) — sem arquivo de config separado.
- **React Router** — navegação entre as 7 telas.
- **localStorage** — toda a persistência de progresso e preferências, sem backend.

## Estrutura do projeto

src/
├── types/ # Contratos do domínio: Questao, EstadoSimulado, etc.
├── data/ # questions.ts — as 35 questões, migradas do legado gaba.js
├── domain/ # Regras de negócio puras (sem UI), testáveis isoladamente:
│ # scoring.ts — cálculo de pontuação e acerto/erro
│ # tempo.ts — formatação de duração e contagem regressiva
│ # storage.ts — leitura/escrita segura no localStorage
│ # gabarito.ts — status por questão (correto/incorreto/anulada/em branco)
├── hooks/ # Ligam domínio à UI:
│ # useCountdown.ts — cronômetro genérico
│ # useTimerSimulado.ts — cronômetro aplicado à prova (persistência + ajuste manual)
│ # useSimulado.ts — estado de respostas, correção e finalização
│ # useFocusTrap.ts — reforço de foco retido em modais
├── context/ # ThemeContext — tema claro/escuro global
├── components/
│ ├── layout/ # SiteNav, Footer, Header (do simulado), TimerDisplay, TimerControls
│ ├── question/ # CardQuestao, SeletorAlternativas, BarraNavegacaoQuestoes
│ ├── modals/ # Modal (base com <dialog> nativo), ModalEstatisticas
│ ├── results/ # ResumoAproveitamento, CardMetrica, TabelaEstatisticasCompletas
│ └── gabarito/ # BadgeStatus
└── pages/ # As 7 telas: Home, Tutorial, Sobre, Creditos, Simulado, Resultado, Gabarito


## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Build de produção:

```bash
npm run build
```

## Assets

As imagens das questões e as logos institucionais ficam em `public/img/` e são
referenciadas por caminho absoluto (`/img/...`). Ao adicionar novas imagens, atenção
a **maiúsculas/minúsculas** no nome do arquivo — o Vite diferencia case mesmo que o
sistema de arquivos de origem (Windows) não diferencie.

## Pendências conhecidas

- **Questão 02**: as alternativas C e D vieram idênticas no arquivo legado
  (`js/gaba.js`). A opção correta é "C"; o texto real da alternativa D precisa ser
  conferido contra o PDF oficial do gabarito do INEP.
- **Links de PDF oficial** (prova e gabarito) na Home apontam para a página geral
  de provas/gabaritos do INEP — trocar pelos links diretos do ENADE 2021 de
  Ciência da Computação quando disponíveis.
- **Créditos**: lista de integrantes em `pages/Creditos.tsx` está com placeholders
  — substituir pelos nomes reais do grupo.

## Correções aplicadas na refatoração

Bugs identificados no projeto legado e resolvidos nesta reescrita:

- Cálculo de tempo que podia gerar valores negativos (`"1h -45m 12s"`) — agora
  sempre derivado do total de segundos (`domain/tempo.ts`).
- Crash por acesso direto a `/resultado` ou `/gabarito` sem dados no storage —
  agora mostra estado vazio amigável em vez de `TypeError`.
- `.sr-only` implementado com `display: none` (invisível também para leitores de
  tela) — trocado pelo padrão de clipping do Tailwind.
- Cabeçalhos de tabela do gabarito injetados via CSS `::before` (sem texto real no
  HTML) — agora são `<th scope="col">` de verdade.
- Toggle de tema com atributos inconsistentes (`data-depressed` no HTML vs.
  `data-pressed` checado no JS) — agora usa um único `aria-pressed` para estado e
  estilo.
- Memory leak de listeners empilhados a cada abertura de modal — modais usam
  `<dialog>` nativo com um único `useEffect` de trap, corretamente limpo no
  unmount.