import React from "react";

const FacebookCard = ({ fbUrl }) => {
  if (!fbUrl) {
    return <p>No se encontró ninguna publicación para mostrar.</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3 style={{ color: "#555" }}>
        📌 Previsualización del Post de Facebook
      </h3>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "100%",
          overflow: "hidden",
          margin: "20px auto",
        }}
      >
        <div
          className="fb-post"
          data-href={fbUrl}
          data-width="500"
          data-height="600" // 👈 Forzar alto sugerido al plugin
          style={{ width: "100%", height: "600px" }} // 👈 Forzar inline
        >
          {/* Facebook inyecta un iframe aquí */}
        </div>

        {/* Hack para forzar el iframe también */}
        <style>{`
          .fb-post iframe {
            width: 100% !important;
            height: 600px !important;
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
  );
};

export default FacebookCard;
