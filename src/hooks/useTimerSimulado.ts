import { useState } from "react";
import { useCountdown } from "./useCountdown";
import { carregarEstadoSimulado, salvarInicio } from "../domain/storage";
import { DURACAO_PROVA_SEGUNDOS } from "../types/simulado";

interface UseTimerSimuladoOptions {
  onEsgotar: () => void;
  ativo?: boolean;
}

export function useTimerSimulado({ onEsgotar, ativo = true }: UseTimerSimuladoOptions) {
  const [segundosIniciais] = useState(() => {
    const estado = carregarEstadoSimulado();
    if (estado.inicioTimestampMs === null) {
      salvarInicio(Date.now());
    }
    return estado.tempoRestanteSegundos ?? DURACAO_PROVA_SEGUNDOS;
  });

  const { segundosRestantes, reiniciar } = useCountdown({ segundosIniciais, onEsgotar, ativo });

  function ajustarTempoMinutos(minutos: number) {
    const segundos = Math.max(0, Math.round(minutos * 60));
    reiniciar(segundos);
  }

  function resetarParaDuracaoPadrao() {
    reiniciar(DURACAO_PROVA_SEGUNDOS);
  }

  return { segundosRestantes, ajustarTempoMinutos, resetarParaDuracaoPadrao };
}