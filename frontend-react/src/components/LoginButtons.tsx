import { useNavigate } from "react-router-dom"
import Atnos from "../assets/Atnos.jpg"


type CharProps = {
    CharNumber: number;
}
type MasterProps = {
    MasterNumber: number;
}
const jogadores: string[] = ["Zenchi", "Atnos", "Sam"];

export function CharButtons( { CharNumber } : CharProps) {
    // console.log("Jogadores:", jogadores);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/player/${CharNumber}`);
    }
    return (
        <div className="card_jogador">
            <fieldset>

                <img src={Atnos} alt="" />
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