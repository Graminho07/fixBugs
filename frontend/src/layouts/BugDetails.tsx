import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Bug = {
  bugId: number;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  assignedToUser?: { email: string } | null;
  assignedToTeam: { _id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
};

export default function BugDetails() {
  const { bugId } = useParams();
  const [bug, setBug] = useState<Bug | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/deleteBug/${bugId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id: bugId }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erro ao deletar bug");
      }
      alert("Bug deletado com sucesso!");
      window.location.href = "/bugs";
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido");
    }
  };

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const res = await fetch(`http://localhost:5000/bug/${bugId}`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Bug não encontrado");
        }
        const data: Bug = await res.json();
        setBug(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchBug();
  }, [bugId]);

  if (loading) return <p>🔄 Carregando...</p>;
  if (error) return <p>❌ Erro: {error}</p>;
  if (!bug) return <p>❓ Bug não encontrado</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🐞 Bug #{bug.bugId}</h2>
      <p><strong>Título:</strong> {bug.title}</p>
      <p><strong>Descrição:</strong> {bug.description}</p>
      <p><strong>Status:</strong> {bug.status}</p>
      <p><strong>Prioridade:</strong> {bug.priority}</p>
      <p><strong>Atribuído a:</strong>{" "} {bug.assignedToUser ? bug.assignedToUser.email : "Ninguém"}</p>
      <p>
        <strong>Atribuído à equipe:</strong>{" "}
        {bug.assignedToTeam ? bug.assignedToTeam.name : "Nenhuma"}
      </p>

      <Link to={`/bug/${bug.bugId}/edit`}>
        <button style={{ margin: "1rem 0", padding: "0.5rem 1rem" }}>
          ✏️ Editar Bug
        </button>
      </Link>
      <br />
        <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
          🗑️ Deletar Bug
        </button>
      <br></br>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}
