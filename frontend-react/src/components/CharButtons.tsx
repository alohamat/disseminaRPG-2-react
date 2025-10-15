import { useNavigate } from "react-router-dom"

type CharProps = {
    CharNumber: string;
}

export default function Char( { CharNumber } : CharProps) {
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