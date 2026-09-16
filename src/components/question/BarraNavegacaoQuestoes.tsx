import type { MapaRespostas } from "../../types/simulado";

interface BarraNavegacaoQuestoesProps {
  totalQuestoes: number;
  questaoAtualId: string;
  respostas: MapaRespostas;
  onNavegar: (id: string) => void;
}

export function BarraNavegacaoQuestoes({
  totalQuestoes,
  questaoAtualId,
  respostas,
  onNavegar,
}: BarraNavegacaoQuestoesProps) {
  const ids = Array.from({ length: totalQuestoes }, (_, i) => String(i + 1).padStart(2, "0"));

  return (
    <nav aria-label="Navegação rápida entre questões" className="w-full overflow-x-auto">
      <ul className="grid grid-cols-7 gap-2 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-[repeat(35,minmax(0,1fr))]">
        {ids.map((id) => {
          const atual = id === questaoAtualId;
          const respondida = Boolean(respostas[id]);

          return (
            <li key={id}>
              <button
                type="button"
                aria-current={atual ? "true" : undefined}
                aria-label={`Ir para a questão ${id}${respondida ? ", respondida" : ", pendente"}`}
                onClick={() => onNavegar(id)}
                className={[
                  "flex h-9 w-full items-center justify-center rounded-md border text-xs font-semibold transition-colors",
                  atual
                    ? "border-blue-600 bg-blue-600 text-white"
                    : respondida
                      ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300"
                      : "border-neutral-300 bg-white text-neutral-600 hover:border-blue-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300",
                ].join(" ")}
              >
                {Number(id)}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}