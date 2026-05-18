const registroRepository = require("../repositories/registro_dispositivo.repository");

class RegistroDispositivoService {
  async obtenerRegistros() {
    return await registroRepository.obtenerRegistros();
  }

  async obtenerDispositivosPorAlumno(alumnoId) {
    return await registroRepository.obtenerDispositivosPorAlumno(alumnoId);
  }

  async obtenerSolicitudesPorAlumno(alumnoId) {
    return await registroRepository.obtenerSolicitudesPorAlumno(alumnoId);
  }

  async registrarDispositivo(data) {
    const dispositivoId = await registroRepository.crearDispositivo(data);

    const registroId = await registroRepository.crearRegistro({
      alumno_id: data.alumno_id,
      instructor_id: data.instructor_id,
      guardia_id: data.guardia_id,
      objeto_id: dispositivoId,
    });

    return {
      dispositivo_id: dispositivoId,
      registro_id: registroId,
    };
  }

  async crearSolicitudIngreso(alumnoId, dispositivoId, instructorId) {
    return await registroRepository.crearSolicitudIngreso(alumnoId, dispositivoId, instructorId);
  }

  async marcarEntrada(registroId, guardiaId) {
    return await registroRepository.marcarEntrada(registroId, guardiaId);
  }

  async marcarSalida(registroId) {
    return await registroRepository.marcarSalida(registroId); 
  }
}

module.exports = new RegistroDispositivoService();
