const tokensRepo = require('../repositories/tokens_vigilante.repository');
const asistenciaRepo = require('../repositories/asistencia.repository');
const crypto = require('crypto');

const inicializarTokens = async (guardia_id) => {
    const activos = await tokensRepo.contarActivos(guardia_id);
    let creados = 0;
    while (activos.length + creados < 2) {
        await tokensRepo.crearToken(crypto.randomUUID(), guardia_id);
        creados++;
    }
    return creados;
};

const obtenerTokensActivos = async (guardia_id) => {
    return await tokensRepo.listarActivos(guardia_id);
};

const rotarToken = async (guardia_id) => {
    const conn = await tokensRepo.obtenerConexion();
    const nuevoToken = crypto.randomUUID();
    try {
        await conn.beginTransaction();
        await tokensRepo.desactivarAntiguo(guardia_id, conn);
        await tokensRepo.crearToken(nuevoToken, guardia_id, conn);
        await conn.commit();
        return nuevoToken;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

const escanearQR = async (token, alumno_id, guardia_id) => {
    const conn = await tokensRepo.obtenerConexion();
    try {
        await conn.beginTransaction();
        const exito = await tokensRepo.usarToken(token, alumno_id, conn);
        
        if (exito === 0) {
            await conn.rollback();
            throw new Error("Token invalido");
        }

        await asistenciaRepo.registrarAsistencia(alumno_id, guardia_id, conn);
        await tokensRepo.crearToken(crypto.randomUUID(), guardia_id, conn);
        await conn.commit();
        return true;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

const obtenerUltimoEscaneo = async (guardia_id) => {
    const rows = await asistenciaRepo.obtenerUltimoEscaneoRepo(guardia_id);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = {
    inicializarTokens,
    obtenerTokensActivos,
    rotarToken,
    escanearQR,
    obtenerUltimoEscaneo
};