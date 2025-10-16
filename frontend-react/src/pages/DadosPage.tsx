
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useParams } from "react-router-dom";

import { Reseta_dados } from "../components/Dados";
import { Ver_Votacao } from "../components/Dados";

export function Dados(){
    const { id } = useParams();
    const janelaAtual = window.location.href;
    console.log(janelaAtual);
    return(
        <div id="tudo">
            <Header />
            <section>
                {janelaAtual.includes("player") ? (
                    <div>
                        <div className="button" >Rolar Todos os dados</div>
                        <div className="button" onClick={() => id == undefined}>Exibir Resultado dos dados</div>
                    </div>
                ) : 
                <div className="button" onClick={() => id == undefined ? null: Reseta_dados(id)}>Liberar rolagem</div>
                }
            </section>
            <Footer />  
        </div>
    )
}