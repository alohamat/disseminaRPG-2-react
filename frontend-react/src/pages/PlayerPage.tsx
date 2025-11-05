import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSSE } from "../services/SSEService";
import { jogadores } from "../components/LoginButtons";

export function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sseValue, connected } = useSSE(id, "vida");
  console.log("SSE vida:", sseValue, " | connected:", connected);

  return (
    <div>
      <Header />
      <div id="tudo">
        <section>
          <h1>Jogador do {jogadores[Number(id) - 1]}</h1>
          <h2 id="vida">Vida: {sseValue !== null ? sseValue : "Carregando..."}</h2>
          <form action="">
            <button
              id="btnEscolhas"
              className="button"
              onClick={() => navigate(`/player/${id}/acoes`)}
            >
              Escolher ação / rolagem
            </button>
          </form>
        </section>
        <Footer />
      </div>
    </div>
  );
}
