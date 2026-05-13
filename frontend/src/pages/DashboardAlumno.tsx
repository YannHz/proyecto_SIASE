import Navbar from '../components/Navbar';

const DashboardAlumno = () => (
  <div className="layout-wrapper">
    <Navbar />
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#eef2f3" }}>
      <h1>Menú del Alumno</h1>
      <p>Bienvenido al Sistema Académico</p>
      <button onClick={() => window.location.href = "/"} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Cerrar Sesión
      </button>
    </div>
  </div>
);

export default DashboardAlumno;
