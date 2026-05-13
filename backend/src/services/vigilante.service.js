const pool = require("../config/db");
const vigilanteRepo = require("../repositories/vigilante.repository");

class VigilanteService {
  async procesarCambioEstado(registroId, nuevoEstado, vigilanteId) {
    const connection = await pool.promise().getConnection();

    try {
      await connection.beginTransaction();

      const registro = await vigilanteRepo.obtenerRegistroPorId(
        connection,
        registroId,
      );
      if (!registro) {
        throw new Error("Registro de dispositivo no encontrado");
      }

      await vigilanteRepo.actualizarEstadoRegistro(
        connection,
        registroId,
        nuevoEstado,
      );

      if (nuevoEstado === 2) {
        await vigilanteRepo.registrarEntradaAsistencia(
          connection,
          registro.alumno_id,
          vigilanteId,
        );
      } else if (nuevoEstado === 3) {
        await vigilanteRepo.registrarSalidaAsistencia(
          connection,
          registro.alumno_id,
        );
      }

      await connection.commit();
      return {
        exito: true,
        mensaje: "Estado y asistencia actualizados correctamente",
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async obtenerVigilantePorId(vigilanteId) {
    return await vigilanteRepo.getVigilantePorId(vigilanteId);
  }
}

module.exports = new VigilanteService();
