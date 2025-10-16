import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams } from "react-router-dom";
import { Cria_Votacao } from "../components/Dados";
import { Espera_Votacao } from "../components/Dados";
import { Votacao_Estado } from "../components/Dados";

export function VotingPage(){
    const { id } = useParams();

    return(
        <div id="tudo">
            <Header />
            <h1>Criar Votação - Jogador {id}</h1>
            <section>
                <div onClick={() => id == undefined ? null: Cria_Votacao(id)}>Criar votacao</div>
                <div onClick={() => id == undefined ? null: Espera_Votacao(id, ["teste1", "teste2"])}>Criar opcao</div>
                <div onClick={() => id == undefined ? null: Votacao_Estado(id)}>Votacao estado</div>
            </section>
            <Footer />
        </div>
    )
}