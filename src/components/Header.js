import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Header.css';

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="header-container">
      <div className="logo">
        <Link to="/">
          <h1>Event Planner</h1>
        </Link>
      </div>
      <nav className="nav-menu">
        <ul>
          <li className={path === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={path === '/events' ? 'active' : ''}>
            <Link to="/events">Events</Link>
          </li>
          <li className={path === '/profile' ? 'active' : ''}>
            <Link to="/profile">Profile</Link>
          </li>
          <li className={path === '/login' ? 'active' : ''}>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;