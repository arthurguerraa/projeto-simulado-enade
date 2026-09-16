import { estatisticaIndisponivel, type Questao } from "../../types/questao";
import type { RespostaRegistrada } from "../../types/simulado";
import { Modal } from "./Modal";

interface ModalEstatisticasProps {
  aberto: boolean;
  onFechar: () => void;
  questao: Questao;
  resposta: RespostaRegistrada | undefined;
}

function BarraPercentual({ label, valor }: { label: string; valor: string }) {
  const indisponivel = estatisticaIndisponivel(valor);
  const percentual = indisponivel ? 0 : parseFloat(valor.replace("%", "").replace(",", "."));

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-32 w-10 items-end overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800">
        <div
          className="w-full rounded-t-md bg-blue-600 transition-all"
          style={{ height: indisponivel ? "0%" : `${Math.min(percentual, 100)}%` }}
        />
      </div>
      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">{label}</span>
      <span className="text-xs text-neutral-500 dark:text-neutral-400">{indisponivel ? "—" : valor}</span>
    </div>
  );
}

export function ModalEstatisticas({ aberto, onFechar, questao, resposta }: ModalEstatisticasProps) {
  const { estatisticas } = questao;
  const todasIndisponiveis =
    estatisticaIndisponivel(estatisticas.porUF) &&
    estatisticaIndisponivel(estatisticas.porSudeste) &&
    estatisticaIndisponivel(estatisticas.porBrasil);

  return (
    <Modal aberto={aberto} onFechar={onFechar} titulo={`Estatísticas — Questão ${questao.id}`}>
      {resposta && (
        <p className={`text-sm font-semibold ${resposta.acertou ? "text-green-600" : "text-red-600"}`}>
          Você marcou {resposta.opcao} — {resposta.acertou ? "Acertou!" : `Correta: ${questao.opcaoCorreta}`}
        </p>
      )}

      {todasIndisponiveis ? (
        <p className="mt-4 text-sm text-amber-600 dark:text-amber-400" role="status">
          Estatística indisponível / Desconsiderada pelo Bisserial para esta questão.
        </p>
      ) : (
        <div className="mt-4 flex justify-center gap-6">
          <BarraPercentual label="SP" valor={estatisticas.porUF} />
          <BarraPercentual label="Sudeste" valor={estatisticas.porSudeste} />
          <BarraPercentual label="Brasil" valor={estatisticas.porBrasil} />
        </div>
      )}

      <button
        type="button"
        onClick={onFechar}
        className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Fechar
      </button>
    </Modal>
  );
}