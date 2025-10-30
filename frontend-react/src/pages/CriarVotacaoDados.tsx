import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/ApiService";
import { Votacao_Estado } from "../components/Dados";
import { jogadores } from "../components/LoginButtons";

interface DadoVotacao {
    lados: number;
    quantidade: number;
    name: string;
    bonus?: number;
}

interface OpcaoComDado {
    name: string;
    dados: DadoVotacao[];
    infoExtra?: string;
}

interface ResultadoVotacao {
    name: string;
    votos: number;
    rolagens?: {
        name: string;
        moda: number | number[];
        moda_geral?: number;
        total?: number;
        bonus?: number;
    }[];
}

interface VotacaoEstadoResponse {
    votosTotal: number;
    result: ResultadoVotacao[];
}

const acoesPadraoCompleta: Record<string, OpcaoComDado[]> = {
    "1": [
        {
            name: "Atacar com Katana", dados: [
                { name: "Teste", lados: 20, quantidade: 1, bonus: 5 },
                { name: "Dano", lados: 8, quantidade: 1, bonus: 3 }
            ]
        },
        {
            name: "Golpe Certeiro", dados: [
                { name: "Teste (2d20, vantagem)", lados: 20, quantidade: 2, bonus: 5 },
                { name: "Dano", lados: 8, quantidade: 1, bonus: 5 }
            ]
        },
        {
            name: "Mísseis Mágicos", dados: [
                { name: "Dano (acerto automático)", lados: 4, quantidade: 3, bonus: 3 }
            ]
        },
        {
            name: "Mãos Flamejantes", dados: [
                { name: "Dano (acerto automático)", lados: 6, quantidade: 3, bonus: 0 }
            ]
        },
        {
            name: "Recuperar o Fôlego", dados: [
                { name: "Cura", lados: 10, quantidade: 1, bonus: 3 }
            ]
        },
        {
            name: "Ajudar", dados: [
                { name: "Dado Padrão", lados: 20, quantidade: 1, bonus: 0 }
            ]
        },
        {
            name: "Usar Item", dados: [
                { name: "Dado Padrão", lados: 20, quantidade: 1, bonus: 0 }
            ]
        },
        {
            name: "Fugir", dados: [
                { name: "Dado Padrão", lados: 20, quantidade: 1, bonus: 0 }
            ]
        }
    ],

    "2": [
        {
            name: "Espada Curta", dados: [
                { name: "Teste", lados: 20, quantidade: 1, bonus: 5 },
                { name: "Dano", lados: 6, quantidade: 1, bonus: 3 }
            ]
        },
        {
            name: "Esconder-se", dados: [
                { name: "Teste", lados: 20, quantidade: 1, bonus: 7 }
            ]
        },
        {
            name: "Ataque Furtivo", dados: [
                { name: "Teste (2d20, vantagem)", lados: 20, quantidade: 2, bonus: 5 },
                { name: "Dano", lados: 6, quantidade: 3, bonus: 5 }
            ], infoExtra: "Só pode usar se estiver furtivo"
        },
        {
            name: "Ajudar", dados: [
                { name: "Dado Padrão", lados: 20, quantidade: 1, bonus: 0 }
            ]
        },
        {
            name: "Usar Item", dados: [
                { name: "Dado Padrão", lados: 20, quantidade: 1, bonus: 0 }
            ]
        },
        {
            name: "Fugir", dados: [
                { name: "Dado Padrão", lados: 20, quantidade: 1, bonus: 0 }
            ]
        }
    ],

    "3": [
        {
            name: "Espada", dados: [
                { name: "Teste", lados: 20, quantidade: 1, bonus: 5 },
                { name: "Dano", lados: 10, quantidade: 1, bonus: 5 }
            ]
        },
        {
            name: "Raio de Fogo", dados: [
                { name: "Teste", lados: 20, quantidade: 1, bonus: 4 },
                { name: "Dano", lados: 10, quantidade: 1, bonus: 0 }
            ]
        },
        {
            name: "Recuperar o Fôlego", dados: [
                { name: "Cura", lados: 10, quantidade: 1, bonus: 3 }
            ]
        },
        {
            name: "Ajudar", dados: [
                { name: "Dado Padrão", lados: 20, quantidade: 1, bonus: 0 }
            ]
        },
        {
            name: "Usar Item", dados: [
                { name: "Dado Padrão", lados: 20, quantidade: 1, bonus: 0 }
            ]
        },
        {
            name: "Fugir", dados: [
                { name: "Dado Padrão", lados: 20, quantidade: 1, bonus: 0 }
            ]
        }
    ]
};

