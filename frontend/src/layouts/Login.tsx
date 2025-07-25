import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      localStorage.setItem("isLoggedIn", "false");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao fazer login.");
      }

      const data: LoginResponse = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");
      alert("✅ Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Erro inesperado no login";
      alert("❌ " + msg);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <Link to="/register">Ainda não tem uma conta? Cadastre-se!</Link>
      </form>
    </div>
  );
}
