import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useParams } from "react-router-dom"
import { Rolar_todos } from "../components/Dados"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

interface DadosResultado {
    rolagem_atual: string
}

export function Player(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [dados, setDados] = useState<DadosResultado>();
    const [erro, setErro] = useState<string | null>(null);

    const handleClickDados = async (e: any) => {
        e.preventDefault()
        try {
            const res = await Rolar_todos(id!);
            setDados(res.resultado_acao);
            setErro(null);
        } catch (err: any) {
            setErro(err.message);
            setDados(undefined);
        }
      }

    return (
        <div id="tudo">
            <Header />
            <section>
                <h1>Jogador {id}</h1>
                <form action="">
                        <button id="btnRolagem" className="button" onClick={handleClickDados} >Rolar dado</button>
                </form>
                <form action="">
                    <button id="btnEscolhas" className="button" onClick={() => navigate(`/player/${id}/acoes`)}>Escolher ação</button>
                </form>
                {erro && (<h2>{erro}</h2>)}
                {dados && (
                    <div id="modal">
                    <div className="result">
                            <h2>Você rolou um {dados?.rolagem_atual}!</h2>
                    </div>
                </div>
                )}
            </section>
            <Footer />
        </div>
    )
}