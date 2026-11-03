import React, { useState, useMemo, useEffect } from 'react';
import portfolioCompanies from '../data/portfolioData.json';

export default function CompaniesView() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCompany) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCompany]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCompany(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categoryTabs = [
    'All',
    'Business Products and Services',
    'Consumer Products and Services',
    'Energy',
    'Financial Services',
    'Healthcare',
    'Information Technology',
    'Materials and Resources',
  ];

  // Filter companies by PSL-style Industry Categories
  const filteredCompanies = useMemo(() => {
    if (activeTab === 'All') return portfolioCompanies;
    return portfolioCompanies.filter((comp) => {
      return comp.industries && comp.industries.includes(activeTab);
    });
  }, [activeTab]);

  return (
    <main className="psl-companies-page">
      <style>{`
        /* 100% Exact Pioneer Square Labs (PSL) Design System */
        :root {
          --psl-bg: #FFFFFF;
          --psl-black: #252423;
          --psl-smoke: #ECECEC;
          --psl-muted: #8C8C8C;
          --font-psl: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          --font-mono: 'Space Grotesk', -apple-system, monospace;
        }

        .psl-companies-page {
          background-color: var(--psl-bg);
          color: var(--psl-black);
          font-family: var(--font-psl);
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          padding-top: clamp(100px, 8vw, 120px);
          padding-bottom: 140px;
        }

        /* Hero Header Section - Generous, airy breathing room */
        .psl-header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(48px, 6vw, 88px) clamp(24px, 4.5vw, 64px) 0;
        }

        .psl-hero-title {
          font-family: var(--font-psl);
          font-size: clamp(38px, 5.6vw, 76px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: var(--psl-black);
          margin: 0 0 clamp(48px, 5.5vw, 76px) 0;
          max-width: 960px;
        }

        /* PSL Tabs (All, Business Products, Healthcare, etc.) */
        .psl-tabs-row {
          display: flex;
          align-items: center;
          gap: 10px 12px;
          flex-wrap: wrap;
          margin-bottom: clamp(40px, 4.4vw, 62px);
        }

        .psl-tab-btn {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 999px;
          padding: 8.5px 22px;
          font-family: var(--font-psl);
          font-size: 15.5px;
          font-weight: 500;
          color: var(--psl-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
          white-space: nowrap;
        }

        .psl-tab-btn:hover {
          color: var(--psl-black);
        }

        .psl-tab-btn.active {
          border-color: var(--psl-black);
          color: var(--psl-black);
        }

        /* Continuous 4-Column Border-Collapse Grid */
        .psl-grid-container {
          width: 100%;
          border-top: 1px solid var(--psl-smoke);
          border-left: 1px solid var(--psl-smoke);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        @media (max-width: 1100px) {
          .psl-grid-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .psl-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .psl-grid-container {
            grid-template-columns: 1fr;
          }
        }

        .psl-grid-item {
          border-right: 1px solid var(--psl-smoke);
          border-bottom: 1px solid var(--psl-smoke);
          aspect-ratio: 1 / 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          background: #FFFFFF;
          cursor: pointer;
          padding: clamp(20px, 3vw, 40px);
          overflow: hidden;
          transition: background-color 0.2s ease;
        }

        /* Center Logo with Unified Bounding Box */
        .psl-card-logo-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: clamp(24px, 3.5vw, 42px);
          box-sizing: border-box;
          pointer-events: none;
        }

        .psl-card-logo-img {
          width: 100%;
          height: 100%;
          max-width: 184px;
          max-height: 56px;
          object-fit: contain;
          object-position: center;
          filter: none;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .psl-grid-item:hover .psl-card-logo-img {
          transform: scale(1.06);
        }

        .psl-card-logo-fallback {
          font-family: var(--font-psl);
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--psl-black);
          text-align: center;
        }

        /* Subtle Corner Flag (e.g. ACQUIRED) */
        .psl-acquired-flag {
          position: absolute;
          right: 20px;
          bottom: 20px;
          background-color: var(--psl-smoke);
          color: #636363;
          border-radius: 30px;
          padding: 2px 14px 3px;
          font-family: var(--font-psl);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          z-index: 1;
          pointer-events: none;
        }

        /* PSL Hover Block: Clean Reveal on Hover */
        .psl-hover-overlay {
          position: absolute;
          inset: 0;
          background: #1A1A1A;
          color: #FFFFFF;
          padding: clamp(24px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          transition: opacity 0.32s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 3;
        }

        .psl-grid-item:hover .psl-hover-overlay {
          opacity: 1;
        }

        .psl-hover-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .psl-hover-track-badge {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #A0A0A0;
        }

        .psl-hover-arrow {
          font-size: 18px;
          color: #3CC79B;
          transition: transform 0.2s ease;
        }

        .psl-grid-item:hover .psl-hover-arrow {
          transform: translateX(4px);
        }

        .psl-hover-mid {
          margin: auto 0;
        }

        .psl-hover-title {
          font-family: var(--font-psl);
          font-size: clamp(18px, 1.8vw, 22px);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #FFFFFF;
          margin: 0 0 8px 0;
        }

        .psl-hover-desc {
          font-family: var(--font-psl);
          font-size: 13px;
          line-height: 1.48;
          color: rgba(255, 255, 255, 0.75);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .psl-hover-bottom {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .psl-hover-vertical-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          color: #EAEAEA;
          background: rgba(255, 255, 255, 0.12);
          padding: 2px 8px;
          border-radius: 2px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        /* Modal Overlay & Dialog */
        .psl-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 10, 0.65);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: pslFadeIn 0.2s ease-out;
        }

        @keyframes pslFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .psl-modal-dialog {
          background: #FFFFFF;
          border-radius: 4px;
          max-width: 780px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
          position: relative;
          padding: clamp(28px, 4.5vw, 52px);
          animation: pslSlideUp 0.26s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes pslSlideUp {
          from { transform: translateY(20px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .psl-modal-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          background: #F2F2F2;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 18px;
          color: var(--psl-black);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        .psl-modal-close-btn:hover {
          background: #E5E5E5;
        }

        .psl-modal-top {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--psl-smoke);
          padding-bottom: 24px;
        }

        .psl-modal-logo-stage {
          width: 96px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FAFAFA;
          border: 1px solid var(--psl-smoke);
          border-radius: 4px;
          padding: 8px;
        }

        .psl-modal-logo-img {
          max-height: 48px;
          max-width: 100%;
          object-fit: contain;
          filter: none;
        }

        .psl-modal-header-text {
          flex: 1;
        }

        .psl-modal-company-title {
          font-family: var(--font-psl);
          font-size: clamp(24px, 2.5vw, 34px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--psl-black);
          margin: 0 0 6px 0;
        }

        .psl-modal-track-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3CC79B;
          margin-right: 8px;
        }

        .psl-modal-summary-box {
          background: #F9F9F8;
          border-left: 3px solid #252423;
          padding: 16px 20px;
          border-radius: 0 4px 4px 0;
          margin-bottom: 28px;
        }

        .psl-modal-summary-text {
          font-family: var(--font-psl);
          font-size: 15.5px;
          line-height: 1.6;
          color: var(--psl-black);
          font-weight: 500;
          margin: 0;
        }

        .psl-modal-sections {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .psl-modal-section-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .psl-modal-section-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #636363;
        }

        .psl-modal-section-content {
          font-family: var(--font-psl);
          font-size: 14.5px;
          line-height: 1.68;
          color: rgba(37, 36, 35, 0.82);
          white-space: pre-line;
          margin: 0;
        }

        .psl-modal-footer {
          margin-top: 32px;
          border-top: 1px solid var(--psl-smoke);
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .psl-modal-external-link {
          font-family: var(--font-psl);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--psl-black);
          text-decoration: underline;
        }

        .psl-modal-inquire-btn {
          background: var(--psl-black);
          color: #FFFFFF;
          border-radius: 30px;
          padding: 10px 22px;
          font-family: var(--font-psl);
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .psl-modal-inquire-btn:hover {
          background: #3CC79B;
          color: #000000;
        }
      `}</style>

      {/* PSL Exact Hero Header */}
      <section className="psl-header-container">
        <h1 className="psl-hero-title">
          Startups We’ve Supported
        </h1>

        {/* PSL Exact Industry Category Tabs Menu */}
        <div className="psl-tabs-row" role="tablist">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`psl-tab-btn ${activeTab === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* PSL Exact 4-Column Border Grid */}
      <div className="psl-grid-container">
        {filteredCompanies.map((comp) => {
          const logoSrc = comp.localLogo || comp.logo;
          const primaryIndustry = (comp.industries && comp.industries.length > 0)
            ? comp.industries[0]
            : 'Technology';

          return (
            <article
              key={comp.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedCompany(comp)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedCompany(comp);
                }
              }}
              className="psl-grid-item"
              aria-label={`View ${comp.name} details`}
            >
              {/* Center Logo */}
              <div className="psl-card-logo-wrap">
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`${comp.name} logo`}
                    className="psl-card-logo-img"
                    loading="lazy"
                  />
                ) : (
                  <div className="psl-card-logo-fallback">{comp.name}</div>
                )}
              </div>

              {/* PSL Acquired / Status Flag */}
              {comp.badge && (
                <div className="psl-acquired-flag">
                  {comp.badge}
                </div>
              )}

              {/* PSL Hover Overlay */}
              <div className="psl-hover-overlay">
                <div className="psl-hover-top">
                  <span className="psl-hover-track-badge">{primaryIndustry}</span>
                  <span className="psl-hover-arrow">→</span>
                </div>

                <div className="psl-hover-mid">
                  <h2 className="psl-hover-title">{comp.name}</h2>
                  {comp.summary && (
                    <p className="psl-hover-desc">{comp.summary}</p>
                  )}
                </div>

                <div className="psl-hover-bottom">
                  {comp.verticals?.slice(0, 3).map((v) => (
                    <span key={v} className="psl-hover-vertical-tag">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div
          className="psl-modal-overlay"
          onClick={() => setSelectedCompany(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="psl-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCompany(null)}
              className="psl-modal-close-btn"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="psl-modal-top">
              <div className="psl-modal-logo-stage">
                {(selectedCompany.localLogo || selectedCompany.logo) ? (
                  <img
                    src={selectedCompany.localLogo || selectedCompany.logo}
                    alt={selectedCompany.name}
                    className="psl-modal-logo-img"
                  />
                ) : (
                  <span style={{ fontWeight: 700 }}>{selectedCompany.name}</span>
                )}
              </div>
              <div className="psl-modal-header-text">
                <h2 className="psl-modal-company-title">{selectedCompany.name}</h2>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {selectedCompany.industries?.map((ind) => (
                    <span key={ind} className="psl-modal-track-tag">
                      {ind}
                    </span>
                  ))}
                  {selectedCompany.verticals?.map((v) => (
                    <span
                      key={v}
                      style={{
                        fontSize: '11px',
                        background: '#F0F0F0',
                        color: '#444444',
                        padding: '2px 8px',
                        borderRadius: '2px',
                        marginRight: '6px',
                        textTransform: 'uppercase',
                        fontFamily: 'monospace',
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {selectedCompany.summary && (
              <div className="psl-modal-summary-box">
                <p className="psl-modal-summary-text">{selectedCompany.summary}</p>
              </div>
            )}

            <div className="psl-modal-sections">
              {selectedCompany.parsedSections &&
                Object.entries(selectedCompany.parsedSections).map(([head, text]) => {
                  if (!text || !text.trim()) return null;
                  return (
                    <div key={head} className="psl-modal-section-item">
                      <span className="psl-modal-section-label">// {head}</span>
                      <p className="psl-modal-section-content">{text}</p>
                    </div>
                  );
                })}
            </div>

            <div className="psl-modal-footer">
              <a
                href={`https://portfolio.123factory.de${selectedCompany.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="psl-modal-external-link"
              >
                View on portfolio.123factory.de ↗
              </a>
              <a href="/contact" className="psl-modal-inquire-btn">
                Inquire Collaboration →
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
