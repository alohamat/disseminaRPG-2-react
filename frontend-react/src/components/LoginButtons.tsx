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
        <div>
            <fieldset>
                <legend> Jogador {CharNumber} </legend>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <button onClick={handleClick}>
                        <img src="" alt="Player1" />
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
                        <img src="" alt="Player1" />
                    </button>
                </form>
            </fieldset>
        </div>
    )
}