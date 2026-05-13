const db = require("../config/db");

exports.obtenerAlumnoFormateadoPorId = async (id) => {
  const query = `
        SELECT
            da.id,
            da.nombres,
            da.apellidos,
            da.idsenati,
            c.nombre AS carrera,
            da.semestre,
            CONCAT(i.nombre, ' ', i.apellido) AS instructor,
            d.tipo,
            d.marca,
            d.modelo,
            d.numero_serie,
            d.descripcion
        FROM datos_alumnos da
        INNER JOIN carreras c
            ON da.carrera_id = c.id
        LEFT JOIN instructor i
            ON da.instructor_id = i.id
        LEFT JOIN dispositivos_x_alumno d
            ON da.id = d.alumno_id AND d.estado = 1
        WHERE da.id = ?
    `;

  const [rows] = await db.promise().query(query, [id]);

  return rows[0];
};

const pool = require('../config/db');

exports.obtenerAlumnoPorId = (id, callback) => {
  const sql = "SELECT id, nombres, apellidos, idsenati, semestre, carrera_id, estado FROM datos_alumnos WHERE id = ?";
  db.query(sql, [id], (err, resultados) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, resultados[0]);
    }
  });
};

exports.obtenerAlumnoPorCredenciales = async (usuario, password) => {
  const query = "SELECT id, nombres, apellidos, idsenati, carrera_id, semestre, estado FROM datos_alumnos WHERE idsenati = ? AND password_alumno = ? AND estado = 1";
  const [rows] = await db.promise().query(query, [usuario, password]);
  return rows;
};

exports.obtenerAlumnosActivos = async () => {
  const query = `
      SELECT 
          a.id, a.nombres, a.apellidos, a.idsenati, a.semestre, 
          c.nombre AS carrera 
      FROM datos_alumnos a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      WHERE a.estado = 1
  `;
  const [rows] = await db.promise().query(query);
  return rows;
};

exports.obtenerAlumnoPorIdSenati = async (idsenati) => {
  const query = `
      SELECT 
          a.id, a.nombres, a.apellidos, a.idsenati, a.semestre, 
          c.nombre AS carrera 
      FROM datos_alumnos a
      LEFT JOIN carreras c ON a.carrera_id = c.id
      WHERE a.idsenati = ? AND a.estado = 1
  `;
  const [rows] = await db.promise().query(query, [idsenati]);
  return rows[0];
};