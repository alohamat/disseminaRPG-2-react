type CharProps = {
    CharNumber: string;
}

export default function Char( { CharNumber } : CharProps) {
    return (
        <form action="">
            <button>
                Jogador {CharNumber}
            </button>
        </form>
    )
}