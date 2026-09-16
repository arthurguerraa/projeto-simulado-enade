# Especificações Técnicas do Projeto — Simulado ENADE

Este documento consolida todas as regras de negócio, dados, fluxos de navegação, persistência, telas, casos de borda e requisitos necessários para orientar uma **refatoração completa** do sistema para qualquer stack moderna (React, Vue, Svelte, Angular, Next.js, Flutter Web, Vanilla moderno, etc.).

---

## 1. Visão Geral do Produto

- **Nome do Projeto:** Simulado Digital ENADE — Bacharelado em Ciência da Computação (2021)
- **Origem / Contexto:** Projeto acadêmico para a disciplina de Programação em Microinformática (PMI) do curso de Análise e Desenvolvimento de Sistemas (ADS) da FATEC Carapicuíba, sob orientação da Profa. MSc. Rita Felix.
- **Objetivo Principal:** Disponibilizar uma plataforma web interativa para estudantes realizarem a prova do ENADE 2021 de Ciência da Computação, fornecendo feedback imediato de correção, cronometragem, comparativo de estatísticas de acerto oficiais do INEP (por estado, região e país) e emissão de relatório/gabarito final de desempenho.

---

## 2. Dados e Modelagem das Questões

O banco de questões original encontra-se estático no arquivo `js/gaba.js`.

### 2.1 Estrutura de Cada Questão

Cada item representa uma questão da prova:

```typescript
interface Alternativa {
  id: "A" | "B" | "C" | "D" | "E";
  texto: string;
}

interface EstatisticaRegiao {
  porUF: string; // Ex: "45.1%" ou "-%"
  porSudeste: string; // Ex: "49.2%" ou "-%"
  porBrasil: string; // Ex: "50.5%" ou "-%"
}

interface Questao {
  id: string; // Formato "01" a "35" com zero à esquerda
  enunciado: string; // Texto complementar ou pergunta
  img: string; // Caminho da imagem (screenshot oficial da prova)
  opcoes: Alternativa[]; // Exatamente 5 alternativas (A a E)
  opcaoCorreta: "A" | "B" | "C" | "D" | "E" | "#"; // '#' indica questão anulada
  estatisticas: EstatisticaRegiao; // Percentuais oficiais de acerto
}
```

### 2.2 Especificidades e Casos Especiais dos Dados

1. **Total de Questões:** Exatamente 35 questões.
2. **Questões Anuladas:** As questões `29` e `33` possuem `opcaoCorreta: "#"`.
   - Regra de negócio: Devem ser identificadas como **Anuladas**. O usuário não deve ser penalizado por erro e as alternativas devem ficar desabilitadas ou com aviso explícito.
3. **Estatísticas Ausentes:** Quando uma questão não possui dados estatísticos no relatório do INEP (ou foi desconsiderada pelo bisserial), os campos contêm a string `"-%"`. A interface deve exibir mensagem informativa amigável (ex: _"Estatística indisponível / Desconsiderada pelo Bisserial"_).
4. **Erros no Legado para Correção:**
   - Na Questão `02`, as alternativas `C` e `D` contêm textos repetidos no arquivo legado.
   - Textos de enunciados legados contêm erros pontuais de OCR (ex.: _"efi cácia"_, _"políti cas"_).
5. **Assets de Imagem:** Cada questão utiliza uma ou mais imagens correspondentes a recortes da prova física (ex: `img/Q1_text.PNG`, `img/Q2_text1.PNG`, `img/Q2_text2.PNG`, ..., até `img/Q35_text.png`). Ao refatorar, garantir que o leitor de tela tenha texto alternativo coerente (`alt="Ilustração da Questão X"`).

---

## 3. Arquitetura da Informação e Telas

O sistema é composto por 7 telas/visões funcionais:

```
[Início / Home] ──┬──> [Instruções / Tutorial]
                  ├──> [Sobre o Projeto]
                  ├──> [Créditos]
                  └──> [Simulado (Execução)] ──> [Tela Final (Resultados)] ──> [Gabarito Comparativo]
                               ▲                               │
                               └────────── (Refazer) ──────────┘
```

### 3.1 Tela 1: Início (`index.html`)

