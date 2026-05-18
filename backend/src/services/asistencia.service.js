const asistenciaRepository = require("../repositories/asistencia.repository");
const tokensRepo = require("../repositories/tokens_vigilante.repository");
const crypto = require("crypto");

const obtenerAsistencias = async (filtros) => {
  return await asistenciaRepository.obtenerAsistenciasRepo(filtros);
};

/**
 * Registra asistencia desde el lado del alumno.
 * El alumno escanea el QR del vigilante (que contiene un token UUID).
 * 1. Valida que el token exista y esté activo
 * 2. Obtiene el guardia_id asociado al token
 * 3. Marca el token como usado
 * 4. Registra la asistencia
 * 5. Genera un nuevo token de reemplazo
 */
const registrarAsistenciaAlumno = async (token_qr, alumno_id) => {
  const conn = await tokensRepo.obtenerConexion();
  try {
    await conn.beginTransaction();

    // 1. Buscar el token activo y obtener el guardia_id
    const tokenInfo = await asistenciaRepository.buscarTokenActivo(token_qr, conn);
    if (!tokenInfo) {
      await conn.rollback();
      throw new Error("TOKEN_INVALIDO");
    }

    const guardia_id = tokenInfo.guardia_id;

    // 2. Marcar el token como usado
    await asistenciaRepository.marcarTokenUsado(token_qr, alumno_id, conn);

    // 3. Registrar la asistencia
    await asistenciaRepository.registrarAsistencia(alumno_id, guardia_id, conn);

    // 4. Generar un nuevo token de reemplazo para el vigilante
    await tokensRepo.crearToken(crypto.randomUUID(), guardia_id, conn);

    await conn.commit();
    return { success: true, mensaje: "Asistencia registrada correctamente" };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  obtenerAsistencias,
  registrarAsistenciaAlumno,
};
