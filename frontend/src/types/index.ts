export interface Guardia {
  nombre: string;
  rol: string;
  turno?: string;
  id?: string;
}

export interface Alumno {
  id: string | number;
  alumno_id?: string | number;
  idsenati: string;
  alumno?: string;
  estado?: number;
  fecha_envio?: string;

  nombre?: string;
  apellido?: string;
  carrera?: string;
  curso?: string;
  semestre?: string;
  instructor?: string;

  tipo?: string;
  marca?: string;
  modelo?: string;
  numero_serie?: string;
  descripcion?: string;
}
