import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Team } from "../types/Team";

export default function TeamDetails() {
  const { teamId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!teamId) return;

    try {
      const res = await fetch(`http://localhost:5000/deleteTeam/${teamId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erro ao deletar equipe");
      }
      alert("Equipe deletada com sucesso!");
      window.location.href = "/teams";
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido");
    }
  };

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`http://localhost:5000/team/${teamId}`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Equipe não encontrada");
        }
        const data: Team = await res.json();
        setTeam(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  if (loading) return <p>🔄 Carregando...</p>;
  if (error) return <p>❌ Erro: {error}</p>;
  if (!team) return <p>❓ Equipe não encontrada</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>👥 Equipe #{team.teamId}</h2>
      <p><strong>Nome:</strong> {team.name}</p>
      <p><strong>Descrição:</strong> {team.description}</p>
      <p><strong>Membros:</strong> {team.members.length > 0 ? team.members.map((m) => m.name).join(", ") : "Nenhum membro"}</p>
      <p><strong>Bugs:</strong> {team.assignedBugs.length > 0 ? team.assignedBugs.map((m) => m.bugId).join(", "): "Nenhum bug"}</p>

      <Link to={`/team/${team.teamId}/edit`}><button>Editar equipe</button></Link>
      <br />
      <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
        🗑️ Deletar Equipe
      </button>
      <br />
      <Link to="/dashboard">Voltar ao Dashboard</Link>
      <br />
      <Link to="/teams">Voltar às minhas equipes</Link>
    </div>
  );
}