- **Propósito:** Apresentação da ferramenta e porta de entrada para o teste.
- **Conteúdo:**
  - Título e boas-vindas destacando a prova do ENADE 2021 de Ciência da Computação.
  - Explicação resumida sobre o que é o ENADE (Conceito Preliminar de Curso - CPC, SINAES).
  - Links externos úteis (abrem em nova aba):
    - Site oficial do INEP / ENADE.
    - PDF oficial da Prova (download INEP).
    - PDF oficial do Gabarito (download INEP).
- **Ações:**
  - Botão principal: **"Iniciar Simulado"**. Deve limpar tentativas anteriores não finalizadas e navegar para a tela do simulado.

### 3.2 Tela 2: Instruções / Tutorial (`tutorial.html`)

- **Propósito:** Onboarding e regras operacionais da prova.
- **Conteúdo:**
  - 35 questões com 5 alternativas e apenas uma correta.
  - Regra de bloqueio de resposta: ao confirmar/corrigir uma resposta ou avançar para outra questão, a resposta é travada para evitar trocas.
  - Navegação livre entre questões.
  - Explicação sobre opções de acessibilidade (modo escuro / alto contraste, ajuste de brilho).
- **Ações:**
  - Botão para iniciar o simulado.

### 3.3 Tela 3: Sobre (`sobre.html`)

- **Propósito:** Ficha técnica do projeto acadêmico.
- **Conteúdo:**
  - Resumo das regras (35 questões, opção de cronômetro, estatísticas de acertos por questão).
  - Identificação acadêmica: FATEC Carapicuíba — Curso de Análise e Desenvolvimento de Sistemas (ADS).
  - Disciplina: Programação em Microinformática (PMI).
  - Orientadora: Profa. MSc. Rita Felix.
  - Referência oficial ao ENADE / INEP.

### 3.4 Tela 4: Créditos (`credito.html`)

- **Propósito:** Reconhecimento institucional e autoria dos alunos.
- **Conteúdo:**
  - Logos e links para FATEC Carapicuíba, Centro Paula Souza (CPS) e curso ADS.
  - Lista de integrantes do grupo de desenvolvimento.

### 3.5 Tela 5: Simulado — Tela Principal de Execução (`simulado.html`)

- **Propósito:** Onde o candidato responde as questões da prova.
- **Elementos da Interface:**
  1. **Cabeçalho / Barra Superior:**
     - Links de navegação institucional.
     - Controles de acessibilidade: Alternar Alto Contraste / Modo Escuro e Slider de Brilho.
     - Indicador da questão atual (ex: `"Questão 05 / 35"`).
  2. **Cronômetro (Timer):**
     - Tempo limite de 2 horas (120 minutos = 02:00:00).
     - Contagem regressiva de segundo em segundo.
     - Persistente a recarregamentos de página (salva tempo restante no storage).
     - Ao esgotar o tempo: notificar o usuário e finalizar/bloquear automaticamente o teste.
  3. **Área da Questão:**
     - Título da prova (`Exame de Ciência da Computação - Bacharelado`).
     - Imagem da questão (redimensionável e responsiva).
     - Texto do enunciado da questão.
     - Grupo de 5 alternativas (A, B, C, D, E) com radio buttons estilizáveis.
  4. **Barra de Navegação Rápida (Paginação de Questões):**
     - 35 botões/itens numerados de 1 a 35.
     - Cores de estado por item:
       - _Atual:_ Destaque ativo.
       - _Respondida:_ Indicador visual diferenciado.
       - _Pendente:_ Estado padrão.
     - Clique em qualquer número transporta diretamente para a questão selecionada.
  5. **Botoeira de Ações:**
     - **Voltar:** Navega para `questão atual - 1` (desabilitado na questão 1).
     - **Próxima:** Navega para `questão atual + 1` (se passar da 35, dispara confirmação de finalizar).
     - **Corrigir:** Habilitado após marcar uma alternativa. Ao acionar:
       - Bloqueia permanentemente as alternativas da questão atual.
       - Grava a resposta e o status de acerto/erro.
       - Abre o **Modal de Correção Instantânea**.
     - **Estatísticas:** Habilitado após selecionar alternativa ou após responder. Abre o **Modal de Estatísticas Regionais**.
     - **Finalizar:** Exibe modal de confirmação. Se confirmado, computa o tempo final e redireciona para a Tela de Resultados.
     - **Refazer Prova:** Pede confirmação; se aceito, limpa dados de progresso e reinicia o teste do início.
     - **Sair:** Pede confirmação; redireciona para a Home (`index.html`).
  6. **Modal 1 — Correção Instantânea:**
     - Mensagem de status: `"Acertou!"` (verde) ou `"Errou!"` (vermelho).
     - Mostra qual era a alternativa correta (letra e texto completo).
     - Botão para fechar o modal.
  7. **Modal 2 — Estatísticas Regionais:**
     - Status de acerto/erro do candidato.
     - Letra assinalada vs. letra correta.
     - Gráficos de barras verticais comparativas de porcentagem de acertos:
       - Estado de São Paulo (`SP`)
       - Região `Sudeste`
       - Média `Brasil`
     - Aviso caso os dados tenham sido desconsiderados na prova oficial.

