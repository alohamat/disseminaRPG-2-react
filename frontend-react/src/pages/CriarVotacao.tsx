import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Votacao_Estado } from "../components/Dados";
import { api } from "../services/ApiService";
import { jogadores } from "../components/LoginButtons";

interface ResultadoVotacao {
  name: string;
  votos: number;
  rolagens?: {
    name: string;
    moda: number | number[];
  };
}

interface VotacaoEstadoResponse {
  votosTotal: number;
  result: ResultadoVotacao[];
}

export function VotacaoNormal() {
  const { id } = useParams();
  const [opcoes, setOpcoes] = useState<string[]>([]);
  const [novaOpcao, setNovaOpcao] = useState("");
  const [resultado, setResultado] = useState<VotacaoEstadoResponse | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [loading, setLoading] = useState(false);

  //Estados e funções do modal de ações padrão
  const [acoesPadrao, setAcoesPadrao] = useState<string[]>([]);
  const [mostrarModalAcoes, setMostrarModalAcoes] = useState(false);

  const abrirAcoesPadrao = async () => {
    if (!id) return;
    try {
      const response = await api.get(`mestre/jogador${id}/opcoesSalvas`);
      setAcoesPadrao(response.data.opcoesSalvas || []);
      setMostrarModalAcoes(true);
    } catch (error) {
      console.error("Erro ao buscar ações padrão:", error);
      alert("Erro ao buscar ações padrão");
    }
  };

  const adicionarAcaoPadrao = (acao: string) => {
    setOpcoes([...opcoes, acao]);
    setMostrarModalAcoes(false);
  };

  const adicionarOpcao = () => {
    if (novaOpcao.trim() !== "") {
      setOpcoes([...opcoes, novaOpcao.trim()]);
      setNovaOpcao("");
    }
  };

  const removerOpcao = (index: number) => {
    const novasOpcoes = [...opcoes];
    novasOpcoes.splice(index, 1);
    setOpcoes(novasOpcoes);
  };

  const criarVotacao = async () => {
    if (!id || opcoes.length === 0) return;

    try {
      const data = {
        opcoes: opcoes
      };

      console.log("Criando votação normal:", data);

      await api.post(`/mestre/jogador${id}/criaVotacao`, data);
      setOpcoes([]);

    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao criar votação");
    }
  };

  const verResultadoVotacao = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const resultado = await Votacao_Estado(id);
      setResultado(resultado);
      setMostrarResultado(true);
      console.log("Resultado da votação:", resultado);
    } catch (error) {
      console.error("Erro ao buscar resultado:", error);
      alert("Erro ao buscar resultado da votação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="tudo">
      <Header isMaster={true} />
      <section>
        <h1>Votação Normal - Personagem {jogadores[Number(id) - 1]}</h1>

        {/* Configuração da Votação */}
        <div className="votacao-config">
          <h2>Configurar Opções</h2>
          
          <div className="adicionar-opcao">
            <input
              type="text"
              placeholder="Digite uma opção..."
              value={novaOpcao}
              onChange={(e) => setNovaOpcao(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && adicionarOpcao()}
            />
            <div className="button" onClick={adicionarOpcao}>
              Adicionar
            </div>
          </div>

          <div className="opcoes-list">
            {opcoes.map((opcao, index) => (
              <div key={index} className="opcao-item">
                <span>{opcao}</span>
                <div 
                  className="button-remover" 
                  onClick={() => removerOpcao(index)}
                >
                  Remover
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controles da Votação */}
        <div className="controles-votacao">
          <div className="button" onClick={criarVotacao} >
            Criar Votação ({opcoes.length} opções)
          </div>
          
          <div className="button" onClick={verResultadoVotacao}>
            {loading ? "Carregando..." : "Ver Resultado"}
          </div>

          {/*Botão de Ações Padrão */}
          <div className="button" onClick={abrirAcoesPadrao}>
            Ações Padrão
          </div>

        </div>

        {/* Resultado da Votação */}
        {mostrarResultado && resultado && (
          <div className="resultado-votacao">
            <h2>Resultado da Votação</h2>
            
            <div className="resumo">
              <p><strong>Total de votos:</strong> {resultado.votosTotal}</p>
            </div>

            <div className="resultados-detalhados">
              {resultado?.result?.map((item, index) => (
                <div key={index} className="resultado-item">
                  <div className="resultado-header">
                    <h3>{item.name}</h3>
                    <span className="votos-count">{item.votos} votos</span>
                  </div>
                  
                  {item.rolagens && (
                    <div className="rolagens-info">
                      <strong>Rolagens:</strong>
                      <div className="rolagem-detalhes">
                        <span>{item.rolagens.name}: </span>
                        {Array.isArray(item.rolagens.moda) 
                          ? item.rolagens.moda.join(" + ")
                          : item.rolagens.moda
                        }
                      </div>
                    </div>
                  )}
                  
                  <div className="progresso-container">
                    <div 
                      className="progresso-barra"
                      style={{
                        width: resultado.votosTotal > 0 
                          ? `${(item.votos / resultado.votosTotal) * 100}%` 
                          : '0%'
                      }}
                    ></div>
                    <span className="progresso-texto">
                      {resultado.votosTotal > 0 
                        ? `${Math.round((item.votos / resultado.votosTotal) * 100)}%`
                        : '0%'
                      }
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mostrarResultado && !resultado && (
          <div className="nenhuma-votacao">
            <p>Nenhuma votação ativa ou resultado disponível</p>
          </div>
        )}

        {/* Modal de Ações Padrão */}
        {mostrarModalAcoes && (
          <div className="modal">
            <div className="modalVotacao">
              <div>
                <h2>Ações Padrão</h2>
                {acoesPadrao.length > 0 ? (
                  acoesPadrao.map((acao, index) => (
                    <div
                      key={index}
                      className="button"
                      onClick={() => adicionarAcaoPadrao(acao)}
                      style={{ margin: "10px 0", width: "100%" }}
                    >
                      {acao}
                    </div>
                  ))
                ) : (
                  <p>Nenhuma ação padrão encontrada.</p>
                )}
                <button
                  className="button-remover"
                  onClick={() => setMostrarModalAcoes(false)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
