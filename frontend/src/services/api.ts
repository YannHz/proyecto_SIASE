// En desarrollo: API_BASE = '' (vacío) → las peticiones van al mismo origen
// y Vite las redirige al backend via el proxy configurado en vite.config.ts.
// Esto evita el error de CORS porque el navegador no ve un origen cruzado.
//
// En producción: API_BASE = la URL completa del backend (variable de entorno).
const isProd = import.meta.env.PROD; // variable nativa de Vite (sin VITE_ prefix)
export const API_BASE: string = isProd
  ? (import.meta.env.VITE_API_URL as string ?? '')
  : '';
