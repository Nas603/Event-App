import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header-container">
      <div className="logo">
        <h1><Link to="/">Event Tracker</Link></h1>
      </div>
      <nav className="nav-menu">
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === '/events' ? 'active' : ''}>
            <Link to="/EventsPage">Events</Link>
          </li>
          <li className={location.pathname === '/about' ? 'active' : ''}>
            <Link to="/about">About</Link>
          </li>
          <li className={location.pathname === '/contact' ? 'active' : ''}>
            <Link to="/contact">Contact</Link>
          </li>
          <li className={location.pathname === '/profile' ? 'active' : ''}>
            <Link to="/profile">Profile</Link>
          </li>
          <li className={location.pathname === '/auth' ? 'active' : ''}>
            <Link to="/auth">Login / Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;