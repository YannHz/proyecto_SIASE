const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructor.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Todas las rutas de instructor requieren autenticación
router.use(verifyToken);

router.get("/", instructorController.obtenerInstructores);

module.exports = router;
