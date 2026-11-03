import React, { useState, useEffect } from 'react';

const KINETIC = [
  [['Bridging', 'CROSS-BORDER'], ['Korea', 'SEOUL'], ['and', null], ['Europe.', 'BERLIN']],
  [['Igniting', 'MOMENTUM'], ['global', 'NETWORK'], ['connection.', 'MARKET ACCESS']],
  [['Empowering', 'HANDS-ON'], ['bold', 'FOUNDER-FIRST'], ['startups.', '0 TO 1']],
];

export function KineticOption({ as: Tag = 'h2' }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.kinetic-word-clickable')) {
        setActiveId(null);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <Tag style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 6.9vw, 124px)', fontWeight: 700, lineHeight: 1.16, letterSpacing: '-0.035em', whiteSpace: 'nowrap' }}>
      {KINETIC.map((line, l) => (
        <div key={l} style={{ display: 'flex', gap: '0 0.25em' }}>
          {line.map(([w, badge], i) => {
            const id = `${l}-${i}`;
            const on = activeId === id;
            const dim = activeId && !on;
            const isClickable = Boolean(badge);

            return (
              <span
                key={id}
                className={isClickable ? 'kinetic-word-clickable' : ''}
                onClick={(e) => {
                  if (isClickable) {
                    e.stopPropagation();
                    setActiveId(prev => (prev === id ? null : id));
                  }
                }}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  cursor: isClickable ? 'pointer' : 'default',
                  userSelect: 'none',
                  color: on ? '#FFAB00' : dim ? 'rgba(255,255,255,0.28)' : '#fff',
                  transform: on ? 'translateY(-8px)' : 'none',
                  transition: 'all .35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {on && badge && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: 12,
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: '#000',
                      background: '#FFAB00',
                      padding: '4px 10px',
                      borderRadius: 4,
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      boxShadow: '0 4px 14px rgba(255, 171, 0, 0.4)',
                      animation: 'kineticBadgePop 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {badge}
                  </span>
                )}
                {w}
              </span>
            );
          })}
        </div>
      ))}
      <style>{`
        @keyframes kineticBadgePop {
          0% { opacity: 0; transform: translate(-50%, 6px) scale(0.9); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
      `}</style>
    </Tag>
  );
}

const LINES = ['Bridging Korea and Europe.', 'Igniting global connection.', 'Empowering bold startups.'];
const GOLD = 'linear-gradient(135deg, #FFAB00 0%, #FFD000 50%, #FF8800 100%)';
const goldText = {
  background: GOLD,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const Label = ({ children }) => (
  <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', marginBottom: 28 }}>
    {children}
  </div>
);

const Block = ({ children, label }) => (
  <section style={{ padding: 'clamp(70px, 9vw, 130px) 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
    <div className="container">
      <Label>{label}</Label>
      {children}
    </div>
  </section>
);

const base = { margin: 0, whiteSpace: 'nowrap', color: '#fff' };

export default function GiantStatementBanner() {
  return (
    <div style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(255,171,0,0.06) 0%, transparent 70%)' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500&family=Manrope:wght@300;500&family=Inter+Tight:wght@500&display=swap');
        .gsb-row { transition: color .4s ease, transform .5s cubic-bezier(.2,.8,.2,1); }
        .gsb-d .gsb-row:hover { color: #FFAB00; transform: translateX(14px); }
      `}</style>

      {/* A — Editorial serif, italic gold accent */}
      <Block label="OPTION A — EDITORIAL SERIF">
        <h2 style={{ ...base, fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: 'clamp(30px, 6.4vw, 108px)', lineHeight: 1.02, letterSpacing: '-0.02em' }}>
          {LINES[0]}<br />
          <em style={{ ...goldText, fontStyle: 'italic', paddingRight: '0.1em' }}>{LINES[1]}</em><br />
          {LINES[2]}
        </h2>
      </Block>

      {/* B — Light grotesk, gold keywords only */}
      <Block label="OPTION B — LIGHT MANROPE, KEYWORD ACCENTS">
        <h2 style={{ ...base, fontFamily: "'Manrope', sans-serif", fontWeight: 300, fontSize: 'clamp(26px, 5.4vw, 88px)', lineHeight: 1.15, letterSpacing: '-0.04em' }}>
          Bridging <span style={{ fontWeight: 500, color: '#FFAB00' }}>Korea</span> and <span style={{ fontWeight: 500, color: '#FFAB00' }}>Europe</span>.<br />
          Igniting <span style={{ fontWeight: 500 }}>global connection</span>.<br />
          Empowering <span style={{ fontWeight: 500 }}>bold startups</span>.
        </h2>
      </Block>

      {/* C — Space Grotesk, numbered rows with dividers */}
      <Block label="OPTION C — NUMBERED ROWS">
        {LINES.map((t, i) => (
          <div key={t} style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(16px, 3vw, 48px)', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#FFAB00', minWidth: 28 }}>0{i + 1}</span>
            <h3 style={{ ...base, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400, fontSize: 'clamp(24px, 5vw, 80px)', lineHeight: 1.05, letterSpacing: '-0.035em' }}>{t}</h3>
          </div>
        ))}
      </Block>

      {/* D — Right-stepped Inter Tight, hover slide */}
      <Block label="OPTION D — STAGGERED, HOVER EACH LINE">
        <div className="gsb-d">
          {LINES.map((t, i) => (
            <h3
              key={t}
              className="gsb-row"
              style={{ ...base, fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: 'clamp(24px, 5vw, 82px)', lineHeight: 1.12, letterSpacing: '-0.045em', paddingLeft: `${i * 8}vw`, color: i === 1 ? '#FFAB00' : '#fff', cursor: 'default' }}
            >
              {t}
            </h3>
          ))}
        </div>
      </Block>

      {/* E — Kinetic word hover, monochrome + amber */}
      <Block label="OPTION E — KINETIC WORD HOVER (WHITE + AMBER)">
        <KineticOption />
      </Block>
    </div>
  );
}
