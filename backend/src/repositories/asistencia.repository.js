const db = require('../config/db');

<<<<<<< HEAD
const registrarAsistencia = async (alumno_id, guardia_id) => {
    await db.promise().query(
=======
const registrarAsistencia = async (alumno_id, guardia_id, conn = null) => {
    const q = conn || db.promise();
    await q.query(
>>>>>>> 7a3c77d65e4776a53c4315359f5f67f25c5af21c
        "INSERT INTO asistencia (alumno_id, guardia_id, fecha, hora_ingreso) VALUES (?, ?, CURDATE(), CURTIME())",
        [alumno_id, guardia_id]
    );
};

const obtenerUltimoEscaneoRepo = async (guardia_id) => {
    const sql = `
        SELECT a.id as asistencia_id, a.hora_ingreso, d.nombres, d.apellidos, d.idsenati 
        FROM asistencia a
        JOIN datos_alumnos d ON a.alumno_id = d.id
        WHERE a.guardia_id = ?
        ORDER BY a.id DESC
        LIMIT 1
    `;
    const [rows] = await db.promise().query(sql, [guardia_id]);
    return rows;
};

const obtenerAsistenciasRepo = async (filtros) => {
    let sql = `
      SELECT 
        a.id,
        a.fecha,
        a.hora_ingreso,
        a.hora_salida,
        CONCAT(al.nombres, ' ', al.apellidos) AS alumno,
        al.idsenati AS idsenati,
        al.semestre AS semestre,
        CONCAT(v.nombre, ' ', v.apellido) AS guardia,
        c.nombre AS carrera,
        c.id AS carrera_id
      FROM asistencia a
      JOIN datos_alumnos al ON a.alumno_id = al.id
      JOIN vigilante v ON a.guardia_id = v.id
      JOIN carreras c ON al.carrera_id = c.id
      WHERE 1=1
    `;
  
    let params = [];
  
    if (filtros.guardia) {
      sql += " AND (v.nombre LIKE ? OR v.apellido LIKE ?)";
      params.push(`%${filtros.guardia}%`, `%${filtros.guardia}%`);
    }
  
    if (filtros.fecha) {
      sql += " AND a.fecha = ?";
      params.push(filtros.fecha);
    }
  
    if (filtros.alumno) {
      sql += " AND (al.nombres LIKE ? OR al.apellidos LIKE ?)";
      params.push(`%${filtros.alumno}%`, `%${filtros.alumno}%`);
    }

    if (filtros.idsenati) {
      sql += " AND al.idsenati LIKE ?";
      params.push(`%${filtros.idsenati}%`);
    }

    if (filtros.carrera_id) {
      sql += " AND al.carrera_id = ?";
      params.push(filtros.carrera_id);
    }

    if (filtros.semestre) {
      sql += " AND al.semestre = ?";
      params.push(filtros.semestre);
    }

    if (filtros.mes) {
      sql += " AND MONTH(a.fecha) = ?";
      params.push(filtros.mes);
    }

    sql += " ORDER BY a.fecha DESC, a.hora_ingreso DESC";
    
    const [result] = await db.promise().query(sql, params);
    return result;
};

<<<<<<< HEAD
const obtenerAsistenciaPorAlumnoRepo = async (alumnoId) => {
    const sql = `
        SELECT
            a.id,
            a.fecha,
            a.hora_ingreso,
            a.hora_salida,
            COALESCE((
                SELECT CONCAT(d.tipo, ' ', d.marca, ' ', d.modelo)
                FROM registro_dispositivo r
                JOIN dispositivos_x_alumno d ON r.objeto_id = d.id
                WHERE r.alumno_id = a.alumno_id 
                  AND DATE(r.fecha_entrada) = DATE(a.fecha)
                ORDER BY r.id DESC 
                LIMIT 1
            ), 'Sin dispositivo') AS dispositivo
        FROM asistencia a
        WHERE a.alumno_id = ?
        ORDER BY a.fecha DESC, a.hora_ingreso DESC
    `;
    const [rows] = await db.promise().query(sql, [alumnoId]);
    return rows;
=======
const buscarTokenActivo = async (token, conn = null) => {
    const q = conn || db.promise();
    const [rows] = await q.query(
        "SELECT id, guardia_id FROM tokens_vigilante WHERE token = ? AND estado = 'activo' LIMIT 1",
        [token]
    );
    return rows.length > 0 ? rows[0] : null;
};

const marcarTokenUsado = async (token, alumno_id, conn = null) => {
    const q = conn || db.promise();
    const [result] = await q.query(
        "UPDATE tokens_vigilante SET estado = 'usado', alumno_id = ? WHERE token = ? AND estado = 'activo'",
        [alumno_id, token]
    );
    return result.affectedRows;
>>>>>>> 7a3c77d65e4776a53c4315359f5f67f25c5af21c
};

module.exports = {
    registrarAsistencia,
    obtenerUltimoEscaneoRepo,
    obtenerAsistenciasRepo,
<<<<<<< HEAD
    obtenerAsistenciaPorAlumnoRepo
=======
    buscarTokenActivo,
    marcarTokenUsado
>>>>>>> 7a3c77d65e4776a53c4315359f5f67f25c5af21c
};