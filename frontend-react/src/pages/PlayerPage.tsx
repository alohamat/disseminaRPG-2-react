import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useParams } from "react-router-dom"
import { api } from "../services/ApiService";
import { useState } from "react";

interface dadosPlayer {
    resultado: {
        D6: number,
        D10_1: number,
        D10_2: number
    },
    resolucao: string;
}

export function Player(){
    const { id } = useParams();
    const [dados, setDados] = useState<dadosPlayer>();

    const handleClickDados = async (e: any) => {
        e.preventDefault()
        try {
          const res = await api.post(`jogador/jogador${id}/full`);
          const data = res.data
            setDados(data)
        console.log(data)
        } catch (err: any) {
          console.error("erro: ", err.data)
        }
      }

    return (
        <div id="tudo">
            <Header />
            <section>
                <h1>Jogador {id}</h1>
                <form action="">
                    <button id="btnRolagem" className="button" onClick={handleClickDados}>Rolar dado</button>
                </form>
                <form action="">
                    <button id="btnEscolhas" className="button">Escolher ação</button>
                </form>
                <div id="modal">
                    <div className="result">
                        <h1>Dado de Ação: {dados?.resultado.D6} </h1>
                        <h1>Dado de desafio 1: {dados?.resultado.D10_1}</h1>
                        <h1>Dado de Desafio 2: {dados?.resultado.D10_2}</h1>
                        <h1>Resolução: {dados?.resolucao}</h1>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}