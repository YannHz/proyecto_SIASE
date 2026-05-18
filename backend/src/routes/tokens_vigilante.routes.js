const express = require('express');
const router = express.Router();
const tokensVigilanteController = require('../controllers/tokens_vigilante.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyRole } = require('../middlewares/role.middleware');

// Todas las rutas de tokens requieren autenticación y rol vigilante
router.use(verifyToken);
router.use(verifyRole("vigilante"));

router.post('/inicializar', tokensVigilanteController.inicializarTokens);
router.get('/activos/:guardia_id', tokensVigilanteController.getTokensActivos);
router.post('/rotar', tokensVigilanteController.rotarToken);
router.post('/escanear', tokensVigilanteController.escanearQR);
router.get('/ultimo-escaneo/:guardia_id', tokensVigilanteController.obtenerUltimoEscaneo);

module.exports = router;