import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGamepad, FaSearch, FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import './styling/navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="luxe-navbar">
      <div className="luxe-nav-container">
        {/* Logo/Brand */}
        <Link to="/" className="luxe-nav-brand">
          <FaGamepad className="luxe-nav-icon" />
          <span>Luxe</span>Gaming
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="luxe-mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
        </button>

        {/* Navigation Links */}
        <div className={`luxe-nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/Home" className="luxe-nav-link">Home</Link>
          <Link to="/Getgame" className="luxe-nav-link">Games</Link>
          <Link to="/Addgame" className="luxe-nav-link">Submit Game</Link>
          <Link to="/Aboutus" className="luxe-nav-link">About</Link>
        </div>

        {/* Right Side Icons and Auth Buttons */}
        <div className="luxe-nav-right">
          <button className="luxe-nav-icon-btn">
            <FaSearch />
          </button>
          
          {isAuthenticated ? (
            <div 
              className="luxe-user-menu"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <button className="luxe-nav-icon-btn">
                <FaUser />
              </button>
              {isUserMenuOpen && (
                <div className="luxe-user-dropdown">
                  <Link to="/profile" className="luxe-dropdown-item">My Profile</Link>
                  <Link to="/library" className="luxe-dropdown-item">My Games</Link>
                  <button onClick={handleLogout} className="luxe-dropdown-item">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="luxe-auth-buttons">
              <Link to="/signin" className="luxe-signin-btn">
                <FaSignInAlt className="luxe-btn-icon" />
                Sign In
              </Link>
              <Link to="/signup" className="luxe-signup-btn">
                <FaUserPlus className="luxe-btn-icon" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;