const express = require("express");
const router = express.Router();

const AsistenciaTablaController = require("../controllers/AsistenciaTabla.controller");

router.get("/", AsistenciaTablaController.ListarTablaAsistencia);

module.exports = router;