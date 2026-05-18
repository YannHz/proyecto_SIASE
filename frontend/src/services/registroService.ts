import { API_BASE } from './api';

const API = `${API_BASE}/api`;

// Función auxiliar para obtener el token de forma limpia
const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const obtenerAlumno = async (id: string) => {
  const response = await fetch(`${API}/alumnos/${id}`, {
    method: "GET",
    headers: getAuthHeaders() // Se inyectan las cabeceras con el Token
  });
  
  if (!response.ok) throw new Error(`Error al obtener alumno: ${response.status}`);
  return await response.json();
};

export const obtenerInstructores = async () => {
  const response = await fetch(`${API}/instructores`, {
    method: "GET", 
    headers: getAuthHeaders() // Se inyectan las cabeceras con el Token
  });
  
  if (!response.ok) throw new Error(`Error al obtener instructores: ${response.status}`);
  return await response.json();
};

export const registrarDispositivo = async (data: any) => {
  const response = await fetch(`${API}/registro-dispositivo`, {
    method: 'POST',
    headers: getAuthHeaders(), // Centralizado maneja tanto el Content-Type como el Token
    body: JSON.stringify(data)
  });
  
  if (!response.ok) throw new Error(`Error al registrar dispositivo: ${response.status}`);
  return await response.json();
};