import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CreateBug() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
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
      const res = await fetch("http://localhost:5000/createBug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erro ao criar bug");
      }

      alert("✅ Bug criado com sucesso!");
      navigate("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ocorreu um erro inesperado";
      alert("❌ Erro: " + message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Bug</h2>
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Descrição"
        value={form.description}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="open">Aberto</option>
        <option value="in-progress">Em Progresso</option>
        <option value="closed">Fechado</option>
      </select>
      <button type="submit">Criar Bug</button>
      <Link to="/dashboard">Voltar ao Dashboard</Link>
    </form>
  );
}
