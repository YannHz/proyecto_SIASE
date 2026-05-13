const registroRepository = require("../repositories/registro_dispositivo.repository");

class RegistroDispositivoService {
  async obtenerRegistros() {
    return await registroRepository.obtenerRegistros();
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
}

module.exports = new RegistroDispositivoService();
