const bcrypt = require("bcrypt");
const alumnosRepository = require("../repositories/alumnos.repository");
const vigilanteRepository = require("../repositories/vigilante.repository");

const loginService = async (usuario, password) => {
  if (!usuario || !password) {
    throw new Error("Faltan credenciales");
  }

  const alumnos = await alumnosRepository.obtenerAlumnoPorCredenciales(usuario);

  if (alumnos.length > 0) {
    const match = await bcrypt.compare(password, alumnos[0].password_alumno);
    if (match) {
      const { password_alumno, ...safeUser } = alumnos[0];
      return { success: true, redirectUrl: "/dashboard-alumno", role: "alumno", user: safeUser };
    }
  }

  const vigilantes = await vigilanteRepository.obtenerVigilantePorCredenciales(usuario);

  if (vigilantes.length > 0) {
    const match = await bcrypt.compare(password, vigilantes[0].password_vigilante);
    if (match) {
      const { password_vigilante, ...safeUser } = vigilantes[0];
      return { success: true, redirectUrl: "/dashboard-vigilante", role: "vigilante", user: safeUser };
    }
  }

  throw new Error("Credenciales inválidas o usuario inactivo");
};

module.exports = {
  loginService,
};
