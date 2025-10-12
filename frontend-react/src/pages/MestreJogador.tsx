import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export default function MestreJogador() {
  const { jogador } = useParams();
  const navigate = useNavigate();

  async function iniciarRolagens() {
    const res = await fetch(`http://localhost:3000/api/mestre/${jogador}/resetaDados`)
    if (!res.ok) {
        throw new Error("Deu erro aqui parcero, te vira aí")
    }
    navigate(`/mestre/${jogador}/resetaDados`)
  }

  async function iniciarVotacao() {
    const res = await fetch(`http://localhost:3000/api/mestre/${jogador}/criavotacao`, {method: 'POST'})
    if (!res.ok) {
        throw new Error("Deu erro aqui parcero, te vira aí")
    }
  }

  return (
    <section id="tudo">
      <Header />
      <button onClick={iniciarRolagens}>Iniciar Rolagens</button>
      <button onClick={iniciarVotacao}>Iniciar Escolha de Ação</button>
    </section>
  );
}
