import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/ApiService";
import {
  descricoesImagens,
  imagens,
  jogadores,
} from "../components/LoginButtons";

export function Master() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vidaNova, setVidaNova] = useState<number | "">(
    Number(localStorage.getItem("vida"))
  );

  // const handleClickDados = () => {
  //   navigate(`/master/${id}/dados`);
  // };

  const handleClickVota = () => {
    navigate(`/votacao-dados/${id}`);
  };
  const handleAtualizarVida = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || vidaNova === "") return;

    try {
      console.log("enviando vida nova: ", vidaNova);
      const res = await api.post(`mestre/jogador${id}/vida`, {
        vidaNova: vidaNova,
      });
      console.log("Vida enviada:", res.data);
      localStorage.setItem("vida", vidaNova + "");
    } catch (err) {
      console.error("Erro ao atualizar vida:", err);
    }
  };

  return (
    <div>
      <Header isMaster={true} />
      <div id="tudo">
        <img
          src={imagens[Number(id) - 1]}
          id="img1"
          className="portrait"
          alt={descricoesImagens[Number(id) - 1]}
        />
        <section className="principal">
          <h1>Mestre - {jogadores[Number(id) - 1]}</h1>
          <div>
            <form onSubmit={handleAtualizarVida} className="bloco">
              <h2 style={{ fontWeight: "bold" }}>Vida do jogador {id} </h2>
              {/* Precisa pegar o get da vida atual e colocar aqui */}
              <h3>Vida atual: {vidaNova}</h3>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "center",
                }}
              >
                <label htmlFor="vida">Modificar vida atual</label>
                <input
                  type="number"
                  value={vidaNova}
                  onChange={(e) => setVidaNova(Number(e.target.value))}
                  className="input-number"
                  id="vida"
                />
              </div>

              <button type="submit" className="botao-enviar">
                Atualizar Vida
              </button>
            </form>
            {/* <form>
              <button
                className="button"
                id="btnRolagem"
                onClick={handleClickDados}
              >
                Rolagem de dados
              </button>
            </form> */}
            <form>
              <button
                className="button"
                id="btnEscolhas"
                onClick={handleClickVota}
              >
                Criar Votação / Rolagem
              </button>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
