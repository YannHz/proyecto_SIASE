const express = require("express");
const router = express.Router();
const { getAsistencias } = require("../controllers/asistencia.controller");

router.get("/", getAsistencias);

module.exports = router;
