import { Ver_Votacao } from "../components/Dados";
import { Deposita_Votos } from "../components/Dados";
import { Deposita_Votos_Com_Dado } from "../components/Dados";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

interface OpcaoComDado {
  name: string;
  dado: {
    name: string;
    lados: number;
    quantidade: number;
    bonus?: number;
  };
}

interface VotacaoResponse {
  opcoes?: string[];
  opcoesComDado?: OpcaoComDado[];
  votacaoAberta: boolean;
  mensagem?: string;
}

function AcoesPage() {
    const { id } = useParams();
    const [votacao, setVotacao] = useState<string[] | null>(null);
    const [votacaoComDado, setVotacaoComDado] = useState<OpcaoComDado[] | null>(null);
    const [podeVotar, setPodeVotar] = useState<boolean>(true);
    const [votoComputado, setVotoComputado] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState<string>("");

    // Inicializar UID
    useEffect(() => {
        let uid = localStorage.getItem("uid");
        if (!uid) {
            uid = crypto.randomUUID();
            localStorage.setItem("uid", uid);
        }
        // Carregar votação inicial
        handleVerVotacao();
    }, [id]);

    const handleVerVotacao = async () => {
        if (!id) return;
        
        setLoading(true);
        try {
            const resultado = await Ver_Votacao(id) as VotacaoResponse | null;
            console.log("Resultado da votacao:", resultado);
            
            if (resultado?.opcoesComDado && resultado.opcoesComDado.length > 0) {
                setVotacaoComDado(resultado.opcoesComDado);
                setVotacao(null);
                setMensagem("Votação com dados ativa! Escolha uma opção para rolar os dados.");
            } else if (resultado?.opcoes && resultado.opcoes.length > 0) {
                setVotacao(resultado.opcoes);
                setVotacaoComDado(null);
                setMensagem("Votação normal ativa! Escolha uma opção.");
            } else {
                setVotacao(null);
                setVotacaoComDado(null);
                setMensagem(resultado?.mensagem || "Nenhuma votação ativa no momento.");
            }
            
            setPodeVotar(resultado?.votacaoAberta ?? false);
        } catch (error) {
            console.error("Erro ao buscar votação:", error);
            setMensagem("Erro ao carregar votação. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleVotar = async (opcao: string) => {
        if (!id || !podeVotar || votoComputado) return;
        
        try {
            setLoading(true);
            await Deposita_Votos(id, opcao);
            setVotoComputado(true);
            setMensagem(`✅ Voto computado para: ${opcao}`);
        } catch (error: any) {
            console.error("Erro ao votar:", error);
            if (error.response?.status === 403) {
                setMensagem("❌ Você já votou nesta votação!");
                setVotoComputado(true);
            } else {
                setMensagem(error.response?.data?.erro || "Erro ao votar. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVotarComDado = async (opcao: OpcaoComDado) => {
        if (!id || !podeVotar || votoComputado) return;
        
        try {
            setLoading(true);
            const resultado = await Deposita_Votos_Com_Dado(id, opcao.name);
            setVotoComputado(true);
            
            let mensagemRolagem = `✅ Voto computado para: ${opcao.name}`;
            if (resultado?.valoresDasRolagem) {
                const rolagens = resultado.valoresDasRolagem.map((r: any) => 
                    `${r.name}: ${Array.isArray(r.rolagem) ? r.rolagem.join(' + ') : r.rolagem}`
                ).join(' | ');
                mensagemRolagem += ` | 🎲 Rolagens: ${rolagens}`;
            }
            
            setMensagem(mensagemRolagem);
        } catch (error: any) {
            console.error("Erro ao votar com dado:", error);
            if (error.response?.status === 403) {
                setMensagem("❌ Você já votou nesta votação!");
                setVotoComputado(true);
            } else {
                setMensagem(error.response?.data?.erro || "Erro ao votar. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="tudo">
            <Header />
            <div id="centralizar-botao">
                <div className="votacao-info">
                    <h1>Votação - Personagem {id}</h1>

                    {mensagem && (
                        <div className={`mensagem ${mensagem.includes('✅') ? 'mensagem-sucesso' : mensagem.includes('❌') ? 'mensagem-erro' : 'mensagem-info'}`} style={{fontSize: "22px"}}>
                            {mensagem}
                        </div>
                    )}
                </div>

                <div className="controles-jogador">
                    <div className="button" onClick={handleVerVotacao} >
                        {loading ? "🔄 Atualizando..." : "🔄 Atualizar Votação"}
                    </div>

                </div>

                {votacaoComDado && votacaoComDado.length > 0 && (
                    <div className="votacao-container">
                        <h2>🎲 Votação com Dados</h2>
                        <p className="instrucoes">Clique em uma opção para votar e rolar os dados</p>
                        
                        <div className="opcoes-grid">
                            {votacaoComDado.map((opcao, index) => (
                                <div 
                                    className={`opcao-voto ${podeVotar && !votoComputado ? "opcao-ativa" : "opcao-inativa"}`} 
                                    key={index} 
                                    onClick={() => podeVotar && !votoComputado && handleVotarComDado(opcao)}
                                >
                                    <div className="opcao-conteudo">
                                        <strong className="opcao-nome">{opcao.name}</strong>
                                        <div className="dado-info">
                                            🎲 {opcao.dado.name} ({opcao.dado.quantidade}d{opcao.dado.lados}
                                            {opcao.dado.bonus ? ` + ${opcao.dado.bonus}` : ''})
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )} 
                
                {votacao && votacao.length > 0 && (
                    <div className="votacao-container">
                        <h2>📊 Votação Normal</h2>
                        <p className="instrucoes">Clique em uma opção para votar</p>
                        
                        <div className="opcoes-grid">
                            {votacao.map((opcao, index) => (
                                <div 
                                    className={`opcao-voto ${podeVotar && !votoComputado ? "opcao-ativa" : "opcao-inativa"}`} 
                                    key={index} 
                                    onClick={() => podeVotar && !votoComputado && handleVotar(opcao)}
                                >
                                    <div className="opcao-conteudo">
                                        {opcao}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!votacao && !votacaoComDado && !loading && (
                    <div className="nenhuma-votacao"> 
                        <h2>⏳ Nenhuma votação ativa</h2>
                        <p>Clique em "Atualizar Votação" quando o mestre iniciar uma nova votação</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default AcoesPage;