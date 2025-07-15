import { useEffect, useState } from "react";
import { useApi } from "./context/ApiContext";
import { REDES_SOCIALES as FALLBACK_SOCIALES } from "./config/socialConfig";
import { SOCIAL_DEFAULTS } from "./config/socialDefaults";
import FacebookCard from "./FacebookCard";
import "./animations.css";
import "./App.css";
import "./AppResponsive.css";

const App = () => {
  const api = useApi();
  const [redesSociales, setRedesSociales] = useState(FALLBACK_SOCIALES);
  const [overrideSocialId, setOverrideSocialId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuCoords, setMenuCoords] = useState({ x: 0, y: 0 });
  const [fbUrl, setFbUrl] = useState(null);

  useEffect(() => {
    fetch("https://dalton.microlabjqr.site/dist/config.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("✔️ JSON externo cargado:", data);
        const enriched = enrichConfig(data);
        console.log("🔗 Enriched config:", enriched);
        setRedesSociales(enriched);
      })
      .catch(() =>
        console.warn("⚠️ No se pudo cargar configuración externa. Se usará la configuración por defecto.")
      );
  }, []);

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

  const userId = engagementParams?.userId;
  let userIdVisible = "";
  if (userId && /^\d+$/.test(userId)) {
    userIdVisible = userId.slice(-10);
  }

  if (userIdVisible === "5544887220") {
    engagementParams.serviceId = "23";
  }

  const socialId = overrideSocialId ?? Number(engagementParams?.serviceId);

  const conversation = engagementParams?.conversation || "";
  const [conversationChannel, conversationUrl] = conversation.split(",", 2);

  console.log("Canal:", conversationChannel);
  console.log("URL:", conversationUrl);

  if (conversationChannel == "FB") {
    userIdVisible = engagementParams?.userName;
  }

  // 🔗 Si es FB: carga URL real del post
  useEffect(() => {
    const loadFacebookPost = async () => {
      if (conversationChannel === "FB" && conversationUrl) {
        try {
          const response = await fetch(conversationUrl);
          const htmlText = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlText, "text/html");
          const fbPostDiv = doc.querySelector("#divFacebookPost");
          const href = fbPostDiv?.getAttribute("data-href");
          if (href) setFbUrl(href);
        } catch (err) {
          console.error("Error al cargar publicación FB:", err);
        }
      }
    };
    loadFacebookPost();
  }, [conversationChannel, conversationUrl]);

  useEffect(() => {
    if (fbUrl) {
      if (window.FB) {
        window.FB.XFBML.parse();
        return;
      }
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "197887303586344",
          xfbml: true,
          version: "v17.0",
        });
      };
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v17.0";
      document.body.appendChild(script);
    }
  }, [fbUrl]);

  // Si FB, renderiza FacebookCard
  if (conversationChannel === "FB") {
    return <FacebookCard fbUrl={fbUrl} />;
  }

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

  const isValidUserId = /^\d{10}$/.test(userIdVisible);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
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
          width: "100%",
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
            onClick={isValidUserId ? handleCall : undefined}
            style={{
              padding: "0.4rem 0.8rem",
              cursor: isValidUserId ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              opacity: isValidUserId ? 1 : 0.5,
              pointerEvents: isValidUserId ? "auto" : "none",
            }}
            onMouseOver={(e) => {
              if (isValidUserId) e.currentTarget.style.backgroundColor = "#333";
            }}
            onMouseOut={(e) => {
              if (isValidUserId) e.currentTarget.style.backgroundColor = "transparent";
            }}
            title={isValidUserId ? "Llamar al usuario" : "Número inválido"}
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
