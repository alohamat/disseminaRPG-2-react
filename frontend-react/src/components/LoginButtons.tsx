import { useNavigate } from "react-router-dom"

type CharProps = {
    CharNumber: string;
}
type MasterProps = {
    MasterNumber: string;
}

export function CharButtons( { CharNumber } : CharProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/player/${CharNumber}`);
    }
    return (
        <form action="" onSubmit={(e) => e.preventDefault()}>
            <button onClick={handleClick}>
                Jogador {CharNumber}
            </button>
        </form>
    )
}

export function MasterButtons( { MasterNumber } : MasterProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/master/${MasterNumber}`);
    }
    return (
        <form action="" onSubmit={(e) => e.preventDefault()}>
            <button onClick={handleClick}>
                Jogador {MasterNumber}
            </button>
        </form>
    )
}