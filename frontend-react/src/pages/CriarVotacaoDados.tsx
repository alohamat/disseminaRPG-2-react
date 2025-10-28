import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/ApiService";
import { Votacao_Estado } from "../components/Dados";

interface DadoVotacao {
  lados: number;
  quantidade: number;
  name: string;
  bonus?: number;
}

interface OpcaoComDado {
  name: string;
  dados: DadoVotacao;
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

  const adicionarOpcao = () => {
    setOpcoes([
      ...opcoes,
      {
        name: "",
        dados: {
          name: "",
          lados: 0,
          quantidade: 1,
          bonus: 0,
        },
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

  const atualizarDadosOpcao = (
    index: number,
    campo: keyof DadoVotacao,
    valor: number | string
  ) => {
    const novasOpcoes = [...opcoes];
    if (campo === "name") {
      novasOpcoes[index].dados.name = valor as string;
    } else {
      novasOpcoes[index].dados[campo] = valor as number;
    }
    setOpcoes(novasOpcoes);
  };

  const criarVotacaoComDados = async () => {
    if (!id) return;

    const opcoesValidas = opcoes.filter(
      (opcao) =>
        opcao.name.trim() !== "" &&
        opcao.dados.name.trim() !== "" &&
        opcao.dados.lados > 0 &&
        opcao.dados.quantidade > 0
    );

    if (opcoesValidas.length === 0) {
      alert("Adicione pelo menos uma opção válida!");
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
        <h1>Votação com Dados - Personagem {id}</h1>

        {/* Configuração da Votação */}
        <div className="votacao-config">
          <h2>Configurar Opções com Dados</h2>

          <div
            className="button"
            onClick={adicionarOpcao}
            style={{ justifySelf: "center" }}
          >
            Adicionar Opção
          </div>

          <div id="dados-customizados">
            {opcoes?.map((opcao, index) => (
              <div key={index}>
                <div className="opcao-header">
                  <input
                    type="text"
                    placeholder="Nome da opção (ex: Ataque, Defesa)"
                    value={opcao.name}
                    onChange={(e) => atualizarNomeOpcao(index, e.target.value)}
                    className="opcao-nome"
                  />
                  <div
                    className="button-remover"
                    onClick={() => removerOpcao(index)}
                  >
                    Remover
                  </div>
                </div>

                <div className="dados-config">
                  <h4>Dados para esta opção:</h4>
                  <div id="dados">
                    <div className="input-group">
                      <label style={{ fontWeight: "bold" }}>Dado de:</label>
                      <input
                        type="text"
                        placeholder="Ex: Dano, Cura"
                        value={opcao.dados.name}
                        onChange={(e) =>
                          atualizarDadosOpcao(index, "name", e.target.value)
                        }
                      />
                    </div>

                    <div className="input-group">
                      <label>Lados:</label>
                      <input
                        type="number"
                        placeholder="Ex: 20"
                        value={opcao.dados.lados}
                        onChange={(e) =>
                          atualizarDadosOpcao(
                            index,
                            "lados",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="dado-item"
                      />
                    </div>

                    <div className="input-group">
                      <label>Quantidade:</label>
                      <input
                        type="number"
                        placeholder="Ex: 1"
                        value={opcao.dados.quantidade}
                        onChange={(e) =>
                          atualizarDadosOpcao(
                            index,
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
                        value={opcao.dados.bonus || 0}
                        onChange={(e) =>
                          atualizarDadosOpcao(
                            index,
                            "bonus",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="dado-item"
                      />
                    </div>
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
                          : item.rolagens.moda}
                      </div>
                    </div>
                  )}

                  <div className="progresso-container">
                    <div
                      className="progresso-barra"
                      style={{
                        width:
                          resultado.votosTotal > 0
                            ? `${(item.votos / resultado.votosTotal) * 100}%`
                            : "0%",
                      }}
                    ></div>
                    <span className="progresso-texto">
                      {resultado.votosTotal > 0
                        ? `${Math.round(
                            (item.votos / resultado.votosTotal) * 100
                          )}%`
                        : "0%"}
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
      </section>
      <Footer />
    </div>
  );
}
