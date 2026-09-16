import { isAnulada, estatisticaIndisponivel, type Questao, type LetraAlternativa } from "../../types/questao";
import type { RespostaRegistrada } from "../../types/simulado";
import { SeletorAlternativas } from "./SeletorAlternativas";

interface CardQuestaoProps {
  questao: Questao;
  resposta: RespostaRegistrada | undefined;
  onSelecionarAlternativa: (opcao: LetraAlternativa) => void;
}

export function CardQuestao({ questao, resposta, onSelecionarAlternativa }: CardQuestaoProps) {
  const anulada = isAnulada(questao);
  const corrigida = resposta?.corrigida ?? false;

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-neutral-200 p-6 shadow-sm dark:border-neutral-800"
  style={{ backgroundColor: "var(--color-surface)" }}>
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Exame de Ciência da Computação — Bacharelado</h2>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          Questão {questao.id} / 35
        </span>
      </header>

      <img
        src={questao.img}
        alt={`Ilustração da Questão ${Number(questao.id)}`}
        className="w-full rounded-lg border border-neutral-200 object-contain dark:border-neutral-800"
        loading="lazy"
      />

      {questao.enunciado && (
        // Conteúdo estático do nosso próprio banco de dados (não input de usuário),
        // usado só para preservar as quebras de linha <br> vindas da prova original.
        <p
          className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
          dangerouslySetInnerHTML={{ __html: questao.enunciado }}
        />
      )}

      <SeletorAlternativas
        questaoId={questao.id}
        opcoes={questao.opcoes}
        opcaoSelecionada={resposta?.opcao ?? null}
        opcaoCorreta={questao.opcaoCorreta}
        corrigida={corrigida}
        anulada={anulada}
        onSelecionar={onSelecionarAlternativa}
      />

      {corrigida && !anulada && (
        <p
          className={`text-sm font-semibold ${resposta?.acertou ? "text-green-600" : "text-red-600"}`}
          role="status"
        >
          {resposta?.acertou ? "Acertou!" : "Errou!"}
        </p>
      )}
    </article>
  );
}