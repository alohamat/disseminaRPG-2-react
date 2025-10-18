import { useNavigate } from "react-router-dom"

type CharProps = {
    CharNumber: number;
}
type MasterProps = {
    MasterNumber: number;
}
const jogadores: string[] = ["Zenchi", "Atnos", "Sam"];

export function CharButtons( { CharNumber } : CharProps) {
    console.log("Jogadores:", jogadores);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/player/${CharNumber}`);
    }
    return (
        <div>
            <fieldset>
                <legend> Jogador {CharNumber} </legend>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <button onClick={handleClick}>
                        <span>{jogadores[CharNumber - 1]}</span>
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