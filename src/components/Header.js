import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Header.css';

const Header = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const location = useLocation();

  return (
    <header className="header-container">
      <div className="logo">
        <h1><Link to="/">Eventer</Link></h1>
      </div>
      <nav className="nav-menu">
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/" className="header-button">Home</Link>
          </li>
          <li className={location.pathname === '/events' ? 'active' : ''}>
            <Link to="/events" className="header-button">Events</Link>
          </li>
          <li className={location.pathname === '/about' ? 'active' : ''}>
            <Link to="/about" className="header-button">About</Link>
          </li>
          <li className={location.pathname === '/contact' ? 'active' : ''}>
            <Link to="/contact" className="header-button">Contact</Link>
          </li>
          {isAuthenticated && (
            <li className={location.pathname === '/profile' ? 'active' : ''}>
              <Link to="/profile" className="header-button">Profile</Link>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <button 
                onClick={() => loginWithRedirect()} 
                className="header-button"
              >
                Login / Sign Up
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;