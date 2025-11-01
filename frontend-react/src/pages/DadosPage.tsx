import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { Inicia_rolagens } from "../components/Dados";
import { Exibe_rolagem } from "../components/Dados";
import { useState } from "react";
import { jogadores } from "../components/LoginButtons";

export interface DadoCustomizado {
  name: string;
  lados: number;
  quantidade: number;
  bonus?: number;
}
export function Dados() {
  const { id } = useParams();
  const [bonus, setBonus] = useState(0);

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
  const [dadosCustomizados, setDadosCustomizados] = useState<DadoCustomizado[]>(
    []
  );
  const [modal, setModal] = useState<boolean>(false);

  const handleIniciaRolagem = async () => {
    if (!id) return null;
    await Inicia_rolagens(id, bonus, dadosCustomizados);
  };

  const handleTrancaRolagem = async () => {
    setModal(false);
    setDados(await Exibe_rolagem(id!));
  };

  const adicionarDado = () => {
    setDadosCustomizados([
      ...dadosCustomizados,
      {
        name: "",
        lados: 0,
        quantidade: 0,
        bonus: 0,
      },
    ]);
  };

  const removerDado = (index: number) => {
    const novosDados = [...dadosCustomizados];
    novosDados.splice(index, 1);
    setDadosCustomizados(novosDados);
  };

  const atualizarDado = (
    index: number,
    campo: keyof DadoCustomizado,
    valor: string | number
  ) => {
    const novosDados = [...dadosCustomizados];
    novosDados[index] = {
      ...novosDados[index],
      [campo]: valor,
    };
    setDadosCustomizados(novosDados);
  };

  return (
    <div>
      <Header isMaster={true} />
      <div id="tudo">
        <section>
          <h1>Controle dos Dados - Personagem {jogadores[Number(id) - 1]}</h1>

          <h2>Dados Customizados</h2>
          <div className="button" onClick={adicionarDado}>
            Adicionar Dado
          </div>

          <div id="dados-customizados">
            {dadosCustomizados.map((dado, index) => (
              <div key={index} className="dado-item">
                <input
                  type="text"
                  placeholder="Nome do dado"
                  value={dado.name}
                  onChange={(e) => atualizarDado(index, "name", e.target.value)}
                />

                <div id="dado-item-interno">
                  <div className="input-group">
                    <p>Número de Lados</p>
                    <input
                      className="input-number"
                      type="number"
                      placeholder="Lados"
                      value={dado.lados}
                      onChange={(e) =>
                        atualizarDado(index, "lados", parseInt(e.target.value))
                      }
                    />
                  </div>

                  <div className="input-group">
                    <p>Quantidade</p>
                    <input
                      className="input-number"
                      type="number"
                      placeholder="Quantidade"
                      value={dado.quantidade}
                      onChange={(e) =>
                        atualizarDado(
                          index,
                          "quantidade",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div className="input-group">
                    <p>Bônus individual</p>
                    <input
                      className="input-number"
                      type="number"
                      placeholder="0"
                      value={dado.bonus || ""}
                      onChange={(e) =>
                        atualizarDado(
                          index,
                          "bonus",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>

                  <div
                    className="button-remover"
                    onClick={() => removerDado(index)}
                  >
                    Remover
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="conteudo">
            <div
              className="button"
              onClick={() =>
                id == undefined
                  ? console.log("id é null, nao iniciamos rolagem")
                  : handleIniciaRolagem()
              }
            >
              Liberar Rolagem
            </div>
            <div>
              <h2>Digite o bônus de rolagem</h2>
              <input
                type="number"
                className="input-number"
                placeholder="0"
                onChange={(e) => setBonus(Number(e.target.value))}
              />
            </div>
            <div className="button" onClick={handleTrancaRolagem}>
              Trancar Rolagem
            </div>
          </div>
          {dados && !modal && (
            <div className="dice-modal">
              <div className="dice-modal__content" id="dados">
                <button
                  className="button"
                  id="close"
                  onClick={() => setModal(true)}
                >
                  x
                </button>
                <h1>Resultado da rolagem</h1>
                <div>
                  <h1>Total de rolagens: {dados.total_de_rolagens}</h1>
                  {dados.modas.map((item, i) => (
                    <div
                      key={i}
                      className="dice-result"
                      style={{ marginBottom: "12px" }}
                    >
                      <h2>{item.name}</h2>
                      <h2>Total: {item.total}</h2>
                      <div className="dice-result__values">
                        {Array.isArray(item.valor)
                          ? item.valor.map((v, j) => (
                              <h3 className="dice-result__value" key={j}>
                                Resultado {j + 1}: {v}
                              </h3>
                            ))
                          : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
        <Footer />
      </div>
    </div>
  );
}
