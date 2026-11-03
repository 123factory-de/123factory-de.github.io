import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RADAR_GRANTS = [
  {
    id: 'korea-germany-2plus2',
    name: 'Korea-Germany 2+2 Joint R&D 2026',
    sub: 'KIAT × BMBF/DLR · AI & DeepTech',
    badge: 'Active Call',
    statusType: 'green',
    category: 'Bilateral',
    budget: 'Up to €350K / KRW 500M',
    deadline: 'Nov 04, 2026',
    link: 'https://fundingdb.123factory.de/',
  },
  {
    id: 'celtic-next',
    name: 'CELTIC-NEXT Autumn Call 2026',
    sub: 'EUREKA Cluster · Next-Gen Telecom & ICT',
    badge: 'D-5',
    statusType: 'green',
    category: 'Eureka',
    budget: 'Up to €350K / KRW 500M',
    deadline: 'Nov 18, 2026',
    link: 'https://fundingdb.123factory.de/',
  },
  {
    id: 'horizon-cl3',
    name: 'Horizon Europe 2026 · Civil Security',
    sub: 'HORIZON-CL3 · DeepTech & Resilient Infra',
    badge: 'Open Call',
    statusType: 'blue',
    category: 'Horizon Europe',
    budget: 'Multi-Million € Track',
    deadline: 'Nov 26, 2026',
    link: 'https://fundingdb.123factory.de/',
  },
  {
    id: 'eurogia-2026',
    name: 'EUROGIA 2026 · CleanTech & Energy',
    sub: 'EUREKA Cluster · Decarbonization Joint R&D',
    badge: 'D-12',
    statusType: 'green',
    category: 'Eureka',
    budget: 'Up to €350K / KRW 500M',
    deadline: 'Dec 02, 2026',
    link: 'https://fundingdb.123factory.de/',
  },
];

const RADAR_OPEN_INNOVATION = [
  {
    id: 'corbion',
    corp: 'Corbion',
    program: 'Corbion Open Innovation',
    badge: 'Always Open',
    badgeType: 'green',
    category: 'BioTech',
    desc: 'Sustainable algae fermentation, biochemicals & circular bio-ingredients.',
    tags: ['BioTech', 'Circular'],
  },
  {
    id: 'enel',
    corp: 'Enel Group',
    program: 'Enel Open Innovability®',
    badge: 'Active Call',
    badgeType: 'amber',
    category: 'Energy & Climate',
    desc: 'Deep-tech grid resilience, clean energy storage & decarbonization.',
    tags: ['Energy', 'Storage'],
  },
  {
    id: 'google',
    corp: 'Google for Startups',
    program: 'Accelerator Europe',
    badge: 'Cohort 2026',
    badgeType: 'green',
    category: 'AI & DeepTech',
    desc: 'Equity-free acceleration for seed to Series A ventures solving climate & enterprise with AI.',
    tags: ['AI / ML', 'DeepTech'],
  },
  {
    id: 'lufthansa',
    corp: 'Lufthansa Group',
    program: 'Innovation Hub Challenges',
    badge: 'Rolling Pilot',
    badgeType: 'cyan',
    category: 'Corporate Pilots',
    desc: 'Multimodal logistics, synthetic aviation fuels & autonomous operations.',
    tags: ['Logistics', 'Aviation'],
  },
];

