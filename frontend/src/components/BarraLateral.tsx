import { useState } from 'react'
import { User, UserX, ChevronRight, ChevronLeft } from 'lucide-react'
import '../styles/BarraLateral.css'
import type { Alumno } from '../types'

export default function BarraLateral({ alumno }: { alumno: Alumno | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`barra-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Ocultar Alumno" : "Ver Alumno"}
      >
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      <div className={`barra-lateral ${isOpen ? 'open' : ''}`}>
        <div className="barra-lateral-header">
          <h1 className="barra-lateral-title">
            ALUMNO
          </h1>
        </div>

        {alumno ? (
          <>
            <div className="avatar-container">
              <div className="avatar">
                <User className="avatar-icon" />
              </div>
            </div>

            <div className="alumno-info-list">
              <div className="info-item">
                <span className="info-label">ID ALUMNO</span>
                <span>{alumno.idsenati || alumno.alumno_id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">NOMBRE</span>
                <span>{alumno.nombre}</span>
              </div>
              <div className="info-item">
                <span className="info-label">APELLIDO</span>
                <span>{alumno.apellido}</span>
              </div>
              <div className="info-item">
                <span className="info-label">CARRERA</span>
                <span>{alumno.carrera || alumno.curso}</span>
              </div>
              {alumno.semestre && (
                <div className="info-item">
                  <span className="info-label">SEMESTRE</span>
                  <span>{alumno.semestre}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">INSTRUCTOR</span>
                <span>{alumno.instructor || "No asignado"}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <UserX className="empty-icon" />
            <p className="empty-text">
              Selecciona un alumno de la lista para ver sus datos
            </p>
          </div>
        )}
      </div>
    </>
  )
}