### 3.6 Tela 6: Resultados Finais (`final.html`)

- **Propósito:** Dashboard de desempenho do candidato após concluir a prova.
- **Métricas e Elementos:**
  - **Indicador Central de Aproveitamento:** Porcentagem geral de acertos calculada sobre 35 questões (gráfico circular ou barra de progresso em destaque).
  - **Cards de Métricas:**
    - Quantidade e porcentagem de **Acertos**.
    - Quantidade e porcentagem de **Erros**.
    - **Tempo Total Transcorrido** formatado (ex: `01h 35m 42s`).
  - **Visualização Completa de Estatísticas:** Permite inspecionar a taxa de acertos regional do INEP de todas as 35 questões.
  - **Ações:**
    - Botão **"Ver Gabarito"**: leva para a tela de gabarito comparativo.
    - Botão **"Refazer Simulado"**: reseta dados do quiz e inicia nova tentativa.

### 3.7 Tela 7: Gabarito Comparativo (`gabarito.html`)

- **Propósito:** Revisão detalhada questão por questão.
- **Tabela Comparativa:**
  - Colunas semânticas:
    1. _Questão:_ Número (01 a 35).
    2. _Sua Resposta:_ Alternativa marcada pelo usuário (ou `"-"` se deixada em branco).
    3. _Gabarito Oficial:_ Alternativa correta oficial do INEP.
    4. _Status:_ Indicador visual (Correto, Incorreto, Em Branco ou Anulada).

---

## 4. Gerenciamento de Estado e Persistência

### 4.1 Chaves de Armazenamento Utilizadas

O projeto armazena o progresso no cliente (`localStorage`). Toda refatoração deve garantir um schema robusto e seguro:

| Chave de Exemplo          | Tipo de Dado                                          | Propósito                                               |
| ------------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| `simulado_respostas`      | `Record<string, { opcao: string; acertou: boolean }>` | Mapeia respostas salvas por ID de questão.              |
| `simulado_inicio`         | `number` (Unix timestamp em ms)                       | Registro do exato milissegundo de início da prova.      |
| `simulado_tempo_restante` | `number` (segundos restantes)                         | Estado do cronômetro de 2 horas.                        |
| `simulado_tempo_total`    | `number` ou `string`                                  | Duração final total da prova para consulta pós-término. |
| `preferencia_tema`        | `"dark" \| "light" \| "high-contrast"`                | Preferência de tema do usuário.                         |
| `preferencia_brilho`      | `number` (0 a 100)                                    | Ajuste de intensidade de tela.                          |

### 4.2 Regras de Preservação e Limpeza de Estado

- **Ao clicar em "Refazer" ou "Iniciar Simulado":** Deve limpar apenas o progresso do simulado (respostas, cronômetro, tempo final). **NÃO deve apagar as preferências de tema e acessibilidade do usuário**.
- **Resiliência a Acesso Direto:** Se o usuário acessar `/resultado` ou `/gabarito` com o storage vazio ou sem ter iniciado a prova, a aplicação **NÃO deve travar** (evitar `null dereference`); deve redirecionar amigavelmente para a Home ou exibir estado vazio (empty state).

