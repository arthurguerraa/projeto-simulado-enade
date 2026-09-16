import { isAnulada, type Questao } from "../types/questao";
import type { MapaRespostas } from "../types/simulado";

export type StatusGabarito = "correto" | "incorreto" | "em-branco" | "anulada";

export interface LinhaGabarito {
  questaoId: string;
  suaResposta: string; // letra ou "-" se em branco
  gabaritoOficial: string; // letra ou "Anulada"
  status: StatusGabarito;
}

export function montarLinhaGabarito(questao: Questao, respostas: MapaRespostas): LinhaGabarito {
  const resposta = respostas[questao.id];

  if (isAnulada(questao)) {
    return {
      questaoId: questao.id,
      suaResposta: resposta?.opcao ?? "-",
      gabaritoOficial: "Anulada",
      status: "anulada",
    };
  }

  if (!resposta) {
    return {
      questaoId: questao.id,
      suaResposta: "-",
      gabaritoOficial: questao.opcaoCorreta,
      status: "em-branco",
    };
  }

  return {
    questaoId: questao.id,
    suaResposta: resposta.opcao,
    gabaritoOficial: questao.opcaoCorreta,
    status: resposta.acertou ? "correto" : "incorreto",
  };
}