export function VotacaoComDados() {
    const { id } = useParams();
    const [opcoes, setOpcoes] = useState<OpcaoComDado[]>([]);
    const [resultado, setResultado] = useState<VotacaoEstadoResponse | null>(null);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [acoesPadrao, setAcoesPadrao] = useState<OpcaoComDado[]>([]);
    const [mostrarModalAcoes, setMostrarModalAcoes] = useState(false);

    const abrirAcoesPadrao = () => {
        if (!id) return;
        const acoes = acoesPadraoCompleta[id];
        if (!acoes) {
            alert("Nenhuma ação padrão encontrada para este jogador!");
            return;
        }
        setAcoesPadrao(acoes);
        setMostrarModalAcoes(true);
    };

    const adicionarAcaoPadrao = (acao: OpcaoComDado) => {
        const novaAcao = JSON.parse(JSON.stringify(acao));
        setOpcoes((prev) => [...prev, novaAcao]);
        setMostrarModalAcoes(false);
    };

    const getNewDadoPadrao = (): DadoVotacao => ({
        name: "",
        lados: 0,
        quantidade: 1,
        bonus: 0,
    });

    const adicionarOpcao = () => {
        setOpcoes([...opcoes, { name: "", dados: [getNewDadoPadrao()] }]);
    };

    const removerOpcao = (index: number) => {
        const novasOpcoes = [...opcoes];
        novasOpcoes.splice(index, 1);
        setOpcoes(novasOpcoes);
    };

    const atualizarNomeOpcao = (index: number, valor: string) => {
        const novasOpcoes = [...opcoes];
        novasOpcoes[index].name = valor;
        setOpcoes(novasOpcoes);
    };

    const adicionarDadoAOpcao = (opcaoIndex: number) => {
        const novasOpcoes = [...opcoes];
        novasOpcoes[opcaoIndex].dados.push(getNewDadoPadrao());
        setOpcoes(novasOpcoes);
    };

    const removerDadoDaOpcao = (opcaoIndex: number, dadoIndex: number) => {
        const novasOpcoes = [...opcoes];
        novasOpcoes[opcaoIndex].dados.splice(dadoIndex, 1);
        setOpcoes(novasOpcoes);
    };

    const atualizarDadosOpcao = (opcaoIndex: number, dadoIndex: number, campo: keyof DadoVotacao, valor: number | string) => {
        const novasOpcoes = [...opcoes];
        const dadoParaAtualizar = novasOpcoes[opcaoIndex].dados[dadoIndex];
        if (campo === "name") {
            dadoParaAtualizar.name = valor as string;
        } else {
            (dadoParaAtualizar[campo] as number) = valor as number;
        }
        setOpcoes(novasOpcoes);
    };

    const criarVotacaoComDados = async () => {
        if (!id) return;
        const opcoesValidas = opcoes.filter((opcao) => {
            const todosOsDadosValidos = opcao.dados.every(
                (dado) => dado.name.trim() !== "" && dado.lados > 0 && dado.quantidade > 0
            );
            return opcao.name.trim() !== "" && todosOsDadosValidos;
        });

        if (opcoesValidas.length === 0) {
            alert("Adicione pelo menos uma opção com dados válidos!");
            return;
        }

        try {
            const data = { opcoes: opcoesValidas };
            await api.post(`/mestre/jogador/${id}/criaVotacaoComDado`, data);
            alert("Votação criada com sucesso!");
            setResultado(null);
            setMostrarResultado(false);
        } catch {
            alert("Erro ao criar votação");
        }
    };

    const verResultadoVotacao = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const resultado = await Votacao_Estado(id);
            setResultado(resultado);
            setMostrarResultado(true);
        } catch {
            alert("Erro ao buscar resultado da votação");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="tudo">
            <Header isMaster={true} />
            <section>
                <h1>Votação com Dados - Personagem {jogadores[Number(id) - 1]}</h1>
                <div className="votacao-config">
                    <h2>Configurar Opções com Dados</h2>
                    <button className="button add-option" onClick={adicionarOpcao}>Adicionar Opção</button>

                    <div id="dados-customizados">
                        {opcoes.map((opcao, opcaoIndex) => (
                            <div key={opcaoIndex} className="opcao-container">
                                <div className="opcao-header">
                                    <input
                                        type="text"
                                        placeholder="Nome da opção"
                                        value={opcao.name}
                                        onChange={(e) => atualizarNomeOpcao(opcaoIndex, e.target.value)}
                                        className="opcao-nome"
                                    />
                                    <div className="button-remover" onClick={() => removerOpcao(opcaoIndex)}>Remover Opção</div>
                                </div>

                                <div className="dados-config">
                                    {opcao.dados.map((dado, dadoIndex) => (
                                        <div key={dadoIndex} className="dado-inputs-row">
                                            <input
                                                type="text"
                                                placeholder="Nome do dado"
                                                value={dado.name}
                                                onChange={(e) => atualizarDadosOpcao(opcaoIndex, dadoIndex, "name", e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Lados"
                                                value={dado.lados}
                                                onChange={(e) => atualizarDadosOpcao(opcaoIndex, dadoIndex, "lados", parseInt(e.target.value) || 0)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Quantidade"
                                                value={dado.quantidade}
                                                onChange={(e) => atualizarDadosOpcao(opcaoIndex, dadoIndex, "quantidade", parseInt(e.target.value) || 1)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Bônus"
                                                value={dado.bonus}
                                                onChange={(e) => atualizarDadosOpcao(opcaoIndex, dadoIndex, "bonus", parseInt(e.target.value) || 0)}
                                            />
                                            <div className="button-remover" onClick={() => removerDadoDaOpcao(opcaoIndex, dadoIndex)}>Remover Dado</div>
                                        </div>
                                    ))}
                                    <div className="button" onClick={() => adicionarDadoAOpcao(opcaoIndex)}>Adicionar + Dado</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="controles-votacao">
                    <div className="button" onClick={abrirAcoesPadrao}>Ações Padrão</div>
                    <div className="button" onClick={criarVotacaoComDados}>Criar Votação ({opcoes.length} opções)</div>
                    <div className="button" onClick={verResultadoVotacao}>{loading ? "Carregando..." : "Ver Resultado"}</div>
                </div>

                {mostrarModalAcoes && (
                    <div className="modal">
                        <div className="modalVotacao">
                            <h2>Ações Padrão</h2>
                            {acoesPadrao.map((acao, i) => (
                                <div key={i} className="button" onClick={() => adicionarAcaoPadrao(acao)}>
                                    {acao.name} {acao.infoExtra ? `(${acao.infoExtra})` : ""}
                                </div>
                            ))}
                            <button className="button-remover" onClick={() => setMostrarModalAcoes(false)}>Fechar</button>
                        </div>
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}
