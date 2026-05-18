const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const loginController = require("../controllers/login.controller");

// Rate limiting: máximo 10 intentos de login cada 15 minutos por IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, error: "Demasiados intentos de login, intente de nuevo en 15 minutos" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", loginLimiter, loginController.login);
router.post("/logout", loginController.logout);

module.exports = router;
