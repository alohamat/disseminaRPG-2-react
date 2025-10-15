import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CreateVoting } from "../components/Voting";
import { useParams } from "react-router-dom";

export function VotingPage(){
    const { id } = useParams();

    return(
        <div id="tudo">
            <Header />
            <h1>Criar Votação - Jogador {id}</h1>
            <section>
                <CreateVoting />
            </section>
            <Footer />
        </div>
    )
}