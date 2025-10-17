import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { Cria_Votacao, Espera_Votacao, Votacao_Estado } from "../components/Dados";
import { useState } from "react";

export function VotingPage() {
  const { id } = useParams();
  const [opcoes, setOpcoes] = useState<string[]>([]);

  function AdicionarOpcao() {
    setOpcoes([...opcoes, ""]);
  }

  function AtualizarOpcao(index: number, valor: string) {
    const novasOpcoes = [...opcoes];
    novasOpcoes[index] = valor;
    setOpcoes(novasOpcoes);
  }

  return (
    <div id="tudo">
      <Header />
      <h1>Criar Votação - Jogador {id}</h1>

      <section>
        <div
          onClick={() => (id === undefined ? null : Cria_Votacao(id))}
        >
          Criar votação
        </div>

        <div onClick={AdicionarOpcao}>Criar opção</div>

        {opcoes.map((valor, index) => (
          <div key={index}>
            <input
              type="text"
              id={`opcao${index}`}
              value={valor}
              onChange={(e) => AtualizarOpcao(index, e.target.value)}
              placeholder={`Opção ${index + 1}`}
            />
          </div>
        ))}

        <div
          onClick={() =>
            id === undefined ? null : Espera_Votacao(id, opcoes)
          }
        >
          Atualizar opções
        </div>

        <div
          onClick={() => (id === undefined ? null : Votacao_Estado(id))}
        >
          Votação estado
        </div>
      </section>

      <Footer />
    </div>
  );
}
