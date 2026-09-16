import type { LetraAlternativa } from "./questao";

export interface RespostaRegistrada {
  opcao: LetraAlternativa;
  acertou: boolean;
  corrigida: boolean;
}

export type MapaRespostas = Record<string, RespostaRegistrada>;

export type Tema = "light" | "dark";

export interface PreferenciasUsuario {
  tema: Tema;
}

export interface EstadoSimulado {
  respostas: MapaRespostas;
  inicioTimestampMs: number | null;
  tempoRestanteSegundos: number | null;
  tempoTotalSegundos: number | null;
  finalizado: boolean;
}

export const TOTAL_QUESTOES = 35;
export const DURACAO_PROVA_SEGUNDOS = 2 * 60 * 60;