import { Ver_Votacao } from "../components/Dados";
import { useParams } from "react-router-dom";

function AcoesPage() {
    const { id } = useParams();
    return (
        <div onClick={() => id == undefined ? null: Ver_Votacao(id)}>Ver votacao</div>
    )
}