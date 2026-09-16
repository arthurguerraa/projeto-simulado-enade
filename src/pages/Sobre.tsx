

export default function Sobre() {
  return (
    <>
      
      <main className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-6 pt-16 pb-6">
        <h1 className="text-3xl font-semibold">Sobre o Projeto</h1>

  <p className="text-base text-neutral-700 dark:text-neutral-300">
          Este simulado reproduz as 35 questões objetivas do componente específico da prova do
          ENADE 2021 para o Bacharelado em Ciência da Computação, com correção imediata,
          cronômetro de 2 horas e comparativo de estatísticas oficiais de acerto por estado
          (São Paulo), região (Sudeste) e país (Brasil), conforme divulgado pelo INEP.
        </p>

        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-neutral-500 dark:text-neutral-400">Instituição</dt>
            <dd>FATEC Carapicuíba</dd>
          </div>
          <div>
            <dt className="font-semibold text-neutral-500 dark:text-neutral-400">Curso</dt>
            <dd>Análise e Desenvolvimento de Sistemas (ADS)</dd>
          </div>
          <div>
            <dt className="font-semibold text-neutral-500 dark:text-neutral-400">Disciplina</dt>
            <dd>Programação em Microinformática (PMI)</dd>
          </div>
          <div>
            <dt className="font-semibold text-neutral-500 dark:text-neutral-400">Orientadora</dt>
            <dd>Profa. MSc. Rita Felix</dd>
          </div>
        </dl>

        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          O ENADE avalia o desempenho dos estudantes em relação aos conteúdos programáticos
          previstos nas diretrizes curriculares do curso e integra o cálculo do CPC (Conceito
          Preliminar de Curso), parte do SINAES.
        </p>
      </main>
    </>
  );
}