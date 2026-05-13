import '../styles/EstadoEntrada.css'
import type { Alumno } from '../types'

export default function EstadoEntrada({ alumno }: { alumno: Alumno | null }) {
  const disabled = !alumno;
  
  return (
    <div className="card-panel estado-panel">
      <div className="card-title center">
        ESTADO DE ENTRADA Y FECHAS DE ENTRADA
      </div>
      
      <div className="estado-content">
        <div className="action-buttons">
          <button 
            disabled={disabled}
            className="btn-action btn-entrada"
          >
            ENTRADA
          </button>
          <button 
            disabled={disabled}
            className="btn-action btn-salida"
          >
            SALIDA
          </button>
        </div>
        
        {alumno && (
          <div className="ultimo-registro">
            Último registro: 
            <span className={`registro-estado ${alumno.estado === 1 ? 'ingreso' : 'salida'}`}>
              {alumno.estado === 1 ? 'INGRESO' : 'SALIDA'}
            </span> a las {new Date(alumno.fecha_envio).toLocaleString('en-CA', { hour12: true }).replace(',', '')}
          </div>
        )}
      </div>
    </div>
  )
}
