const db = require("../config/db");

class RegistroDispositivoRepository {
    async obtenerRegistros() {
        const query = `
            SELECT 
                r.id,
                r.alumno_id,
                a.idsenati,
                r.estado,
                r.fecha_envio,
                r.fecha_entrada,
                r.fecha_salida,
                r.observacion,
                CONCAT(a.nombres, ' ', a.apellidos) AS alumno,
                CONCAT(i.nombre, ' ', i.apellido) AS instructor,
                CONCAT(g.nombre, ' ', g.apellido) AS vigilante,
                CONCAT(d.tipo, ' ', d.marca, ' ', d.modelo) AS objeto
            FROM registro_dispositivo r
            JOIN datos_alumnos a
                ON r.alumno_id = a.id
            JOIN instructor i
                ON r.instructor_id = i.id
            JOIN vigilante g
                ON r.guardia_id = g.id
            JOIN dispositivos_x_alumno d
                ON r.objeto_id = d.id
        `;

        const [rows] = await db.promise().query(query);

        return rows;
    }

    async crearDispositivo(data) {
        const query = `
            INSERT INTO dispositivos_x_alumno (
                tipo,
                marca,
                modelo,
                numero_serie,
                descripcion,
                estado,
                usuario_creacion,
                fecha_creacion
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        const values = [
            data.tipo,
            data.marca,
            data.modelo,
            data.numero_serie,
            data.descripcion,
            1,
            "sistema",
        ];

        const [result] = await db.promise().query(query, values);

        return result.insertId;
    }

    async crearRegistro(data) {
        const query = `
            INSERT INTO registro_dispositivo (
                estado,
                fecha_envio,
                alumno_id,
                instructor_id,
                guardia_id,
                objeto_id,
                usuario_creacion,
                fecha_creacion
            )
            VALUES (?, NOW(), ?, ?, ?, ?, ?, NOW())
        `;

        const values = [
            1,
            data.alumno_id,
            data.instructor_id,
            data.guardia_id,
            data.objeto_id,
            "sistema",
        ];

        const [result] = await db.promise().query(query, values);

        return result.insertId;
    }
}

module.exports = new RegistroDispositivoRepository();
