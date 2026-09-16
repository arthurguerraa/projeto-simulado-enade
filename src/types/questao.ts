export type LetraAlternativa = "A" | "B" | "C" | "D" | "E";

export interface Alternativa {
  id: LetraAlternativa;
  texto: string;
}

export interface EstatisticaRegiao {
  porUF: string;
  porSudeste: string;
  porBrasil: string;
}

export type OpcaoCorreta = LetraAlternativa | "#";

export interface Questao {
  id: string;
  enunciado: string;
  img: string;
  opcoes: Alternativa[];
  opcaoCorreta: OpcaoCorreta;
  estatisticas: EstatisticaRegiao;
}

export function isAnulada(questao: Pick<Questao, "opcaoCorreta">): boolean {
  return questao.opcaoCorreta === "#";
}

export function estatisticaIndisponivel(valor: string): boolean {
  return valor.trim() === "-%";
}