import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MasterButtons } from "../components/LoginButtons";

export function LoginMaster(){
    return(
        <div id="tudo">
            <Header />
            <section className="login_page">
                <h1>Escolha seu Jogador</h1>
                <h2>Você está na página de Mestre!</h2>
                <div className="char_buttons">
                    <MasterButtons MasterNumber="1" />
                    <MasterButtons MasterNumber="2" />
                    <MasterButtons MasterNumber="3" />
                </div>
            </section>
            <Footer />
        </div>
    )
}