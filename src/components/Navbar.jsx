import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SideNavModal from './SideNavModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLightTheme =
    location.pathname.startsWith('/feed') ||
    location.pathname.startsWith('/startups') ||
    location.pathname.startsWith('/studio') ||
    location.pathname.startsWith('/corporates') ||
    location.pathname.startsWith('/ventures') ||
    location.pathname.startsWith('/portfolio') ||
    location.pathname.startsWith('/companies');

  // Lock body scroll and handle ESC key when menu is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const isBorderlessNav =
    location.pathname.startsWith('/portfolio') ||
    location.pathname.startsWith('/companies') ||
    location.pathname.startsWith('/feed') ||
    location.pathname.startsWith('/startups') ||
    location.pathname.startsWith('/studio') ||
    location.pathname.startsWith('/corporates') ||
    location.pathname.startsWith('/ventures') ||
    location.pathname.startsWith('/about') ||
    location.pathname.startsWith('/team');

  return (
    <>
      <header className={`nav-header ${isMenuOpen ? 'menu-open' : ''} ${isLightTheme ? 'light-theme' : ''} ${isBorderlessNav ? 'portfolio-header' : ''}`}>
        <div className="nav-container">
          {/* 123 Factory Logo Image (Stays in exact same spot always) */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
            <Link to="/" className="nav-logo-link" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src="/123-logo.png"
                alt="123 Factory Logo"
                style={{
                  height: '32px',
                  width: 'auto',
                  filter: isMenuOpen ? 'brightness(0) invert(1)' : isLightTheme ? 'none' : 'brightness(0) invert(0.97) sepia(0.15) saturate(1.2) hue-rotate(345deg)',
                  display: 'block'
                }}
              />
            </Link>
          </div>

          {/* Dynamic Center Title - Smoothly fades out when menu is open */}
          <div style={{ flex: '1 1 auto', textAlign: 'center', transition: 'opacity 0.25s ease', opacity: isMenuOpen ? 0 : 1, pointerEvents: isMenuOpen ? 'none' : 'auto' }}>
            {isHome ? (
              <span className="nav-page-title">123 Factory</span>
            ) : null}
          </div>

          {/* Fixed Position Toggle Button: Morphing Hamburger / X at exact same spot */}
          <div style={{ flex: '0 0 auto' }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`earlybird-borderless-hamburger ${isMenuOpen ? 'open' : ''}`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="earlybird-line line-1"></span>
              <span className="earlybird-line line-2"></span>
              <span className="earlybird-line line-3"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Earlybird Liquid Wave Reveal Side Nav Modal */}
      <SideNavModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
