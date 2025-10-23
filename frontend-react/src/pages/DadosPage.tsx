import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { Inicia_rolagens } from "../components/Dados";
import { Exibe_rolagem } from "../components/Dados";
import { useState, useRef } from "react";

export function Dados() {
  const { id } = useParams();
  const bonusRef = useRef<HTMLInputElement>(null);

  interface Moda {
    name: string;
    valor: number;
    bonus: number;
    total: string;
  }

  interface DadosResultado {
    total_de_rolagens: number;
    jogador: string;
    modas: Moda[];
  }


  const [dados, setDados] = useState<DadosResultado>();


  const handleIniciaRolagem = async () => {
    if (!id) return null;

    // Pega o valor atual diretamente do input
    const bonusValue = bonusRef.current ? Number(bonusRef.current.value) : 0;
    console.log("Bonus enviado:", bonusValue);

    Inicia_rolagens(id, bonusValue);
  };

  const handleTrancaRolagem = async () => {
    setDados(await Exibe_rolagem(id!));
  }
  return (
    <div id="tudo">
      <Header />
      <section>
        <h1>Controle dos Dados - Personagem {id}</h1>
        <div>
          <div
            className="button"
            onClick={() => (id == undefined ? null : handleIniciaRolagem())}
          >
            Liberar Rolagem
          </div>
          <div>
            <p>Digite o bônus de rolagem</p>
            <input
              type="number"
              ref={bonusRef}
              defaultValue={0}
            />
          </div>
          <div
            className="button"
            onClick={handleTrancaRolagem}
          >
            Trancar Rolagem
          </div>
        </div>
        {dados && (
          <div id="modal">
            <div className="result">
              <h2>Resultado da rolagem</h2>
              <div>
                <h1>Total de rolagens: {dados.total_de_rolagens}</h1>
                {dados.modas.map((item, i) => (
                  <div key={i}>
                    <h2>{item.name}</h2>
                    <h2>{item.total}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
