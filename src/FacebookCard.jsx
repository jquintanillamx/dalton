import React from "react";

const FacebookCard = ({ fbUrl }) => {
  if (!fbUrl) {
    return <p>No se encontró ninguna publicación para mostrar.</p>;
  }

  return (
    <div
      aria-label="global-redes"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        marginTop: "80px",
      }}
    >
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h3 style={{ color: "#555" }}>
          📌 Previsualización del Post de Facebook
        </h3>

        <div
          style={{
            height: "75%", // Ajusta si quieres px fijo
            maxHeight: "700px",
            background: "#fbfbfb",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            width: "100%",
            overflow: "auto", // scroll si se pasa
            margin: "20px auto",
          }}
        >
          <div
            className="fb-post"
            data-href={fbUrl}
            data-width="100%"
            data-height="100%"
            style={{
              width: "100%",
              height: "100%",
            }}
          ></div>

          {/* Forzamos iframe interno */}
          <style>{`
            .fb-post iframe {
              width: 100% !important;
              height: 100% !important;
              display: block;
            }
          `}</style>

          <a
            href={fbUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              marginTop: "15px",
              color: "#1877f2",
              textDecoration: "none",
            }}
          >
            🔗 Ver publicación directamente en Facebook
          </a>

          <button
            onClick={() => window.FB && window.FB.XFBML.parse()}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#1877f2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🔄 Recargar publicación
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacebookCard;
