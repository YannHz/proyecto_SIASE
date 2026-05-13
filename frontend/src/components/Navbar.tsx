import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { title: 'Dashboard', path: '/dashboard-vigilante' },
    { title: 'Escáner de QR', path: '/qr-vigilante' },
    { title: 'Asistencia', path: '/asistencia-vigilante' }
  ];

  return (
    <nav className="global-navbar">
      <div className="navbar-container">
        <Link to="/dashboard-vigilante" className="navbar-logo">
          SIASE
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
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.title}
          </Link>
        ))}
        <button className="mobile-logout-btn logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Salir</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
