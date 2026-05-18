/**
 * Middleware de autorización por rol.
 * Uso: verifyRole("vigilante", "admin")
 * Debe usarse DESPUÉS de verifyToken.
 */
exports.verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ success: false, error: "Acceso denegado: rol no identificado" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: "Acceso denegado: permisos insuficientes" });
    }

    next();
  };
};
