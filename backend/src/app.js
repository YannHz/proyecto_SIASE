const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const app = express();

// Configurar para confiar en el proxy inverso (Nginx, etc.)
// Esto permite que express-rate-limit use la IP real del cliente en lugar de la IP del proxy
app.set("trust proxy", 1);

app.use(helmet());

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : [
    "http://localhost:5173", // Vite default port
    "http://localhost:4000", // Puerto configurado en vite.config.ts
    "http://localhost:3000",
    "http://80.241.217.53:4000",
    "http://80.241.217.53"
  ];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

const loginRoutes = require("./routes/login.routes");
const alumnosRoutes = require("./routes/alumnos.routes");
const instructorRoutes = require("./routes/instructor.routes");
const registroDispositivoRoutes = require("./routes/registro_dispositivo.routes");
const vigilanteRoutes = require("./routes/vigilante.routes");
const tokensVigilanteRoutes = require("./routes/tokens_vigilante.routes");
const asistenciaRoutes = require("./routes/asistencia.routes");
const AsistenciaTablaRoutes = require("./routes/AsistenciaTabla.routes");

app.use("/login", loginRoutes);

app.use("/api/alumnos", alumnosRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/registro_dispositivo", registroDispositivoRoutes);
app.use("/api/vigilantes", vigilanteRoutes);
app.use("/api/tokens_vigilante", tokensVigilanteRoutes);
app.use("/api/asistencia", asistenciaRoutes);
app.use("/api/asistencia-tabla", AsistenciaTablaRoutes);

app.use((err, req, res, next) => {
  console.error("Error no controlado:", err.message);
  res.status(500).json({ error: "Error en el servidor" });
});

module.exports = app;