import { useNavigate } from "react-router-dom";
import { useSimulado } from "../hooks/useSimulado";

export default function Tutorial() {
  const navigate = useNavigate();
  const { iniciarNovaTentativa } = useSimulado();

  function aoIniciarSimulado() {
    iniciarNovaTentativa();
    navigate("/simulado");
  }

  return (
    <>
      <main className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-6 pt-16 pb-6">
        <h1 className="text-3xl font-semibold">Instruções</h1>

        <ul className="list-disc space-y-2 pl-5 text-base text-neutral-700 dark:text-neutral-300">
          <li>
            A prova tem 35 questões, cada uma com 5 alternativas (A a E) e
            apenas uma correta.
          </li>
          <li>
            Ao marcar uma alternativa e clicar em <strong>Corrigir</strong>, a
            resposta é travada — não é possível trocá-la depois.
          </li>
          <li>
            Você pode navegar livremente entre as questões, respondidas ou não,
            usando a barra numérica.
          </li>
          <li>
            Duas questões desta edição (29 e 33) foram <strong>anuladas</strong>{" "}
            oficialmente pelo INEP e não penalizam sua pontuação,
            independentemente da alternativa marcada.
          </li>
          <li>
            Você tem 2 horas no total. O cronômetro é salvo automaticamente —
            pode recarregar a página sem perder o tempo.
          </li>
          <li>
            O botão de modo escuro fica disponível no topo da tela durante toda
            a prova.
          </li>
        </ul>

        <button
          type="button"
          onClick={aoIniciarSimulado}
          className="mx-auto mt-4 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700"
        >
          Iniciar Simulado
        </button>
      </main>
    </>
  );
}
