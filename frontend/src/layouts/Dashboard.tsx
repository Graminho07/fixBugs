import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logout realizado!");
    navigate("/login");
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h1>Dashboard - Fix Bugs</h1>
        <button
          onClick={handleLogout}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Sair
        </button>
      </header>

      <section>
        <h2>Resumo</h2>
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 15,
          }}
        >
          <div
            style={{
              flex: 1,
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
              textAlign: "center",
            }}
          >
          </div>

          <div
            style={{
              flex: 1,
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
              textAlign: "center",
            }}
          >
          </div>

          <div
            style={{
              flex: 1,
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
              textAlign: "center",
            }}
          >
          </div>
        </div>
      </section>
    </div>
  );
}
