const { loginService } = require("../services/login.service");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const result = await loginService(usuario, password);
    return res.json(result);
  } catch (error) {
    if (error.message === "Faltan credenciales") {
      return res.status(400).json({ success: false, error: error.message });
    }
    if (error.message === "Credenciales inválidas o usuario inactivo") {
      return res.status(401).json({ success: false, error: error.message });
    }
    console.error("Error de autenticación:", error);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
