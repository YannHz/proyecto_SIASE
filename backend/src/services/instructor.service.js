const instructorRepository = require("../repositories/instructor.repository");

exports.obtenerInstructores = async () => {
  return await instructorRepository.obtenerInstructores();
};
