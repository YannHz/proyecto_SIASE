import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import DashboardVigilante from "./pages/DashboardVigilante";
import DashboardAlumno from "./pages/DashboardAlumno";
import QRVigilante from "./pages/QRVigilante";
import QRAlumno from "./pages/QRAlumno";
import AsistenciaAlumno from "./pages/AsistenciaAlumno";
import ListaEstudiantes from "./pages/ListaEstudiantes";
import ProtectedRoute from "./components/ProtectedRoute";
import EscanerAlumno from "./pages/EscanerAlumno";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard-vigilante"
          element={
            <ProtectedRoute requiredRole="vigilante">
              <DashboardVigilante />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-vigilante/qr-vigilante"
          element={
            <ProtectedRoute requiredRole="vigilante">
              <QRVigilante />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard-alumno"
          element={
            <ProtectedRoute requiredRole="alumno">
              <DashboardAlumno />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qr-alumno"
          element={
            <ProtectedRoute requiredRole="alumno">
              <QRAlumno />
            </ProtectedRoute>
          }
        />

        <Route
          path="/escaner-alumno"
          element={
            <ProtectedRoute requiredRole="alumno">
              <EscanerAlumno />
            </ProtectedRoute>
          }
        />

        <Route
          path="/asistencia-alumno"
          element={
            <ProtectedRoute requiredRole="alumno">
              <AsistenciaAlumno />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ListaEstudiantes"
          element={
            <ProtectedRoute requiredRole="vigilante">
              <ListaEstudiantes />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
