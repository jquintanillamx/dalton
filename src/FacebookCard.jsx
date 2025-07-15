import React from "react";

const FacebookCard = ({ fbUrl }) => {
  if (!fbUrl) {
    return <p>No se encontró ninguna publicación para mostrar.</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* 🔗 Enlace arriba */}
      <a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          marginBottom: "15px",
          color: "#1877f2",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1rem",
          zIndex: 10,
          position: "relative",
        }}
      >
        🔗 Ver publicación directamente en Facebook
      </a>

      {/* 📌 Contenedor con scroll interno */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "100%",
          height: "500px", // Altura máxima visible
          overflowY: "auto", // Scroll vertical
          overflowX: "hidden",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          className="fb-post"
          data-href={fbUrl}
          data-width="500"
          style={{
            width: "100%",
            minHeight: "600px", // Le das algo de alto para que tenga contenido scrollable
          }}
        ></div>
      </div>
    </div>
  );
};

export default FacebookCard;
