const db = require('../config/db');

const contarActivos = async (guardia_id) => {
    const [activos] = await db.query("SELECT id FROM tokens_vigilante WHERE guardia_id = ? AND estado = 'activo'", [guardia_id]);
    return activos;
};

const crearToken = async (token, guardia_id) => {
    await db.query("INSERT INTO tokens_vigilante (token, guardia_id, estado) VALUES (?, ?, 'activo')", [token, guardia_id]);
};

const listarActivos = async (guardia_id) => {
    const [rows] = await db.query(
        "SELECT token FROM tokens_vigilante WHERE guardia_id = ? AND estado = 'activo' ORDER BY fecha_creacion DESC LIMIT 2",
        [guardia_id]
    );
    return rows;
};

const desactivarAntiguo = async (guardia_id) => {
    await db.query(
        "UPDATE tokens_vigilante SET estado = 'expirado' WHERE guardia_id = ? AND estado = 'activo' ORDER BY fecha_creacion ASC LIMIT 1",
        [guardia_id]
    );
};

const usarToken = async (token, alumno_id) => {
    const [result] = await db.query(
        "UPDATE tokens_vigilante SET estado = 'usado', alumno_id = ? WHERE token = ? AND estado = 'activo'",
        [alumno_id, token]
    );
    return result.affectedRows;
};

const iniciar = async () => await db.query("START TRANSACTION");
const confirmar = async () => await db.query("COMMIT");
const cancelar = async () => await db.query("ROLLBACK");

module.exports = {
    contarActivos,
    crearToken,
    listarActivos,
    desactivarAntiguo,
    usarToken,
    iniciar,
    confirmar,
    cancelar
};