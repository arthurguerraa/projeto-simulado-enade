import { estatisticaIndisponivel, type Questao } from "../../types/questao";
import type { MapaRespostas } from "../../types/simulado";

interface TabelaEstatisticasCompletasProps {
  questoes: Questao[];
  respostas: MapaRespostas;
}

export function TabelaEstatisticasCompletas({ questoes, respostas }: TabelaEstatisticasCompletasProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
          <tr>
            <th scope="col" className="px-4 py-2">Questão</th>
            <th scope="col" className="px-4 py-2">Sua resposta</th>
            <th scope="col" className="px-4 py-2">SP</th>
            <th scope="col" className="px-4 py-2">Sudeste</th>
            <th scope="col" className="px-4 py-2">Brasil</th>
          </tr>
        </thead>
        <tbody>
          {questoes.map((questao) => {
            const resposta = respostas[questao.id];
            const semDados =
              estatisticaIndisponivel(questao.estatisticas.porUF) &&
              estatisticaIndisponivel(questao.estatisticas.porSudeste) &&
              estatisticaIndisponivel(questao.estatisticas.porBrasil);

            return (
              <tr key={questao.id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-2 font-medium">{questao.id}</td>
                <td className="px-4 py-2">{resposta?.opcao ?? "-"}</td>
                {semDados ? (
                  <td colSpan={3} className="px-4 py-2 text-xs text-amber-600 dark:text-amber-400">
                    Estatística indisponível / Desconsiderada pelo Bisserial
                  </td>
                ) : (
                  <>
                    <td className="px-4 py-2">{questao.estatisticas.porUF}</td>
                    <td className="px-4 py-2">{questao.estatisticas.porSudeste}</td>
                    <td className="px-4 py-2">{questao.estatisticas.porBrasil}</td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}