export interface DuracaoFormatada {
  horas: number;
  minutos: number;
  segundos: number;
  texto: string;
}

export function formatarDuracao(duracaoMs: number): DuracaoFormatada {
  const duracaoMsSegura = Math.max(0, duracaoMs);
  const segundosTotais = Math.floor(duracaoMsSegura / 1000);
  const horas = Math.floor(segundosTotais / 3600);
  const minutos = Math.floor((segundosTotais % 3600) / 60);
  const segundos = segundosTotais % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return { horas, minutos, segundos, texto: `${pad(horas)}h ${pad(minutos)}m ${pad(segundos)}s` };
}

export function calcularTempoGastoMs(inicioTimestampMs: number, agoraMs: number = Date.now()): number {
  return agoraMs - inicioTimestampMs;
}

export function formatarContagemRegressiva(segundosRestantes: number): string {
  const seguro = Math.max(0, segundosRestantes);
  const horas = Math.floor(seguro / 3600);
  const minutos = Math.floor((seguro % 3600) / 60);
  const segundos = seguro % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;
}