---

## 5. Regras de Negócio e Lógica Crítica

1. **Cálculo de Duração:**
   - Salvar timestamp inicial com `Date.now()`.
   - No momento de finalizar, calcular a diferença: `tempoGastoMs = Date.now() - timestampInicial`.
   - Formatar horas, minutos e segundos matematicamente:
     ```javascript
     const segundosTotais = Math.floor(tempoGastoMs / 1000);
     const horas = Math.floor(segundosTotais / 3600);
     const minutos = Math.floor((segundosTotais % 3600) / 60);
     const segundos = segundosTotais % 60;
     ```
2. **Cálculo de Pontuação:**
   - Total de questões válidas: 35.
   - Questões anuladas não devem punir o aluno.
   - `percentualAcertos = (totalAcertos / 35) * 100`.
3. **Bloqueio de Alternativas (Imutabilidade após correção):**
   - Uma vez que o aluno aciona "Corrigir" ou "Estatísticas" em uma questão, as alternativas daquela questão tornam-se inalteráveis para garantir integridade pedagógica da simulação.
4. **Navegação com Preservação:**
   - O usuário pode navegar livremente entre questões já respondidas e pendentes sem perder o que já marcou.

---

## 6. Problemas e Falhas do Legado (O Que Corrigir na Refatoração)

Qualquer IA ou desenvolvedor que for refatorar este código deve eliminar os seguintes problemas graves presentes na versão legada:

1. **Erros de Parse HTML:**
   - Haviam tags `<div id="favicon"></div>` dentro do `<head>`, que forçavam o encerramento prematuro do `<head>` no padrão HTML5.
   - Haviam tags `<a>` aninhadas dentro de `<button>` (`<button><a href="..."></a></button>`), o que é proibido pela especificação HTML e causa bugs de clique.
2. **Crashes por Referência Nula:**
   - Abertura de `final.html` ou `gabarito.html` sem dados no `localStorage` quebrava a página inteira com `TypeError: Cannot read properties of null`.
3. **Cálculo de Tempo Quebrado:**
   - O legado subtraía horas e minutos isoladamente (`horaFin - horaIni`), exibindo valores negativos como `"1h -45m 12s"`.
4. **Bugs de Acessibilidade:**
   - A classe `.sr-only` estava implementada com `display: none`, tornando os elementos invisíveis para leitores de tela em vez de ocultá-los apenas visualmente.
   - Cabeçalhos de tabela no gabarito não tinham texto no HTML e eram injetados exclusivamente via CSS `::before`.
5. **Memory Leaks de Event Listeners:**
   - Toda vez que o modal de correção era aberto, novos event listeners de clique eram empilhados no `document` e nos botões de fechar, sem remoção prévia.
6. **Código Duplicado e CSS Órfão:**
   - Várias regras CSS eram repetidas 3 vezes com valores idênticos.
   - Havia 16 arquivos CSS carregados via `@import` síncrono.
7. **Bug do Toggle de Alto Contraste:**
   - O HTML injetava o atributo `data-depressed="0"` enquanto o script checava `getAttribute('data-pressed')`, falhando no primeiro clique.

---

## 7. Requisitos Não Funcionais e de Design para a Refatoração

1. **Responsividade Total (Mobile-First):**
   - A interface deve funcionar perfeitamente em telas móveis pequenas (a partir de 360px de largura) até desktops ultrawide (1920px+).
   - O painel de 35 botões numéricos de navegação deve ser responsivo (grid flexível ou carrossel com rolagem suave).
2. **Identidade Visual Moderna:**
   - Estilo profissional de plataforma educacional / exame online (ex: Khan Academy, Alura, Quizlet, Coursera).
   - Tipografia legível (ex: Inter, Poppins, Roboto).
   - Hierarquia clara de botões de ação (primário, secundário, perigo/cancelar).
3. **Acessibilidade (WCAG 2.1 nível AA):**
   - Suporte nativo a navegação completa via teclado (Tab, Shift+Tab, Enter, Espaço, Esc para fechar modais).
   - Focus visible destacado em todos os elementos interativos.
   - Contraste adequado entre textos e fundos.
   - Modais com foco retido (focus trap) e tecla `Escape` para fechar.
