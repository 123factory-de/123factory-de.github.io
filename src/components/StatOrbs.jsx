import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  {
    key: 'workshops',
    n: 100,
    label: ['Workshops &', 'Executive Seminars'],
    color: '#4BB395',
    left: '6%',
    top: '22%',
    floatDelay: '0s',
    floatDuration: '6.5s',
  },
  {
    key: 'matchmaking',
    n: 200,
    label: ['Matchmaking &', 'Industry Showcases'],
    color: '#E550CE',
    left: '32%',
    top: '56%',
    floatDelay: '-2.4s',
    floatDuration: '7.2s',
  },
  {
    key: 'gtm',
    n: 300,
    label: ['GtM &', 'Market Access'],
    color: '#2D9CDB',
    left: '58%',
    top: '14%',
    floatDelay: '-4.2s',
    floatDuration: '5.8s',
  },
  {
    key: 'insights',
    n: 400,
    label: ['Strategic Insights &', 'Market Intelligence'],
    color: '#FFAB00',
    left: '82%',
    top: '46%',
    floatDelay: '-1.8s',
    floatDuration: '6.8s',
  },
];

function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -100px 0px' }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

function Count({ to, run }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const tick = (t) => {
      start ??= t;
      const p = Math.min((t - start) / 1600, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{v}+</>;
}

function cityTime(tz) {
  return new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
}

export default function StatOrbs() {
  const ref = useRef(null);
  const seen = useInView(ref);
  const [now, setNow] = useState({ b: cityTime('Europe/Berlin'), s: cityTime('Asia/Seoul') });

  useEffect(() => {
    const id = setInterval(() => setNow({ b: cityTime('Europe/Berlin'), s: cityTime('Asia/Seoul') }), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @keyframes orbFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
        @keyframes bridgeFlow { from { stroke-dashoffset: 40 } to { stroke-dashoffset: 0 } }
        .orb-field { position: relative; height: clamp(400px, 36vw, 540px); }
        .orb-wrap {
          position: absolute;
          opacity: 0;
          transform: translateY(90px) scale(0.78);
          filter: blur(14px);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1.5s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 1.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform, filter;
        }
        .orb-wrap.in {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }
        .orb {
          width: clamp(130px, 12vw, 180px);
          aspect-ratio: 1;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          font-family: var(--font-sans);
          animation: orbFloat 6s ease-in-out infinite;
          cursor: default;
          user-select: none;
        }
        .orb-wrap { cursor: default; }
        .orb-n { font-weight: 700; font-size: clamp(26px, 2.6vw, 40px); letter-spacing: -0.035em; line-height: 1; margin-bottom: 8px; }
        .orb-l { font-weight: 500; font-size: clamp(11px, 0.95vw, 14px); line-height: 1.35; letter-spacing: -0.01em; padding: 0 14px; }
        @media (max-width: 720px) {
          .orb-field { height: auto; display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; }
          .orb-wrap { position: static; }
        }
      `}</style>

      {/* Stat orbs */}
      <section
        className="stat-orbs-section"
        style={{
          padding: 'clamp(90px, 14vh, 200px) 0 clamp(80px, 12vw, 160px)',
          position: 'relative',
        }}
      >
        <div ref={ref} className="container orb-field">
          {STATS.map((s, i) => (
            <div
              key={s.n}
              className={`orb-wrap ${seen ? 'in' : ''}`}
              style={{
                transitionDelay: `${i * 0.18 + 0.15}s`,
                left: s.left,
                top: s.top,
              }}
            >
              <div
                className="orb"
                style={{
                  background: s.color,
                  animationDelay: s.floatDelay,
                  animationDuration: s.floatDuration,
                  boxShadow: `0 20px 60px -20px ${s.color}88`,
                }}
              >
                <div className="orb-n"><Count to={s.n} run={seen} /></div>
                <div className="orb-l">{s.label[0]}<br />{s.label[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
