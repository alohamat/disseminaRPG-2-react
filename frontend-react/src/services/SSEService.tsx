import { useState, useEffect } from 'react';
import { api } from '../services/ApiService';
import { useLocation } from 'react-router-dom';

export function useSSE(jogadorId: string | undefined) {
  const [vida, setVida] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!jogadorId) return;
    const isPlayerPage = location.pathname === `/player/${jogadorId}`;
    const isMasterPage = location.pathname === `/master/${jogadorId}`;

     if (!jogadorId || (!isPlayerPage && !isMasterPage)) {
      return;
    }


    console.log(`Conectando SSE para jogador${jogadorId}`);
    const evtSource = new EventSource(`${api.defaults.baseURL}jogador/jogador${jogadorId}/vida`);

    evtSource.onopen = () => {
      console.log("SSE conectado");
      setConnected(true);
    };

    evtSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Vida via SSE:", data);
      setVida(data.vidaAtual);
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

  return { vida, connected };
}