/* eslint-disable no-irregular-whitespace */
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/ApiService";
import { Votacao_Estado } from "../components/Dados";
import { jogadores } from "../components/LoginButtons";

interface DadoVotacao {
  lados: number;
  quantidade: number;
  name: string;
  bonus?: number;
}

interface OpcaoComDado {
  name: string;
  dados: DadoVotacao[]; // Array de Dados
}

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

export function VotacaoComDados() {
  const { id } = useParams();
  const [opcoes, setOpcoes] = useState<OpcaoComDado[]>([]);
  const [resultado, setResultado] = useState<VotacaoEstadoResponse | null>(
    null
  );
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [loading, setLoading] = useState(false);

    const getNewDadoPadrao = (): DadoVotacao => ({
        name: "",
        lados: 0,
        quantidade: 1,
        bonus: 0,
    });

  const adicionarOpcao = () => {
    setOpcoes([
      ...opcoes,
      {
        name: "",
        dados: [getNewDadoPadrao()]
      },
    ]);
  };

  const removerOpcao = (index: number) => {
    const novasOpcoes = [...opcoes];
    novasOpcoes.splice(index, 1);
    setOpcoes(novasOpcoes);
  };

  const atualizarNomeOpcao = (index: number, valor: string) => {
    const novasOpcoes = [...opcoes];
    novasOpcoes[index].name = valor;
    setOpcoes(novasOpcoes);
  };

  const adicionarDadoAOpcao = (opcaoIndex: number) => {
    const novasOpcoes = [...opcoes];
    novasOpcoes[opcaoIndex].dados.push(getNewDadoPadrao());
    setOpcoes(novasOpcoes);
  };
    
  const removerDadoDaOpcao = (opcaoIndex: number, dadoIndex: number) => {
    const novasOpcoes = [...opcoes];
    if (novasOpcoes[opcaoIndex].dados.length > 1) {
      novasOpcoes[opcaoIndex].dados.splice(dadoIndex, 1);
      setOpcoes(novasOpcoes);
    } else {
      alert("Toda opção precisa de pelo menos um dado!");
    }
  };


  const atualizarDadosOpcao = (
    opcaoIndex: number,
    dadoIndex: number, 
    campo: keyof DadoVotacao,
    valor: number | string
  ) => {
    const novasOpcoes = [...opcoes];
    const dadoParaAtualizar = novasOpcoes[opcaoIndex].dados[dadoIndex]; 

    if (campo === "name") {
      dadoParaAtualizar.name = valor as string;
    } else {
      (dadoParaAtualizar[campo] as number) = valor as number; 
    }
    setOpcoes(novasOpcoes);
  };


  const criarVotacaoComDados = async () => {
    if (!id) return;

    const opcoesValidas = opcoes.filter(
      (opcao) => {
        const todosOsDadosValidos = opcao.dados.every(dado => 
            dado.name.trim() !== "" && dado.lados > 0 && dado.quantidade > 0
        );
        return opcao.name.trim() !== "" && todosOsDadosValidos;
      }
    );

    if (opcoesValidas.length === 0) {
      alert("Adicione pelo menos uma opção com dados válidos!");
      return;
    }

    try {
      const data = {
        opcoes: opcoesValidas,
      };

      console.log("Criando votação com dados:", data);
      await api.post(`/mestre/jogador${id}/criaVotacaoComDado`, data);
      alert("Votação com dados criada com sucesso!");
      setResultado(null);
      setMostrarResultado(false);
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
        <h1>Votação com Dados - Personagem {jogadores[Number(id) - 1]}</h1>

        <div className="votacao-config">
          <h2>Configurar Opções com Dados</h2>

          <button
            className="button add-option"
            onClick={adicionarOpcao}
          >
            Adicionar Opção
          </button>

          <div id="dados-customizados">
            {opcoes?.map((opcao, opcaoIndex) => (
              <div key={opcaoIndex} className="opcao-container">
                <div className="opcao-header">
                  <input
                    type="text"
                    placeholder="Nome da opção (ex: Ataque, Defesa)"
                    value={opcao.name}
                    onChange={(e) => atualizarNomeOpcao(opcaoIndex, e.target.value)}
                    className="opcao-nome input"
                  />
                  <div
                    className="button-remover"
                    onClick={() => removerOpcao(opcaoIndex)}
                    style={{ padding: '8px' }}
                  >
                    Remover Opção
                  </div>
                </div>

                <div className="dados-config">
                  <h4>Dados associados à "{opcao.name || 'Nova Opção'}":</h4>
                    
                    {opcao.dados.map((dado, dadoIndex) => (
                        <div key={dadoIndex} className="dado-inputs-row">
                            {dadoIndex > 0 && <hr style={{ borderTop: '1px solid #ccc', margin: '10px 0' }} />}
                            
                            <div className="dado-item-group">
                                
                                <div className="input-group">
                                    <label style={{ fontWeight: "bold" }}>Dado Nome:</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Dano Físico"
                                        value={dado.name} 
                                        onChange={(e) =>
                                            atualizarDadosOpcao(opcaoIndex, dadoIndex, "name", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="input-group">
                                    <br />
                                    <label>Lados:</label>
                                    <input
                                        type="number"
                                        placeholder="Ex: 20"
                                        value={dado.lados}
                                        onChange={(e) =>
                                            atualizarDadosOpcao(
                                                opcaoIndex,
                                                dadoIndex,
                                                "lados",
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        className="dado-item input"
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Quantidade:</label>
                                    <input
                                        type="number"
                                        placeholder="Ex: 1"
                                        value={dado.quantidade} 
                                        onChange={(e) =>
                                            atualizarDadosOpcao(
                                                opcaoIndex,
                                                dadoIndex,
                                                "quantidade",
                                                parseInt(e.target.value) || 1
                                            )
                                        }
                                        className="dado-item"
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Bônus (opcional):</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={dado.bonus || 0} 
                                        onChange={(e) =>
                                            atualizarDadosOpcao(
                                                opcaoIndex,
                                                dadoIndex,
                                                "bonus",
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        className="dado-item"
                                    />
                                </div>
                                
                                {/* Botão de Remover Dado (só aparece se houver mais de um) */}
                                {opcao.dados.length > 1 && (
                                    <div 
                                        className="button-remover"
                                        onClick={() => removerDadoDaOpcao(opcaoIndex, dadoIndex)}
                                        style={{ alignSelf: 'flex-end', padding: '5px' }}
                                    >
                                        Remover Dado
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {/* Botão de Adicionar Dado */}
                    <div 
                        className="button"
                        onClick={() => adicionarDadoAOpcao(opcaoIndex)}
                        style={{ marginTop: '10px', width: 'fit-content' }}
                    >
                        Adicionar + Dado a {opcao.name || 'esta opção'}
                    </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controles da Votação */}
        <div className="controles-votacao">
          <div className="button" onClick={criarVotacaoComDados}>
            Criar Votação com Dados ({opcoes.length} opções)
          </div>

          <div className="button" onClick={verResultadoVotacao}>
            {loading ? "Carregando..." : "Ver Resultado"}
          </div>
        </div>

        {/* Resultado da Votação */}
        {mostrarResultado && resultado && (
          <div className="resultado-votacao">
            <h2>Resultado da Votação</h2>

            <div className="resumo">
              <p>
                <strong>Total de votos:</strong> {resultado.votosTotal}
              </p>
            </div>

            <div className="resultados-detalhados">
              {resultado?.result?.map((item, index) => {
                let totalModa = 0;
                
                if (item.rolagens && Array.isArray(item.rolagens)) {
                    item.rolagens.forEach(rolagemItem => {
                        const modaValue = Array.isArray(rolagemItem.moda)
                            ? rolagemItem.moda.reduce((acc: number, val: number) => acc + val, 0)
                            : rolagemItem.moda;

                        totalModa += modaValue;
                    });
                }
                
                return (
                <div key={index} className="resultado-item">
                  <div className="resultado-header">
                    <h3>{item.name}:</h3>
                    <span className="votos-count">{item.votos} votos</span>
                  </div>
                    
                  {item.rolagens && (
                    <div className="rolagens-info">
                      <strong>Rolagens: </strong>
                      <div className="rolagem-detalhes">
    <br />
                        {Array.isArray(item.rolagens) && item.rolagens.map((rolagemItem, rIndex) => (
                            <span key={rIndex}>
                                <strong>{rolagemItem.name}: </strong>
                                {Array.isArray(rolagemItem.moda)
                                    ? rolagemItem.moda.join(" + ")
                                    : rolagemItem.moda}
                                    <br />
                            </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {totalModa > 0 && (
                      <div className="total-moda-calculado">
                          <strong>Total:</strong> {totalModa}
                      </div>
                  )}
                </div>
                );
            })}
            </div>
          </div>
        )}

        {mostrarResultado && !resultado && (
          <div className="nenhuma-votacao">
            <p>Nenhuma votação ativa ou resultado disponível</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}