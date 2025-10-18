import { Ver_Votacao } from "../components/Dados";
import { Deposita_Votos } from "../components/Dados";
import { useParams } from "react-router-dom";
import { useState } from "react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function AcoesPage() {
    const { id } = useParams();
    const [votacao, setVotacao] = useState<string[] | null>(null);
    const [podeVotar, setPodeVotar] = useState<boolean>(true);
    const [votoComputado, setVotoComputado] = useState<boolean>(false);
    
    const handleVerVotacao = async () => {
        if (!id) return;
        
        try {
            const resultado = await Ver_Votacao(id) as { opcoes?: string[] } | null;
            const opcoes = resultado?.opcoes ?? null;
            console.log("Resultado da votacao:", opcoes ?? "Nenhum resultado");
            setVotacao(opcoes);
            // Reseta o estado de voto quando busca novas opções
            setPodeVotar(true);
            setVotoComputado(false);
        } catch (error) {
            console.error("Erro ao buscar votação:", error);
            setVotacao(null);
        }
    };

    const handleVotar = async (opcao: string) => {
        if (!id || !podeVotar || votoComputado) return;
        
        try {
            setPodeVotar(false);
            await Deposita_Votos(id, opcao);
            setVotoComputado(true);
            console.log(`Voto computado para: ${opcao}`);
        } catch (error) {
            console.error("Erro ao votar:", error);
            setPodeVotar(true); 
        }
    };

    return (
        <div id="tudo">
            <Header />
            <div className="button" onClick={handleVerVotacao}>
                Ver votacao
            </div>
            
            {votacao && votacao.length > 0 ? (
                <div>
                    {votoComputado && (
                        <div style={{color: 'green', fontWeight: 'bold', margin: '10px 0'}}>
                            ✅ Voto computado com sucesso!
                        </div>
                    )}
                    
                    {votacao.map((opcao, index) => (
                        <div 
                            className={podeVotar && !votoComputado ? "button" : "buttonindisponivel"} 
                            key={index} 
                            onClick={() => handleVotar(opcao)}
                        >
                            {opcao}
                            {!podeVotar && ""}
                        </div>
                    ))}
                </div>
            ) : (
                <div> 
                    <h2>Nenhuma votação encontrada, tente apertar o botão acima</h2> 
                </div>
            )}
            <Footer />
        </div>
    )
}

export default AcoesPage;