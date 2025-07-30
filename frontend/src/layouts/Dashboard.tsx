import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserRole } from "./../utils/auth"; 
import { Link } from "react-router-dom";

export default function Dashboard() {
  const role = getUserRole();

  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {role === "admin" && (
        <Link to="/createTeam">
          <button style={{ margin: "1rem 0", padding: "0.5rem 1rem" }}>
            ➕ Criar Equipe
          </button>
        </Link>
      )}
 
      {role === "admin" && (
        <Link to="/teams">
          <button style={{ margin: "1rem 0", padding: "0.5rem 1rem" }}>
            Listar minhas equipes
          </button>
        </Link>
      )}

      <p>Bem-vindo ao Dashboard!</p>
      <Link to="/createBug">
        <button style={{ margin: "1rem 0", padding: "0.5rem 1rem" }}>
          ➕ Criar Bug
        </button>
      </Link>
      <br></br>
      <Link to="/bugs">
        <button style={{ margin: "1rem 0", padding: "0.5rem 1rem" }}>
          Listar bugs
        </button>
      </Link>
      <br></br>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
