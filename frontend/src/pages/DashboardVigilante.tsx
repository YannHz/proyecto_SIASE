import { useState, useEffect } from 'react';
import '../styles/App.css';
import BarraLateral from '../components/BarraLateral';
import NavegacionSuperior from '../components/NavegacionSuperior';
import Navbar from '../components/Navbar';
import ResultadosBusqueda from '../components/ResultadosBusqueda';
import DetallesItem from '../components/DetallesItem';
import EstadoEntrada from '../components/EstadoEntrada';

function DashboardVigilante() {
  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [allAlumnos, setAllAlumnos] = useState<any[]>([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [guardia, setGuardia] = useState({ nombre: "Cargando...", rol: "Oficial de Guardia", turno: "", id: "" });

  const fetchAlumnos = () => {
    fetch("/api/alumnos")
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((a: any) => ({
          id: a.id,
          alumno_id: a.id,
          idsenati: a.idsenati,
          alumno: a.nombres + " " + a.apellidos,
          estado: 1,
          fecha_envio: new Date().toISOString()
        }));
        setAllAlumnos(mapped);
        setAlumnos(mapped);
      })
      .catch(err => console.error("Error al cargar registros:", err));
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      fetch(`/api/vigilantes/${user.guardia_id}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.vigilante_id) {
            setGuardia({
              nombre: data.nombre + " " + data.apellido,
              rol: "ID de vigilante: " + data.vigilante_id,
              turno: data.turno,
              id: "GRD-" + data.vigilante_id
            });
          }
        })
        .catch(err => console.error("Error al cargar vigilante:", err));
    }

    fetchAlumnos();
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setAlumnos(allAlumnos);
      return;
    }
    const lower = searchTerm.toLowerCase();
    const filtered = allAlumnos.filter(a =>
      a.idsenati.includes(lower) ||
      a.alumno.toLowerCase().includes(lower)
    );
    setAlumnos(filtered);
  };

  const handleSelectRegistro = (registro: any) => {
    fetch(`/api/alumnos/${registro.alumno_id}`)
      .then(res => res.json())
      .then(alumnoData => {
        setSelectedAlumno({
          ...registro,
          nombre: alumnoData.nombres,
          apellido: alumnoData.apellidos,
          carrera: alumnoData.carrera,
          semestre: alumnoData.semestre,
          idsenati: alumnoData.idsenati,
          instructor: alumnoData.instructor,
          tipo: alumnoData.tipo,
          marca: alumnoData.marca,
          modelo: alumnoData.modelo,
          numero_serie: alumnoData.numero_serie,
          descripcion: alumnoData.descripcion
        });
      })
      .catch(err => console.error("Error al cargar datos del alumno:", err));
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
            <EstadoEntrada alumno={selectedAlumno} />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardVigilante;
