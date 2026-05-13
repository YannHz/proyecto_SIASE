class Alumno {
  constructor({
    id = null,
    nombres,
    apellidos,
    idsenati,
    semestre,
    carrera_id,
    estado = 1,
    fecha_creacion = null,
    fecha_modificacion = null,
    usuario_creacion = null,
    usuario_modificacion = null,
    password_alumno,
  }) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.idsenati = idsenati;
    this.semestre = semestre;
    this.carrera_id = carrera_id;
    this.estado = estado;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
    this.usuario_creacion = usuario_creacion;
    this.usuario_modificacion = usuario_modificacion;
    this.password_alumno = password_alumno;
  }

  get nombre_completo() {
    return `${this.nombres} ${this.apellidos}`;
  }
}

module.exports = { Alumno };
