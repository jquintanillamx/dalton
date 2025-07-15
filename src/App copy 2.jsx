import { useEffect, useState } from "react";
// import { useApi } from "./mocks/MockApiContext";
// import { useDataEvent } from "./mocks/MockDataEventProvider";
import { useApi } from "./context/ApiContext";
import { REDES_SOCIALES as FALLBACK_SOCIALES } from "./config/socialConfig";
import { SOCIAL_DEFAULTS } from "./config/socialDefaults";
import "./animations.css";
import "./App.css";
import "./AppResponsive.css";

const App = () => {
  const api = useApi();
  const [redesSociales, setRedesSociales] = useState(FALLBACK_SOCIALES);
  const [overrideSocialId, setOverrideSocialId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuCoords, setMenuCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("http://127.0.0.1/sociales-widget/config.json")
      .then((res) => res.json())
      .then((data) => setRedesSociales(enrichConfig(data)))
      .catch(() =>
        console.warn("No se pudo cargar configuración externa. Se usará la configuración por defecto.")
      );
  }, []);

  // Ocultar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".custom-context-menu")) {
        setMenuVisible(false);
      }
    };
    if (menuVisible) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuVisible]);

  if (!api || typeof api.getInteractionData !== "function") {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Cargando API...</div>;
  }

  const interactionData = api.getInteractionData();
  const rawEngagement = interactionData?.intrinsics?.ENGAGEMENT_PARAMETERS;

  let engagementParams = {};
  try {
    engagementParams = typeof rawEngagement === "string" ? JSON.parse(rawEngagement) : rawEngagement;
  } catch (e) {
    console.warn("ENGAGEMENT_PARAMETERS no es JSON válido:", rawEngagement);
  }

  const socialId = overrideSocialId ?? Number(engagementParams?.serviceId);
  const redInfo = redesSociales[socialId] || {
    nombre: "Desconocido",
    texto: "Canal no identificado",
    color: "#999999",
    icon: null,
    animation: "fade-in-up",
  };

  const IconoRed = redInfo.icon;

  let nombreVisible = redInfo.texto;
  let telefonoVisible = "";
  const match = redInfo.texto.match(/^(.*?)\s*(\([^)]*\))$/);
  if (match) {
    nombreVisible = match[1].trim();
    telefonoVisible = match[2].trim();
  }

  const userId = engagementParams?.userId;
  let userIdVisible = "";
  if (userId && /^\d+$/.test(userId)) {
    userIdVisible = userId.slice(-10);
  }

  const handleUserIdClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuCoords({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userIdVisible);
    setMenuVisible(false);
  };

  const handleCall = () => {
    api.startVoiceInteraction?.(userIdVisible);
    setMenuVisible(false);
  };

  return (
    //<div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    }}
  >
      
      <div
        className={`animated ${redInfo.animation} responsive-card`}
        style={{
          backgroundColor: redInfo.color,
          color: "white",
          padding: "2rem",
          borderRadius: "1.5rem",
          maxWidth: "700px",
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
              title="Haz clic para copiar o llamar"
              onClick={handleUserIdClick}
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

      {menuVisible && (
        <div
          className="custom-context-menu"
          style={{
            position: "fixed",
            top: menuCoords.y,
            left: menuCoords.x,
            backgroundColor: "#222",
            color: "white",
            padding: "0.5rem",
            borderRadius: "8px",
            zIndex: 9999,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            fontSize: "0.9rem",
            minWidth: "120px",
            userSelect: "none",
          }}
        >
          <div
            onClick={handleCopy}
            style={{
              padding: "0.4rem 0.8rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#333")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            📋 Copiar ID
          </div>
          <div
            onClick={handleCall}
            style={{
              padding: "0.4rem 0.8rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#333")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            📞 Llamar
          </div>
        </div>
      )}
    </div>
  );
};

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
