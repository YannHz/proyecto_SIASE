import type { Alumno } from "../types/alumnos";
import { API_BASE } from "./api";

const API_URL = `${API_BASE}/api/alumnos`;

export const obtenerAlumno = async (
  id: number
): Promise<Alumno> => {
  // Recuperamos el token almacenado localmente en el momento de la petición
  const token = localStorage.getItem("auth_token");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // Inyección del token de sesión
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener alumno");
  }

  return await response.json();
};

export const obtenerAlumnoFormateado = obtenerAlumno;