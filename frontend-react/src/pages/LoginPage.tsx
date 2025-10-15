import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { CharButtons } from "../components/LoginButtons"

export function Login(){
    return(
        <div id="tudo">
            <Header /> 
            <section>
                <h1>Escolha seu jogador</h1>
                <CharButtons CharNumber="1"/>
                <CharButtons CharNumber="2"/>
                <CharButtons CharNumber="3"/>
            </section>
            <Footer />
        </div>
    )
}
