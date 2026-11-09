import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function StudioView() {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'early-stage', label: '01 · Early-Stage' },
    { id: 'scaleups', label: '02 · Scale-ups' },
    { id: 'funding', label: '03 · Funding' },
    { id: 'funding-db', label: '04 · R&D Grants (Funding DB)' },
    { id: 'open-innovation', label: '05 · Corporate Pilots' },
    { id: 'mobani', label: '06 · Sales Platform (Mobani)' },
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
      const sections = [
        'overview',
        'early-stage',
        'scaleups',
        'funding',
        'funding-db',
        'open-innovation',
        'mobani',
      ];
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
    <main className="startups-minimal-page">
      <style>{`
        .startups-minimal-page {
          background-color: #FFFFFF;
          color: #0A0A0A;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          min-height: 100vh;
          padding-bottom: clamp(100px, 12vw, 180px);
          -webkit-font-smoothing: antialiased;
        }

        /* Container with generous airy margins */
        .startups-container {
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          box-sizing: border-box;
        }

        /* Sticky Minimal Subnav Bar */
        .startups-subnav-sticky {
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

        .startups-subnav-inner {
          display: flex;
          align-items: center;
          gap: clamp(16px, 2.5vw, 36px);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .startups-subnav-inner::-webkit-scrollbar {
          display: none;
        }

        .startups-subnav-btn {
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: clamp(13px, 0.95vw, 14.5px);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(10, 10, 10, 0.5);
          padding: 6px 0;
          position: relative;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .startups-subnav-btn:hover {
          color: #0A0A0A;
        }

        .startups-subnav-btn.is-active {
          color: #0A0A0A;
          font-weight: 600;
        }

        .startups-subnav-btn.is-active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -16px;
          height: 2px;
          background: #0A0A0A;
        }

        /* Section Spacing & Headers */
        .startups-section {
          padding-top: clamp(90px, 12vh, 160px);
        }

        .startups-eyebrow {
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

        .startups-dots-wrap {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .startups-dot {
          display: inline-block;
          width: 6.5px;
          height: 6.5px;
          border-radius: 50%;
          background: #FFAB00;
          box-shadow: 0 0 8px rgba(255, 171, 0, 0.55);
          flex-shrink: 0;
        }

        /* Hero Headline matching exact Cross-Border Expansion Made Simple style */
        .startups-display-h1 {
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

        .startups-display-h2 {
          font-size: clamp(32px, 4.2vw, 64px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #0A0A0A;
          margin: 0 0 clamp(44px, 5.5vh, 72px) 0;
          max-width: 980px;
        }

        .startups-lede-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          margin-bottom: clamp(48px, 6vh, 80px);
        }

        @media (max-width: 860px) {
          .startups-lede-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .startups-lede-p-lead {
          font-size: clamp(20px, 2.2vw, 30px);
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: -0.025em;
          color: #0A0A0A;
          margin: 0;
        }

        .startups-lede-p-body {
          font-size: clamp(15px, 1.2vw, 18px);
          font-weight: 400;
          line-height: 1.65;
          color: rgba(10, 10, 10, 0.65);
          margin: 0 0 18px 0;
        }

        /* Large Hero Photography */
        .startups-photo-frame {
          width: 100%;
          overflow: hidden;
          background: #F4F4F4;
          margin: clamp(40px, 5vh, 72px) 0 0 0;
        }

        .startups-photo-frame img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* 6-Item Overview Grid */
        .startups-programs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 2.5vw, 32px);
          margin-top: clamp(60px, 8vh, 100px);
        }

        @media (max-width: 900px) {
          .startups-programs-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .startups-program-card {
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

        .startups-program-card:hover {
          border-color: #FFAB00;
          background-color: rgba(255, 171, 0, 0.03);
          box-shadow: 0 10px 30px rgba(255, 171, 0, 0.08);
          transform: translateY(-3px);
        }

        .startups-program-title {
          font-size: clamp(20px, 1.8vw, 25px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #0A0A0A;
          margin: 0 0 14px 0;
          line-height: 1.25;
        }

        .startups-program-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.65);
          margin: 0;
          flex: 1 1 auto;
        }

        /* Divider Line */
        .startups-divider-line {
          width: 100%;
          height: 1px;
          background: rgba(0, 0, 0, 0.08);
          margin-top: clamp(90px, 12vh, 160px);
        }

        /* Split Feature Layout */
        .startups-feature-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: center;
          margin: clamp(50px, 7vh, 90px) 0;
        }

        .startups-feature-split.has-feature-list {
          align-items: stretch;
        }

        .startups-feature-split.has-feature-list .startups-photo-frame {
          height: 100%;
          display: flex;
        }

        .startups-feature-split.has-feature-list .startups-photo-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 3 / 2;
        }

        .startups-feature-list-wrap {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }

        /* Clean Feature List */
        .startups-feature-list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        @media (max-width: 860px) {
          .startups-feature-split {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .startups-feature-split.has-feature-list {
            align-items: flex-start;
          }
          .startups-feature-list-wrap,
          .startups-feature-list {
            height: auto;
            justify-content: flex-start;
            gap: 28px;
          }
        }

        .startups-feature-split.is-reversed {
          direction: rtl;
        }
        .startups-feature-split.is-reversed > * {
          direction: ltr;
        }

        .startups-feature-item {
          border-left: 2px solid #0A0A0A;
          padding-left: 20px;
        }

        .startups-feature-item-title {
          font-size: clamp(17px, 1.4vw, 20px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0A0A0A;
          margin: 0 0 6px 0;
        }

        .startups-feature-item-desc {
          font-size: 15px;
          line-height: 1.55;
          color: rgba(10, 10, 10, 0.65);
          margin: 0;
        }

        /* Deliverables Grid */
        .startups-deliverables-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 3.5vw, 48px);
          margin-top: clamp(48px, 6vh, 80px);
        }

        @media (max-width: 900px) {
          .startups-deliverables-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .startups-deliverable-card {
          display: flex;
          flex-direction: column;
        }

        .startups-deliverable-img {
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          background: #F0F0F0;
          margin-bottom: 22px;
        }

        .startups-deliverable-title {
          font-size: clamp(18px, 1.6vw, 24px);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #0A0A0A;
          margin: 0 0 10px 0;
        }

        .startups-deliverable-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.65);
          margin: 0;
        }

        /* Metrics Bar (for Funding DB & Open Innovation Hub) */
        .startups-metrics-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.12);
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          padding: clamp(28px, 3.5vw, 44px) 0;
          margin: clamp(40px, 5vh, 64px) 0;
        }

        @media (max-width: 680px) {
          .startups-metrics-bar {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .startups-metric-num {
          font-size: clamp(36px, 4.5vw, 64px);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #0A0A0A;
          line-height: 1;
          display: block;
          margin-bottom: 8px;
        }

        .startups-metric-label {
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(10, 10, 10, 0.55);
          text-transform: uppercase;
        }

        /* Corporate Pilots Showcase Grid (for Section 05) */
        .startups-pilots-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(20px, 2.5vw, 36px);
          margin-top: clamp(36px, 4vh, 56px);
        }

        @media (max-width: 800px) {
          .startups-pilots-grid {
            grid-template-columns: 1fr;
          }
        }

        .startups-pilot-item {
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: clamp(24px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          background: #FAFAFA;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .startups-pilot-item:hover {
          border-color: #0A0A0A;
          background: #FFFFFF;
        }

        .startups-pilot-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .startups-pilot-corp {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #0A0A0A;
        }

        .startups-pilot-status {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4BB395;
          background: rgba(75, 179, 149, 0.12);
          padding: 4px 10px;
          border-radius: 999px;
        }

        .startups-pilot-title {
          font-size: clamp(19px, 1.8vw, 24px);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #0A0A0A;
          margin: 0 0 10px 0;
        }

        .startups-pilot-desc {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.65);
          margin: 0 0 20px 0;
          flex: 1 1 auto;
        }

        .startups-pilot-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .startups-pilot-tag {
          font-size: 11.5px;
          font-weight: 500;
          color: rgba(10, 10, 10, 0.55);
          background: rgba(0, 0, 0, 0.04);
          padding: 4px 10px;
        }

        .startups-pilot-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12.5px;
          color: rgba(10, 10, 10, 0.45);
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          padding-top: 14px;
        }

        .startups-pilot-link {
          font-weight: 600;
          color: #0A0A0A;
          text-decoration: none;
        }

        .startups-pilot-link:hover {
          text-decoration: underline;
        }

        /* Funding DB Mini Preview Box */
        .fundingdb-mini-box {
          background: #0E0F14;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: clamp(18px, 2.2vw, 26px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          color: #FFFFFF;
          width: 100%;
          box-sizing: border-box;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .fundingdb-mini-box:hover {
          transform: translateY(-3px);
          border-color: rgba(96, 165, 250, 0.4);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.35), 0 0 30px rgba(96, 165, 250, 0.15);
        }

        .fundingdb-mini-box .radar-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 12px;
        }

        .fundingdb-mini-box .radar-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .fundingdb-mini-box .radar-window-dots {
          display: flex;
          gap: 6px;
        }

        .fundingdb-mini-box .r-w-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          opacity: 0.75;
        }
        .fundingdb-mini-box .r-red { background: #FF5F56; }
        .fundingdb-mini-box .r-yellow { background: #FFBD2E; }
        .fundingdb-mini-box .r-green { background: #27C93F; }

        .fundingdb-mini-box .radar-header-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .fundingdb-mini-box .radar-box-title {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .fundingdb-mini-box .radar-box-badge {
          font-family: monospace;
          font-size: 10.5px;
          font-weight: 600;
          color: #60A5FA;
          background: rgba(96, 165, 250, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.25);
          padding: 2px 7px;
          border-radius: 999px;
          letter-spacing: 0.04em;
        }

        .fundingdb-mini-box .radar-live-indicator {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: monospace;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.55);
        }

        .fundingdb-mini-box .radar-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #60A5FA;
          box-shadow: 0 0 8px #60A5FA;
          animation: radarPulse 2s infinite ease-in-out;
        }

        @keyframes radarPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.8); }
        }

        .fundingdb-mini-box .radar-box-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 6px;
        }

        .fundingdb-mini-box .radar-box-count {
          font-family: monospace;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          font-size: 11.5px;
        }

        .fundingdb-mini-box .radar-cards-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .fundingdb-mini-box .radar-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 11px 14px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease;
        }

        .fundingdb-mini-box .radar-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(96, 165, 250, 0.4);
          transform: translateY(-1px);
        }

        .fundingdb-mini-box .radar-card-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .fundingdb-mini-box .radar-card-tag {
          font-family: monospace;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          color: #60A5FA;
          background: rgba(96, 165, 250, 0.12);
        }

        .fundingdb-mini-box .radar-card-dday {
          font-family: monospace;
          font-size: 10.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
        }

        .fundingdb-mini-box .radar-card-name {
          margin: 0 0 2px 0;
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.35;
          color: #ffffff;
        }

        .fundingdb-mini-box .radar-card-sub {
          margin: 0;
          font-size: 11.5px;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.55);
        }

        .fundingdb-mini-box .radar-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Mobani Sales Platform Section (06) */

        /* Minimal Closing CTA */
        .startups-cta-wrap {
          margin-top: clamp(100px, 14vh, 180px);
          border-top: 1px solid #0A0A0A;
          padding-top: clamp(60px, 8vh, 100px);
        }

        .startups-cta-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: flex-end;
        }

        @media (max-width: 860px) {
          .startups-cta-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .startups-cta-title {
          font-size: clamp(36px, 5vw, 76px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #0A0A0A;
          margin: 0;
        }

        .startups-cta-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .startups-btn-primary {
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

        .startups-btn-primary:hover {
          background: #333333;
          transform: translateY(-1px);
        }

        .startups-btn-secondary {
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

        .startups-btn-secondary:hover {
          border-color: #0A0A0A;
          background: rgba(0, 0, 0, 0.03);
        }
      `}</style>



      {/* =========================================================================
          SECTION 0: OVERVIEW & PHILOSOPHY
         ========================================================================= */}
      <section id="overview" className="startups-section">
        <div className="startups-container">
          <h1 className="startups-display-h1">
            Cross-Border Expansion Made Simple
          </h1>

          <div className="startups-lede-grid">
            <p className="startups-lede-p-lead">
              Our startup programs help companies scale beyond their home markets by connecting them to the right opportunities abroad.
            </p>
            <div>
              <p className="startups-lede-p-body">
                We offer hands-on support for market entry from strategy development to PoC collaborations with leading corporations.
              </p>
              <p className="startups-lede-p-body">
                With strong networks in Germany and Korea, we facilitate cross-border partnerships that unlock new customers, funding, and local know-how.
              </p>
              <p className="startups-lede-p-body" style={{ color: '#0A0A0A', fontWeight: 500 }}>
                Our soft-landing support covers legal setup, market research, and business development for a smooth transition into foreign markets.
              </p>
            </div>
          </div>

          {/* Full-width Hero Image */}
          <div className="startups-photo-frame">
            <img
              src="/startups/startups-main-hero.jpg"
              alt="123 Factory Startup Programs"
              loading="eager"
            />
          </div>

          {/* 6 Programs Quick Jump Grid */}
          <div className="startups-programs-grid">
            <div className="startups-program-card" onClick={() => scrollToSection('early-stage')}>
              <h2 className="startups-program-title">Early-Stage Support</h2>
              <p className="startups-program-desc">
                Product-market fit validation, German ICP definition, and soft-landing pad in Berlin.
              </p>
            </div>

            <div className="startups-program-card" onClick={() => scrollToSection('scaleups')}>
              <h2 className="startups-program-title">Accelerators & Scale-ups</h2>
              <p className="startups-program-desc">
                Technical validation, CE/GDPR compliance readiness, and commercial revenue acceleration.
              </p>
            </div>

            <div className="startups-program-card" onClick={() => scrollToSection('funding')}>
              <h2 className="startups-program-title">Funding & Investment</h2>
              <p className="startups-program-desc">
                Precision fundraising strategy, investor matchmaking roadshows, and deal structuring.
              </p>
            </div>

            <div className="startups-program-card" onClick={() => scrollToSection('funding-db')}>
              <h2 className="startups-program-title">Bilateral R&D (Funding DB)</h2>
              <p className="startups-program-desc">
                Structured intelligence tracking European and bilateral R&D grants for tech ventures.
              </p>
            </div>

            <div className="startups-program-card" onClick={() => scrollToSection('open-innovation')}>
              <h2 className="startups-program-title">Corporate Ventures & Pilots</h2>
              <p className="startups-program-desc">
                Open Innovation Hub aggregating commercial challenges from European corporations.
              </p>
            </div>

            <div className="startups-program-card" onClick={() => scrollToSection('mobani')}>
              <h2 className="startups-program-title">Sales Platform (Mobani)</h2>
              <p className="startups-program-desc">
                Commercial market entry platform expanding Korean Fashion, B2C & B2B brands into Germany and France.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: EARLY-STAGE SUPPORT
         ========================================================================= */}
      <section id="early-stage" className="startups-section">
        <div className="startups-container">
          <span className="startups-eyebrow">
            <span className="startups-dots-wrap">
              <span className="startups-dot" />
            </span>
            Early-Stage Support
          </span>
          <h2 className="startups-display-h2">
            We back early-stage founders with the tools, guidance, and network to find traction and grow with clarity.
          </h2>

          <div className="startups-lede-grid">
            <p className="startups-lede-p-lead">
              Structured early-stage playbook: step-by-step guidance for PMF and global Go-to-Market speed.
            </p>
            <p className="startups-lede-p-body">
              Taking your first bold steps abroad shouldn't be a gamble. We validate your core thesis in the European market from Day 0 — refining your value proposition against local industry dynamics and eliminating bureaucratic friction.
            </p>
          </div>

          <div className="startups-feature-split has-feature-list">
            <div className="startups-photo-frame" style={{ margin: 0 }}>
              <img
                src="/startups/startups-early-stage.jpg"
                alt="Early-Stage Founder Mentorship"
                loading="lazy"
              />
            </div>

            <div className="startups-feature-list-wrap">
              <div className="startups-feature-list">
                <div className="startups-feature-item">
                  <h3 className="startups-feature-item-title">Structured Early-Stage Playbook</h3>
                  <p className="startups-feature-item-desc">
                    Step-by-step guidance for PMF and GTM. Tools, templates, and repeatable frameworks built specifically for early-stage speed.
                  </p>
                </div>

                <div className="startups-feature-item">
                  <h3 className="startups-feature-item-title">Product-Market Fit Validation</h3>
                  <p className="startups-feature-item-desc">
                    Rapid hypothesis testing, customer discovery interviews with German industry practitioners, and iterative value proposition refinement.
                  </p>
                </div>

                <div className="startups-feature-item">
                  <h3 className="startups-feature-item-title">European Soft-Landing Pad</h3>
                  <p className="startups-feature-item-desc">
                    End-to-end setup: German legal entity incorporation (GmbH), tax registration, founder visa guidance, and hub desk access at our Berlin campus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="startups-container"><div className="startups-divider-line" /></div>

      {/* =========================================================================
          SECTION 2: ACCELERATORS & SCALE-UPS
         ========================================================================= */}
      <section id="scaleups" className="startups-section">
        <div className="startups-container">
          <span className="startups-eyebrow">
            <span className="startups-dots-wrap">
              <span className="startups-dot" />
              <span className="startups-dot" />
            </span>
            Accelerators & Scale-ups
          </span>
          <h2 className="startups-display-h2">
            Scale smart, grow globally: technical validation & commercial revenue acceleration.
          </h2>

          <div className="startups-lede-grid">
            <p className="startups-lede-p-lead">
              Taking a startup from early traction to scalable growth is no small feat. We equip founders with the tools and connections to navigate growth challenges.
            </p>
            <p className="startups-lede-p-body">
              Tailored for venture-backed and growth-stage companies with validated domestic traction ready to scale internationally. We bridge the gap between technical readiness and commercial enterprise contracts.
            </p>
          </div>

          <div className="startups-feature-split is-reversed has-feature-list">
            <div className="startups-photo-frame" style={{ margin: 0 }}>
              <img
                src="/startups/startups-scaleups.jpg"
                alt="Scale-Up Acceleration & Demo Day"
                loading="lazy"
              />
            </div>

            <div className="startups-feature-list-wrap">
              <div className="startups-feature-list">
                <div className="startups-feature-item">
                  <h3 className="startups-feature-item-title">Validation & Localization</h3>
                  <p className="startups-feature-item-desc">
                    European industry certification readiness (CE, GDPR, ISO), software localization, and security compliance frameworks for tier-1 enterprise procurement.
                  </p>
                </div>

                <div className="startups-feature-item">
                  <h3 className="startups-feature-item-title">Tier-1 Executive Mentorship</h3>
                  <p className="startups-feature-item-desc">
                    Direct 1:1 advisory with seasoned European serial entrepreneurs, DAX 40 corporate executives, and specialized technical mentors across Germany and Korea.
                  </p>
                </div>

                <div className="startups-feature-item">
                  <h3 className="startups-feature-item-title">Commercial Enterprise Pilots</h3>
                  <p className="startups-feature-item-desc">
                    Tailored growth sprints and cross-border scaling workshops ensuring your business is not just prepared to grow, but positioned to win long-term contracts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="startups-container"><div className="startups-divider-line" /></div>

      {/* =========================================================================
          SECTION 3: FUNDING & INVESTMENT SUPPORT
         ========================================================================= */}
      <section id="funding" className="startups-section">
        <div className="startups-container">
          <span className="startups-eyebrow">
            <span className="startups-dots-wrap">
              <span className="startups-dot" />
              <span className="startups-dot" />
              <span className="startups-dot" />
            </span>
            Funding & Investment
          </span>
          <h2 className="startups-display-h2">
            Fueling ambition with the right capital: precision fundraising & syndication.
          </h2>

          <div className="startups-lede-grid">
            <p className="startups-lede-p-lead">
              Fundraising is never just about getting money — it’s about choosing the right capital for where you’re going, not just where you are.
            </p>
            <p className="startups-lede-p-body">
              Our funding support helps early- and growth-stage startups navigate the full spectrum of financing. From fine-tuning your pitch and connecting with investors to identifying public grants and preparing compliant applications, we walk with you through the process strategically and side by side.
            </p>
          </div>

          <div className="startups-photo-frame">
            <img
              src="/startups/startups-funding.jpg"
              alt="123 Factory Funding Support"
              loading="lazy"
            />
          </div>

          <div className="startups-deliverables-grid">
            <div className="startups-deliverable-card">
              <h4 className="startups-deliverable-title">Fundraising Strategy & Deal Structuring</h4>
              <p className="startups-deliverable-desc">
                We guide startups through funding rounds, financial modeling, cap table architecture, valuation benchmark analysis, and term sheet negotiations that attract the right partners.
              </p>
            </div>

            <div className="startups-deliverable-card">
              <h4 className="startups-deliverable-title">Investor Matchmaking & Roadshows</h4>
              <p className="startups-deliverable-desc">
                Connecting with the right investors is key. We facilitate targeted introductions through our European and Asian VC networks, organize private roadshows, and provide pitching opportunities.
              </p>
            </div>

            <div className="startups-deliverable-card">
              <h4 className="startups-deliverable-title">Post-Investment Growth Acceleration</h4>
              <p className="startups-deliverable-desc">
                Funding is just the beginning — scaling effectively is what matters. We support startups in deploying capital efficiently, optimizing operations, and achieving sustainable international growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="startups-container"><div className="startups-divider-line" /></div>

      {/* =========================================================================
          SECTION 4: BILATERAL R&D INTELLIGENCE (FUNDING DB)
         ========================================================================= */}
      <section id="funding-db" className="startups-section">
        <div className="startups-container">
          <span className="startups-eyebrow">Bilateral R&amp;D Intelligence</span>
          <h2 className="startups-display-h2">
            Non-Dilutive R&D Capital Intelligence
          </h2>

          <div className="startups-lede-grid">
            <p className="startups-lede-p-lead">
              A structured intelligence platform tracking European and bilateral R&D grants for cross-border tech ventures.
            </p>
            <p className="startups-lede-p-body">
              From Horizon Europe to Korea-Germany 2+2 joint programs and Eureka clusters, we eliminate portal friction to align deep-tech innovation with non-dilutive public capital.
            </p>
          </div>

          {/* 3 Metrics Bar */}
          <div className="startups-metrics-bar">
            <div>
              <span className="startups-metric-num">92+</span>
              <span className="startups-metric-label">Registered Grants</span>
            </div>
            <div>
              <span className="startups-metric-num">22+</span>
              <span className="startups-metric-label">Active Open Calls</span>
            </div>
            <div>
              <span className="startups-metric-num">€50M+</span>
              <span className="startups-metric-label">Non-Dilutive Capital</span>
            </div>
          </div>

          <div className="startups-feature-split">
            <div className="fundingdb-mini-box">
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
                    <span className="radar-pulse-dot" />
                    LIVE
                  </span>
                </div>
              </div>

              <div className="radar-box-meta">
                <span>European &amp; German bilateral grants</span>
                <span className="radar-box-count">92+ Registered</span>
              </div>

              <div className="radar-cards-list">
                <a
                  href="https://fundingdb.123factory.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="radar-card radar-card-blue"
                >
                  <div className="radar-card-main">
                    <div className="radar-card-topline">
                      <span className="radar-card-tag">Bilateral</span>
                      <span className="radar-card-dday">Active Call</span>
                    </div>
                    <h5 className="radar-card-name">Korea-Germany 2+2 Joint R&amp;D 2026</h5>
                    <p className="radar-card-sub">KIAT × BMBF/DLR · AI &amp; DeepTech</p>
                  </div>
                  <div className="radar-card-footer">
                    <span>Up to €350K / KRW 500M</span>
                    <span>↗</span>
                  </div>
                </a>

                <a
                  href="https://fundingdb.123factory.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="radar-card radar-card-blue"
                >
                  <div className="radar-card-main">
                    <div className="radar-card-topline">
                      <span className="radar-card-tag">Eureka</span>
                      <span className="radar-card-dday">D-5</span>
                    </div>
                    <h5 className="radar-card-name">CELTIC-NEXT Autumn Call 2026</h5>
                    <p className="radar-card-sub">EUREKA Cluster · Next-Gen Telecom &amp; ICT</p>
                  </div>
                  <div className="radar-card-footer">
                    <span>Up to €350K / KRW 500M</span>
                    <span>↗</span>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 16px 0' }}>
                fundingdb.123factory.de
              </h3>
              <p style={{ fontSize: '15.5px', lineHeight: 1.65, color: 'rgba(10, 10, 10, 0.65)', margin: '0 0 28px 0' }}>
                Gain real-time visibility into bilateral grant consortiums, consortium partner search, application deadlines, and compliance requirements across Germany and Korea.
              </p>
              <a
                href="https://fundingdb.123factory.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="startups-btn-primary"
              >
                Visit Funding DB Platform ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="startups-container"><div className="startups-divider-line" /></div>

      {/* =========================================================================
          SECTION 5: CORPORATE VENTURES & PILOTS (OPEN INNOVATION HUB)
         ========================================================================= */}
      <section id="open-innovation" className="startups-section">
        <div className="startups-container">
          <span className="startups-eyebrow">Corporate Venture &amp; Pilots</span>
          <h2 className="startups-display-h2">
            Find Your Next Corporate Partner in Europe
          </h2>

          <div className="startups-lede-grid">
            <p className="startups-lede-p-lead">
              Built by 123 Factory, the Open Innovation Hub aggregates startup challenges, pilot projects, and collaboration opportunities from leading European corporations into one searchable platform.
            </p>
            <p className="startups-lede-p-body">
              Helping startups discover high-impact commercial opportunities faster and more efficiently with verified procurement readiness.
            </p>
          </div>

          {/* 3 Metrics Bar */}
          <div className="startups-metrics-bar">
            <div>
              <span className="startups-metric-num">30+</span>
              <span className="startups-metric-label">Active Opportunities</span>
            </div>
            <div>
              <span className="startups-metric-num">10+</span>
              <span className="startups-metric-label">Industry Sectors</span>
            </div>
            <div>
              <span className="startups-metric-num">8+</span>
              <span className="startups-metric-label">European Countries</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4BB395', display: 'block', marginBottom: '6px' }}>
                Updated daily by 123 Factory
              </span>
              <h3 style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>
                Global Open Innovation Opportunities
              </h3>
            </div>
            <a
              href="https://openinnovation.123factory.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="startups-btn-secondary"
              style={{ padding: '12px 24px', fontSize: '13.5px' }}
            >
              openinnovation.123factory.de ↗
            </a>
          </div>

          {/* Corporate Pilots Grid */}
          <div className="startups-pilots-grid">
            {/* 1. Corbion */}
            <div className="startups-pilot-item">
              <div className="startups-pilot-header">
                <span className="startups-pilot-corp">Corbion</span>
                <span className="startups-pilot-status">Always Open</span>
              </div>
              <h4 className="startups-pilot-title">Corbion Open Innovation</h4>
              <p className="startups-pilot-desc">
                Open innovation program focused on sustainable algae fermentation, biochemicals, and circular bio-ingredients.
              </p>
              <div className="startups-pilot-tags">
                <span className="startups-pilot-tag">Bio-Ingredients</span>
                <span className="startups-pilot-tag">Biochemicals</span>
                <span className="startups-pilot-tag">Circular Economy</span>
              </div>
              <div className="startups-pilot-footer">
                <span>Netherlands</span>
                <a
                  href="https://openinnovation.123factory.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="startups-pilot-link"
                >
                  Explore Program →
                </a>
              </div>
            </div>

            {/* 2. Enel Group */}
            <div className="startups-pilot-item">
              <div className="startups-pilot-header">
                <span className="startups-pilot-corp">Enel Group</span>
                <span className="startups-pilot-status">Active Call</span>
              </div>
              <h4 className="startups-pilot-title">Enel Open Innovability®</h4>
              <p className="startups-pilot-desc">
                Seeking deep-tech solutions for grid resilience, clean energy storage, and industrial decarbonization.
              </p>
              <div className="startups-pilot-tags">
                <span className="startups-pilot-tag">Grid Resilience</span>
                <span className="startups-pilot-tag">Energy Systems</span>
                <span className="startups-pilot-tag">Decarbonization</span>
              </div>
              <div className="startups-pilot-footer">
                <span>Italy / Pan-Europe</span>
                <a
                  href="https://openinnovation.123factory.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="startups-pilot-link"
                >
                  Explore Program →
                </a>
              </div>
            </div>

            {/* 3. Google for Startups */}
            <div className="startups-pilot-item">
              <div className="startups-pilot-header">
                <span className="startups-pilot-corp">Google for Startups</span>
                <span className="startups-pilot-status">Cohort 2026</span>
              </div>
              <h4 className="startups-pilot-title">Accelerator Europe</h4>
              <p className="startups-pilot-desc">
                Three-month equity-free acceleration for seed to Series A startups solving climate and enterprise challenges using AI.
              </p>
              <div className="startups-pilot-tags">
                <span className="startups-pilot-tag">AI & ML</span>
                <span className="startups-pilot-tag">DeepTech</span>
                <span className="startups-pilot-tag">Enterprise Cloud</span>
              </div>
              <div className="startups-pilot-footer">
                <span>Germany / UK</span>
                <a
                  href="https://openinnovation.123factory.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="startups-pilot-link"
                >
                  Explore Program →
                </a>
              </div>
            </div>

            {/* 4. Lufthansa Group */}
            <div className="startups-pilot-item">
              <div className="startups-pilot-header">
                <span className="startups-pilot-corp">Lufthansa Group</span>
                <span className="startups-pilot-status">Rolling Pilot</span>
              </div>
              <h4 className="startups-pilot-title">Innovation Hub Challenges</h4>
              <p className="startups-pilot-desc">
                Scouting venture-ready technologies in multimodal logistics, synthetic fuels, and autonomous airport operations.
              </p>
              <div className="startups-pilot-tags">
                <span className="startups-pilot-tag">Aviation</span>
                <span className="startups-pilot-tag">Logistics</span>
                <span className="startups-pilot-tag">SAF Fuels</span>
              </div>
              <div className="startups-pilot-footer">
                <span>Germany / Switzerland</span>
                <a
                  href="https://openinnovation.123factory.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="startups-pilot-link"
                >
                  Explore Program →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="startups-container"><div className="startups-divider-line" /></div>

      {/* =========================================================================
          SECTION 6: EUROPEAN SALES & MARKET ENTRY PLATFORM (MOBANI)
         ========================================================================= */}
      <section id="mobani" className="startups-section">
        <div className="startups-container">
          <span className="startups-eyebrow">European Sales Infrastructure</span>
          <h2 className="startups-display-h2">
            Direct Commercial Expansion into Germany & France
          </h2>

          <div className="startups-lede-grid">
            <p className="startups-lede-p-lead">
              Through our dedicated European sales platform Mobani (mobani.eu), we actively expand Korean Fashion, B2C, and B2B brands into the European consumer & enterprise markets.
            </p>
            <p className="startups-lede-p-body">
              We provide end-to-end commercial operations: European distributor matching, local logistics & fulfillment setup, compliance handling, pop-up showrooms, and direct retail buyer negotiations across Germany and France.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: 'clamp(24px, 3vh, 36px)' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(10, 10, 10, 0.5)' }}>
              Mobani European Sales Platform · mobani.eu
            </span>
            <a
              href="https://www.mobani.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="startups-btn-primary"
              style={{ padding: '14px 28px', fontSize: '14px' }}
            >
              Visit mobani.eu ↗
            </a>
          </div>

          <div className="startups-photo-frame" style={{ margin: '0 0 clamp(48px, 6vh, 72px) 0' }}>
            <img
              src="/startups/startups-mobani.jpg"
              alt="Mobani European Sales Execution"
              loading="lazy"
            />
          </div>

          <div className="startups-deliverables-grid">
            <div className="startups-deliverable-card">
              <h4 className="startups-deliverable-title">Germany & France Retail Access</h4>
              <p className="startups-deliverable-desc">
                Direct commercial matchmaking with top department stores, boutique retail chains, and major European e-commerce distribution channels.
              </p>
            </div>

            <div className="startups-deliverable-card">
              <h4 className="startups-deliverable-title">B2B & Enterprise Sourcing</h4>
              <p className="startups-deliverable-desc">
                Structured buyer meetings, trade showroom representation, localized contract negotiation, and continuous revenue pipeline management.
              </p>
            </div>

            <div className="startups-deliverable-card">
              <h4 className="startups-deliverable-title">Full Logistics & Tax Compliance</h4>
              <p className="startups-deliverable-desc">
                Eliminating cross-border friction: EU VAT registration, customs clearance, local warehousing, and European fulfillment infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MINIMALIST DIRECT CTA
         ========================================================================= */}
      <section className="startups-container">
        <div className="startups-cta-wrap">
          <div className="startups-cta-grid">
            <div>
              <span className="startups-eyebrow">Get Started // Global Scale</span>
              <h2 className="startups-cta-title">
                Ready to scale across borders?
              </h2>
            </div>
            <div className="startups-cta-actions">
              <a
                href="mailto:hello@123factory.de"
                className="startups-btn-primary"
              >
                Get In Touch ➔
              </a>
              <Link
                to="/corporates"
                className="startups-btn-secondary"
              >
                Explore Corporate Solutions ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
