import { useState, useEffect } from 'react';
import '../styles/App.css';
import BarraLateral from '../components/BarraLateral';
import NavegacionSuperior from '../components/NavegacionSuperior';
import Navbar from '../components/Navbar';
import ResultadosBusqueda from '../components/ResultadosBusqueda';
import DetallesItem from '../components/DetallesItem';
import EstadoEntrada from '../components/EstadoEntrada';
import { API_BASE } from '../services/api';

// Ajustamos la interfaz para que sea más flexible y compatible
interface AlumnoRegistro {
  id: number | string;
  alumno_id?: number | string;
  idsenati: string;
  alumno: string;
  estado: number;
  fecha_envio: string;
  nombre?: string;
  apellido?: string;
  carrera?: string;
  semester?: string; // Nota: si en la base de datos se mantiene inglés o español, ajústalo según corresponda
  semestre?: string;
  instructor?: string;
  tipo?: string;
  marca?: string;
  modelo?: string;
  objeto?: string;
}

function DashboardVigilante() {
  const [alumnos, setAlumnos] = useState<AlumnoRegistro[]>([]);
  const [allAlumnos, setAllAlumnos] = useState<AlumnoRegistro[]>([]);
  const [selectedAlumno, setSelectedAlumno] = useState<AlumnoRegistro | null>(null);
  const [guardia, setGuardia] = useState({ nombre: "Cargando...", rol: "Oficial de Guardia", turno: "", id: "" });

  // 1. Carga de los registros de dispositivos con Token
  const fetchRegistros = () => {
    const token = localStorage.getItem("auth_token");

    fetch(`${API_BASE}/api/registro_dispositivo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((r: any) => ({
          ...r,
          id: r.id,
          alumno_id: r.alumno_id,
          idsenati: r.idsenati,
          alumno: r.alumno,
          estado: r.estado,
          fecha_envio: r.fecha_envio
        }));
        setAllAlumnos(mapped);
        setAlumnos(mapped);
      })
      .catch(err => console.error("Error al cargar registros:", err));
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("auth_token");

    if (userStr) {
      const user = JSON.parse(userStr);
      const vigilanteId = user.guardia_id ?? user.id;

      // 2. Carga de los datos del perfil del vigilante con Token
      fetch(`${API_BASE}/api/vigilantes/${vigilanteId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.vigilante_id) {
            setGuardia({
              nombre: `${data.nombre} ${data.apellido}`,
              rol: `ID de vigilante: ${data.vigilante_id}`,
              turno: data.turno,
              id: data.id
            });
          }
        })
        .catch(err => console.error("Error al cargar vigilante:", err));
    }

    fetchRegistros();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setAlumnos(allAlumnos);
      return;
    }
    const lower = searchTerm.toLowerCase();
    const filtered = allAlumnos.filter(a =>
      a.idsenati.toLowerCase().includes(lower) ||
      a.alumno.toLowerCase().includes(lower)
    );
    setAlumnos(filtered);
  };

  // 3. Selección y carga asíncrona de datos extendidos del alumno con Token
  const handleSelectRegistro = (registro: any) => {
    setSelectedAlumno({
      ...registro,
      nombre: registro.alumno?.split(' ')[0] || '',
      apellido: registro.alumno?.split(' ').slice(1).join(' ') || '',
    });

    if (registro.alumno_id) {
      const token = localStorage.getItem("auth_token");

      fetch(`${API_BASE}/api/alumnos/${registro.alumno_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(alumnoData => {
          setSelectedAlumno(prev => {
            if (!prev) return null;
            return {
              ...prev,
              carrera: alumnoData.carrera,
              semestre: alumnoData.semestre,
              idsenati: alumnoData.idsenati,
              instructor: alumnoData.instructor,
              tipo: registro.objeto?.split(' ')[0] || 'Dispositivo',
              marca: registro.objeto?.split(' ')[1] || 'N/A',
              modelo: registro.objeto?.split(' ').slice(2).join(' ') || 'N/A',
            };
          });
        })
        .catch(err => console.error("Error al cargar detalles extra:", err));
    }
  };

  return (
    <div className="layout-wrapper">
      <Navbar />
      <div className="app-container">
        <BarraLateral alumno={selectedAlumno} />

        <div className="main-content">
          <NavegacionSuperior guardia={guardia} onSearch={handleSearch} />

          <div className="content-area">
            <ResultadosBusqueda
              alumnos={alumnos}
              selectedAlumno={selectedAlumno}
              onSelect={handleSelectRegistro}
            />
            <div className="content-grid">
              <DetallesItem alumno={selectedAlumno} />
              <EstadoEntrada
                alumno={selectedAlumno}
                guardiaId={guardia.id}
                onRefresh={fetchRegistros}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardVigilante;