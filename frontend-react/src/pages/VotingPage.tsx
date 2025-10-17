import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { Cria_Votacao, Espera_Votacao } from "../components/Dados";
import { useState } from "react";
import { api } from "../services/ApiService";

interface votosEstado {
  votosTotal: number
}

export function VotingPage() {
  const { id } = useParams();
  const [opcoes, setOpcoes] = useState<string[]>([]);
  const [estado, setEstado] = useState<votosEstado>()

  function AdicionarOpcao() {
    setOpcoes([...opcoes, ""]);
  }

  function AtualizarOpcao(index: number, valor: string) {
    const novasOpcoes = [...opcoes];
    novasOpcoes[index] = valor;
    setOpcoes(novasOpcoes);
  }

  function RemoverOpcao(index: number) {
    const novasOpcoes = opcoes.filter((_, i) => i !== index);
    setOpcoes(novasOpcoes);
  }

  const Ver_Estado = async () => {
    const res = await api.get(`mestre/jogador${id}/votacaoEstado`);
      setEstado(res.data)
  }

  return (
    <div id="tudo">
      <Header />
      <h1>Criar Votação - Jogador {id}</h1>

      <section>
        <div 
          className="button"
          onClick={() => (id === undefined ? null : Cria_Votacao(id))}
        >
          Criar votação
        </div>

        <div 
          className="button" 
          onClick={AdicionarOpcao}>Criar opção</div>

        {opcoes.map((valor, index) => (
          <div key={index}>
            <input
              type="text"
              id={`opcao${index}`}
              value={valor}
              onChange={(e) => AtualizarOpcao(index, e.target.value)}
              placeholder={`Opção ${index + 1}`}
            />
            <button 
              id="btnDeleteOpcao"
              onClick={() => RemoverOpcao(index)}
            >
              X
            </button>
          </div>
        ))}

        <div
          className="button"
          onClick={() =>
            id === undefined ? null : Espera_Votacao(id, opcoes)
          }
        >
          Atualizar opções
        </div>

        <div
          className="button"
          onClick={Ver_Estado}
        >
          Votação estado
        </div>
        <br />
        <div>
          <h1>Votos Total: {estado?.votosTotal}</h1>
        </div>
      </section>

      <Footer />
    </div>
  );
}
