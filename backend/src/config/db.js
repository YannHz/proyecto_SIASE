const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "80.241.217.53",
  user: "desarrollador",
  password: "SENATI",
  database: "proyecto_SIASE",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("Error de conexión:", err);
  } else {
    console.log("Conectado a MySQL");
    connection.release();
  }
});

module.exports = pool;
