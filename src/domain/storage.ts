import type { EstadoSimulado, MapaRespostas, PreferenciasUsuario } from "../types/simulado";

export const STORAGE_KEYS = {
  respostas: "simulado_respostas",
  inicio: "simulado_inicio",
  tempoRestante: "simulado_tempo_restante",
  tempoTotal: "simulado_tempo_total",
  tema: "preferencia_tema",
} as const;

function lerJSON<T>(chave: string, fallback: T): T {
  try {
    const bruto = localStorage.getItem(chave);
    if (bruto === null) return fallback;
    return JSON.parse(bruto) as T;
  } catch {
    return fallback;
  }
}

function escreverJSON(chave: string, valor: unknown): void {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // storage indisponível — falha silenciosa
  }
}

export function carregarEstadoSimulado(): EstadoSimulado {
  return {
    respostas: lerJSON<MapaRespostas>(STORAGE_KEYS.respostas, {}),
    inicioTimestampMs: lerJSON<number | null>(STORAGE_KEYS.inicio, null),
    tempoRestanteSegundos: lerJSON<number | null>(STORAGE_KEYS.tempoRestante, null),
    tempoTotalSegundos: lerJSON<number | null>(STORAGE_KEYS.tempoTotal, null),
    finalizado: lerJSON<boolean>("simulado_finalizado", false),
  };
}

export function salvarRespostas(respostas: MapaRespostas): void {
  escreverJSON(STORAGE_KEYS.respostas, respostas);
}
export function salvarInicio(timestampMs: number): void {
  escreverJSON(STORAGE_KEYS.inicio, timestampMs);
}
export function salvarTempoRestante(segundos: number): void {
  escreverJSON(STORAGE_KEYS.tempoRestante, segundos);
}
export function salvarTempoTotal(segundos: number): void {
  escreverJSON(STORAGE_KEYS.tempoTotal, segundos);
}
export function marcarFinalizado(finalizado: boolean): void {
  escreverJSON("simulado_finalizado", finalizado);
}

export function limparProgressoSimulado(): void {
  localStorage.removeItem(STORAGE_KEYS.respostas);
  localStorage.removeItem(STORAGE_KEYS.inicio);
  localStorage.removeItem(STORAGE_KEYS.tempoRestante);
  localStorage.removeItem(STORAGE_KEYS.tempoTotal);
  localStorage.removeItem("simulado_finalizado");
}

export function carregarPreferencias(): PreferenciasUsuario {
  return {
    tema: lerJSON<PreferenciasUsuario["tema"]>(STORAGE_KEYS.tema, "dark"),
  };
}

export function salvarPreferencias(preferencias: PreferenciasUsuario): void {
  escreverJSON(STORAGE_KEYS.tema, preferencias.tema);
}

export function simuladoEmAndamento(): boolean {
  const estado = carregarEstadoSimulado();
  return estado.inicioTimestampMs !== null && !estado.finalizado;
}