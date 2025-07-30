import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Member = {
    name: string;
    email: string;
};

type Team = {
  teamId: number;
  name: string;
  description: string;
  members: Member[];
  createdAt: string;
  updatedAt: string;
};

export default function TeamEditor() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        members: [],
    });

    const navigate = useNavigate();
    const { teamId } = useParams();
    const [team, setTeam] = useState<Team | null >(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const res = await fetch(`http://localhost:5000/team/${teamId}/edit`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.mesage || "Erro ao editar equipe");
            }
            
            const updatedTeam = await res.json();

            navigate(`/team/${updatedTeam.teamId}`);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Ocorreu um erro inesperado";
                alert("❌ Erro: " + message);
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
                const data = await res.json();
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

    return(
       <div style={{ padding: "1rem" }}>
        <h2>🐞 Editar Equipe #{team.teamId}</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nome da Equipe"
                value={form.name}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Descrição da Equipe"
                value={form.description}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="members"
                placeholder="Membros (separados por vírgula)"
                value={form.members}
                onChange={handleChange}
            />
            <button type="submit">Atualizar equipe</button>
            <Link to="/dashboard">Voltar ao Dashboard</Link>
        </form>
        <Link to={`/team/${team.teamId}`}>Voltar aos detalhes da Equipe</Link>
       </div>
    )
}