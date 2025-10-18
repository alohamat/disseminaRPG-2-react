import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { Reseta_dados } from "../components/Dados";
import { Tranca_dados } from "../components/Dados";
import { useState, useRef } from "react";

export function Dados() {
  const { id } = useParams();
  const bonusRef = useRef<HTMLInputElement>(null);

  interface DadosResultado {
    total: string;
    desafio1: number;
    desafio2: number;
    resolucao: string;
    d6_rolls: number[];
    d10_1: number[];
    d10_2: number[];
    jogador: string;
  }

  const [dados, setDados] = useState<DadosResultado>();

  const getD6Value = () => {
    if (!dados?.d6_rolls) return 0;
    return dados?.total.charAt(0);
  };

  const getD10_1Value = () => {
    if (!dados?.d10_1) return 0;
    const index = dados.d10_1.findIndex((val) => val === 1);
    return index !== -1 ? index + 1 : 0;
  };

  const getD10_2Value = () => {
    if (!dados?.d10_2) return 0;
    const index = dados.d10_2.findIndex((val) => val === 1);
    return index !== -1 ? index + 1 : 0;
  };

  const handleTrancarDados = async () => {
    if (!id) return null;
    
    // Pega o valor atual diretamente do input
    const bonusValue = bonusRef.current ? Number(bonusRef.current.value) : 0;
    console.log("Bonus enviado:", bonusValue);
    
    const resultado = await Tranca_dados(id, bonusValue);
    setDados(resultado);
  };

  return (
    <div id="tudo">
      <Header />
      <section>
        <h1>Controle dos Dados - Personagem {id}</h1>
        <div>
          <div
            className="button"
            onClick={() => (id == undefined ? null : Reseta_dados(id))}
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
            onClick={handleTrancarDados} 
          >
            Trancar Rolagem
          </div>
        </div>
        {dados && (
          <div id="modal">
            <div className="result">
              <div>
                <h1>Dado de Ação: {getD6Value()} </h1>
                <h1>Dado de Desafio 1: {getD10_1Value()}</h1>
                <h1>Dado de Desafio 2: {getD10_2Value()}</h1>
                <h1>Total: {dados?.total}</h1>
                <h1>Resolução: {dados?.resolucao}</h1>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
