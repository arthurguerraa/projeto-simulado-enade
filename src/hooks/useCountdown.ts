import { useCallback, useEffect, useRef, useState } from "react";
import { salvarTempoRestante } from "../domain/storage";

interface UseCountdownOptions {
  segundosIniciais: number;
  onEsgotar: () => void;
  ativo?: boolean;
}

export function useCountdown({ segundosIniciais, onEsgotar, ativo = true }: UseCountdownOptions) {
  const [segundosRestantes, setSegundosRestantes] = useState(segundosIniciais);
  const onEsgotarRef = useRef(onEsgotar);
  onEsgotarRef.current = onEsgotar;

  useEffect(() => {
    if (!ativo) return;
    const intervalo = setInterval(() => {
      setSegundosRestantes((atual) => {
        const proximo = atual - 1;
        salvarTempoRestante(Math.max(0, proximo));
        if (proximo <= 0) {
          clearInterval(intervalo);
          onEsgotarRef.current();
          return 0;
        }
        return proximo;
      });
    }, 1000);
    return () => clearInterval(intervalo);
  }, [ativo]);

  const reiniciar = useCallback((novoValor: number) => {
    setSegundosRestantes(novoValor);
    salvarTempoRestante(novoValor);
  }, []);

  return { segundosRestantes, reiniciar };
}