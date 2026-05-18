import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import senatiVigilante from "../assets/SenatiVigilante.png";
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  const navItems = [
    { title: 'Dashboard', path: '/dashboard-vigilante' },
    { title: 'QR guardia', path: '/dashboard-vigilante/qr-vigilante' },
    { title: 'Asistencia', path: '/ListaEstudiantes' }
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="global-navbar">
        <div className="navbar-container">
          <Link to="/dashboard-vigilante" className="navbar-logo">
            <img src={senatiVigilante} alt="SENATI" className="logo" />
            <span className="titulo">SIASE</span>
          </Link>

          <div className="navbar-menu">
            <div className="nav-links">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <button className="navbar-logout logout-btn" onClick={handleLogout} title="Cerrar sesión">
              <LogOut size={20} className="logout-icon" />
              <span>Salir</span>
            </button>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Overlay oscuro */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Panel lateral móvil */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {item.title}
          </Link>
        ))}
        <button className="mobile-logout-btn logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Salir</span>
        </button>
      </div>
    </>
  );
};

export default Navbar;
