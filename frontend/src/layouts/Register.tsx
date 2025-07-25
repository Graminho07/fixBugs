import { useState } from "react";

export default function Register() {
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

      const data = await res.json();
      alert("✅ Usuário cadastrado com sucesso!");
      console.log(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ocorreu um erro inesperado";
      alert("❌ Erro: " + message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
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
          type="checkbox"
          name="role"
          value="dev"
          checked={form.role === "dev"}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        Dev
      </label>

      <label>
        <input
          type="checkbox"
          name="role"
          value="admin"
          checked={form.role === "admin"}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        Admin
      </label>

      <label>
        <input
          type="checkbox"
          name="role"
          value="tester"
          checked={form.role === "tester"}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        Tester
      </label>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
