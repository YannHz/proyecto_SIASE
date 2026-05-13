const instructorService = require("../services/instructor.service");

exports.obtenerInstructores = async (req, res) => {
  try {
    const instructores = await instructorService.obtenerInstructores();

    res.json(instructores);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
