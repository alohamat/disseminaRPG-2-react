import { Header } from '../components/Header';
import sixSeven from "../assets/six-seven.gif";

export function SixSevenPlayerPage() {
    return (
        <div>
            <Header />
            <div id="tudo">
                <h1>Olá, você estava tão ansioso que chegou no Easter Egg do nosso dissemina, aproveite para relaxar um pouco aqui.</h1>
                <iframe src={sixSeven} frameborder="0"></iframe>
            </div>
        </div>
    )
}