import { Header } from "../components/Header"
import Char from "../components/CharButtons"

export function Login(){
    return(
        <div id="tudo">
            <Header />
            <section>
                <Char CharNumber="1"/>
                <Char CharNumber="2"/>
                <Char CharNumber="3"/>
            </section>
        </div>
    )
}
