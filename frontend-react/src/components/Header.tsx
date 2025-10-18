import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <header onClick={() => navigate("/login")}>
        <span className="material-symbols-outlined" id="btnVoltar">home</span>
        <h3>
        Dissemina-IFF RPGzão 2
        </h3>
        <h3></h3>
      </header>
    </div>
  );
}
