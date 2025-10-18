import { Ver_Votacao } from "../components/Dados";
import { Deposita_Votos } from "../components/Dados";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function AcoesPage() {
    const { id } = useParams();
    const [votacao, setVotacao] = useState<string[] | null>(null);
    
    const handleVerVotacao = async () => {
        if (!id) return;
        
        try {
            const resultado = await Ver_Votacao(id) as { opcoes?: string[] } | null;
            const opcoes = resultado?.opcoes ?? null;
            console.log("Resultado da votacao:", opcoes ?? "Nenhum resultado");
            setVotacao(opcoes);
        } catch (error) {
            console.error("Erro ao buscar votação:", error);
            setVotacao(null);
        }
    };

    return (
        <div id="tudo">
            <Header />
            <div className="button"onClick={handleVerVotacao}>Ver votacao</div>
            
            {votacao && votacao.length > 0 ? (
                votacao.map((opcao, index) => (
                    <div className="button" key={index} onClick={() => id != undefined ? Deposita_Votos(id, opcao) : null}>{opcao}</div>
                ))
            ) : (
                <div> <h2>Nenhuma votação encontrada, tente apertar o botão acima</h2> </div>
            )}
            <Footer />
        </div>
    )
}

export default AcoesPage;