const asistenciaService = require("../services/asistencia.service");

const getAsistencias = async (req, res) => {
  try {
    const result = await asistenciaService.obtenerAsistencias(req.query);
    res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error en servidor" });
  }
};

const registrarAsistencia = async (req, res) => {
  try {
    const { token_qr } = req.body;
    if (!token_qr) {
      return res.status(400).json({ error: "Se requiere el código QR escaneado" });
    }

    // El alumno_id viene del JWT decodificado por el middleware auth
    const alumno_id = req.user.id;
    if (!alumno_id) {
      return res.status(401).json({ error: "No se pudo identificar al alumno" });
    }

    const resultado = await asistenciaService.registrarAsistenciaAlumno(token_qr, alumno_id);
    res.json(resultado);
  } catch (err) {
    console.error("Error al registrar asistencia:", err.message);
    if (err.message === "TOKEN_INVALIDO") {
      return res.status(400).json({ error: "Código QR inválido o ya utilizado. Solicita un nuevo código al vigilante." });
    }
    return res.status(500).json({ error: "Error al registrar la asistencia" });
  }
};

module.exports = {
  getAsistencias,
  registrarAsistencia,
};
