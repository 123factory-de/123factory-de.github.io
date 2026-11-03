import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CompanyMarquee from '../components/CompanyMarquee';
import TeamSection from '../components/TeamSection';
import { KineticOption } from '../components/GiantStatementBanner';
import StatOrbs from '../components/StatOrbs';
import LogoTicker from '../components/LogoTicker';
import RadarCombinedSection from '../components/RadarCombinedSection';
import { FEED_POSTS } from '../data/feedData';

function TwoBoxesPortal() {
  return (
    <section
      className="section two-boxes-portal-section"
      style={{
        padding: '0 0 clamp(90px, 10vw, 150px) 0',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="container" style={{ maxWidth: '1640px', margin: '0 auto', padding: '0 clamp(20px, 3.5vw, 56px)' }}>
        <div className="two-boxes-grid">
          {/* BOX 1: FOR STARTUPS */}
          <div className="portal-box-wrap scroll-reveal-block stagger-1">
            <Link to="/startups" className="portal-box startups-box">
              {/* Background Image: Grayscale Dark by Default -> Full Color on Hover */}
              <div className="box-bg-image startups-bg" />

              {/* Dark Vignette Overlay for Crisp Text Readability */}
              <div className="box-bg-overlay" />

              {/* Typography Content: Title at bottom -> lifts up on hover revealing program tracks */}
              <div className="box-content">
                <h2 className="box-hero-title">
                  For Startups
                </h2>

                <div className="box-programs-accordion">
                  <div className="box-programs-inner">
                    <div className="box-programs-list">
                      <div className="program-item">
                        <span className="program-dots" aria-label="Program 1">
                          <span className="dot dot-startup" />
                        </span>
                        <span className="program-name">Go-to-Market &amp; Validation Track</span>
                      </div>
                      <div className="program-item">
                        <span className="program-dots" aria-label="Program 2">
                          <span className="dot dot-startup" />
                          <span className="dot dot-startup" />
                        </span>
                        <span className="program-name">Accelerators &amp; Scale-up Programs</span>
                      </div>
                      <div className="program-item">
                        <span className="program-dots" aria-label="Program 3">
                          <span className="dot dot-startup" />
                          <span className="dot dot-startup" />
                          <span className="dot dot-startup" />
                        </span>
                        <span className="program-name">European Soft-Landing &amp; Incorporation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* BOX 2: FOR CORPORATES */}
          <div className="portal-box-wrap scroll-reveal-block stagger-2">
            <Link to="/corporates" className="portal-box corporates-box">
              {/* Background Image: Grayscale Dark by Default -> Full Color on Hover */}
              <div className="box-bg-image corporates-bg" />

              {/* Dark Vignette Overlay for Crisp Text Readability */}
              <div className="box-bg-overlay" />

              {/* Typography Content: Title at bottom -> lifts up on hover revealing program tracks */}
              <div className="box-content">
                <h2 className="box-hero-title">
                  For Corporates
                </h2>

                <div className="box-programs-accordion">
                  <div className="box-programs-inner">
                    <div className="box-programs-list">
                      <div className="program-item">
                        <span className="program-dots" aria-label="Program 1">
                          <span className="dot dot-corporate" />
                        </span>
                        <span className="program-name">Curated Deal Sourcing &amp; Scouting</span>
                      </div>
                      <div className="program-item">
                        <span className="program-dots" aria-label="Program 2">
                          <span className="dot dot-corporate" />
                          <span className="dot dot-corporate" />
                        </span>
                        <span className="program-name">Strategic PoC &amp; Commercial Pilots</span>
                      </div>
                      <div className="program-item">
                        <span className="program-dots" aria-label="Program 3">
                          <span className="dot dot-corporate" />
                          <span className="dot dot-corporate" />
                          <span className="dot dot-corporate" />
                        </span>
                        <span className="program-name">Venture Clienting &amp; Open Innovation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .two-boxes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(24px, 3.2vw, 48px);
          width: 100%;
        }

        .portal-box-wrap {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }

        .portal-box-wrap .portal-box {
          flex: 1;
          height: 100%;
        }

        .portal-box {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: clamp(560px, 44vw, 700px);
          padding: clamp(36px, 3.8vw, 56px) clamp(36px, 4vw, 64px) clamp(44px, 4.5vw, 68px);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-decoration: none;
          color: #ffffff;
          overflow: hidden;
          background-color: #0b0b0e;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          transition: box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
          cursor: pointer;
        }

        .portal-box:hover {
          transform: translateY(-8px) translateZ(0);
        }

        .portal-box.startups-box:hover {
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.75), 0 0 55px rgba(255, 171, 0, 0.28), 0 0 120px rgba(255, 171, 0, 0.14);
        }

        .portal-box.corporates-box:hover {
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.75), 0 0 55px rgba(60, 199, 155, 0.28), 0 0 120px rgba(60, 199, 155, 0.14);
        }

        .box-bg-image {
          position: absolute;
          inset: 0;
          border-radius: 32px;
          background-size: cover;
          background-position: center;
          opacity: 0.78;
          transform: scale(1.0) translateZ(0);
          filter: grayscale(100%) brightness(0.85) contrast(105%);
          transition: filter 0.65s cubic-bezier(0.16, 1, 0.3, 1), 
                      opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .startups-bg {
          background-image: url(/startups/startups-hall.jpg);
        }

        .corporates-bg {
          background-image: url(/corporates/corporates-stage.jpg);
        }

        .portal-box:hover .box-bg-image {
          opacity: 0.96;
          filter: grayscale(0%) brightness(0.98) contrast(105%);
          transform: scale(1.04) translateZ(0);
        }

        .box-bg-overlay {
          position: absolute;
          inset: 0;
          border-radius: 32px;
          background: linear-gradient(180deg, rgba(11, 11, 14, 0.1) 0%, rgba(9, 9, 12, 0.35) 50%, rgba(8, 8, 10, 0.85) 100%);
          z-index: 2;
          pointer-events: none;
        }

        .box-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .box-hero-title {
          margin: 0;
          font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(40px, 4.2vw, 72px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #ffffff;
          transition: color 0.35s ease;
          white-space: nowrap;
        }

        .portal-box.startups-box:hover .box-hero-title {
          color: #ffab00;
        }

        .portal-box.corporates-box:hover .box-hero-title {
          color: #3cc79b;
        }

        .box-programs-accordion {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.38s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .portal-box:hover .box-programs-accordion {
          grid-template-rows: 1fr;
        }

        .box-programs-inner {
          min-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.35s ease 0.04s, 
                      transform 0.38s cubic-bezier(0.16, 1, 0.3, 1) 0.04s;
        }

        .portal-box:hover .box-programs-inner {
          opacity: 1;
          transform: translateY(0);
        }

        .box-programs-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: clamp(16px, 1.8vw, 24px);
        }

        .program-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .program-dots {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          min-width: 32px;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .dot-startup {
          background-color: #ffab00;
          box-shadow: 0 0 8px rgba(255, 171, 0, 0.7);
        }

        .dot-corporate {
          background-color: #3cc79b;
          box-shadow: 0 0 8px rgba(60, 199, 155, 0.7);
        }

        .program-name {
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
          font-size: clamp(14px, 1.1vw, 17px);
          font-weight: 500;
          color: #ffffff;
          letter-spacing: -0.01em;
          white-space: nowrap;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
        }

        @media (max-width: 900px) {
          .two-boxes-grid {
            grid-template-columns: 1fr !important;
          }
          .portal-box {
            min-height: 440px !important;
            padding: 40px 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default function HomeView() {
  const [animated, setAnimated] = useState(false);
  const philosophyRef = useRef(null);
  const [philosophyRevealed, setPhilosophyRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Standard scroll reveal for rest of page
  useEffect(() => {
    const blocks = document.querySelectorAll('.scroll-reveal-block');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -100px 0px' }
    );

    blocks.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Delayed late fade-in observer for Philosophy text (matching the delayed StatOrbs)
  useEffect(() => {
    const el = philosophyRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhilosophyRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -100px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="content-wrapper">
      {/* 01: Headline Typography Hero Section */}
      <section
        className="section hero-headline-section"
        style={{
          minHeight: 'calc(100vh - 70px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: 'clamp(45px, 6vh, 75px)',
          paddingBottom: 'clamp(90px, 12vh, 150px)',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="headline-hero-wrapper" style={{ margin: '0 auto' }}>
            <div
              style={{
                opacity: animated ? 1 : 0,
                transform: animated ? 'none' : 'translateY(24px)',
                transition: 'opacity .9s ease, transform .9s cubic-bezier(.2,.8,.2,1)',
                marginBottom: 44,
              }}
            >
              <KineticOption as="h1" />
            </div>
            <div className={`headline-hero-submeta ${animated ? 'is-visible' : ''}`}>
              <LogoTicker />
              <span>Startup Accelerator &amp; Venture Builder</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02: Stat Orbs + Berlin↔Seoul Bridge */}
      <StatOrbs />

      {/* Philosophy Statement Section */}
      <section
        className="section philosophy-text-section"
        style={{
          paddingTop: 'clamp(70px, 8vw, 130px)',
          paddingBottom: 'clamp(140px, 16vw, 250px)',
        }}
      >
        <div ref={philosophyRef} className="philosophy-wrapper">
          <h2
            className="philosophy-text"
            style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 1.6vw, 24px)' }}
          >
            {/* Sentence 1 */}
            <span
              style={{
                opacity: philosophyRevealed ? 1 : 0,
                transform: philosophyRevealed ? 'none' : 'translateY(60px) scale(0.97)',
                filter: philosophyRevealed ? 'blur(0)' : 'blur(12px)',
                transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), filter 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'opacity, transform, filter',
              }}
            >
              We help founders build and grow their companies between Korea and Europe.
            </span>

            {/* Sentence 2 */}
            <span
              style={{
                opacity: philosophyRevealed ? 1 : 0,
                transform: philosophyRevealed ? 'none' : 'translateY(60px) scale(0.97)',
                filter: philosophyRevealed ? 'blur(0)' : 'blur(12px)',
                transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.16s, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.16s, filter 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.16s',
                willChange: 'opacity, transform, filter',
              }}
            >
              For corporates, we source deals and scout the startups worth meeting.
            </span>
          </h2>
        </div>
      </section>

      {/* 03: Two Interactive Portal Boxes (For Startups & Founders vs For Corporates & Investors) */}
      <TwoBoxesPortal />

      {/* Portfolio Logos Marquee Section */}
      <section
        className="section"
        style={{
          padding: 'clamp(90px, 10vw, 160px) 0',
          background: 'transparent',
          border: 'none',
        }}
      >
        <div className="container">
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
              Together with
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
              <span>Built alongside industry leaders.</span>
              <br />
              <span>Shaping global innovation together.</span>
            </p>
          </div>
          <div className="scroll-reveal-block stagger-2">
            <CompanyMarquee />
          </div>
        </div>
      </section>

      {/* Team Leadership Section */}
      <TeamSection />

      {/* ON YOUR RADAR - Combined Side-by-Side Radar Section */}
      <RadarCombinedSection />

      {/* Minimal Insights & News Feed Section */}
      <section className="section" style={{ padding: 'clamp(90px, 10vw, 160px) 0', background: 'transparent', border: 'none' }}>
        <div className="feed-minimal-container">
          <div className="feed-grid-minimal">
            {FEED_POSTS.slice(0, 3).map((post, idx) => {
              const catType = post.categoryType || (idx === 2 ? 'Insights' : 'Press');
              const isExt = Boolean(post.externalUrl);

              const imgElement = (
                <img
                  src={post.image}
                  alt={post.title}
                  className="feed-img-minimal"
                  style={post.imageStyle}
                />
              );

              return (
                <div key={post.slug} className={`feed-card-minimal scroll-reveal-block stagger-${idx + 1}`}>
                  {isExt ? (
                    <a
                      href={post.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="feed-img-wrap-minimal"
                    >
                      {imgElement}
                    </a>
                  ) : (
                    <Link
                      to={`/feed/${post.slug}`}
                      className="feed-img-wrap-minimal"
                    >
                      {imgElement}
                    </Link>
                  )}
                  <div className="feed-meta-wrap">
                    <Link
                      to={`/feed?category=${catType}`}
                      className="feed-meta-minimal"
                      title={`View all ${catType} stories`}
                    >
                      {catType}
                    </Link>
                  </div>
                  <h4 className="feed-title-minimal">
                    {isExt ? (
                      <a
                        href={post.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="feed-title-link"
                      >
                        {post.title}
                      </a>
                    ) : (
                      <Link
                        to={`/feed/${post.slug}`}
                        className="feed-title-link"
                      >
                        {post.title}
                      </Link>
                    )}
                  </h4>
                </div>
              );
            })}
          </div>

          <div className="scroll-reveal-block stagger-4" style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(56px, 6vw, 84px)' }}>
            <Link to="/feed" className="btn-minimal-capsule">
              More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
