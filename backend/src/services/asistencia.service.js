const asistenciaRepository = require("../repositories/asistencia.repository");

const obtenerAsistencias = async (filtros) => {
  return await asistenciaRepository.obtenerAsistenciasRepo(filtros);
};

module.exports = {
  obtenerAsistencias,
};
