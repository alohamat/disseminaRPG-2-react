import { useState, useEffect } from 'react';
import { api } from '../services/ApiService';
import { useLocation } from 'react-router-dom';

export function useSSE(jogadorId: string | undefined, tipo: string) {
  const [sseValue, setSSEValue] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log(jogadorId)
    if (!jogadorId) return;
    const isPlayerPage = location.pathname === `/player/${jogadorId}`;
    const isMasterPage = location.pathname === `/master/${jogadorId}`;
    const isVotePage = location.pathname === `/votacao-dados/${jogadorId}`;

     if (!jogadorId || (!isPlayerPage && !isMasterPage && !isVotePage)) {
      return;
    }


    console.log(`Conectando SSE para jogador${jogadorId}`);
    let evtSource: EventSource;
    if(tipo === "vida") evtSource = new EventSource(`${api.defaults.baseURL}jogador/jogador${jogadorId}/vida`);
    else if(tipo === "votos") evtSource = new EventSource(`${api.defaults.baseURL}/mestre/jogador${jogadorId}/votos`);
    else return

    evtSource.onopen = () => {
      console.log("SSE conectado");
      setConnected(true);
    };

    evtSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Valor via SSE:", data);
      setSSEValue(tipo === "vida" ? data.vidaAtual: data.votosTotal);
    };

    evtSource.onerror = (err) => {
      console.error("Erro SSE:", err);
      setConnected(false);
      evtSource.close();
    };

    return () => {
      console.log("Desconectando SSE");
      evtSource.close();
      setConnected(false);
    };
  }, [jogadorId, location.pathname]);

  return { sseValue, connected };
}