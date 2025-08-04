import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

type Bug = {
    title: string;
    bugId: number;
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
                {bugs.map((bug) => (
                    <li key={bug.bugId}>
                    <strong>
                        <Link to={`/bug/${bug.bugId}`}>{bug.title}</Link>
                    </strong>{" "}
                    (ID: {bug.bugId}) - Status: {bug.status}
                    </li>
                ))}
                </ul>
            )}
            <Link to="/dashboard">Voltar ao Dashboard</Link>
        </div>
    )
}