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
    const nuevoToken = crypto.randomUUID();
    try {
        await tokensRepo.iniciar();
        await tokensRepo.desactivarAntiguo(guardia_id);
        await tokensRepo.crearToken(nuevoToken, guardia_id);
        await tokensRepo.confirmar();
        return nuevoToken;
    } catch (error) {
        await tokensRepo.cancelar();
        throw error;
    }
};

const escanearQR = async (token, alumno_id, guardia_id) => {
    try {
        await tokensRepo.iniciar();
        const exito = await tokensRepo.usarToken(token, alumno_id);
        
        if (exito === 0) {
            await tokensRepo.cancelar();
            throw new Error("Token invalido");
        }

        await asistenciaRepo.registrarAsistencia(alumno_id, guardia_id);
        await tokensRepo.crearToken(crypto.randomUUID(), guardia_id);
        await tokensRepo.confirmar();
        return true;
    } catch (error) {
        await tokensRepo.cancelar();
        throw error;
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