4. **Arquitetura Sugerida para a Nova Stack:**
   - Centralizar as 35 questões em um arquivo estruturado único (ex: `src/data/questions.json` ou módulo TypeScript).
   - Separar regras de negócio (cálculo de pontuação, gerenciamento de timer, persistência) da camada de apresentação/UI.
   - Componentes reutilizáveis para: Card de Questão, Seletor de Alternativas, Modal/Diálogo, Barra de Progresso, Timer e Tabela de Gabarito.

---

## 8. Estrutura de Pastas e Mapeamento de Arquivos

### 8.1 Estrutura Atual do Repositório (Legado)

Abaixo está o mapa completo da árvore de diretórios existente no repositório:

```
PMI-P1-Grupo1/
│
├── QUESTOES ENADe.txt                 # Anotações brutas e transcrições do ENADE 2021
├── README.md                          # Breve apresentação acadêmica do projeto
├── ESPECIFICACOES.md                  # Este documento de especificação técnica
│
├── view/                              # Páginas HTML da aplicação multi-páginas (MPA)
│   ├── index.html                     # Tela inicial / Apresentação e CTA principal
│   ├── simulado.html                  # Interface de execução do simulado (questões/timer)
│   ├── tutorial.html                  # Instruções de uso e regras do teste
│   ├── sobre.html                     # Sobre o projeto, orientadora e faculdade
│   ├── credito.html                   # Créditos e lista de integrantes
│   ├── final.html                     # Dashboard de resultados e estatísticas finais
│   └── gabarito.html                  # Tabela comparativa de gabarito
│
├── js/                                # Lógica e controladores em Vanilla JavaScript
│   ├── gaba.js                        # Base de dados estática com as 35 questões e estatísticas
│   ├── quest.js                       # Controlador do simulado (renderização, eventos, popups)
│   ├── timer.js                       # Cronômetro regressivo de 2 horas
│   ├── nav.js                         # Injeção dinâmica do header, footer e controles de tema/brilho
│   ├── final.js                       # Controlador da tela de resultados (cálculos e gráficos)
│   ├── resultgabarito.js              # Controlador e gerador das tabelas de gabarito
│   └── img.js                         # Alternância dinâmica de favicon por tema
│
├── css/                               # Estilos CSS divididos por telas e componentes
│   ├── app.css                        # Folha mestra com @imports globais e variáveis :root
│   ├── topNav.css                     # Estilos da barra de navegação superior e menu mobile
│   ├── botomNav.css                   # Estilos da barra de navegação inferior / rodapé
│   ├── content.css                    # Estilos dos containers de conteúdo da tela inicial
│   ├── simulado.css                   # Estilos do card de questão, botões e opções
│   ├── timer.css                      # Estilos do cronômetro flutuante
│   ├── popUp.css                      # Estilos dos modais de correção e estatísticas
│   ├── statsBar.css                   # Estilos das barras verticais de estatísticas regionais
│   ├── graphics.css                   # Estilos dos gráficos circulares e barras de progresso
│   ├── tabela.css                     # Estilos para tabelas (duplicado/órfão)
│   ├── gabarito.css                   # Estilos da visualização de gabarito
│   ├── tutorial.css                   # Estilos da tela de tutorial
│   ├── sobre.css                      # Estilos da tela sobre
│   ├── creditos.css                   # Estilos da tela de créditos
│   ├── navBar.css                     # Estilos da paginação de 35 questões
│   └── final.css                      # Arquivo vazio no legado
│
├── img/                               # Imagens estáticas e ilustrações
│   ├── Q1_text.PNG ... Q35_text.png   # 40+ capturas de tela dos enunciados das questões
│   ├── logo_png.svg                   # Logo vetorial do ENADE
│   ├── inep-logo.png                  # Logo oficial do INEP
│   ├── logoFatec.png                  # Logo da FATEC Carapicuíba
│   ├── logoCPS.png                    # Logo do Centro Paula Souza
│   ├── adslogo.png                    # Logo do curso de ADS
│   ├── cronometro.png                 # Ícone do cronômetro
│   ├── alto-contraste.png             # Ícone de acessibilidade / alto contraste
│   ├── brilho.png                     # Ícone de ajuste de luminosidade
│   └── Hamburger-menu.svg             # Ícone de menu mobile
│
└── doc/                               # Documentos de apoio oficiais
    └── ciencias_computacao_estatisticas.pdf # Relatório oficial de estatísticas do ENADE 2021
```

