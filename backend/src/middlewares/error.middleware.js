const errorMiddleware = (err, req, res, next) => {
  console.error("Error no controlado:", err.message);

  res.status(err.status || 500).json({
    error: err.message || "Error interno del servidor",
  });
};

module.exports = errorMiddleware;
