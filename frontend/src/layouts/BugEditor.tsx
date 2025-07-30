import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Bug = {
    bugId: number;
    title: string;
    description: string;
    status: "open" | "in-progress" | "resolved" | "closed";
    priority: "low" | "medium" | "high";
    assignedTo?: string;
    createdAt: string;
    updatedAt: string;
};

export default function BugEditor() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "open",
        priority: "medium",
        assignedTo: "",
    });

    const navigate = useNavigate();
    const { bugId } = useParams();
    const [bug, setBug] = useState<Bug | null>(null);
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
        try {
            const res = await fetch(`http://localhost:5000/bug/${bugId}/edit`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Erro ao editar bug");
            }

            const updatedBug = await res.json();

            navigate(`/bug/${updatedBug.bugId}`);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Ocorreu um erro inesperado";
            alert("❌ Erro: " + message);
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
                const data = await res.json();
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
            <h2>🐞 Editar Bug #{bug.bugId}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Novo título"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Nova descrição"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <select name="status" value={form.status} onChange={handleChange}>
                    <option value="open">Aberto</option>
                    <option value="in-progress">Em Progresso</option>
                    <option value="closed">Fechado</option>
                </select>
                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    required
                >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                </select>
                <input
                    type="text"
                    name="assignedTo"
                    placeholder="Para:"
                    value={form.assignedTo}
                    onChange={handleChange}
                />
                <button type="submit">Atualizar Bug</button>
                <Link to="/dashboard">Voltar ao Dashboard</Link>
            </form>
            <Link to={`/bug/${bug.bugId}`}>Voltar aos detalhes do Bug</Link>
        </div>
    );
}