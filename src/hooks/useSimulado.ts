import { useCallback, useState } from "react";
import { questaoAcertada } from "../domain/scoring";
import {
  carregarEstadoSimulado,
  limparProgressoSimulado,
  marcarFinalizado,
  salvarInicio,
  salvarRespostas,
  salvarTempoTotal,
} from "../domain/storage";
import type { Questao, LetraAlternativa } from "../types/questao";
import type { MapaRespostas } from "../types/simulado";

export function useSimulado() {
  const [estadoInicial] = useState(() => carregarEstadoSimulado());
  const [respostas, setRespostas] = useState<MapaRespostas>(estadoInicial.respostas);

  const iniciarNovaTentativa = useCallback(() => {
    limparProgressoSimulado();
    salvarInicio(Date.now());
    setRespostas({});
  }, []);

  const selecionarAlternativa = useCallback((questaoId: string, opcao: LetraAlternativa) => {
    setRespostas((atual) => {
      if (atual[questaoId]?.corrigida) return atual;
      const proximo = { ...atual, [questaoId]: { opcao, acertou: false, corrigida: false } };
      salvarRespostas(proximo);
      return proximo;
    });
  }, []);

  const corrigirQuestaoAtual = useCallback((questao: Questao) => {
    setRespostas((atual) => {
      const respostaAtual = atual[questao.id];
      if (!respostaAtual || respostaAtual.corrigida) return atual;
      const acertou = questaoAcertada(questao, respostaAtual.opcao);
      const proximo: MapaRespostas = {
        ...atual,
        [questao.id]: { ...respostaAtual, acertou, corrigida: true },
      };
      salvarRespostas(proximo);
      return proximo;
    });
  }, []);

  const finalizarSimulado = useCallback((tempoTotalSegundos: number) => {
    salvarTempoTotal(tempoTotalSegundos);
    marcarFinalizado(true);
  }, []);

  return {
    respostas,
    inicioTimestampMs: estadoInicial.inicioTimestampMs,
    iniciarNovaTentativa,
    selecionarAlternativa,
    corrigirQuestaoAtual,
    finalizarSimulado,
  };
}