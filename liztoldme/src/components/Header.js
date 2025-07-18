import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Home.css';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="floating-header">
      <nav className="navbar">
        <div className="logo">Elohim-guides-me</div>
        <ul className="nav-list">
          <li>
            <Link to="/" onClick={() => scrollToSection('home')}>Home</Link>
          </li>
          <li>
            <Link to="/" onClick={() => scrollToSection('about')}>About</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;