import { isAnulada, type Questao } from "../types/questao";
import { TOTAL_QUESTOES, type MapaRespostas } from "../types/simulado";

export interface ResultadoSimulado {
  totalAcertos: number;
  totalErros: number;
  totalEmBranco: number;
  totalAnuladas: number;
  percentualAcertos: number;
}

export function calcularResultado(
  questoes: Questao[],
  respostas: MapaRespostas
): ResultadoSimulado {
  let totalAcertos = 0;
  let totalErros = 0;
  let totalEmBranco = 0;
  let totalAnuladas = 0;

  for (const questao of questoes) {
    if (isAnulada(questao)) {
      totalAnuladas += 1;
      continue;
    }
    const resposta = respostas[questao.id];
    if (!resposta) totalEmBranco += 1;
    else if (resposta.acertou) totalAcertos += 1;
    else totalErros += 1;
  }

  const percentualAcertos = (totalAcertos / TOTAL_QUESTOES) * 100;
  return { totalAcertos, totalErros, totalEmBranco, totalAnuladas, percentualAcertos };
}

export function questaoAcertada(questao: Questao, opcaoEscolhida: string): boolean {
  if (isAnulada(questao)) return true;
  return questao.opcaoCorreta === opcaoEscolhida;
}