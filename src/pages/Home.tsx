import { useNavigate } from "react-router-dom";
import { useSimulado } from "../hooks/useSimulado";

export default function Home() {
  const navigate = useNavigate();
  const { iniciarNovaTentativa } = useSimulado();

  function aoIniciarSimulado() {
    // Limpa qualquer tentativa anterior (finalizada ou não) e começa do zero,
    // conforme regra de negócio da seção 3.1 da spec.
    iniciarNovaTentativa();
    navigate("/simulado");
  }

  return (
    <>
      <main className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-6 pt-16 pb-6 text-center">
        <h1 className="text-4xl font-bold">
          Simulado ENADE 2021 — Ciência da Computação
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Pratique com as 35 questões objetivas do componente específico da
          prova do ENADE 2021 para o Bacharelado em Ciência da Computação, com
          correção imediata, cronômetro e comparativo de estatísticas oficiais
          de acerto do INEP.
        </p>

        <p className="text-base text-neutral-500 dark:text-neutral-500">
          O ENADE (Exame Nacional de Desempenho dos Estudantes) integra o SINAES
          e é um dos componentes usados no cálculo do CPC (Conceito Preliminar
          de Curso) das instituições de ensino superior.
        </p>

        <button
          type="button"
          onClick={aoIniciarSimulado}
          className="mx-auto rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700"
        >
          Iniciar Simulado
        </button>

        <div className="mt-4 flex flex-col gap-1 text-sm">
          <a
            href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enade"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Site oficial do INEP / ENADE ↗
          </a>
          {/* TODO: substituir pelos links diretos dos PDFs oficiais (prova e gabarito) do INEP */}
          <a
            href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enade/provas-e-gabaritos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            PDF oficial da prova (download INEP) ↗
          </a>
          <a
            href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enade/provas-e-gabaritos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            PDF oficial do gabarito (download INEP) ↗
          </a>
        </div>
      </main>
    </>
  );
}
