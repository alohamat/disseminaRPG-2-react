import { Header } from "../components/Header"
import Char from "../components/CharButtons"

export function Login(){
    return(
        <div id="tudo">
            <Header />
            <section>
                <Char CharPlayer="jogador1"/>
                <Char CharPlayer="jogador2"/>
                <Char CharPlayer="jogador3"/>
            </section>
        </div>
    )
}
