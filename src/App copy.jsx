/* // src/App.jsx
// import { useApi } from "./context/ApiContext";
// import { useDataEvent } from "./hook/useDataEvent";
import { useApi } from "./mocks/MockApiContext";
import { useDataEvent } from "./mocks/MockDataEventProvider";
import { REDES_SOCIALES } from "./config/socialConfig";
import "./animations.css";
import "./App.css";

const App = () => {
  const api = useApi();

  // Validación por si el contexto aún no se ha montado
  if (!api || typeof api.getInteractionData !== "function") {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Cargando API...</div>;
  }

  const {
    intrinsics: { ENGAGEMENT_PARAMETERS: engagementParams },
    participants,
  } = api.getInteractionData();

  const interactionData = useDataEvent("onInteractionEvent");

  const Data = interactionData
    ? {
        state: interactionData.state,
        direction: interactionData.direction,
      }
    : { state: "Cargando...", direction: "..." };

  const socialId = parseInt(engagementParams?.socialId, 10);
  const redInfo = REDES_SOCIALES[socialId] || {
    nombre: "Desconocido",
    texto: "Canal no identificado",
    color: "#999999",
    icon: null,
    animation: "fade-in-up",
  };

  const IconoRed = redInfo.icon;

  return (
    <div
      className={`animated ${redInfo.animation}`}
      style={{
        backgroundColor: redInfo.color,
        color: "white",
        padding: "2rem",
        borderRadius: "1.5rem",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        maxWidth: "90%",
        margin: "2rem auto",
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {IconoRed && <IconoRed size={60} style={{ marginBottom: "1rem" }} />}
      <h1 style={{ fontSize: "1.7rem" }}>Canal: {redInfo.nombre}</h1>
      <p style={{ fontSize: "1.3rem" }}>{redInfo.texto}</p>
      <p>Estado: {Data.state}</p>
      <p>Dirección: {Data.direction}</p>
      <p>Participantes: {participants.length}</p>
    </div>
  );
};

export default App;
 */



import { useEffect, useState } from "react";
import { useApi } from "./mocks/MockApiContext";
import { useDataEvent } from "./mocks/MockDataEventProvider";
import { REDES_SOCIALES as FALLBACK_SOCIALES } from "./config/socialConfig";
import { SOCIAL_DEFAULTS } from "./config/socialDefaults";
import "./animations.css";
import "./App.css";
import "./AppResponsive.css";

const App = () => {
  const api = useApi();

  const [redesSociales, setRedesSociales] = useState(FALLBACK_SOCIALES);
  const [overrideSocialId, setOverrideSocialId] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1/sociales-widget/config.json")
      .then((res) => res.json())
      .then((data) => setRedesSociales(enrichConfig(data)))
      .catch(() =>
        console.warn("No se pudo cargar configuración externa. Se usará la configuración por defecto.")
      );
  }, []);

  if (!api || typeof api.getInteractionData !== "function") {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Cargando API...</div>;
  }

  const {
    intrinsics: { ENGAGEMENT_PARAMETERS: engagementParams },
  } = api.getInteractionData();

  const socialId = overrideSocialId ?? parseInt(engagementParams?.serviceId, 10);
  const redInfo = redesSociales[socialId] || {
    nombre: "Desconocido",
    texto: "Canal no identificado",
    color: "#999999",
    icon: null,
    animation: "fade-in-up",
  };

  const IconoRed = redInfo.icon;

  // Separar nombre y teléfono si vienen juntos
  let nombreVisible = redInfo.texto;
  let telefonoVisible = "";

  const match = redInfo.texto.match(/^(.*?)\s*(\([^)]*\))$/);
  if (match) {
    nombreVisible = match[1].trim();
    telefonoVisible = match[2].trim();
  }

  // Obtener últimos 10 dígitos del userId
  const userId = engagementParams?.userId;
  let userIdVisible = "";
  if (userId && /^\d+$/.test(userId)) {
    userIdVisible = userId.slice(-10);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
        }}
      >
        {Object.entries(redesSociales).map(([id, red]) => (
          <button
            key={id}
            onClick={() => setOverrideSocialId(parseInt(id))}
            style={{
              backgroundColor: red.color,
              color: "white",
              padding: "0.4rem 0.8rem",
              border: "none",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              cursor: "pointer",
              fontWeight: socialId === parseInt(id) ? "bold" : "normal",
            }}
          >
            {red.nombre}
          </button>
        ))}
      </div>

      <div
        className={`animated ${redInfo.animation} responsive-card`}
        style={{
          backgroundColor: redInfo.color,
          color: "white",
          padding: "2rem",
          borderRadius: "1.5rem",
          maxWidth: "500px",
          margin: "0 auto",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "nowrap",
        }}
      >
        {IconoRed && (
          <div className="icon-animated icon-slide-in" style={{ minWidth: "60px" }}>
            <IconoRed size={60} />
          </div>
        )}
        <div className="channel-text">
          <p style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem", margin: 0 }}>
            {nombreVisible}
          </p>
          {telefonoVisible && (
            <p style={{ color: "white", fontWeight: "normal", fontSize: "1rem", margin: 0 }}>
              {telefonoVisible}
            </p>
          )}
          {userIdVisible && (
            <p
              title="Haz clic para copiar"
              onClick={() => navigator.clipboard.writeText(userIdVisible)}
              style={{
                color: "white",
                fontWeight: "normal",
                fontSize: "1rem",
                marginTop: "0.3rem",
                cursor: "pointer",
                opacity: 0.8,
                transition: "opacity 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.opacity = 1)}
              onMouseOut={(e) => (e.target.style.opacity = 0.8)}
            >
              {userIdVisible}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Función para enriquecer datos básicos con color, ícono y animación
function enrichConfig(data) {
  const enriched = {};
  for (const [id, value] of Object.entries(data)) {
    const key = value.nombre?.toLowerCase() || "";
    const defaults =
      key.includes("whatsapp")
        ? SOCIAL_DEFAULTS.whatsapp
        : key.includes("facebook")
        ? SOCIAL_DEFAULTS.facebook
        : key.includes("instagram")
        ? SOCIAL_DEFAULTS.instagram
        : key.includes("x")
        ? SOCIAL_DEFAULTS.x
        : {};

    enriched[id] = {
      ...value,
      ...defaults,
      animation: "fade-in-up",
    };
  }
  return enriched;
}

export default App;
