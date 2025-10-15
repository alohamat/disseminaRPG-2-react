import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import Char from "../components/CharButtons"

export function Login(){
    return(
        <div id="tudo">
            <Header /> 
            <section>
                <h1>Escolha seu jogador</h1>
                <Char CharNumber="1"></Char>
                <Char CharNumber="2"></Char>
                <Char CharNumber="3"></Char>
            </section>
            <Footer />
        </div>
    )
}
