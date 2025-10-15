import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CreateVoting } from "../components/Voting";

export function VotingPage(){
    return(
        <div id="tudo">
            <Header />
            <section>
                <CreateVoting />
            </section>
            <Footer />
        </div>
    )
}