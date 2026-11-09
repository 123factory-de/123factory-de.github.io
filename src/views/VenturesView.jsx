import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function VenturesView() {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'scouting', label: '01 · Startup Scouting' },
    { id: 'governance', label: '02 · Venture Governance' },
    { id: 'investment', label: '03 · Investment Support' },
  ];

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 110;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'scouting', 'governance', 'investment'];
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="corp-minimal-page">
      <style>{`
        .corp-minimal-page {
          background-color: #FFFFFF;
          color: #0A0A0A;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          min-height: 100vh;
          padding-bottom: clamp(100px, 12vw, 180px);
          -webkit-font-smoothing: antialiased;
        }

        /* Container with generous ~5cm airy margins */
        .corp-container {
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          box-sizing: border-box;
        }

        /* Sticky Minimal Subnav Bar */
        .corp-subnav-sticky {
          position: sticky;
          top: 64px;
          z-index: 100;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          padding: 16px 0;
          transition: background-color 0.25s ease;
        }

        .corp-subnav-inner {
          display: flex;
          align-items: center;
          gap: clamp(16px, 3vw, 40px);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .corp-subnav-inner::-webkit-scrollbar {
          display: none;
        }

        .corp-subnav-btn {
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: clamp(13px, 1vw, 15px);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(10, 10, 10, 0.5);
          padding: 6px 0;
          position: relative;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .corp-subnav-btn:hover {
          color: #0A0A0A;
        }

        .corp-subnav-btn.is-active {
          color: #0A0A0A;
          font-weight: 600;
        }

        .corp-subnav-btn.is-active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -16px;
          height: 2px;
          background: #0A0A0A;
        }

        /* Section Spacing & Headers */
        .corp-section {
          padding-top: clamp(90px, 12vh, 160px);
        }

        .corp-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.45);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: clamp(18px, 2.5vh, 28px);
        }

        .corp-dots-wrap {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .corp-dot {
          display: inline-block;
          width: 6.5px;
          height: 6.5px;
          border-radius: 50%;
          background: #3CC79B;
          box-shadow: 0 0 8px rgba(60, 199, 155, 0.55);
          flex-shrink: 0;
        }

        .corp-display-h1 {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(38px, 5.6vw, 76px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #252423;
          margin: 0 0 clamp(48px, 5.5vw, 76px) 0;
          width: 100%;
          max-width: 100%;
          text-align: left;
          word-break: keep-all;
        }

        .corp-display-h2 {
          font-size: clamp(34px, 4.6vw, 68px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #0A0A0A;
          margin: 0 0 clamp(44px, 5.5vh, 72px) 0;
          max-width: 980px;
        }

        .corp-lede-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          margin-bottom: clamp(48px, 6vh, 80px);
        }

        @media (max-width: 860px) {
          .corp-lede-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .corp-lede-p-lead {
          font-size: clamp(20px, 2.2vw, 30px);
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: -0.025em;
          color: #0A0A0A;
          margin: 0;
        }

        .corp-lede-p-body {
          font-size: clamp(15px, 1.2vw, 18px);
          font-weight: 400;
          line-height: 1.65;
          color: rgba(10, 10, 10, 0.65);
          margin: 0 0 18px 0;
        }

        /* Large Hero Photography */
        .corp-photo-frame {
          width: 100%;
          overflow: hidden;
          background: #F4F4F4;
          margin: clamp(40px, 5vh, 72px) 0 0 0;
        }

        .corp-photo-frame img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .corp-photo-caption {
          font-size: 12px;
          letter-spacing: 0.02em;
          color: rgba(10, 10, 10, 0.45);
          margin-top: 12px;
          display: block;
        }

        /* 3-Pillar Overview Cards */
        .corp-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 2.5vw, 32px);
          margin-top: clamp(60px, 8vh, 100px);
        }

        @media (max-width: 900px) {
          .corp-pillars-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .corp-pillar-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          padding: clamp(24px, 2.8vw, 36px);
          border-radius: 12px;
          border: 1.5px solid transparent;
          background: transparent;
          box-sizing: border-box;
          transition: border-color 0.22s ease, background-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
        }

        .corp-pillar-card:hover {
          border-color: #3CC79B;
          background-color: rgba(60, 199, 155, 0.03);
          box-shadow: 0 10px 30px rgba(60, 199, 155, 0.08);
          transform: translateY(-3px);
        }

        .corp-pillar-title {
          font-size: clamp(20px, 1.8vw, 25px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #0A0A0A;
          margin: 0 0 14px 0;
          line-height: 1.25;
        }

        .corp-pillar-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.65);
          margin: 0;
          flex: 1 1 auto;
        }

        /* Distinct Deep-Dive Sections */
        .corp-divider-line {
          width: 100%;
          height: 1px;
          background: rgba(0, 0, 0, 0.08);
          margin-top: clamp(90px, 12vh, 160px);
        }

        .corp-feature-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: center;
          margin: clamp(50px, 7vh, 90px) 0;
        }

        .corp-feature-split.has-feature-list {
          align-items: stretch;
        }

        .corp-feature-split.has-feature-list .corp-photo-frame {
          height: 100%;
          display: flex;
        }

        .corp-feature-split.has-feature-list .corp-photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 3 / 2;
        }

        .corp-feature-list-wrap {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }

        /* Clean Feature List */
        .corp-feature-list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        @media (max-width: 860px) {
          .corp-feature-split {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .corp-feature-split.has-feature-list {
            align-items: flex-start;
          }
          .corp-feature-list-wrap,
          .corp-feature-list {
            height: auto;
            justify-content: flex-start;
            gap: 28px;
          }
        }

        .corp-feature-split.is-reversed {
          direction: rtl;
        }
        .corp-feature-split.is-reversed > * {
          direction: ltr;
        }

        .corp-feature-item {
          border-left: 2px solid #0A0A0A;
          padding-left: 20px;
        }

        .corp-feature-item-title {
          font-size: clamp(17px, 1.4vw, 20px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0A0A0A;
          margin: 0 0 6px 0;
        }

        .corp-feature-item-desc {
          font-size: 15px;
          line-height: 1.55;
          color: rgba(10, 10, 10, 0.65);
          margin: 0;
        }

        /* Deliverables Grid (Minimal 3 Columns) */
        .corp-deliverables-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 3.5vw, 48px);
          margin-top: clamp(48px, 6vh, 80px);
        }

        @media (max-width: 900px) {
          .corp-deliverables-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .corp-deliverable-card {
          display: flex;
          flex-direction: column;
        }

        .corp-deliverable-img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          background: #F0F0F0;
          margin-bottom: 22px;
        }

        .corp-deliverable-title {
          font-size: clamp(18px, 1.6vw, 24px);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #0A0A0A;
          margin: 0 0 10px 0;
        }

        .corp-deliverable-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.65);
          margin: 0;
        }

        /* 4-Item Grid for Investment Support */
        .corp-invest-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(32px, 4vw, 64px);
          margin-top: clamp(48px, 6vh, 80px);
        }

        @media (max-width: 768px) {
          .corp-invest-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        .corp-invest-box {
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding-top: 24px;
        }

        .corp-invest-box-num {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(10, 10, 10, 0.35);
          display: block;
          margin-bottom: 12px;
        }

        .corp-invest-box-title {
          font-size: clamp(20px, 1.8vw, 26px);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #0A0A0A;
          margin: 0 0 12px 0;
        }

        .corp-invest-box-desc {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(10, 10, 10, 0.65);
          margin: 0;
        }

        /* Minimal Closing CTA */
        .corp-cta-wrap {
          margin-top: clamp(100px, 14vh, 180px);
          border-top: 1px solid #0A0A0A;
          padding-top: clamp(60px, 8vh, 100px);
        }

        .corp-cta-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: flex-end;
        }

        @media (max-width: 860px) {
          .corp-cta-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .corp-cta-title {
          font-size: clamp(36px, 5vw, 76px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #0A0A0A;
          margin: 0;
        }

        .corp-cta-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .corp-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #0A0A0A;
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 18px 36px;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .corp-btn-primary:hover {
          background: #333333;
          transform: translateY(-1px);
        }

        .corp-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #0A0A0A;
          border: 1px solid rgba(0, 0, 0, 0.18);
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 18px 36px;
          text-decoration: none;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .corp-btn-secondary:hover {
          border-color: #0A0A0A;
          background: rgba(0, 0, 0, 0.03);
        }
      `}</style>

      {/* Sticky Minimal Navigation */}
      <nav className="corp-subnav-sticky" aria-label="Corporate Subnavigation">
        <div className="corp-container">
          <div className="corp-subnav-inner">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`corp-subnav-btn ${activeTab === item.id ? 'is-active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* =========================================================================
          SECTION 0: OVERVIEW & PHILOSOPHY
         ========================================================================= */}
      <section id="overview" className="corp-section">
        <div className="corp-container">
          <h1 className="corp-display-h1">
            Unlocking innovation through venture-driven strategy.
          </h1>

          <div className="corp-lede-grid">
            <p className="corp-lede-p-lead">
              Today’s most forward-thinking corporations aren’t just watching startups — they’re building with them.
            </p>
            <div>
              <p className="corp-lede-p-body">
                We help large organizations engage with the startup ecosystem in ways that are strategic, actionable, and high-impact.
              </p>
              <p className="corp-lede-p-body">
                Whether you’re scouting emerging technologies, co-creating new solutions, or deploying capital through direct investment or venture arms, our programs are designed to unlock real innovation value, not just experiments.
              </p>
              <p className="corp-lede-p-body" style={{ color: '#0A0A0A', fontWeight: 500 }}>
                From opportunity discovery to execution and beyond, we turn startup collaboration into a core capability for your organization.
              </p>
            </div>
          </div>

          {/* Full-width Hero Image */}
          <div className="corp-photo-frame">
            <img
              src="/corporates/corporate-hero.jpg"
              alt="123 Factory Corporate Venturing"
              loading="eager"
            />
          </div>

          {/* 3 Pillars Summary Grid */}
          <div className="corp-pillars-grid">
            <div className="corp-pillar-card" onClick={() => scrollToSection('scouting')}>
              <h2 className="corp-pillar-title">Startup Scouting</h2>
              <p className="corp-pillar-desc">
                From product-market fit to going global, we help early and growth teams move fast with confidence through proprietary deal sourcing and technical vetting.
              </p>
            </div>

            <div className="corp-pillar-card" onClick={() => scrollToSection('governance')}>
              <h2 className="corp-pillar-title">Venture Governance</h2>
              <p className="corp-pillar-desc">
                Clear governance frameworks for managing venture partnerships, venture client models, and pilot pipelines to turn open innovation into scalable enterprise outcomes.
              </p>
            </div>

            <div className="corp-pillar-card" onClick={() => scrollToSection('investment')}>
              <h2 className="corp-pillar-title">Investment Support</h2>
              <p className="corp-pillar-desc">
                Curated startup deal pipelines, syndication, grant advisory, and post-investment acceleration to align capital with long-term strategic enterprise goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: STARTUP SCOUTING
         ========================================================================= */}
      <section id="scouting" className="corp-section">
        <div className="corp-container">
          <span className="corp-eyebrow">
            <span className="corp-dots-wrap">
              <span className="corp-dot" />
            </span>
            Startup Scouting
          </span>
          <h2 className="corp-display-h2">
            Insight-driven discovery connecting corporations with engagement-ready innovators.
          </h2>

          <div className="corp-lede-grid">
            <p className="corp-lede-p-lead">
              Finding the right startup partner is challenging. We connect you with the right innovators to match your strategic needs.
            </p>
            <p className="corp-lede-p-body">
              Instead of generalist databases and vanity pitches, our dual-hub teams in Berlin and Seoul evaluate technical viability, founder execution, and IP defensibility against your internal technical roadmaps.
            </p>
          </div>

          {/* Split Feature: Image + Core Methodologies */}
          <div className="corp-feature-split has-feature-list">
            <div className="corp-photo-frame" style={{ margin: 0 }}>
              <img
                src="/corporates/startup-scouting.jpg"
                alt="123 Factory Startup Scouting Session"
                loading="lazy"
              />
            </div>

            <div className="corp-feature-list-wrap">
              <div className="corp-feature-list">
                <div className="corp-feature-item">
                  <h3 className="corp-feature-item-title">Insight-Driven Discovery</h3>
                  <p className="corp-feature-item-desc">
                    Market trends backed by operational data, not guesswork. Use-case-first scouting with technical reports you can act on immediately.
                  </p>
                </div>

                <div className="corp-feature-item">
                  <h3 className="corp-feature-item-title">Engagement-Ready Startups</h3>
                  <p className="corp-feature-item-desc">
                    Pre-qualified, demo-ready teams with clear intellectual property, transparent business models, and prior corporate collaboration experience.
                  </p>
                </div>

                <div className="corp-feature-item">
                  <h3 className="corp-feature-item-title">Direct Access to Founders</h3>
                  <p className="corp-feature-item-desc">
                    Not just lists — facilitated live conversations, customized demo scheduling, executive intros, and dedicated pilot follow-up support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Deliverables Cards */}
          <div className="corp-deliverables-grid">
            <div className="corp-deliverable-card">
              <img
                src="/corporates/scouting-detail.jpg"
                alt="Global Innovation Report"
                className="corp-deliverable-img"
                loading="lazy"
              />
              <h4 className="corp-deliverable-title">Global Innovation Report</h4>
              <p className="corp-deliverable-desc">
                Landscape scans and deep-dive technical reports on emerging tech, trends, and startup ecosystems tailored to your specific verticals and strategic priorities.
              </p>
            </div>

            <div className="corp-deliverable-card">
              <img
                src="/corporates/scouting-demoday.jpg"
                alt="Solution Fit Analysis"
                className="corp-deliverable-img"
                loading="lazy"
              />
              <h4 className="corp-deliverable-title">Solution Fit Analysis</h4>
              <p className="corp-deliverable-desc">
                Strategic evaluation of startup solutions against internal business unit challenges, including stakeholder interviews and technical readiness scoring.
              </p>
            </div>

            <div className="corp-deliverable-card">
              <img
                src="/corporates/corporate-hero.jpg"
                alt="Scouting Demo Day"
                className="corp-deliverable-img"
                loading="lazy"
              />
              <h4 className="corp-deliverable-title">Scouting Demo Day</h4>
              <p className="corp-deliverable-desc">
                Curated startup pitch sessions, direct matchmaking with internal procurement and engineering teams, and post-event facilitation to turn scouting into contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="corp-container"><div className="corp-divider-line" /></div>

      {/* =========================================================================
          SECTION 2: VENTURE GOVERNANCE
         ========================================================================= */}
      <section id="governance" className="corp-section">
        <div className="corp-container">
          <span className="corp-eyebrow">
            <span className="corp-dots-wrap">
              <span className="corp-dot" />
              <span className="corp-dot" />
            </span>
            Venture Governance
          </span>
          <h2 className="corp-display-h2">
            Turn open innovation into structured, accountable, and scalable outcomes.
          </h2>

          <div className="corp-lede-grid">
            <p className="corp-lede-p-lead">
              From collaboration to execution: innovation programs often get stuck in silos. We design systems that make startup collaboration measurable and repeatable.
            </p>
            <p className="corp-lede-p-body">
              Our venture governance solutions support corporations in setting up and managing innovation units, co-lab spaces, venture client models, and pilot pipelines — with evaluation frameworks that convert innovation into quantifiable commercial impact.
            </p>
          </div>

          {/* Split Feature: Text + Image (Reversed for dynamic editorial pacing) */}
          <div className="corp-feature-split is-reversed has-feature-list">
            <div className="corp-photo-frame" style={{ margin: 0 }}>
              <img
                src="/corporates/venture-governance.jpg"
                alt="Venture Governance & Execution"
                loading="lazy"
              />
            </div>

            <div className="corp-feature-list-wrap">
              <div className="corp-feature-list">
                <div className="corp-feature-item">
                  <h3 className="corp-feature-item-title">Co-Innovation Process Design</h3>
                  <p className="corp-feature-item-desc">
                    Customized innovation frameworks, departmental role setting, KPI definition, and feedback governance loops that prevent initiative fatigue.
                  </p>
                </div>

                <div className="corp-feature-item">
                  <h3 className="corp-feature-item-title">Venture Client Enablement</h3>
                  <p className="corp-feature-item-desc">
                    Use-case sourcing from core business units, rapid startup onboarding playbooks, and standardized corporate procurement and legal templates.
                  </p>
                </div>

                <div className="corp-feature-item">
                  <h3 className="corp-feature-item-title">Pilot Project Management (PoC)</h3>
                  <p className="corp-feature-item-desc">
                    Pilot goal alignment sessions, real-time progress tracking tools, milestone verification, and internal executive showcase coordination.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Core Operating Models */}
          <div className="corp-deliverables-grid">
            <div className="corp-deliverable-card">
              <img
                src="/corporates/governance-co-innovation.jpg"
                alt="Open Innovation and Co-Lab"
                className="corp-deliverable-img"
                loading="lazy"
              />
              <h4 className="corp-deliverable-title">Open Innovation & Co-Lab</h4>
              <p className="corp-deliverable-desc">
                Design and operate structured open innovation programs and dedicated co-lab environments, integrating scouting feeds, mentor networks, and KPI reporting.
              </p>
            </div>

            <div className="corp-deliverable-card">
              <img
                src="/corporates/governance-venture-client.jpg"
                alt="Venture Client Model"
                className="corp-deliverable-img"
                loading="lazy"
              />
              <h4 className="corp-deliverable-title">Venture Client Model</h4>
              <p className="corp-deliverable-desc">
                Help business units become direct clients of validated startups through streamlined vendor onboarding and performance-based commercial pilots.
              </p>
            </div>

            <div className="corp-deliverable-card">
              <img
                src="/corporates/governance-pilot-poc.jpg"
                alt="PoC Management and Evaluation"
                className="corp-deliverable-img"
                loading="lazy"
              />
              <h4 className="corp-deliverable-title">PoC Management & Evaluation</h4>
              <p className="corp-deliverable-desc">
                End-to-end management of pilot projects with startups: precise scope definition, engineering team matching, milestone tracking, and quantifiable result analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="corp-container"><div className="corp-divider-line" /></div>

      {/* =========================================================================
          SECTION 3: INVESTMENT SUPPORT
         ========================================================================= */}
      <section id="investment" className="corp-section">
        <div className="corp-container">
          <span className="corp-eyebrow">
            <span className="corp-dots-wrap">
              <span className="corp-dot" />
              <span className="corp-dot" />
              <span className="corp-dot" />
            </span>
            Investment Support
          </span>
          <h2 className="corp-display-h2">
            Smart capital & deal architecture for long-term innovation bets.
          </h2>

          <div className="corp-lede-grid">
            <p className="corp-lede-p-lead">
              From strategic investment to fund creation: build a resilient corporate innovation portfolio.
            </p>
            <div>
              <p className="corp-lede-p-body">
                Raising and deploying capital in a corporate venture context demands strategic alignment, defensible market positioning, and direct access to cross-border investor syndicates.
              </p>
              <p className="corp-lede-p-body">
                We support corporate-backed ventures and internal venture units through every stage — structuring investment rounds, navigating due diligence, and accelerating post-investment growth through operational execution.
              </p>
            </div>
          </div>

          {/* Full-width Photography */}
          <div className="corp-photo-frame">
            <img
              src="/corporates/investment-support.jpg"
              alt="123 Factory Investment Support"
              loading="lazy"
            />
          </div>

          {/* 4 Investment Pillars Grid */}
          <div className="corp-invest-grid">
            <div className="corp-invest-box">
              <span className="corp-invest-box-num">01 // ADVISORY</span>
              <h3 className="corp-invest-box-title">Fundraising Strategy & Deal Structuring</h3>
              <p className="corp-invest-box-desc">
                Raising capital requires more than a great pitch — it’s about strategic deal architecture. We guide ventures through funding stages, financial model refinement, valuation, and term negotiation.
              </p>
            </div>

            <div className="corp-invest-box">
              <span className="corp-invest-box-num">02 // NETWORK</span>
              <h3 className="corp-invest-box-title">Investor Matchmaking & Roadshows</h3>
              <p className="corp-invest-box-desc">
                Direct access to tier-1 institutional investors across Europe and Asia. We organize targeted roadshows, private pitching sessions, and closed-door introductions to maximize syndicate success.
              </p>
            </div>

            <div className="corp-invest-box">
              <span className="corp-invest-box-num">03 // SCALE</span>
              <h3 className="corp-invest-box-title">Post-Investment Growth Acceleration</h3>
              <p className="corp-invest-box-desc">
                Capital is only the starting line — scaling efficiently is what matters. We support ventures in capital deployment, international market expansion, operational architecture, and key executive recruiting.
              </p>
            </div>

            <div className="corp-invest-box">
              <span className="corp-invest-box-num">04 // NON-DILUTIVE</span>
              <h3 className="corp-invest-box-title">Grant & Public Funding Advisory</h3>
              <p className="corp-invest-box-desc">
                Beyond private capital, non-dilutive government grants offer crucial financial leverage. We help ventures navigate European (Horizon Europe, EIC) and Korean grant programs with eligibility vetting and proposal preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MINIMALIST DIRECT CTA
         ========================================================================= */}
      <section className="corp-container">
        <div className="corp-cta-wrap">
          <div className="corp-cta-grid">
            <div>
              <span className="corp-eyebrow">Get Started // Corporate Innovation</span>
              <h2 className="corp-cta-title">
                Let’s build your venture capability.
              </h2>
            </div>
            <div className="corp-cta-actions">
              <a
                href="mailto:hello@123factory.de"
                className="corp-btn-primary"
              >
                Get In Touch ➔
              </a>
              <Link
                to="/portfolio"
                className="corp-btn-secondary"
              >
                Explore Portfolio Companies ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