export default function RadarCombinedSection() {
  const [activeGrantCat, setActiveGrantCat] = useState('All');
  const [activeOiCat, setActiveOiCat] = useState('All');

  const filteredGrants = activeGrantCat === 'All'
    ? RADAR_GRANTS
    : RADAR_GRANTS.filter(g => g.category === activeGrantCat);

  const filteredOi = activeOiCat === 'All'
    ? RADAR_OPEN_INNOVATION
    : RADAR_OPEN_INNOVATION.filter(p => p.category === activeOiCat);

  return (
    <section className="section radar-combined-section">
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(20px, 3.5vw, 48px)' }}>
        {/* Header: Exact Typography matching People, Behind / Together with */}
        <div className="scroll-reveal-block stagger-1" style={{ textAlign: 'center', marginBottom: 'clamp(72px, 8.5vw, 130px)' }}>
          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(28px, 3.2vw, 48px)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--color-ivory, #ffffff)',
              margin: '0 0 16px 0',
            }}
          >
            On Your Radar
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(15px, 1.25vw, 19px)',
              fontWeight: 400,
              lineHeight: 1.55,
              color: 'rgba(255, 255, 255, 0.65)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            <span>Discover opportunities.</span>
            <br />
            <span>Find connections. Make things happen.</span>
          </p>
        </div>

        {/* Two Compact Columns Side-by-Side */}
        <div className="radar-grid scroll-reveal-block stagger-2">
          {/* COLUMN 1: FUNDING DB */}
          <div className="radar-col">
            <div className="radar-box radar-box-funding">
              {/* Header inside Box */}
              <div className="radar-box-header">
                <div className="radar-header-left">
                  <div className="radar-window-dots">
                    <span className="r-w-dot r-red" />
                    <span className="r-w-dot r-yellow" />
                    <span className="r-w-dot r-green" />
                  </div>
                  <div className="radar-header-title-wrap">
                    <h4 className="radar-box-title">
                      Funding<em style={{ fontStyle: 'normal', color: '#60A5FA' }}>DB</em>
                    </h4>
                    <span className="radar-box-badge">R&amp;D Capital</span>
                  </div>
                </div>

                <div className="radar-header-right">
                  <span className="radar-live-indicator">
                    <span className="radar-pulse-dot" style={{ backgroundColor: '#60A5FA', boxShadow: '0 0 8px #60A5FA' }} />
                    LIVE
                  </span>
                </div>
              </div>

              {/* Sub description */}
              <div className="radar-box-meta">
                <span>European &amp; German bilateral non-dilutive grants</span>
                <span className="radar-box-count">92+ Registered</span>
              </div>

              {/* Filter Pills */}
              <div className="radar-filter-row">
                {['All', 'Eureka', 'Bilateral', 'Horizon Europe'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveGrantCat(cat)}
                    className={`radar-filter-pill ${activeGrantCat === cat ? 'active blue' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Compact Card List */}
              <div className="radar-cards-list">
                {filteredGrants.slice(0, 3).map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="radar-card radar-card-blue"
                  >
                    <div className="radar-card-main">
                      <div className="radar-card-topline">
                        <span className="radar-card-tag blue-tag">{item.category}</span>
                        <span className="radar-card-dday">{item.badge}</span>
                      </div>
                      <h5 className="radar-card-name">{item.name}</h5>
                      <p className="radar-card-sub">{item.sub}</p>
                    </div>
                    <div className="radar-card-footer">
                      <span className="radar-card-budget">{item.budget}</span>
                      <span className="radar-card-arrow">↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Funding DB Link */}
            <div className="radar-col-bottom">
              <a
                href="https://fundingdb.123factory.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="radar-btn radar-btn-blue"
              >
                Funding DB
              </a>
            </div>
          </div>

          {/* COLUMN 2: OPEN INNOVATION */}
          <div className="radar-col">
            <div className="radar-box radar-box-oi">
              {/* Header inside Box */}
              <div className="radar-box-header">
                <div className="radar-header-left">
                  <div className="radar-window-dots">
                    <span className="r-w-dot r-red" />
                    <span className="r-w-dot r-yellow" />
                    <span className="r-w-dot r-green" />
                  </div>
                  <div className="radar-header-title-wrap">
                    <h4 className="radar-box-title">
                      Open <em style={{ fontStyle: 'normal', color: '#3cc79b' }}>Innovation</em>
                    </h4>
                    <span className="radar-box-badge" style={{ color: '#3cc79b', background: 'rgba(60, 199, 155, 0.1)', borderColor: 'rgba(60, 199, 155, 0.25)' }}>
                      Corporate Hub
                    </span>
                  </div>
                </div>

                <div className="radar-header-right">
                  <span className="radar-live-indicator">
                    <span className="radar-pulse-dot" style={{ backgroundColor: '#3cc79b', boxShadow: '0 0 8px #3cc79b' }} />
                    LIVE
                  </span>
                </div>
              </div>

              {/* Sub description */}
              <div className="radar-box-meta">
                <span>Corporate pilot challenges &amp; open innovation calls</span>
                <span className="radar-box-count">30+ Active</span>
              </div>

              {/* Filter Pills */}
              <div className="radar-filter-row">
                {['All', 'AI & DeepTech', 'Energy & Climate', 'BioTech'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveOiCat(cat)}
                    className={`radar-filter-pill ${activeOiCat === cat ? 'active green' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Compact Card List */}
              <div className="radar-cards-list">
                {filteredOi.slice(0, 3).map((item) => (
                  <a
                    key={item.id}
                    href="https://openinnovation.123factory.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="radar-card radar-card-green"
                  >
                    <div className="radar-card-main">
                      <div className="radar-card-topline">
                        <span className="radar-card-tag green-tag">{item.corp}</span>
                        <span className="radar-card-dday green-dday">{item.badge}</span>
                      </div>
                      <h5 className="radar-card-name">{item.program}</h5>
                      <p className="radar-card-sub">{item.desc}</p>
                    </div>
                    <div className="radar-card-footer">
                      <div className="radar-tags-wrap">
                        {item.tags.map((t) => (
                          <span key={t} className="radar-tag-pill">{t}</span>
                        ))}
                      </div>
                      <span className="radar-card-arrow">↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Open Innovation Link */}
            <div className="radar-col-bottom">
              <a
                href="https://openinnovation.123factory.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="radar-btn radar-btn-green"
              >
                Open Innovation
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .radar-combined-section {
          position: relative;
          padding: clamp(90px, 10vw, 160px) 0;
          background: transparent;
          border: none;
        }

        .radar-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(32px, 4.2vw, 56px);
          align-items: stretch;
        }

        @media (max-width: 960px) {
          .radar-grid {
            grid-template-columns: 1fr;
            gap: 44px;
          }
        }

        .radar-col {
          display: flex;
          flex-direction: column;
        }

        .radar-box {
          background: rgba(16, 17, 22, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: clamp(22px, 2.5vw, 32px);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
          flex: 1;
          transition: border-color 0.45s ease, box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .radar-box:hover {
          transform: translateY(-6px);
        }

        .radar-box.radar-box-funding:hover {
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.75), 0 0 55px rgba(96, 165, 250, 0.28), 0 0 120px rgba(96, 165, 250, 0.14);
        }

        .radar-box.radar-box-oi:hover {
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.75), 0 0 55px rgba(60, 199, 155, 0.28), 0 0 120px rgba(60, 199, 155, 0.14);
        }

        .radar-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 14px;
        }

        .radar-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .radar-window-dots {
          display: flex;
          gap: 6px;
        }

        .r-w-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          opacity: 0.7;
        }
        .r-red { background: #FF5F56; }
        .r-yellow { background: #FFBD2E; }
        .r-green { background: #27C93F; }

        .radar-header-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .radar-box-title {
          margin: 0;
          font-family: var(--font-sans);
          font-size: clamp(18px, 1.6vw, 22px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .radar-box-badge {
          font-family: 'Space Grotesk', monospace;
          font-size: 11px;
          font-weight: 600;
          color: #60A5FA;
          background: rgba(96, 165, 250, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.25);
          padding: 3px 9px;
          border-radius: 999px;
          letter-spacing: 0.04em;
        }

        .radar-live-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Grotesk', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.5);
        }

        .radar-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: radarPulse 2s infinite ease-in-out;
        }

        @keyframes radarPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.8); }
        }

        .radar-box-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 6px;
        }

        .radar-box-count {
          font-family: 'Space Grotesk', monospace;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
        }

        .radar-filter-row {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 10px;
          margin-bottom: 16px;
          scrollbar-width: none;
        }
        .radar-filter-row::-webkit-scrollbar { display: none; }

        .radar-filter-pill {
          padding: 4px 11px;
          border-radius: 6px;
          font-family: var(--font-sans);
          font-size: 11.5px;
          font-weight: 500;
          white-space: nowrap;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.65);
          transition: all 0.2s ease;
        }

        .radar-filter-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .radar-filter-pill.active.blue {
          background: rgba(37, 99, 235, 0.25);
          border-color: #60A5FA;
          color: #ffffff;
          font-weight: 600;
        }

        .radar-filter-pill.active.green {
          background: rgba(5, 150, 105, 0.25);
          border-color: #3cc79b;
          color: #ffffff;
          font-weight: 600;
        }

        .radar-cards-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .radar-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 14px 16px;
          text-decoration: none;
          color: inherit;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .radar-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.05);
        }

        .radar-card-blue:hover {
          border-color: rgba(96, 165, 250, 0.4);
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.12);
        }

        .radar-card-green:hover {
          border-color: rgba(60, 199, 155, 0.4);
          box-shadow: 0 8px 24px rgba(60, 199, 155, 0.12);
        }

        .radar-card-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .radar-card-tag {
          font-family: 'Space Grotesk', monospace;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 4px;
          letter-spacing: 0.02em;
        }

        .blue-tag {
          color: #60A5FA;
          background: rgba(96, 165, 250, 0.12);
        }

        .green-tag {
          color: #3cc79b;
          background: rgba(60, 199, 155, 0.12);
        }

        .radar-card-dday {
          font-family: 'Space Grotesk', monospace;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
        }

        .green-dday {
          color: #3cc79b;
        }

        .radar-card-name {
          margin: 0 0 4px 0;
          font-family: var(--font-sans);
          font-size: 14.5px;
          font-weight: 600;
          line-height: 1.35;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .radar-card-sub {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
          font-size: 12px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.55);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .radar-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }

        .radar-card-budget {
          font-family: 'Space Grotesk', monospace;
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
        }

        .radar-card-arrow {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.4);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .radar-card:hover .radar-card-arrow {
          color: #ffffff;
          transform: translate(2px, -2px);
        }

        .radar-tags-wrap {
          display: flex;
          gap: 6px;
        }

        .radar-tag-pill {
          font-family: 'Space Grotesk', monospace;
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.04);
          padding: 2px 6px;
          border-radius: 4px;
        }

        /* Bottom Action Buttons (Tinted Pills matching box badges) */
        .radar-col-bottom {
          display: flex;
          justify-content: center;
          margin-top: clamp(38px, 4vw, 52px);
        }

        .radar-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 36px;
          border-radius: 9999px; /* Apple Pill */
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 15px;
          letter-spacing: -0.01em;
          text-decoration: none;
          cursor: pointer;
          user-select: none;
          line-height: 1;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.25s var(--ease-spring);
        }

        /* Funding DB: Soft Blue Tinted Pill (R&D Capital theme) */
        .radar-btn-blue {
          background-color: rgba(96, 165, 250, 0.12);
          color: #60A5FA !important;
          border: 1px solid rgba(96, 165, 250, 0.32);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 16px rgba(0, 0, 0, 0.25);
        }

        .radar-btn-blue:hover {
          background-color: rgba(96, 165, 250, 0.22);
          border-color: #60A5FA;
          color: #93C5FD !important;
          box-shadow: 0 0 24px rgba(96, 165, 250, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .radar-btn-blue:active {
          transform: scale(0.96) !important;
          transition: transform 80ms ease-out;
        }

        /* Open Innovation: Soft Green Tinted Pill (Corporate Hub theme) */
        .radar-btn-green {
          background-color: rgba(60, 199, 155, 0.12);
          color: #3CC79B !important;
          border: 1px solid rgba(60, 199, 155, 0.32);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 16px rgba(0, 0, 0, 0.25);
        }

        .radar-btn-green:hover {
          background-color: rgba(60, 199, 155, 0.22);
          border-color: #3CC79B;
          color: #6EE7B7 !important;
          box-shadow: 0 0 24px rgba(60, 199, 155, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .radar-btn-green:active {
          transform: scale(0.96) !important;
          transition: transform 80ms ease-out;
        }
      `}</style>
    </section>
  );
}
