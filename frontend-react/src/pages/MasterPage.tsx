import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Master(){
    const navigate = useNavigate();
    const { id } = useParams();

    const handleClickDados = () => {
        navigate(`/master/${id}/dados`);
    }

    const handleClickVota = () => {
        navigate(`/master/${id}/criar-votacao`)
    }

    return (
        <div id="tudo">
            <Header isMaster={true} />
            <h1>Mestre - Jogador {id}</h1>
            <section>
                <div>
                    <form action="">
                        <button className="button" id="btnRolagem" onClick={handleClickDados}>Rolagem de dados</button>
                    </form>
                    <form action="">
                        <button className="button" id="btnEscolhas" onClick={handleClickVota}>Criar Votação</button>
                    </form>
                </div>   
            </section>
            <Footer />
        </div>
    )
}