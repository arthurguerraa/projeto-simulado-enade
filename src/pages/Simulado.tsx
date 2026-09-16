import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questoes } from "../data/questions";
import { useSimulado } from "../hooks/useSimulado";
import { useTimerSimulado } from "../hooks/useTimerSimulado";
import { CardQuestao } from "../components/question/CardQuestao";
import { BarraNavegacaoQuestoes } from "../components/question/BarraNavegacaoQuestoes";
import { Header } from "../components/layout/Header";
import { ModalEstatisticas } from "../components/modals/ModalEstatisticas";
import { DURACAO_PROVA_SEGUNDOS } from "../types/simulado";
import { calcularTempoGastoMs } from "../domain/tempo";

export default function Simulado() {
  const navigate = useNavigate();
  const {
    respostas,
    selecionarAlternativa,
    corrigirQuestaoAtual,
    finalizarSimulado,
    inicioTimestampMs,
  } = useSimulado();
  const [questaoAtualId, setQuestaoAtualId] = useState("01");
  const [modalEstatisticasAberto, setModalEstatisticasAberto] = useState(false);

  const { segundosRestantes, ajustarTempoMinutos, resetarParaDuracaoPadrao } =
    useTimerSimulado({
      onEsgotar: () => {
        finalizarSimulado(DURACAO_PROVA_SEGUNDOS);
        navigate("/resultado", { state: { tempoEsgotado: true } });
      },
    });

  const questaoAtual = questoes.find((q) => q.id === questaoAtualId);
  const respostaAtual = questaoAtual ? respostas[questaoAtual.id] : undefined;

  if (!questaoAtual)
    return <p className="p-6">Cadastre as questões em data/questions.ts.</p>;

  function aoFinalizar() {
    const confirmado = window.confirm("Tem certeza que deseja finalizar o simulado?");
    if (!confirmado) return;

    const tempoGastoSegundos = Math.floor(
      calcularTempoGastoMs(inicioTimestampMs ?? Date.now()) / 1000
    );
    finalizarSimulado(tempoGastoSegundos);
    navigate("/resultado");
  }

  return (
    <>
      <Header
        questaoAtual={Number(questaoAtualId)}
        totalQuestoes={questoes.length}
        segundosRestantes={segundosRestantes}
        onAjustarTempo={ajustarTempoMinutos}
        onResetarTempoPadrao={resetarParaDuracaoPadrao}
      />
      <main className="flex flex-col gap-6 p-6">
        <CardQuestao
          questao={questaoAtual}
          resposta={respostaAtual}
          onSelecionarAlternativa={(opcao) =>
            selecionarAlternativa(questaoAtual.id, opcao)
          }
        />

        <div className="mx-auto flex max-w-3xl justify-center gap-2">
          <button
            disabled={!respostaAtual}
            onClick={() => corrigirQuestaoAtual(questaoAtual)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40"
          >
            Corrigir
          </button>
          <button
            disabled={!respostaAtual}
            onClick={() => setModalEstatisticasAberto(true)}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 disabled:opacity-40 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Estatísticas
          </button>
          <button
            type="button"
            onClick={aoFinalizar}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Finalizar
          </button>
        </div>

        <BarraNavegacaoQuestoes
          totalQuestoes={questoes.length}
          questaoAtualId={questaoAtualId}
          respostas={respostas}
          onNavegar={setQuestaoAtualId}
        />
      </main>

      <ModalEstatisticas
        aberto={modalEstatisticasAberto}
        onFechar={() => setModalEstatisticasAberto(false)}
        questao={questaoAtual}
        resposta={respostaAtual}
      />
    </>
  );
}