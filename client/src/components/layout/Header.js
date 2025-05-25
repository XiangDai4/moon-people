import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import '../../styles/Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAdminMenuOpen, setMobileAdminMenuOpen] = useState(false);
  
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">Moon People</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            
            {/* Only show Admin button if user exists and has admin role */}
            {user && user.role === 'admin' && (
              <div className="dropdown">
                <button className="dropdown-toggle">
                  Admin
                  {/* No need for explicit after element, added in CSS */}
                </button>
                <div className="dropdown-menu">
                  <Link to="/admin/categories">Categories</Link>
                  <Link to="/admin/services">Services</Link>
                </div>
              </div>
            )}

            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            
            <div className="divider"></div>
            
            <Link to="/need-support" className="nav-link-highlighted">I Need Support</Link>
            <Link to="/want-to-support" className="nav-link-highlighted secondary">I Want to Support</Link>
            
            {isAuthenticated ? (
              <div className="auth-links">
                <Link to="/profile" className="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
                <button onClick={logout} className="logout-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="register-button">Register</Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          {/* Admin Mobile Menu */}
          {user && user.role === 'admin' && (
            <div className="mobile-admin-dropdown">
              <button 
                className="mobile-admin-toggle"
                onClick={() => setMobileAdminMenuOpen(!mobileAdminMenuOpen)}
              >
                Admin
                <svg xmlns="http://www.w3.org/2000/svg" className="mobile-nav-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileAdminMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  )}
                </svg>
              </button>
              <div className={`mobile-admin-menu ${mobileAdminMenuOpen ? 'open' : ''}`}>
                <Link to="/admin/categories" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
                <Link to="/admin/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              </div>
            </div>
          )}
          
          <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          
          <div className="mobile-nav-divider"></div>
          
          <Link to="/need-support" className="mobile-nav-link primary" onClick={() => setMobileMenuOpen(false)}>
            I Need Support
          </Link>
          <Link to="/want-to-support" className="mobile-nav-link secondary" onClick={() => setMobileMenuOpen(false)}>
            I Want to Support
          </Link>
          
          <div className="mobile-nav-divider"></div>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="mobile-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </Link>
              <button 
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }} 
                className="mobile-nav-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mobile-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="mobile-nav-link register" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;