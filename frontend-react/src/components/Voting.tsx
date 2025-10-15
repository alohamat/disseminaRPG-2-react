import { useState } from "react";

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
        <section>
            <h1>Criar Votação</h1>
            <form onSubmit={criaVotacao}>
                <button id="criaOpcao" onClick={criaOpcao}>Criar Opção</button>
                <div id="opcoes">
                    {opcoes.map((opcao, index) => (
                        <div key={index}>
                            <input type="text" name="opcao[]" placeholder="Digite uma opção" value={opcao} onChange={(e) => mudaOpcao(index, e.target.value)} />
                            <button id="btnDeleteOption" onClick={() => removeOpcao(index)}>Remover opção</button>
                        </div>
                    ))}
                </div>
                <button type="submit">Criar Votação</button>
            </form>
        </section>
    )
}