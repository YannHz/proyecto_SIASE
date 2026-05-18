import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, CheckCircle, RefreshCw } from "lucide-react";
import Navbar from "../components/Navbar";
import { API_BASE } from "../services/api";
import "../styles/App.css";
import "../styles/QRVigilante.css";

const QRVigilante = () => {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState<string[]>([]);
  const [ultimoEscaneo, setUltimoEscaneo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [guardiaId, setGuardiaId] = useState<number | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setGuardiaId(user.id);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const cargarDatosQR = async () => {
    if (!guardiaId) return;

    // 1. Recuperamos el token de autenticación para esta ráfaga de peticiones
    const token = localStorage.getItem("auth_token");

    try {
      // Petición de Tokens Activos
      const resTokens = await fetch(`${API_BASE}/api/tokens_vigilante/activos/${guardiaId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Encabezado de seguridad añadido
        }
      });
      const dataTokens = await resTokens.json();

      if (Array.isArray(dataTokens)) {
        setTokens(dataTokens.map((t: any) => t.token));
      }

      // Petición del Último Escaneo
      const resUltimo = await fetch(`${API_BASE}/api/tokens_vigilante/ultimo-escaneo/${guardiaId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Corregido: 'token' ahora sí está definido en el ámbito
        }
      });
      const dataUltimo = await resUltimo.json();

      if (dataUltimo && (!ultimoEscaneo || dataUltimo.asistencia_id !== ultimoEscaneo.asistencia_id)) {
        setUltimoEscaneo(dataUltimo);
      }

      setLoading(false);
    } catch (e) {
      console.error("Error al cargar datos del QR", e);
    }
  };

  const handleRotarToken = async () => {
    if (!guardiaId) return;
    const token = localStorage.getItem("auth_token");

    try {
      await fetch(`${API_BASE}/api/tokens_vigilante/rotar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Encabezado de seguridad añadido
        },
        body: JSON.stringify({ guardia_id: guardiaId }),
      });
      await cargarDatosQR();
    } catch (e) {
      console.error("Error al rotar", e);
    }
  };

  useEffect(() => {
    if (guardiaId) {
      const token = localStorage.getItem("auth_token");

      // Inicialización del token en el primer montaje
      fetch(`${API_BASE}/api/tokens_vigilante/inicializar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Encabezado de seguridad añadido
        },
        body: JSON.stringify({ guardia_id: guardiaId }),
      }).then(() => cargarDatosQR());

      // Intervalos de actualización automática
      const intervalEscaneo = setInterval(cargarDatosQR, 2000);
      const intervalRotacion = setInterval(handleRotarToken, 30000);

      return () => {
        clearInterval(intervalEscaneo);
        clearInterval(intervalRotacion);
      };
    }
  }, [guardiaId, ultimoEscaneo?.asistencia_id]);

  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="app-container">
        <div className="main-content">
          <div className="content-area" style={{ alignItems: "center" }}>

            <div className="card-panel qr-card">
              <div className="card-title center">
                <span className="title-dot" />
                CÓDIGO QR DE ASISTENCIA
              </div>

              {/* Contenedor del QR */}
              <div className="qr-code-wrapper">
                {loading ? (
                  <div className="qr-placeholder">
                    <RefreshCw size={32} className="qr-loading-icon" />
                    <span>Cargando...</span>
                  </div>
                ) : (
                  tokens.length > 0 ? (
                    <QRCodeSVG
                      value={tokens[0]}
                      size={Math.min(window.innerWidth * 0.7, 250)}
                      level="H"
                      style={{ display: 'block' }}
                    />
                  ) : (
                    <div className="qr-placeholder">
                      <RefreshCw size={32} className="qr-loading-icon" />
                      <span>Generando nuevo código...</span>
                    </div>
                  )
                )}
              </div>

              <p className="qr-hint">
                El código se actualiza automáticamente por seguridad.
              </p>

              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button className="btn-modal-cancel" onClick={() => navigate("/dashboard-vigilante")}>
                  <ArrowLeft size={18} /> Volver
                </button>
              </div>
            </div>

            {ultimoEscaneo && (
              <div className="card-panel qr-last-scan">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#15803D" }}>
                  <CheckCircle size={24} />
                  <div style={{ textAlign: "left" }}>
                    <strong style={{ display: "block" }}>Último ingreso registrado:</strong>
                    <span style={{ fontSize: "0.9rem" }}>
                      {ultimoEscaneo.nombres} {ultimoEscaneo.apellidos}
                    </span>
                    <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                      ID: {ultimoEscaneo.idsenati} | Hora: {ultimoEscaneo.hora_ingreso}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default QRVigilante;
