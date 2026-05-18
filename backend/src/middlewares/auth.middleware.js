const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ success: false, error: "No se proporcionó un token de autenticación" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Token inválido o expirado" });
  }
};