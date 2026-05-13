const db = require('../config/db');

const registrarAsistencia = async (alumno_id, guardia_id) => {
    await db.query(
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
    const [rows] = await db.query(sql, [guardia_id]);
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
        CONCAT(v.nombre, ' ', v.apellido) AS guardia,
        c.nombre AS carrera
      FROM asistencia a
      JOIN datos_alumnos al ON a.alumno_id = al.id
      JOIN vigilante v ON a.guardia_id = v.id
      JOIN carreras c ON al.carrera_id = c.id
      WHERE 1=1
    `;
  
    let params = [];
  
    if (filtros.guardia) {
      sql += " AND v.nombre LIKE ?";
      params.push(`%${filtros.guardia}%`);
    }
  
    if (filtros.fecha) {
      sql += " AND a.fecha = ?";
      params.push(filtros.fecha);
    }
  
    if (filtros.alumno) {
      sql += " AND al.nombres LIKE ?";
      params.push(`%${filtros.alumno}%`);
    }
    
    const [result] = await db.promise().query(sql, params);
    return result;
};

module.exports = {
    registrarAsistencia,
    obtenerUltimoEscaneoRepo,
    obtenerAsistenciasRepo
};