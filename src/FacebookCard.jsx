import React from "react";

const FacebookCard = ({ fbUrl }) => {
  if (!fbUrl) {
    return <p>No se encontró ninguna publicación para mostrar.</p>;
  }

  const forcedWidth = 500;   // Ancho fijo del iframe (puedes ajustar)
  const forcedHeight = 600;  // Alto fijo del iframe y contenedor

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
  
      <div
        style={{
          background: "#fbfbfb",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "100%",
          overflow: "hidden",
          margin: "20px auto",
          height: `800px`, // Forzar alto máximo del contenedor
        }}
      >
        <div
          className="fb-post"
          data-href={fbUrl}
          data-width={forcedWidth}
          data-height={forcedHeight}
          style={{
            width: "100%",
            height: `${forcedHeight}px`,
          }}
        ></div>
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
        {/* Forzar estilos internos del span e iframe generados por Facebook */}
        <style>
          {`
            .fb-post span {
              display: block;
              width: 100% !important;
              height: ${forcedHeight}px !important;
            }
            .fb-post iframe {
              display: block;
              width: 100% !important;
              height: ${forcedHeight}px !important;
            }
          `}
        </style>

        

        <button
          onClick={() => window.FB && window.FB.XFBML.parse()}
          style={{
            marginTop: "5px",
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
