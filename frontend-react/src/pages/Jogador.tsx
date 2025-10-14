import { Header } from "../components/Header"
import { useParams, useNavigate } from "react-router-dom"

export default function Jogador() {
    const { jogador } = useParams()
    const nav = useNavigate()
    const FazerRolagem = async () => {
        const res = await fetch(`https://dissemina-iff-backend.vercel.app/api/jogador/${jogador}/full`)
        if (!res.ok) throw new Error("Deu erro aqui parcero, te vira aí")
        nav(`/jogador/:${jogador}/`)
    }
    return (
        <div id="tudo">
            <Header />
            <section>
                <button onClick={FazerRolagem}>Fazer Rolagem</button>
                <button>Escolher Ação</button>
            </section>
        </div>
    )
}