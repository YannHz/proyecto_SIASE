const express = require("express");
const router = express.Router();
const vigilanteController = require("../controllers/vigilante.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { verifyRole } = require("../middlewares/role.middleware");

// Todas las rutas de vigilante requieren autenticación
router.use(verifyToken);

router.put(
  "/registro/:id/estado",
  verifyRole("vigilante"),
  vigilanteController.putEstadoRegistro.bind(vigilanteController),
);

router.get(
  "/:vigilante_id",
  vigilanteController.getVigilantePorId.bind(vigilanteController),
);

module.exports = router;
