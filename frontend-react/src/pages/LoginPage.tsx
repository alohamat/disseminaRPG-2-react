import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { CharButtons } from "../components/LoginButtons"
import { useState } from "react";

export function Login(){
    const [clicou1, setClicou1] = useState<boolean>(false);
    const [clicou2, setClicou2] = useState<boolean>(false);
    const [clicou3, setClicou3] = useState<boolean>(false);
    return(
        <div id="tudo">
            <Header /> 
            <section className="login_page">
                <h1>Escolha seu jogador</h1>
                <div className="char_buttons">
                    {clicou1 && 
                       (
                        <div className="modal">
                           <button className="button" id="close" onClick={() => setClicou1(false)}>x</button>
                           <CharButtons CharNumber={1}/>
                        </div>
                       )
                }
                       <div>
                        <button className="button" onClick={() => setClicou1(true)}>Zenchi</button>
                       </div>

{clicou2 && 
                       (
                        <div className="modal">
                           <button className="button" id="close" onClick={() => setClicou2(false)}>x</button>
                           <CharButtons CharNumber={2}/>
                        </div>
                       )
                }

                       <div>
                        <button className="button" onClick={() => setClicou2(true)}>Atnos</button>
                    </div>
{clicou3 && 
                       (
                        <div className="modal">
                           <button className="button" id="close" onClick={() => setClicou3(false)}>x</button>
                           <CharButtons CharNumber={3}/>
                        </div>
                       )
                }
                       <div>
                        <button className="button" onClick={() => setClicou3(true)}>Sam</button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
