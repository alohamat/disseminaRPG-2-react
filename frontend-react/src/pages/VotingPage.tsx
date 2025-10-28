import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";

export function VotingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div id="tudo">
      <Header isMaster={true} />
      <section>
        <h1>Escolher Tipo de Votação - Personagem {id}</h1>
        
        <div className="conteudo">
          <div className="opcao-tipo">
            <h2>Votação Normal</h2>
            <p>Os jogadores votam apenas escolhendo entre opções de texto.</p>
            <div 
              className="button" 
              onClick={() => navigate(`/votacao-normal/${id}`)}
              style={{justifySelf: "center"}}
            >
              Criar Votação Normal
            </div>
          </div>

          <div className="opcao-tipo">
            <h2>Votação com Dados</h2>
            <p>Cada opção tem um dado associado que é rolado quando o jogador vota.</p>
            <div 
              className="button" 
              onClick={() => navigate(`/votacao-dados/${id}`)}
              style={{justifySelf: "center"}}
            >
              Criar Votação com Dados
            </div>
          </div>
        </div>

        <div className="button" onClick={() => navigate(`/mestre/${id}`)}>
          Voltar ao Painel do Mestre
        </div>
      </section>
      <Footer />
    </div>
  );
}