const express = require("express");
const router = express.Router();
const alumnosController = require("../controllers/alumnos.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Aplicar el middleware a todas las rutas de alumnos para protegerlas
router.use(authMiddleware.verifyToken);

router.get("/", alumnosController.getAlumnos);
router.get("/:id", alumnosController.obtenerAlumnoFormateadoPorId);
router.get("/:id/datos", alumnosController.obtenerDatosAlumnoPorId);
router.get("/idsenati/:idsenati", alumnosController.obtenerAlumnoPorIdSenati);

module.exports = router;
