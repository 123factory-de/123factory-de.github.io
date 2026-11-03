import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideNavModal({ isOpen, onClose }) {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navLinks = [
    { label: 'ABOUT', path: '/about' },
    { label: 'STARTUPS', path: '/startups' },
    { label: 'CORPORATES', path: '/corporates' },
    { label: 'PORTFOLIO', path: '/portfolio' },
    { label: 'FEED', path: '/feed' },
  ];

  return (
    <div className={`poster-menu-overlay ${isOpen ? 'open' : ''}`}>
      <div className="poster-menu-container">
        {/* 5 Centered Editorial Poster Rows with Sibling Blur on Hover */}
        <nav
          className="poster-menu-nav"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <div
                key={link.label}
                className={`poster-menu-row poster-align-center ${isActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
                style={{
                  '--row-delay': `${0.06 + index * 0.04}s`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <Link
                  to={link.path}
                  onClick={onClose}
                  className="poster-menu-link"
                >
                  <span className="poster-link-text">{link.label}</span>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
