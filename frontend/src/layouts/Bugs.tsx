import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type Bug = {
    bugId: string;
    name: string;
    status: "open" | "in-progress" | "resolved" | "closed";
}

export default function Bugs() {
    const [bugs, setBugs] = useState<Bug[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch("http://localhost:5000/bugs", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(async (res) => {
            if (!res.ok) throw new Error("Erro ao buscar bugs");
            const data = await res.json();
            setBugs(data);
        })
        .catch((err) => {
            console.log("Erro ao buscar equipes:", err);
        });
    }, [navigate]);

    return (
        <div>
            <h2>Meus Bugs</h2>
            {bugs.length === 0 ? (
                <p>Nenhum bug encontrado.</p>
            ): (
                <ul>
                    {bugs.map((bugs) => (
                        <li key={bugs.bugId}>
                            <strong>
                                <Link to={`/bug/${bugs.bugId}`}>{bugs.name}</Link>
                            </strong> {" "}
                            (ID: {bugs.bugId}) - Status: {" "}
                            {Array.isArray(bug.status) && bugs.status.length > 0
                                ? bugs.status.map((status) => status.name).join(", ")
                                : "Aberto"}
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/dashboard">Voltar ao Dashboard</Link>
        </div>
    )
}