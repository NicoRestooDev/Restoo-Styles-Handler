import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [styles, setStyles] = useState({ color: "#0d6efd", font: "Roboto", image_url: "" });
  const [error, setError] = useState(null);

  // 1) GET styles
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/styles`, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Error cargando estilos");
        setStyles({
          color: data.color ?? "#0d6efd",
          font: data.font ?? "Roboto",
          image_url: data.image_url ?? "",
        });
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  // 2) Load Google Font
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = "landing-font";
    link.href = `https://fonts.googleapis.com/css2?family=${styles.font.replaceAll(" ", "+")}&display=swap`;

    document.getElementById("landing-font")?.remove();
    document.head.appendChild(link);

    return () => link.remove();
  }, [styles.font]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        fontFamily: `"${styles.font}", sans-serif`,
        padding: 24,
      }}
    >
      <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src={styles.image_url || "/logo--square.png"}
          alt="Restaurant logo"
          style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8 }}
        />
        <div>
          <h1 style={{ margin: 0 }}>Landing Page</h1>
          <p style={{ margin: 0, opacity: 0.7 }}>Reserva rápida</p>
        </div>
      </header>

      <main style={{ marginTop: 32 }}>
        <button
          type="button"
          style={{
            background: styles.color,
            color: "white",
            border: "none",
            borderRadius: 10,
            padding: "14px 16px",
            width: "100%",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Continue
        </button>
        <Link to="/myrestoo/edit/landing">Volver a configurar 🛠️</Link>
      </main>
    </div>
  );
}