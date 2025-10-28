import { useNavigate } from "react-router-dom"
import Atnos from "../assets/Atnos.jpg"
import Sam from "../assets/sam.jpg"
import Zenchi from "../assets/zenchi.jpg"


type CharProps = {
    CharNumber: number;
}
type MasterProps = {
    MasterNumber: number;
}
export const jogadores: string[] = ["Zenchi", "Atnos", "Sam"];
const imagens: string[] = [Zenchi, Atnos, Sam];
const descricoes: string[] = [
"Um jovem espadachim e aprendiz de feiticeiro. Ele é extrovertido e engraçado, gosta de festas e aventuras, mas não foge de uma boa luta.",
"23 anos,  bem sarcástico, muito confiante,  faz piada com tudo na maior parte do tempo tá de bom humor.",
"Cerca de 30 anos, baixo, mais calmo e reservado. Costuma agir mais escondido do que os outros."

]

export function CharButtons( { CharNumber } : CharProps) {
    // console.log("Jogadores:", jogadores);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/player/${CharNumber}`);
    }
    return (
        <div className="card_jogador">
            <fieldset >
                <div style={{display: "flex"}}>
                <img src={imagens[CharNumber - 1]} alt="" />
                <h2>{descricoes[CharNumber - 1]}</h2>
                </div>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <button onClick={handleClick}>
                        <span>Jogar com {jogadores[CharNumber - 1]}</span>
                    </button>
                </form>
            </fieldset>
        </div>
    )
}

export function MasterButtons( { MasterNumber } : MasterProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/master/${MasterNumber}`);
    }
    return (
        <div>
            <fieldset>
                <legend> Jogador {MasterNumber} </legend>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <button onClick={handleClick}>
                        <span>Mestre do {jogadores[MasterNumber - 1]}</span>
                    </button>
                </form>
            </fieldset>
        </div>
    )
}