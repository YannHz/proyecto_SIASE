const express = require('express');
const router = express.Router();
const tokensVigilanteController = require('../controllers/tokens_vigilante.controller');

router.post('/inicializar', tokensVigilanteController.inicializarTokens);
router.get('/activos/:guardia_id', tokensVigilanteController.getTokensActivos);
router.post('/rotar', tokensVigilanteController.rotarToken);
router.post('/escanear', tokensVigilanteController.escanearQR);
router.get('/ultimo-escaneo/:guardia_id', tokensVigilanteController.obtenerUltimoEscaneo);

module.exports = router;