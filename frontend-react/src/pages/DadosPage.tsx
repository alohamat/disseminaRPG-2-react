
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useParams } from "react-router-dom";
import { Player_Full } from "../components/Dados";
import { Reseta_dados } from "../components/Dados";

export function Dados(){
    const { id } = useParams();
    const janelaAtual = window.location.href;
    console.log(janelaAtual);
    return(
        <div id="tudo">
            <Header />
            <section>
                {janelaAtual.includes("player") ? (
               <div onClick={() => id == undefined ? null: Player_Full(id)}>Rolar Todos os dados</div>
                ) : 
                <div onClick={() => id == undefined ? null: Reseta_dados(id)}>Liberar rolagem</div>
                }
            </section>
            <Footer />
        </div>
    )
}