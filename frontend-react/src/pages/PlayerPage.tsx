import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
// import { Rolar_todos } from "../components/Dados";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSSE } from "../services/SSEService";
import { jogadores } from "../components/LoginButtons";

// interface Rolagem {
//   name: string;
//   rolagem_atual: number;
//   todas_rolagem: number[][];
// }

// interface DadosResultado {
//   resultados: Rolagem[];
// }

export function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [dados, setDados] = useState<DadosResultado>();
  // const [erro, setErro] = useState<string | null>(null);
  // const [modal, setModal] = useState<boolean>(false);
  const { vida, connected } = useSSE(id);
  console.log("SSE vida:", vida, " | connected:", connected);

  // const handleClickDados = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const res = await Rolar_todos(id!);
  //     setDados(res);
  //     setModal(false);
  //     console.log("dados rolados: ", res);
  //     setErro(null);
  //   } catch (err: any) {
  //     setErro(err.message);
  //     setDados(undefined);
  //   }
  // };

  return (
    <div>
      <Header />
      <div id="tudo">
        <section>
          <h1>Jogador do {jogadores[Number(id) - 1]}</h1>
          <h2 id="vida">Vida: {vida !== null ? vida : "Carregando..."}</h2>
          {/* <form action="">
            <button
              id="btnRolagem"
              className="button"
              onClick={handleClickDados}
            >
              Rolar dado
            </button>
          </form> */}
          <form action="">
            <button
              id="btnEscolhas"
              className="button"
              onClick={() => navigate(`/player/${id}/acoes`)}
            >
              Escolher ação / rolagem
            </button>
          </form>
          {/* {erro && <h2>{erro}</h2>}

          {dados && !modal && (
            <div className="modal">
              <button
                className="button"
                id="close"
                onClick={() => setModal(true)}
              >
                x
              </button>
              <div className="modal_resultado">
                {dados?.resultados?.map((rolagem, index) => {
                  const { name, rolagem_atual, todas_rolagem } = rolagem;
                  return (
                    <div key={index} style={{ marginBottom: "16px" }}>
                      <h1>
                        🎲 {name} rolou{" "}
                        {Array.isArray(rolagem_atual)
                          ? `${rolagem_atual.length}d${todas_rolagem[0].length}`
                          : `1d${todas_rolagem[0].length}`}
                      </h1>

                      {Array.isArray(rolagem_atual) ? (
                        <>
                          <h2>
                            <strong>Valores das rolagens: </strong>{" "}
                            {rolagem_atual.join(", ")}
                          </h2>
                        </>
                      ) : (
                        <h2>
                          <strong>Resultado:</strong> {rolagem_atual}
                        </h2>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )} */}
        </section>
        <Footer />
      </div>
    </div>
  );
}
