const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/registro_dispositivo.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.use(verifyToken);

router.get("/", ctrl.obtenerRegistros.bind(ctrl));
router.post("/", ctrl.registrarDispositivo.bind(ctrl));

router.get("/alumno/:alumno_id/dispositivos", ctrl.obtenerDispositivosPorAlumno.bind(ctrl));
router.get("/alumno/:alumno_id/solicitudes", ctrl.obtenerSolicitudesPorAlumno.bind(ctrl));
router.post("/solicitud-ingreso", ctrl.crearSolicitudIngreso.bind(ctrl));
router.put("/:id/marcar-entrada", ctrl.marcarEntrada.bind(ctrl));
router.put("/:id/marcar-salida", ctrl.marcarSalida.bind(ctrl));

module.exports = router;
