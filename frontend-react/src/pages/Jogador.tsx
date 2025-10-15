import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

// 1. Tipos de Resposta
interface ResultadoRolagem {
    dado: 'full';
    resultado: {
        D6: number;
        D10_1: number;
        D10_2: number;
    };
    resolucao: string;
    rolagem: number;
    passoAtual: number;
    votacaoAberta: boolean;
    votacaoAtual: number;
    jogador: string;
};

interface DadosJogador {
  jogador: string;
  nomeDado: string;
  passoAtual: number;
  votacaoAtual: number;
  votacaoAberta: boolean;
  resultadoVotacao: string;
  rolagemAberta: boolean;
}

// Função para tratamento robusto de fetch
async function handleFetch(url: string, options?: RequestInit) {
    const res = await fetch(url, options);
    // Tenta ler o corpo, mesmo se houver erro
    const data = await res.json().catch(() => ({ mensagem: 'Erro desconhecido' }));
    
    if (!res.ok) {
        const errorMessage = data.erro || data.mensagem || `Erro HTTP: ${res.status}`;
        throw new Error(errorMessage);
    }
    return data;
}

export default function Jogador() {
    const { jogador } = useParams<{ jogador: string }>(); // Tipagem correta para useParams
    
    // Estado principal do jogo (obtido via GET)
    const [estadoJogo, setEstadoJogo] = useState<DadosJogador | null>(null);
    // Estado do resultado da última rolagem (obtido via POST)
    const [resultadoRolagem, setResultadoRolagem] = useState<ResultadoRolagem | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    // 2. FUNÇÃO PARA CARREGAR O ESTADO INICIAL (GET)
    const buscarEstadoInicial = useCallback(async () => {
        setCarregando(true);
        setErro(null);
        try {
            // Requisição GET para buscar o estado do jogador
            const data = await handleFetch(`https://dissemina-iff-backend.vercel.app/api/jogador/${jogador}`);
            setEstadoJogo(data as DadosJogador);
            
        } catch (error) {
            setErro((error as Error).message);
        } finally {
            setCarregando(false);
        }
    }, [jogador]);

    // 3. EFEITO: CARREGAR DADOS NA INICIALIZAÇÃO
    useEffect(() => {
        if (jogador) {
            buscarEstadoInicial();
        }
    }, [jogador, buscarEstadoInicial]); // Chama apenas uma vez, ou quando o jogador muda

    // 4. FUNÇÃO PARA ROLAR DADO (POST)
    const rolarDado = async () => {
        if (!estadoJogo?.rolagemAberta) {
            setErro("Rolagem de dados bloqueada pelo Mestre.");
            return;
        }

        setErro(null);
        try {
            const data = await handleFetch(`https://dissemina-iff-backend.vercel.app/api/jogador/${jogador}/full`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            
            // Atualiza o resultado da rolagem
            setResultadoRolagem(data as ResultadoRolagem); 
            // Opcional: Recarrega o estado do jogo para atualizar contadores
            // buscarEstadoInicial();
            
        } catch (error) {
             setErro((error as Error).message);
        }
    }

    if (carregando) {
        return <div id="tudo">Carregando dados do jogador...</div>;
    }

    // Renderização
    return (
        <div id="tudo">
            {erro && <h2 style={{color: 'red'}}>Erro: {erro}</h2>}
            
            {estadoJogo ? (
                <div>
                    <h1>Jogador: {estadoJogo.jogador}</h1>
                    <p>Passo Atual: {estadoJogo.passoAtual}</p>
                    <p>Votação Aberta: {estadoJogo.votacaoAberta ? 'Sim' : 'Não'}</p>
                    <p>Status da Rolagem: {estadoJogo.rolagemAberta ? 'Livre' : 'Bloqueada'}</p>

                    {resultadoRolagem && (
                        <div style={{marginTop: '20px', border: '1px solid gray', padding: '10px'}}>
                            <h2>Resultado da Última Rolagem</h2>
                            <p>D6 (Ação): {resultadoRolagem.resultado.D6}</p>
                            <p>D10 Desafio 1: {resultadoRolagem.resultado.D10_1}</p>
                            <p>D10 Desafio 2: {resultadoRolagem.resultado.D10_2}</p>
                            <p>Resolução: <strong>{resultadoRolagem.resolucao}</strong></p>
                        </div>
                    )}

                    <button 
                        onClick={rolarDado}
                        disabled={!estadoJogo.rolagemAberta}
                    >
                        Rolar Dado
                    </button>
                    
                    <br />
                    <button>Escolher Ação</button>
                </div>
            ) : (
                <p>Não foi possível carregar o estado do jogador.</p>
            )}
        </div>
    )
}