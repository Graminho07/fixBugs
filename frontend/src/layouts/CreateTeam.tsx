import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CreateTeam() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        members: "",
    });

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
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/createTeam", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Erro ao criar equipe");
            }

            const newTeam = await res.json();
            const teamId = newTeam.teamId;

            alert(`✅ Equipe criado com sucesso! Acesse em: http://localhost:5000/team/${teamId}`);

            navigate(`/team/${teamId}`);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Ocorreu um erro inesperado";
            alert("❌ Erro: " + message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Criar Equipe</h2>
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
            <button type="submit">Criar Equipe</button>
            <Link to="/dashboard">Voltar ao Dashboard</Link>
        </form>
    );
}