---

### 8.2 Estrutura Recomendada para o Projeto Refatorado

Independentemente do framework ou biblioteca escolhida para a refatoração (React, Vue, Svelte, Angular ou Vanilla modular), recomenda-se organizar o novo projeto seguindo o seguinte padrão modular:

```
novo-projeto/
│
├── public/                            # Arquivos estáticos servidos diretamente
│   ├── favicon.ico                    # Favicon válido no root
│   ├── doc/                           # PDFs e referências documentais
│   │   └── ciencias_computacao_estatisticas.pdf
│   └── img/                           # Assets de imagens (logos e recortes das questões)
│       ├── questions/                 # Q01_text.png até Q35_text.png
│       └── branding/                  # Logos institucionais (FATEC, INEP, CPS, etc.)
│
├── src/
│   ├── assets/                        # SVGs, ícones e estilos globais
│   │   └── styles/                    # Configurações de tema, reset e tokens CSS
│   │
│   ├── data/                          # Camada de dados centralizada
│   │   ├── questions.json (ou .ts)    # As 35 questões estruturadas e tipadas
│   │   └── examInfo.json              # Metadados da prova (ano, curso, tempo total)
│   │
│   ├── types/                         # Definições de tipos / interfaces (se usar TS)
│   │   └── quiz.ts                    # Question, Option, Stats, ExamState, Theme
│   │
│   ├── utils/ / services/             # Funções utilitárias e regras de negócio puras
│   │   ├── storage.js                 # Leitura/escrita segura no localStorage com fallbacks
│   │   ├── formatters.js              # Formatação de tempo (ms -> HH:MM:SS) e porcentagens
│   │   └── scoreCalculator.js         # Cálculo de aproveitamento, acertos, erros e anulações
│   │
│   ├── hooks/ / state/ / store/       # Gerenciamento de estado da aplicação
│   │   ├── useQuiz (ou quizStore)     # Estado do simulado (questão atual, respostas marcadas)
│   │   ├── useTimer (ou timerStore)   # Cronômetro regressivo com persistência
│   │   └── useTheme (ou themeStore)   # Alternância Dark / Light / High-Contrast
│   │
│   ├── components/                    # Componentes modulares reutilizáveis
│   │   ├── layout/                    # Header/Navbar, Footer, Container, ThemeToggle
│   │   ├── ui/                        # Button, Modal, Card, ProgressBar, Badge, Tooltip
│   │   ├── quiz/                      # QuestionCard, OptionList, OptionItem, QuestionNav
│   │   ├── timer/                     # TimerBadge flutuante com aviso de tempo esgotando
│   │   ├── feedback/                  # CorrectionModal, RegionalStatsChart
│   │   └── results/                   # ScoreCard, StatTiles, AnswerComparisonTable
│   │
│   └── views/ / pages/                # Telas ou rotas da aplicação
│       ├── HomeView                   # Tela inicial de boas-vindas e CTA
│       ├── InstructionsView           # Regras e tutorial do simulado
│       ├── AboutView                  # Informações sobre o projeto e orientadora
│       ├── CreditsView                # Créditos dos alunos e entidades
│       ├── QuizView                   # Execução do simulado interativo
│       ├── ResultsView                # Resumo de notas e estatísticas pós-prova
│       └── AnswerKeyView              # Tabela de gabarito comparativo
│
├── tests/                             # Testes automatizados (opcional)
│   ├── scoreCalculator.test.js        # Validação do cálculo de nota e tempo
│   └── storage.test.js                # Validação de persistência e tratamento de nulos
│
├── package.json                       # Manifesto de dependências e scripts
└── README.md                          # Instruções de setup, build e execução do novo projeto
```

