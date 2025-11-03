import { useParams } from "react-router-dom";
import { useSSE } from "../services/SSEService";
import { jogadores } from "../components/LoginButtons";
import { useState, useEffect } from "react";
import { Votacao_Estado } from "../components/Dados";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

interface ResultadoVotacao {
  name: string;
  votos: number;
  rolagens?: {
    name: string;
    moda: number | number[];
    moda_geral?: number;
    total?: number;
    bonus?: number;
  }[];
}




interface VotacaoEstadoResponse {
  votosTotal: number;
  result: ResultadoVotacao[];
}

export default function AguardaVotacaoPage() {
  const { id } = useParams();
  const { sseValue, connected } = useSSE(id, "votos");
  console.log("votossse: ", sseValue, connected);

  const [loading, setLoading] = useState(false);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultado, setResultado] = useState<VotacaoEstadoResponse | null>(null);
  const [maisVotado, setMaisVotado] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (resultado?.result) {
      const maxVotos = Math.max(...resultado.result.map(item => item.votos));
      setMaisVotado(maxVotos);
    }
  }, [resultado]);

  const verResultadoVotacao = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const resultado = await Votacao_Estado(id);
      setResultado(resultado);
      setMostrarResultado(true);
    } catch {
      alert("Erro ao buscar resultado da votação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header isMaster={true}/>
      <div id="tudo">
        <main className="conteudo">
          <h1>Aguardando votacao do {jogadores[Number(id) - 1]}</h1>
          <h2>Votos totais: {sseValue}</h2>
          <div className="button" onClick={verResultadoVotacao}>
            {loading ? "Carregando..." : "Ver Resultado e fechar votação"}
          </div>
        </main>

        {mostrarResultado && resultado && (
          <div className="result-options-modal">
            <div className="result-options-modal-content">
              <button
                className="button"
                onClick={() => {
                  setMostrarResultado(false);
                  navigate(`/master/${id}`);
                }}
              >
                X
              </button>
              <h1 id="votacao-resultado">Resultado da Votação</h1>
              <h2 id="total-votacao">Total de votos: {resultado.votosTotal}</h2>

              <div className="result-options-item-container">
                {resultado.result.map((item, index) => {
                  return (
                    <div key={index} className="resultado-item">
                      <div>
                        <h1>{item.name}: </h1>
                        <h2
                          className={`dado-mestre ${
                            item.votos === maisVotado ? `maior-resultado` : ""
                          }`}
                        >
                          <strong> Votos: {item.votos}</strong>
                        </h2>
                      </div>
                      {item.rolagens && (
                        <div className="rolagens-info">
                          <div className="rolagem-detalhes">
                            {item.rolagens.map((rolagemItem, rIndex) => (
                              <h2 className="dado-mestre" key={rIndex}>
                                <strong>{rolagemItem.name}: </strong>
                                <h3 id="total">{`${
                                  Array.isArray(rolagemItem.moda)
                                    ? rolagemItem.moda.join(" + ")
                                    : rolagemItem.moda
                                } + ${rolagemItem.bonus || 0} = ${
                                  rolagemItem.total
                                }`}</h3>
                              </h2>
                            ))}
                            <br />
                            <div className="progresso-container">
                              <div
                                className="progresso-barra"
                                style={{
                                  width:
                                    resultado.votosTotal > 0
                                      ? `${
                                          (item.votos /
                                            resultado.votosTotal) *
                                          100
                                        }%`
                                      : "0%",
                                }}
                              ></div>
                              <h2 className="dado-mestre">
                                Porcentagem de votos:
                                <span className="progresso-texto">
                                  {resultado.votosTotal > 0
                                    ? ` ${Math.round(
                                        (item.votos / resultado.votosTotal) *
                                          100
                                      )}%`
                                    : "0%"}
                                </span>
                              </h2>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
