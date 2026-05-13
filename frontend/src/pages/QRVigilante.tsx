import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QRVigilante = () => {
  const navigate = useNavigate();
  const [alumnoDetectado, setAlumnoDetectado] = useState<string | null>(null);

  useEffect(() => {
    const chequearAsistencia = async () => {
      try {
        const res = await fetch("/api/asistencia/ultimo");
        const data = await res.json();
        if (data.success) setAlumnoDetectado(data.alumno.nombre);
      } catch (e) { console.error("Error", e); }
    };
    const timer = setInterval(chequearAsistencia, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Escáner de Guardia</h2>
      <div style={{ width: "200px", height: "200px", border: "2px solid black", margin: "20px auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
        [ ESPACIO PARA EL QR ]
      </div>
      <div style={{ border: "1px solid blue", padding: "15px", borderRadius: "8px", maxWidth: "400px", margin: "0 auto" }}>
        <strong>Último Alumno:</strong> {alumnoDetectado || "Esperando escaneo..."}
      </div>

      <button onClick={() => navigate("/dashboard-vigilante")} style={{ marginTop: "20px" }}>
        Volver al Panel
      </button>
    </div>
  );
};

export default QRVigilante;