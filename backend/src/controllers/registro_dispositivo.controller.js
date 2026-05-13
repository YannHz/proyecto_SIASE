const registroService =
    require("../services/registro_dispositivo.service");

class RegistroDispositivoController {

    async obtenerRegistros(req, res) {
        try {
            const resultados =
                await registroService.obtenerRegistros();

            const resultadosOrdenados = resultados.map(
                ({
                    id,
                    alumno_id,
                    idsenati,
                    alumno,
                    objeto,
                    observacion,
                    instructor,
                    vigilante,
                    estado,
                    fecha_envio,
                    fecha_entrada,
                    fecha_salida
                }) => ({
                    id,
                    alumno_id,
                    idsenati,
                    alumno,
                    objeto,
                    observacion,
                    instructor,
                    vigilante,
                    estado,
                    fecha_envio,
                    fecha_entrada,
                    fecha_salida,
                })
            );

            return res.status(200).json(
                resultadosOrdenados
            );
        } catch (error) {

            console.error(
                "Error en obtenerRegistros:",
                error
            );
            return res.status(500).json({
                error: "Error al obtener los registros"
            });
        }
    }
    /*POST - Registrar dispositivo*/

    async registrarDispositivo(req, res) {
        try {
            const resultado =
                await registroService.registrarDispositivo(
                    req.body
                );
            return res.status(201).json({
                message: "Registro creado correctamente",
                data: resultado
            });
        } catch (error) {
            console.error(
                "Error en registrarDispositivo:",
                error
            );
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }
}

module.exports =
    new RegistroDispositivoController();