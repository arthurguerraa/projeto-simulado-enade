import { Link, useLocation, useNavigate } from "react-router-dom";
import { questoes } from "../data/questions";
import { carregarEstadoSimulado } from "../domain/storage";
import { calcularResultado } from "../domain/scoring";
import { calcularTempoGastoMs, formatarDuracao } from "../domain/tempo";
import { useSimulado } from "../hooks/useSimulado";
import { ResumoAproveitamento } from "../components/results/ResumoAproveitamento";
import { CardMetrica } from "../components/results/CardMetrica";
import { TabelaEstatisticasCompletas } from "../components/results/TabelaEstatisticasCompletas";

export default function Resultado() {
  const navigate = useNavigate();
  const location = useLocation();
  const { iniciarNovaTentativa } = useSimulado();

  const estado = carregarEstadoSimulado();
  const tempoEsgotado = Boolean((location.state as { tempoEsgotado?: boolean } | null)?.tempoEsgotado);

  /// Resiliência a acesso direto (seção 4.2 da spec): sem dados, não trava — orienta e sai.
// Importante: checar "finalizado", não "inicioTimestampMs" — uma tentativa recém
// iniciada (ex: logo após "Refazer") também tem inicioTimestampMs preenchido,
// mas ainda não é um resultado válido pra exibir.
if (!estado.finalizado) {
  const emAndamento = estado.inicioTimestampMs !== null;

  return (
    <main className="mx-auto flex max-w-md flex-col items-center gap-4 p-10 text-center">
      <h1 className="text-xl font-semibold">
        {emAndamento ? "Simulado ainda não finalizado" : "Nenhum simulado em andamento"}
      </h1>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {emAndamento
          ? "Você ainda não concluiu esta tentativa. Continue de onde parou."
          : "Não encontramos um resultado para exibir. Que tal começar um novo simulado?"}
      </p>
      <Link
        to={emAndamento ? "/simulado" : "/"}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        {emAndamento ? "Continuar Simulado" : "Voltar para a Home"}
      </Link>
    </main>
  );
}

  const resultado = calcularResultado(questoes, estado.respostas);

  const duracaoMs =
    estado.tempoTotalSegundos !== null
      ? estado.tempoTotalSegundos * 1000
      : calcularTempoGastoMs(estado.inicioTimestampMs);
  const duracaoFormatada = formatarDuracao(duracaoMs);

  function aoRefazer() {
    iniciarNovaTentativa();
    navigate("/simulado");
  }

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 p-6">
      {tempoEsgotado && (
        <p
          role="status"
          className="rounded-lg border border-amber-400 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 dark:border-amber-600 dark:bg-amber-950/40 dark:text-amber-300"
        >
          O tempo da prova se esgotou e o simulado foi finalizado automaticamente.
        </p>
      )}

      <h1 className="text-2xl font-semibold">Resultado do Simulado</h1>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
        <ResumoAproveitamento percentual={resultado.percentualAcertos} />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          <CardMetrica
            titulo="Acertos"
            valor={`${resultado.totalAcertos} (${Math.round((resultado.totalAcertos / 35) * 1000) / 10}%)`}
            corTexto="text-green-600"
          />
          <CardMetrica
            titulo="Erros"
            valor={`${resultado.totalErros} (${Math.round((resultado.totalErros / 35) * 1000) / 10}%)`}
            corTexto="text-red-600"
          />
          <CardMetrica titulo="Tempo total" valor={duracaoFormatada.texto} />
          {resultado.totalAnuladas > 0 && (
            <CardMetrica titulo="Anuladas" valor={resultado.totalAnuladas} corTexto="text-amber-600" />
          )}
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Estatísticas regionais por questão</h2>
        <TabelaEstatisticasCompletas questoes={questoes} respostas={estado.respostas} />
      </section>

      <div className="flex justify-center gap-3">
        <Link
          to="/gabarito"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Ver Gabarito
        </Link>
        <button
          type="button"
          onClick={aoRefazer}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Refazer Simulado
        </button>
      </div>
    </main>
  );
}