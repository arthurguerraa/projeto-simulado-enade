import { Link } from "react-router-dom";
import { questoes } from "../data/questions";
import { carregarEstadoSimulado } from "../domain/storage";
import { montarLinhaGabarito } from "../domain/gabarito";
import { BadgeStatus } from "../components/gabarito/BadgeStatus";

export default function Gabarito() {
  const estado = carregarEstadoSimulado();

  // Mesma regra de resiliência do Resultado (seção 4.2): sem simulado
  // finalizado, não trava — orienta e sai, em vez de crashar como o legado.
  if (!estado.finalizado) {
    return (
      <main className="mx-auto flex max-w-md flex-col items-center gap-4 p-10 text-center">
        <h1 className="text-xl font-semibold">Nenhum gabarito para exibir</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Finalize um simulado primeiro para ver o comparativo com o gabarito oficial.
        </p>
        <Link
          to="/"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Voltar para a Home
        </Link>
      </main>
    );
  }

  const linhas = questoes.map((questao) => montarLinhaGabarito(questao, estado.respostas));

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Gabarito Comparativo</h1>

      <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
            <tr>
              <th scope="col" className="px-4 py-2">Questão</th>
              <th scope="col" className="px-4 py-2">Sua resposta</th>
              <th scope="col" className="px-4 py-2">Gabarito oficial</th>
              <th scope="col" className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((linha) => (
              <tr key={linha.questaoId} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="px-4 py-2 font-medium">{linha.questaoId}</td>
                <td className="px-4 py-2">{linha.suaResposta}</td>
                <td className="px-4 py-2">{linha.gabaritoOficial}</td>
                <td className="px-4 py-2">
                  <BadgeStatus status={linha.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-3">
        <Link
          to="/resultado"
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Voltar ao Resultado
        </Link>
      </div>
    </main>
  );
}