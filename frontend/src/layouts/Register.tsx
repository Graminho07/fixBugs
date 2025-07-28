import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/RegisterStyle.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/registerUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erro no cadastro");
      }

      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ocorreu um erro inesperado";
      alert("❌ Erro: " + message);
    }
  };

    return (
    <div className="body">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="radio"
            name="role"
            value="developer"
            checked={form.role === "developer"}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          Dev
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="admin"
            checked={form.role === "admin"}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          Admin
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="tester"
            checked={form.role === "tester"}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          Tester
        </label>
        <button type="submit">Cadastrar</button>
        <p className="link">
          <Link to="/login">Já tem uma conta? Faça Login!</Link>
        </p>
      </form>
    </div>
  );
}
