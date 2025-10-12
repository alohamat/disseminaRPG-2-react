import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from '../components/Header';

export default function MestreResetaDados() {
  const { jogador } = useParams();
  const navigate = useNavigate();
  const [bonus, setBonus] = useState<number>(0);
  const [rolagens, setRolagens] = useState<number>(0);

  const handleExibirRolagens = async () => {
    const res = await fetch(
      `https://dissemina-iff-backend.vercel.app/api/mestre/${jogador}/exibeRolagem`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bonus })
      }
    );

    if (!res.ok) {
      console.error("Erro ao exibir rolagem");
      return;
    }

    setRolagens((prev) => prev + 1);
    navigate(`/mestre/${jogador}/exibeRolagem`,  { state: { bonus } });
  };

  return (
    <section>
      <Header />
      <p>
        <b id="total">{rolagens}</b> rolagens realizadas
      </p>

      <div>
        <label>
          <h2>Bônus/Penalidade:</h2>
        </label>
        <input
          type="number"
          value={bonus}
          onChange={(e) => setBonus(Number(e.target.value))}
        />
        <button type="button" onClick={handleExibirRolagens}>
          Exibir Rolagens
        </button>
      </div>
    </section>
  );
}
