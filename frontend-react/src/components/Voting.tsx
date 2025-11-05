import { useState } from "react"

//função pra criar as votações para o público
export function CreateVoting(){
    const [opcoes, setOpcoes] = useState<string[]>([])

    const criaOpcao = () => {
        setOpcoes([...opcoes, ""]);
    }

    const removeOpcao = (index: number) => {
        const novasOpcoes = [...opcoes];
        novasOpcoes.splice(index, 1);
        setOpcoes(novasOpcoes);
    }
    
    const mudaOpcao = (index: number, valor: string) => {
        const novasOpcoes = [...opcoes];
        novasOpcoes[index] = valor;
        setOpcoes(novasOpcoes);
    }

    const criaVotacao = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Votação criada");
    }
    return(
        <section id="ExibirOpcoes">
            <form onSubmit={criaVotacao}>
                <button id="criaOpcao" onClick={criaOpcao}>Criar Opção</button>
                <div id="opcoes">
                    {opcoes.map((opcao, index) => (
                        <div key={index}>
                            <input type="text" name="opcao[]" placeholder="Digite uma opção" value={opcao} onChange={(e) => mudaOpcao(index, e.target.value)} />
                            <button id="btnDeleteOpcao" onClick={() => removeOpcao(index)}>X</button>
                        </div>
                    ))}
                </div>
                <button type="submit">Criar Votação</button>
            </form>
        </section>
    )
}