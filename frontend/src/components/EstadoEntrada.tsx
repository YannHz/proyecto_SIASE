import '../styles/EstadoEntrada.css'
import type { Alumno } from '../types'
import { API_BASE } from '../services/api'
import { useState } from 'react'

interface Props {
  alumno: Alumno | null;
  guardiaId?: string | number;
  onRefresh?: () => void;
}

export default function EstadoEntrada({ alumno, guardiaId, onRefresh }: Props) {
  const [loading, setLoading] = useState(false);
  const disabled = !alumno || loading;

  const handleEntrada = async () => {
    if (!alumno || !guardiaId) return;
    setLoading(true);

    // 1. Recuperamos el token almacenado
    const token = localStorage.getItem("auth_token");

    try {
      const resp = await fetch(`${API_BASE}/api/registro_dispositivo/${alumno.id}/marcar-entrada`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Inyectamos el token en la cabecera
        },
        body: JSON.stringify({ guardia_id: guardiaId })
      });
      if (resp.ok) {
        if (onRefresh) onRefresh();
      } else {
        alert("Error al marcar entrada");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSalida = async () => {
    if (!alumno) return;
    setLoading(true);

    // 2. Recuperamos el token almacenado
    const token = localStorage.getItem("auth_token");

    try {
      const resp = await fetch(`${API_BASE}/api/registro_dispositivo/${alumno.id}/marcar-salida`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Inyectamos el token en la cabecera
        }
      });
      if (resp.ok) {
        if (onRefresh) onRefresh();
      } else {
        alert("Error al marcar salida");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoLabel = (estado?: number) => {
    switch (estado) {
      case 0: return 'EN ESPERA';
      case 1: return 'INGRESO';
      case 2: return 'SALIDA';
      default: return 'DESCONOCIDO';
    }
  };

  const getEstadoClass = (estado?: number) => {
    switch (estado) {
      case 0: return 'espera';
      case 1: return 'ingreso';
      case 2: return 'salida';
      default: return '';
    }
  };

  return (
    <div className="card-panel estado-panel">
      <div className="card-title center">
        ESTADO DE ENTRADA Y FECHAS DE ENTRADA
      </div>

      <div className="estado-content">
        <div className="action-buttons">
          <button
            disabled={disabled || alumno?.estado !== 0}
            className="btn-action btn-entrada"
            onClick={handleEntrada}
          >
            {loading ? '...' : 'ENTRADA'}
          </button>
          <button
            disabled={disabled || alumno?.estado !== 1}
            className="btn-action btn-salida"
            onClick={handleSalida}
          >
            {loading ? '...' : 'SALIDA'}
          </button>
        </div>

        {alumno && (
          <div className="ultimo-registro">
            Estado actual:
            <span className={`registro-estado ${getEstadoClass(alumno.estado)}`}>
              {getEstadoLabel(alumno.estado)}
            </span>
            {alumno.fecha_envio && (
              <> enviado el {new Date(alumno.fecha_envio).toLocaleDateString()}</>
            )}
          </div>
        )}
      </div>
    </div>
  )
}