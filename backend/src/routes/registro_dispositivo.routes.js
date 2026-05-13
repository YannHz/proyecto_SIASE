const express = require("express");

const router = express.Router();

const registroDispositivoController = require("../controllers/registro_dispositivo.controller");

router.get(
  "/",
  registroDispositivoController.obtenerRegistros.bind(
    registroDispositivoController,
  ),
);

router.post(
  "/",
  registroDispositivoController.registrarDispositivo.bind(
    registroDispositivoController,
  ),
);

module.exports = router;
