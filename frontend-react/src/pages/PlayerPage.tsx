import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export function Player(){
    const navigate = useNavigate();
    const { id } = useParams();
    const handleClick = () => {
        navigate(`/player/${id}/dados`);
    }
    return (
        <div id="tudo">
            <Header />
            <section>
                <h1>Jogador {id}</h1>
                <form action="">
                    <button id="btnRolagem" onClick={handleClick}>Rolar dado</button>
                </form>
                <form action="">
                    <button id="btnEscolhas">Escolher ação</button>
                </form>
            </section>
            <Footer />
        </div>
    )
}