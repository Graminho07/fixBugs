import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type Member = {
  id: string;
  name: string;
};

type Team = {
  teamId: string;
  name: string;
  members: Member[];
};

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    setIsAdmin(true);

    fetch("http://localhost:5000/teams", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar equipes");
        const data = await res.json();
        setTeams(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar equipes:", err);
      });
  }, [navigate]);

  if (!isAdmin) return null;

  return (
    <div>
      <h2>Minhas Equipes</h2>
      {teams.length === 0 ? (
        <p>Nenhuma equipe encontrada.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team.teamId}>
              <strong>
                <Link to={`/team/${team.teamId}`}>{team.name}</Link>
              </strong>{" "}
              (ID: {team.teamId}) — Membros:{" "}
              {Array.isArray(team.members) && team.members.length > 0
                ? team.members.map((member) => member.name).join(", ")
                : "Nenhum membro"}
            </li>
          ))}
        </ul>
      )}
      <Link to="/dashboard">Voltar ao Dashboard</Link>
    </div>
  );
}
