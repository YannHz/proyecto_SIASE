const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructor.controller");

router.get("/", instructorController.obtenerInstructores);

module.exports = router;
