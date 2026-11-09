import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OFFICE_DATA = {
  berlin: {
    id: 'berlin',
    name: 'Berlin (HQ)',
    city: 'Berlin, Germany',
    address: 'Bismarckstraße 10-12, 10625 Berlin, Germany',
    embedUrl: 'https://maps.google.com/maps?q=Bismarckstra%C3%9Fe%2010-12,%2010625%20Berlin,%20Germany&t=&z=16&ie=UTF8&iwloc=&output=embed',
    externalMapUrl: 'https://www.google.com/maps/search/?api=1&query=Bismarckstra%C3%9Fe+10-12,+10625+Berlin,+Germany',
  },
  seoul: {
    id: 'seoul',
    name: 'Seoul Office',
    city: 'Seoul, Korea',
    address: 'Saimdang-ro 8-gil 13, Seocho-gu, Seoul, Korea',
    embedUrl: 'https://maps.google.com/maps?q=Saimdang-ro%208-gil%2013,%20Seocho-gu,%20Seoul,%20Korea&t=&z=16&ie=UTF8&iwloc=&output=embed',
    externalMapUrl: 'https://www.google.com/maps/search/?api=1&query=Saimdang-ro+8-gil+13,+Seocho-gu,+Seoul,+Korea',
  },
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeOffice, setActiveOffice] = useState(null); // 'berlin' | 'seoul' | null

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveOffice(null);
    };
    if (activeOffice) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeOffice]);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Home Link, Contact Email & Social Logos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px, 4.5vw, 60px)' }}>
            <Link to="/" className="side-nav-home-link" style={{ fontSize: '16px', letterSpacing: '-0.01em' }}>
              ← Home
            </Link>

            {/* Contact Email */}
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255, 255, 255, 0.45)', display: 'block', marginBottom: '10px', fontWeight: 600 }}>
                Get In Touch
              </span>
              <a
                href="mailto:hello@123factory.de"
                className="footer-email-link"
              >
                <div className="footer-email-glow" />
                <span className="footer-email-text">
                  hello@123factory.de
                </span>
              </a>
            </div>

            {/* Social Media Logos */}
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255, 255, 255, 0.45)', display: 'block', marginBottom: '14px', fontWeight: 600 }}>
                Social Channels
              </span>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <a
                  href="https://linkedin.com/company/123factory"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="social-icon-btn"
                  title="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/123factory"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="social-icon-btn"
                  title="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@123factory"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="social-icon-btn"
                  title="YouTube"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Newsletter Form & Office Locations */}
          <div>
            <div className="footer-form-title">Join our mailing list</div>
            {submitted ? (
              <p style={{ color: '#fffbe9', fontSize: '15px', padding: '12px 0' }}>
                Thank you! You have been subscribed.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="footer-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input-field"
                />
                <button type="submit" className="form-submit-button">
                  Submit
                </button>
              </form>
            )}

            {/* Office Locations (Interactive Hover: Scale, Ambient Glow & Color Transition) */}
            <div style={{ marginTop: 'clamp(56px, 6vw, 84px)', display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 2.8vw, 38px)' }}>
              <div
                role="button"
                tabIndex={0}
                className="footer-office-item"
                onClick={() => setActiveOffice('berlin')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveOffice('berlin');
                  }
                }}
              >
                <div className="footer-office-glow" />
                <div className="footer-office-title">
                  Berlin (HQ)
                </div>
                <div className="footer-office-address">
                  Bismarckstraße 10-12, 10625 Berlin, Germany
                </div>
              </div>

              <div
                role="button"
                tabIndex={0}
                className="footer-office-item"
                onClick={() => setActiveOffice('seoul')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveOffice('seoul');
                  }
                }}
              >
                <div className="footer-office-glow" />
                <div className="footer-office-title">
                  Seoul Office
                </div>
                <div className="footer-office-address">
                  Saimdang-ro 8-gil 13, Seocho-gu, Seoul, Korea
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links (Light Gray default, Hero Color Hover & Ambient Glow: AGB #FFAB00, Impressum #3CC79B, Datenschutz #E550CE) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', paddingTop: '32px', marginTop: '60px', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/agb" className="footer-legal-link is-agb">
              <div className="footer-legal-glow" />
              <span className="footer-legal-text">AGB</span>
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.25)', userSelect: 'none' }}>•</span>
            <Link to="/impressum" className="footer-legal-link is-impressum">
              <div className="footer-legal-glow" />
              <span className="footer-legal-text">Impressum</span>
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.25)', userSelect: 'none' }}>•</span>
            <Link to="/datenschutz" className="footer-legal-link is-datenschutz">
              <div className="footer-legal-glow" />
              <span className="footer-legal-text">Datenschutz</span>
            </Link>
          </div>

          <div style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: '13px' }}>
            &copy; {new Date().getFullYear()} 123 Factory GmbH. All rights reserved.
          </div>
        </div>
      </div>

      {/* Office Map Lightbox Pop-up Modal */}
      {activeOffice && OFFICE_DATA[activeOffice] && (
        <div
          className="office-modal-overlay"
          onClick={() => setActiveOffice(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${OFFICE_DATA[activeOffice].name} Map`}
        >
          <div
            className={`office-modal-content is-${activeOffice}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Minimal Floating Close Button */}
            <button
              type="button"
              className="office-close-btn-float"
              onClick={() => setActiveOffice(null)}
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>

            {/* Direct Map Area */}
            <div className="office-modal-media-area">
              <iframe
                title={`${OFFICE_DATA[activeOffice].name} Map`}
                src={OFFICE_DATA[activeOffice].embedUrl}
                className="office-map-frame"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Minimal Bottom Info Bar */}
            <div className="office-modal-minimal-footer">
              <div>
                <div className="office-minimal-title">
                  {OFFICE_DATA[activeOffice].name}
                </div>
                <div className="office-minimal-address">
                  {OFFICE_DATA[activeOffice].address}
                </div>
              </div>

              {/* Direct External Map Link */}
              <div className="office-minimal-actions">
                <a
                  href={OFFICE_DATA[activeOffice].externalMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="office-minimal-ext-icon"
                  title="Open in Google Maps"
                  aria-label="Open in Google Maps"
                >
                  <span style={{ marginRight: '4px', fontSize: '12.5px' }}>Open Maps</span>↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
