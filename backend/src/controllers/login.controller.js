const jwt = require("jsonwebtoken");
const { loginService } = require("../services/login.service");

exports.login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const result = await loginService(usuario, password);

    const token = jwt.sign(
      { id: result.user.id, role: result.role, usuario },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Mantenemos la cookie por compatibilidad en local si lo deseas
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 día
    });

    // MODIFICACIÓN CRÍTICA: Adjuntamos el token directamente en la respuesta JSON
    return res.json({
      ...result, // Esto arrastra data.success, data.user, data.role, data.redirectUrl intactos
      token: token // <-- Ahora React lo puede leer y guardar en localStorage
    });

  } catch (error) {
    if (error.message === "Faltan credenciales") {
      return res.status(400).json({ success: false, error: error.message });
    }
    if (error.message === "Credenciales inválidas o usuario inactivo") {
      return res.status(401).json({ success: false, error: error.message });
    }
    console.error("Error de autenticación:", error.message);
    return res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });
  return res.json({ success: true, message: "Sesión cerrada correctamente" });
};