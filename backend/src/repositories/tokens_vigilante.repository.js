const db = require('../config/db');

const obtenerConexion = async () => {
    return await db.promise().getConnection();
};

const contarActivos = async (guardia_id) => {
    const [activos] = await db.promise().query(
        "SELECT id FROM tokens_vigilante WHERE guardia_id = ? AND estado = 'activo'", 
        [guardia_id]
    );
    return activos;
};

const crearToken = async (token, guardia_id, conn = null) => {
    const q = conn || db.promise();
    await q.query(
        "INSERT INTO tokens_vigilante (token, guardia_id, estado) VALUES (?, ?, 'activo')", 
        [token, guardia_id]
    );
};

const listarActivos = async (guardia_id) => {
    const [rows] = await db.promise().query(
        "SELECT token FROM tokens_vigilante WHERE guardia_id = ? AND estado = 'activo' ORDER BY fecha_creacion DESC LIMIT 2",
        [guardia_id]
    );
    return rows;
};

const desactivarAntiguo = async (guardia_id, conn) => {
    await conn.query(
        "UPDATE tokens_vigilante SET estado = 'expirado' WHERE guardia_id = ? AND estado = 'activo' ORDER BY fecha_creacion ASC LIMIT 1",
        [guardia_id]
    );
};

const usarToken = async (token, alumno_id, conn) => {
    const [result] = await conn.query(
        "UPDATE tokens_vigilante SET estado = 'usado', alumno_id = ? WHERE token = ? AND estado = 'activo'",
        [alumno_id, token]
    );
    return result.affectedRows;
};

const iniciar = async () => await db.promise().query("START TRANSACTION");
const confirmar = async () => await db.promise().query("COMMIT");
const cancelar = async () => await db.promise().query("ROLLBACK");

module.exports = {
    obtenerConexion,
    contarActivos,
    crearToken,
    listarActivos,
    desactivarAntiguo,
    usarToken
};