import { useState } from "react";

// função pra rodar d6
export function D6() {
  const [rolagemAberta, setRolagemAberta] = useState(true);
  const [resultado, setResultado] = useState<number | null>(null);
  const [rolagens, setRolagens] = useState(0);

  const rolar = () => {
    if (rolagemAberta) {
      const roll = Math.floor(Math.random() * 6);
      setResultado(roll + 1);
      setRolagens((p) => p + 1);
    } else {
      setResultado(null);
      alert("Rolagem de dados bloqueada pelo mestre do jogo.");
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Dado de Ação (D6)</h2>
      <button onClick={rolar}>Rolar D6</button>
      {resultado && <p>Resultado: {resultado}</p>}
      <p>Total de rolagens: {rolagens}</p>
      <button onClick={() => setRolagemAberta((p) => !p)}>
        {rolagemAberta ? "Bloquear Rolagem" : "Desbloquear Rolagem"}
      </button>
    </div>
  );
}

// função pra rodar o primeiro d10
export function D10_1() {
  const [rolagemAberta, setRolagemAberta] = useState(true);
  const [resultado, setResultado] = useState<number | null>(null);
  const [rolagens, setRolagens] = useState(0);

  const rolar = () => {
    if (rolagemAberta) {
      const roll = Math.floor(Math.random() * 10);
      setResultado(roll + 1);
      setRolagens((p) => p + 1);
    } else {
      setResultado(null);
      alert("Rolagem de dados bloqueada pelo mestre do jogo.");
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Dado de Desafio 1 (D10)</h2>
      <button onClick={rolar}>Rolar D10</button>
      {resultado && <p>Resultado: {resultado}</p>}
      <p>Total de rolagens: {rolagens}</p>
      <button onClick={() => setRolagemAberta((p) => !p)}>
        {rolagemAberta ? "Bloquear Rolagem" : "Desbloquear Rolagem"}
      </button>
    </div>
  );
}

// função pra rodar o segundo d10
export function D10_2() {
  const [rolagemAberta, setRolagemAberta] = useState(true);
  const [resultado, setResultado] = useState<number | null>(null);
  const [rolagens, setRolagens] = useState(0);

  const rolar = () => {
    if (rolagemAberta) {
      const roll = Math.floor(Math.random() * 10);
      setResultado(roll + 1);
      setRolagens((p) => p + 1);
    } else {
      setResultado(null);
      alert("Rolagem de dados bloqueada pelo mestre do jogo.");
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Dado de Desafio 2 (D10)</h2>
      <button onClick={rolar}>Rolar D10</button>
      {resultado && <p>Resultado: {resultado}</p>}
      <p>Total de rolagens: {rolagens}</p>
      <button onClick={() => setRolagemAberta((p) => !p)}>
        {rolagemAberta ? "Bloquear Rolagem" : "Desbloquear Rolagem"}
      </button>
    </div>
  );
}

