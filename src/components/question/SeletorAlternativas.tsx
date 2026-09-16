import type { Alternativa, LetraAlternativa } from "../../types/questao";

interface SeletorAlternativasProps {
  questaoId: string;
  opcoes: Alternativa[];
  opcaoSelecionada: LetraAlternativa | null;
  opcaoCorreta: LetraAlternativa | "#";
  corrigida: boolean;
  anulada: boolean;
  onSelecionar: (opcao: LetraAlternativa) => void;
}

export function SeletorAlternativas({
  questaoId,
  opcoes,
  opcaoSelecionada,
  opcaoCorreta,
  corrigida,
  anulada,
  onSelecionar,
}: SeletorAlternativasProps) {
  const bloqueado = corrigida || anulada;

  return (
    <div
      role="radiogroup"
      aria-label={`Alternativas da questão ${questaoId}`}
      className="flex flex-col gap-2"
    >
      {opcoes.map((opcao) => {
        const selecionada = opcaoSelecionada === opcao.id;
        const éACorreta = corrigida && opcao.id === opcaoCorreta;
        const éErradaSelecionada =
          corrigida && selecionada && opcao.id !== opcaoCorreta;

        return (
          <label
            key={opcao.id}
            className={[
              "flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors",
              "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-blue-500",
              bloqueado ? "cursor-not-allowed" : "hover:border-blue-400",
              éACorreta
                ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                : "",
              éErradaSelecionada
                ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                : "",
              !éACorreta && !éErradaSelecionada && selecionada
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                : "",
              !éACorreta && !éErradaSelecionada && !selecionada
                ? "border-neutral-300 dark:border-neutral-700"
                : "",
            ].join(" ")}
          >
            <input
              type="radio"
              name={`questao-${questaoId}`}
              value={opcao.id}
              checked={selecionada}
              disabled={bloqueado}
              onChange={() => onSelecionar(opcao.id)}
              className="mt-0.5 h-4 w-4 accent-blue-600"
            />
            <span className="text-neutral-800 dark:text-neutral-100">
              <strong className="mr-1">{opcao.id})</strong>
              {opcao.texto}
            </span>
          </label>
        );
      })}

      {anulada && (
        <p
          className="mt-1 text-sm font-medium text-amber-600 dark:text-amber-400"
          role="status"
        >
          Questão anulada pelo INEP — sua resposta aqui não conta como erro.
        </p>
      )}
    </div>
  );
}
