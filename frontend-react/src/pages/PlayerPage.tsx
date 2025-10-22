import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useParams } from "react-router-dom"
import { Rolar_todos } from "../components/Dados"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

interface DadosResultado {
    dado_acao: number;
  }

export function Player(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [dados, setDados] = useState<DadosResultado>();

    const handleClickDados = async (e: any) => {
        e.preventDefault()
        const res = await Rolar_todos(id!);
        setDados(res.resultado);
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
                {dados && (
                    <div id="modal">
                    <div className="result">
                        <h1>Você rolou um {dados?.dado_acao}!</h1>
                    </div>
                </div>
                )}
            </section>
            <Footer />
        </div>
    )
}