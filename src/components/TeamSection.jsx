import React from 'react';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Eunseo Yi',
    role: 'Founder & CEO',
    image: '/eunseo-yi.jpg',
  },
  {
    name: 'Kyung Jae Leon Kim',
    role: 'Director of Communications',
    image: '/kyungjae-kim.jpg',
  },
  {
    name: 'June Kim',
    role: 'Partnership & Operations Manager',
    image: '/june-kim.jpg',
  },
  {
    name: 'Ha Linh Nguyen',
    role: 'Office/Admin & Business Development Manager',
    image: '/halinh-nguyen.jpg',
  },
  {
    name: 'Svenja Wöllecke',
    role: 'Project Manager',
    image: '/svenja-woellecke.jpg',
  },
  {
    name: 'Claire Seoyeon Lee',
    role: 'Strategy & Operations Manager',
    image: '/claire-lee.jpg',
  },
];

export default function TeamSection({ showFullHeader = true }) {
  const scrollRef = React.useRef(null);
  const [activePage, setActivePage] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeftStart, setScrollLeftStart] = React.useState(0);

  // Update active page on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const page = scrollLeft >= maxScroll * 0.45 ? 1 : 0;
        setActivePage(page);
      }
    }
  };

  React.useEffect(() => {
    handleScroll();

    const sectionEl = document.querySelector('.team-section');
    if (!sectionEl) return;
    const blocks = sectionEl.querySelectorAll('.scroll-reveal-block');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    blocks.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftStart(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    scrollRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const scrollToPage = (pageIndex) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;

    const targetLeft = pageIndex === 0 ? 0 : maxScroll;
    scrollRef.current.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });
    setActivePage(pageIndex);
  };

  return (
    <section className="section team-section" style={{ padding: 'clamp(90px, 10vw, 160px) 0', background: 'transparent' }}>
      <div className="container" style={{ width: '100%', maxWidth: '100%', padding: '0 clamp(20px, 2.8vw, 50px)' }}>
        {showFullHeader && (
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
              People, Behind
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
              <span>Cross-border practitioners.</span>
              <br />
              <span>Venture builders connecting two worlds.</span>
            </p>
          </div>
        )}

        {/* Team Horizontal Scroll Container */}
        <div className="team-scroll-wrapper scroll-reveal-block stagger-2">
          <div
            className={`team-grid ${isDragging ? 'is-dragging' : ''}`}
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
          >
            {teamMembers.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-img-wrapper">
                  <img src={member.image} alt={member.name} className="team-img" draggable="false" />
                  {/* Name and role overlay directly on top of photo */}
                  <div className="team-overlay">
                    <h3 className="team-overlay-name">{member.name}</h3>
                    <span className="team-overlay-role">{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Sleek Pagination Dots (Identical to Together With) */}
          <div
            className="grid-pagination-dots scroll-reveal-block stagger-3"
            style={{ marginTop: 'clamp(36px, 4vw, 56px)' }}
          >
            <button
              type="button"
              onClick={() => scrollToPage(0)}
              className={`page-dot ${activePage === 0 ? 'active' : ''}`}
              aria-label="View first team group"
            />
            <button
              type="button"
              onClick={() => scrollToPage(1)}
              className={`page-dot ${activePage === 1 ? 'active' : ''}`}
              aria-label="View second team group"
            />
          </div>
        </div>

        {/* View All Team CTA */}
        {showFullHeader && (
          <div className="scroll-reveal-block stagger-4" style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(56px, 6.5vw, 96px)' }}>
            <Link to="/team" className="btn-minimal-capsule">
              More
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
