import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PawLogo from '../assets/PawLogo';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const user = (() => { try { return JSON.parse(localStorage.getItem('user')); } catch (e) { return null; } })();
  const isAdmin = localStorage.getItem('role') === 'ADMIN';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <PawLogo size={36} />
          <span className="logo-text"><span>Pawfect</span> <span>Adopt</span></span>
        </Link>

        <div className={`nav-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)} />
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/pets" className={location.pathname === '/pets' ? 'active' : ''}>Browse Pets</Link></li>
          {user && !isAdmin && <li><Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link></li>}
          {isAdmin && <li><Link to="/admin" className={location.pathname.startsWith('/admin') ? 'active' : ''}>Dashboard</Link></li>}
          <li className="nav-mobile-only">
            {!user ? (
              <Link to="/login" className="btn btn-primary btn-sm" style={{ width: '100%' }}>Login</Link>
            ) : (
              <button className="btn btn-danger btn-sm" onClick={handleLogout} style={{ width: '100%' }}>Logout</button>
            )}
          </li>
        </ul>

        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          ) : (
            <div className="nav-user-menu">
              <span className="nav-user-avatar">
                {(user?.fullName || user?.email || 'U').charAt(0).toUpperCase()}
              </span>
              <div className="nav-dropdown">
                {!isAdmin && <Link to="/profile">My Profile</Link>}
                {isAdmin && <Link to="/admin">Dashboard</Link>}
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
