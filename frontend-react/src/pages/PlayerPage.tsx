import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { Rolar_todos } from "../components/Dados";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSSE } from "../services/SSEService";

interface Rolagem {
  name: string;
  rolagem_atual: number;
  todas_rolagem: number[];
}

interface DadosResultado {
  resultados: Rolagem[];
}

export function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dados, setDados] = useState<DadosResultado>();
  const [erro, setErro] = useState<string | null>(null);
  const { vida, connected } = useSSE(id);
  console.log("SSE vida:", vida, " | connected:", connected);

  const handleClickDados = async (e: any) => {
    e.preventDefault();
    try {
      const res = await Rolar_todos(id!);
      setDados(res);
      console.log("dados rolados: ", res);
      setErro(null);
    } catch (err: any) {
      setErro(err.message);
      setDados(undefined);
    }
  };

  return (
    <div id="tudo">
      <Header />
      <section>
        <h1>Jogador {id}</h1>
        <h2>Vida: {vida !== null ? vida : "Carregando..."}</h2>
        <form action="">
          <button id="btnRolagem" className="button" onClick={handleClickDados}>
            Rolar dado
          </button>
        </form>
        <form action="">
          <button
            id="btnEscolhas"
            className="button"
            onClick={() => navigate(`/player/${id}/acoes`)}
          >
            Escolher ação
          </button>
        </form>
        {erro && <h2>{erro}</h2>}
        {dados && (
          <div id="modal">
            <div className="result">
              {dados?.resultados?.map((rolagem, index) => {
                const { name, rolagem_atual } = rolagem;

                return (
                  <div key={index} style={{ marginBottom: "16px" }}>
                    <h2>
                      🎲 {name} rolou{" "}
                      {Array.isArray(rolagem_atual)
                        ? `${rolagem_atual.length} dados`
                        : "1 dado"}
                    </h2>

                    {Array.isArray(rolagem_atual) ? (
                      <>
                        <p>
                          <strong>Principal:</strong> {rolagem_atual[0]}
                        </p>
                        <p>
                          <strong>Outras rolagens:</strong>{" "}
                          {rolagem_atual.slice(1).join(", ")}
                        </p>
                      </>
                    ) : (
                      <p>
                        <strong>Resultado:</strong> {rolagem_atual}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
