import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

type HeaderProps = {
  isMaster?: boolean
}

export function Header({isMaster = false}: HeaderProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  
  const handleClick = () => {
    if (!id) {
      console.log("Usuário não identificado")
    } else {
      if (isMaster) {
        navigate(`/master/${id}`);
      } else {
        navigate(`/player/${id}`);
      }
    }
  }

  return (
    <div>
      <header onClick={handleClick}>
        <span className="material-symbols-outlined" id="btnVoltar" role="button" aria-label="Voltar para o inicio">home</span>
        <h3>
        Dissemina-IFF RPGzão 2
        </h3>
        <h3></h3>
      </header>
    </div>
  );
}
