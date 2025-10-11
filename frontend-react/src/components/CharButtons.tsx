import { useNavigate } from 'react-router-dom';

type CharProps = {
    CharNumber: string;
}

export default function Char( { CharNumber } : CharProps) {
    const nav = useNavigate();

    const handleClick = async () => {
        try {
            const res = await fetch(`https://dissemina-iff-backend.vercel.app/api/jogador/jogador${CharNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jogador: CharNumber })
            });

            if (!res.ok) {
                throw new Error('Erro ao buscar jogador');
            }

            nav(`/jogador/jogador${CharNumber}`)
        } catch (error) {
            console.log("Erro na conexão com o servidor.", error);
        }
    }

    return (
        <div>
            <button onClick={handleClick}>
                Jogador {CharNumber}
            </button>
        </div>
    )
}