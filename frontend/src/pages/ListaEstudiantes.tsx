// src/components/ListaEstudiantes.tsx
import { useState, useEffect } from "react";
import BarraLateral from "../components/BarraLateral";
import NavegacionSuperior from "../components/NavegacionSuperior";
import Navbar from "../components/Navbar";
import "../styles/lista.css";

interface RegistroAsistencia {
  id: number;
  idsenati: string;
  NombreCompleto: string;
  Carrera: string;
  Semestre?: string | number;
  Fecha: string;
  HoraIngreso: string;
}

const ListaEstudiantes: React.FC = () => {
  const [asistencia, setAsistencia] = useState<RegistroAsistencia[]>([]);
  const [filtroMes, setFiltroMes] = useState<string>("");
  const [filtroCarrera, setFiltroCarrera] = useState<string>("");
  const [filtroId, setFiltroId] = useState<string>("");
  const [selectedAlumno, setSelectedAlumno] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/asistencia-tabla")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setAsistencia(data.data);
        }
      })
      .catch((err) =>
        console.error("Error al cargar asistencia:", err)
      );
  }, []);

  const registrosFiltrados = asistencia.filter((a) => {
    const fecha = new Date(a.Fecha);
    const mesRegistro = fecha.getMonth() + 1;

    const coincideMes = filtroMes
      ? mesRegistro === parseInt(filtroMes)
      : true;

    const coincideCarrera = filtroCarrera
      ? a.Carrera === filtroCarrera
      : true;

    const coincideId = filtroId
      ? a.idsenati.toLowerCase().includes(filtroId.toLowerCase())
      : true;

    return coincideMes && coincideCarrera && coincideId;
  });

  return (
    <div className="layout-wrapper">

      <Navbar />

      <div className="app-container">

        <BarraLateral alumno={selectedAlumno} />

        <div className="main-content">

          <NavegacionSuperior
            guardia={{
              nombre: "Sistema de Asistencia",
              rol: "Panel de Vigilancia",
              turno: "Turno Día",
              id: "SENATI",
            }}
            onSearch={(term) => setFiltroId(term)}
          />

          <div className="content-area">

            <section className="glass-card">

              <h2 className="card-title-main">
                Lista de Asistencia
              </h2>

              <div className="asistencia-stats-bar">

                <div className="stat-box">
                  <span className="stat-label">
                    Registros Encontrados
                  </span>

                  <span className="stat-value">
                    {registrosFiltrados.length}
                  </span>
                </div>

              </div>

              <div className="modern-filters">

                <div className="filter-group">
                  <label>Mes</label>

                  <select
                    className="modern-select"
                    value={filtroMes}
                    onChange={(e) =>
                      setFiltroMes(e.target.value)
                    }
                  >
                    <option value="">
                      Todos los meses
                    </option>

                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Carrera</label>

                  <select
                    className="modern-select"
                    value={filtroCarrera}
                    onChange={(e) =>
                      setFiltroCarrera(e.target.value)
                    }
                  >
                    <option value="">
                      Todas las carreras
                    </option>

                    <option value="Ingeniería de Software con IA">
                      Ingeniería de Software con IA
                    </option>

                    <option value="Diseño Grafico">
                      Diseño Grafico
                    </option>
                  </select>
                </div>

              </div>

            </section>

            <section className="glass-card">

              <h2 className="card-title-main">
                Lista Registrada
              </h2>

              <div className="student-table-wrapper">

                <table className="student-asistencia-table">

                  <thead>
                    <tr>
                      <th>ID SENATI</th>
                      <th>Nombre Completo</th>
                      <th>Carrera</th>
                      <th>Semestre</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                    </tr>
                  </thead>

                  <tbody>

                    {registrosFiltrados.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="empty-row"
                        >
                          No hay registros encontrados
                        </td>
                      </tr>
                    ) : (
                      registrosFiltrados.map((a) => (
                        <tr
                          key={a.id}
                          onClick={() =>
                            setSelectedAlumno({
                              nombre: a.NombreCompleto,
                              carrera: a.Carrera,
                              semestre:
                                a.Semestre ?? "N/A",
                              idsenati: a.idsenati,
                              fecha: a.Fecha,
                              hora: a.HoraIngreso,
                            })
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <td>{a.idsenati}</td>
                          <td>{a.NombreCompleto}</td>
                          <td>{a.Carrera}</td>
                          <td>
                            {a.Semestre ?? "N/A"}
                          </td>
                          <td>{a.Fecha}</td>

                          <td className="time-highlight">
                            {a.HoraIngreso}
                          </td>
                        </tr>
                      ))
                    )}

                  </tbody>

                </table>

              </div>

            </section>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ListaEstudiantes;
