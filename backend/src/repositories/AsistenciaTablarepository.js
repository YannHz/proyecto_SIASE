const db = require("../config/db");

const obtenerAsistenciasTablaRepo = async () => {

  // 1. llamar API de tu compañero
  const response = await fetch("http://localhost:3000/api/asistencia");
  const asistencias = await response.json();

  // 2. recorrer y juntar datos extras
  const resultado = await Promise.all(

    asistencias.map(async (a) => {

      // buscar idsenati y semestre
      const sql = `
        SELECT 
          idsenati,
          semestre
        FROM datos_alumnos
        WHERE CONCAT(nombres, ' ', apellidos) = ?
      `;

      const [rows] = await db.promise().query(sql, [a.alumno]);

      const extra = rows[0] || {};

      // 3. unir todo
      return {
        id: a.id,
        idsenati: extra.idsenati || "N/A",
        semestre: extra.semestre || "N/A",

        alumno: a.alumno,
        guardia: a.guardia,
        carrera: a.carrera,

        fecha: a.fecha,
        hora_ingreso: a.hora_ingreso,
        hora_salida: a.hora_salida
      };
    })

  );

  return resultado;
};

module.exports = {
  obtenerAsistenciasTablaRepo
};