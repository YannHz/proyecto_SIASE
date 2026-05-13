const alumnosRepository = require("../repositories/alumnos.repository");
const vigilanteRepository = require("../repositories/vigilante.repository");

const loginService = async (usuario, password) => {
  if (!usuario || !password) {
    throw new Error("Faltan credenciales");
  }

  const alumnos = await alumnosRepository.obtenerAlumnoPorCredenciales(usuario, password);

  if (alumnos.length > 0) {
    return { success: true, redirectUrl: "/dashboard-alumno", role: "alumno", user: alumnos[0] };
  }

  const vigilantes = await vigilanteRepository.obtenerVigilantePorCredenciales(usuario, password);

  if (vigilantes.length > 0) {
    return { success: true, redirectUrl: "/dashboard-vigilante", role: "vigilante", user: vigilantes[0] };
  }

  throw new Error("Credenciales inválidas o usuario inactivo");
};

module.exports = {
  loginService,
};
