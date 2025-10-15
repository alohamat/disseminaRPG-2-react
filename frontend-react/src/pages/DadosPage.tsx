import { D6 } from "../components/Dados"
import { D10_1 } from "../components/Dados"
import { D10_2 } from "../components/Dados"

import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export function Dados(){
    return(
        <div id="tudo">
            <Header />
            <section>
                <D6 />
                <D10_1 />
                <D10_2 />
            </section>
            <Footer />
        </div>
    )
}