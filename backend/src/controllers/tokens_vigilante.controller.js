const tokensVigilanteService = require('../services/tokens_vigilante.service');

const inicializarTokens = async (req, res) => {
    const { guardia_id } = req.body;
    try {
        const creados = await tokensVigilanteService.inicializarTokens(guardia_id);
        res.json({ message: "Tokens inicializados", creados });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTokensActivos = async (req, res) => {
    const { guardia_id } = req.params;
    try {
        const tokens = await tokensVigilanteService.obtenerTokensActivos(guardia_id);
        res.json(tokens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const rotarToken = async (req, res) => {
    const { guardia_id } = req.body;
    try {
        const nuevoToken = await tokensVigilanteService.rotarToken(guardia_id);
        res.json({ message: "Rotacion exitosa", token: nuevoToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const escanearQR = async (req, res) => {
    const { token, alumno_id, guardia_id } = req.body;
    try {
        await tokensVigilanteService.escanearQR(token, alumno_id, guardia_id);
        res.json({ success: true, message: "Asistencia marcada con exito" });
    } catch (error) {
        if (error.message === "Token invalido") {
            return res.status(400).json({ error: "Token invalido o ya usado" });
        }
        res.status(500).json({ error: error.message });
    }
};

const obtenerUltimoEscaneo = async (req, res) => {
    const { guardia_id } = req.params;
    try {
        const escaneo = await tokensVigilanteService.obtenerUltimoEscaneo(guardia_id);
        res.json(escaneo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    inicializarTokens,
    getTokensActivos,
    rotarToken,
    escanearQR,
    obtenerUltimoEscaneo
};