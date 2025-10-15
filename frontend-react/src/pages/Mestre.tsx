import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export default function Mestre() {
  const navigate = useNavigate();

  return (
    <div id="tudo">
      <Header />
      <h1>Escolha seu Jogador</h1>
      <h2>Você está na página de mestre</h2>
      <div className="mestre-buttons-container">
        <button onClick={() => navigate("/mestre/jogador1")}>Jogador 1</button>
        <button onClick={() => navigate("/mestre/jogador2")}>Jogador 2</button>
        <button onClick={() => navigate("/mestre/jogador3")}>Jogador 3</button>
      </div>
    </div>
  );
}
