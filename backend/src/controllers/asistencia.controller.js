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

module.exports = {
  getAsistencias,
};
