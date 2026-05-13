import { Laptop } from 'lucide-react'
import '../styles/DetallesItem.css'
import type { Alumno } from '../types'

export default function DetallesItem({ alumno }: { alumno: Alumno | null }) {
  return (
    <div className="card-panel detalles-panel">
      <div className="card-title">
        DISPOSITIVO
      </div>
      
      {alumno ? (
        <div className="equipo-details">
          <div className="equipo-header">
            <Laptop className="equipo-icon" />
            EQUIPO ASIGNADO
          </div>
          <div className="equipo-info">
            {alumno.marca ? (
              <>
                <div className="equipo-grid">
                  <div className="equipo-grid-item">
                    <span className="equipo-label">Marca</span>
                    <span className="equipo-value value-box">{alumno.marca}</span>
                  </div>
                  <div className="equipo-grid-item">
                    <span className="equipo-label">Modelo</span>
                    <span className="equipo-value value-box">{alumno.modelo}</span>
                  </div>
                  <div className="equipo-grid-item">
                    <span className="equipo-label">No. Serie</span>
                    <span className="equipo-value serie-mono">{alumno.numero_serie || "N/A"}</span>
                  </div>
                </div>
                {alumno.descripcion && (
                  <div className="equipo-descripcion">
                    <span className="equipo-label">Descripción</span>
                    <p className="equipo-desc-text">{alumno.descripcion}</p>
                  </div>
                )}
              </>
            ) : (
              <p><strong>Descripción:</strong> No registrado</p>
            )}
          </div>
        </div>
      ) : (
        <div className="empty-detalles">
          DESCRIPCION / DATOS
        </div>
      )}
    </div>
  )
}
