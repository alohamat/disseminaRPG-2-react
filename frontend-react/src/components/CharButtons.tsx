import { useNavigate } from 'react-router-dom';

type CharProps = {
    CharPlayer: string;
}

export default function Char( { CharPlayer } : CharProps) {
    const nav = useNavigate();

    const handleClick = async () => {
        try {
            const res = await fetch(`https://dissemina-iff-backend.vercel.app/api/jogador/${CharPlayer}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                throw new Error('Erro ao buscar jogador');
            }

            nav(`/jogador/${CharPlayer}`)
        } catch (error) {
            console.log("Erro na conexão com o servidor.", error);
        }
    }

    return (
        <div>
            <button onClick={handleClick}>
                {CharPlayer}
            </button>
        </div>
    )
}