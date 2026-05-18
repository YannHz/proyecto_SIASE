const AsistenciaTablaRepository = require("../repositories/AsistenciaTablarepository");

const obtenerAsistenciasTabla = async (filtros = {}) => {
  return await AsistenciaTablaRepository.obtenerAsistenciasTablaRepo(filtros);
};

const obtenerAsistenciaTablaById = async (id) => {
  return await AsistenciaTablaRepository.obtenerAsistenciaTablaById(id);
};

module.exports = {
  obtenerAsistenciasTabla,
  obtenerAsistenciaTablaById
};