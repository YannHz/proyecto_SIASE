const AsistenciaTablaService = require("../services/AsistenciaTabla.service");

const ListarTablaAsistencia = async (req, res) => {
  try {
    const data = await AsistenciaTablaService.obtenerAsistenciasTabla(req.query);

    res.json({
      message: "API AsistenciaTabla funcionando",
      data
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al obtener asistencia"
    });
  }
};

module.exports = {
  ListarTablaAsistencia
};
