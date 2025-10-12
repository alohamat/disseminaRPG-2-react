import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { useLocation } from "react-router-dom";
import { Header } from '../components/Header';

interface RolagemData {
  d6_rolls: number[];
  d10_1: number[];
  d10_2: number[];
  total: string;
  desafio1: number;
  desafio2: number;
  resolucao: string;
}

export default function ExibeRolagem() {
  const { jogador } = useParams();
  const [dados, setDados] = useState<RolagemData | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const bonus = location.state?.bonus ?? 0;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://localhost:3000/api/mestre/${jogador}/exibeRolagem`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bonus })
        }
      );
      const data = await res.json();
      setDados(data);
    }
    fetchData();
  }, [bonus, jogador]);

  useEffect(() => {
    if (!dados) return;

    const ctx = document.getElementById("todas_rolagens") as HTMLCanvasElement;
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [1,2,3,4,5,6,7,8,9,10],
        datasets: [
          { label: "Dado de Ação", data: dados.d6_rolls, backgroundColor: "#4BC0C0" },
          { label: "Desafio 1", data: dados.d10_1, backgroundColor: "#fc9e11" },
          { label: "Desafio 2", data: dados.d10_2, backgroundColor: "#FF4069" },
        ]
      }
    });
  }, [dados]);

  if (!dados) return <p>Carregando...</p>;

  const handleVoltar = () => navigate(`/mestre/${jogador}`)

  return (
    <section>
      <Header />
      <canvas id="todas_rolagens"></canvas>

      <div className="resultado">
        <h2>Dado de Ação + Bonus: {dados.total}</h2>
        <h2>Desafio 1: {dados.desafio1}</h2>
        <h2>Desafio 2: {dados.desafio2}</h2>
        <h3>Resultado: {dados.resolucao}</h3>
      </div>

      <div>
        <button onClick={handleVoltar}>Voltar</button>
      </div>
    </section>
  );
}
