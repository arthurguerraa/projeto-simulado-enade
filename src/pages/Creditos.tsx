
const INTEGRANTES = ["Arthur Guerra", "Kauã Szczepanski", "Hugo Lima"];

export default function Creditos() {
  return (
    <>
      
      <main className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-6 pt-16 pb-6">
        <h1 className="text-3xl font-semibold">Créditos</h1>

        <section>
           <h2 className="text-base font-semibold text-neutral-500 dark:text-neutral-400">
            Instituições
          </h2>
           <ul className="mt-1 list-disc space-y-1 pl-5 text-base text-neutral-700 dark:text-neutral-300">
            <li>FATEC Carapicuíba</li>
            <li>Centro Paula Souza (CPS)</li>
            <li>Curso de Análise e Desenvolvimento de Sistemas (ADS)</li>
          </ul>
        </section>

        <section>
         <h2 className="text-base font-semibold text-neutral-500 dark:text-neutral-400">
            Integrantes do grupo
          </h2>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base text-neutral-700 dark:text-neutral-300">
            {INTEGRANTES.map((nome) => (
              <li key={nome}>{nome}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}