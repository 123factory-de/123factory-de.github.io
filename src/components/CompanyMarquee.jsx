import React, { useState, useEffect } from 'react';

export const PARTNER_SET_A = [
  {
    name: 'Seoul Business Agency (SBA)',
    enName: 'Seoul Business Agency',
    logo: '/partners/sba.svg',
    url: 'https://www.sba.seoul.kr/',
    tag: 'Public Agency · Seoul',
    country: 'KR'
  },
  {
    name: 'KOSME (Korea SMEs and Startups Agency)',
    enName: 'KOSME',
    logo: '/partners/kosme.svg',
    url: 'https://www.kosmes.or.kr/',
    tag: 'Gov Agency · Korea',
    country: 'KR'
  },
  {
    name: 'KISED (Startup & Entrepreneurship Development)',
    enName: 'KISED',
    logo: '/partners/kised.svg',
    url: 'https://www.kised.or.kr/',
    tag: 'Gov Agency · Korea',
    country: 'KR'
  },
  {
    name: 'CCEI (Center for Creative Economy & Innovation)',
    enName: 'CCEI',
    logo: '/partners/ccei.png?v=3',
    url: 'https://ccei.creativekorea.or.kr/',
    tag: 'Innovation Center · Korea',
    country: 'KR'
  },
  {
    name: 'Korea University Sejong IACF',
    enName: 'Korea University Sejong IACF',
    logo: '/partners/korea_univ.png?v=4',
    url: 'https://innovation.korea.ac.kr/',
    tag: 'Academic Partner',
    country: 'KR'
  },
  {
    name: 'SKKU Research & Business Foundation',
    enName: 'SKKU Research & Business Foundation',
    logo: '/partners/skku.png',
    url: 'https://ranbiz.skku.edu/',
    tag: 'Academic Partner',
    country: 'KR'
  },
  {
    name: 'Hanyang University IACF',
    enName: 'Hanyang University IACF',
    logo: '/partners/hanyang_univ.png?v=3',
    url: 'https://research.hanyang.ac.kr/',
    tag: 'Academic Partner',
    country: 'KR'
  },
  {
    name: 'Kwangwoon University IACF',
    enName: 'Kwangwoon University IACF',
    logo: '/partners/kwangwoon_univ.png?v=5',
    url: 'https://iacf.kw.ac.kr/',
    tag: 'Academic Partner',
    country: 'KR'
  },
  {
    name: 'GTAI',
    enName: 'Germany Trade & Invest',
    logo: '/partners/gtai.svg',
    url: 'https://www.gtai.de/',
    tag: 'Federal Agency · Germany',
    country: 'DE'
  },
];

export const PARTNER_SET_B = [
  {
    name: 'LEG Thüringen',
    enName: 'State Development Thuringia',
    logo: '/partners/leg_thueringen.png?v=3',
    url: 'https://www.leg-thueringen.de/',
    tag: 'Regional Agency · Thuringia',
    country: 'DE'
  },
  {
    name: 'City of Düsseldorf',
    enName: 'Landeshauptstadt Düsseldorf Wirtschaftsförderung',
    logo: '/partners/duesseldorf.png',
    url: 'https://duesseldorf-business.com/',
    tag: 'City · North Rhine-Westphalia',
    country: 'DE'
  },
  {
    name: 'LIH',
    enName: 'Lufthansa Innovation Hub',
    logo: '/partners/lih.svg',
    url: 'https://lh-innovationhub.de/',
    tag: 'Corporate Hub · Berlin',
    country: 'DE'
  },
  {
    name: 'Fraunhofer',
    enName: 'Fraunhofer-Gesellschaft',
    logo: '/partners/fraunhofer.png?v=3',
    url: 'https://www.fraunhofer.de/',
    tag: 'Research Institution · Europe',
    country: 'DE'
  },
  {
    name: 'Baker Tilly',
    enName: 'Baker Tilly Germany',
    logo: '/partners/baker_tilly.svg',
    url: 'https://www.bakertilly.de/',
    tag: 'Advisory & Legal · Germany',
    country: 'DE'
  },
  {
    name: 'TU Berlin',
    enName: 'Technische Universität Berlin',
    logo: '/partners/tu_berlin.svg',
    url: 'https://www.tu.berlin/',
    tag: 'Technical University · Berlin',
    country: 'DE'
  },
  {
    name: 'FU Berlin',
    enName: 'Freie Universität Berlin',
    logo: '/partners/fu_berlin.svg',
    url: 'https://www.fu-berlin.de/',
    tag: 'University · Berlin',
    country: 'DE'
  },
  {
    name: 'Berlin City',
    enName: 'State of Berlin & Berlin Partner',
    logo: '/partners/berlin_city.svg',
    url: 'https://www.berlin.de/',
    tag: 'State & Partner · Berlin',
    country: 'DE'
  },
  {
    name: 'Charité',
    enName: 'Universitätsmedizin Berlin',
    logo: '/partners/charite.svg',
    url: 'https://www.charite.de/',
    tag: 'Medical University · Berlin',
    country: 'DE'
  },
];

export default function CompanyMarquee() {
  const [activeSet, setActiveSet] = useState(0); // 0 = setA, 1 = setB
  const [activeLogos, setActiveLogos] = useState(PARTNER_SET_A);
  const [fadingRows, setFadingRows] = useState([false, false, false]); // [row0, row1, row2]

  const triggerTransitionTo = (nextSetIndex) => {
    const targetSet = nextSetIndex === 0 ? PARTNER_SET_A : PARTNER_SET_B;

    const swapRow = (rowIndex, startIndices) => {
      // Phase 1: 0.7s Fade Out
      setFadingRows((prev) => {
        const next = [...prev];
        next[rowIndex] = true;
        return next;
      });

      // Phase 2: Swap items while transparent
      setTimeout(() => {
        setActiveLogos((prev) => {
          const nextLogos = [...prev];
          nextLogos[startIndices[0]] = targetSet[startIndices[0]];
          nextLogos[startIndices[1]] = targetSet[startIndices[1]];
          nextLogos[startIndices[2]] = targetSet[startIndices[2]];
          return nextLogos;
        });

        // Phase 3: Trigger 0.7s Fade In
        setTimeout(() => {
          setFadingRows((prev) => {
            const next = [...prev];
            next[rowIndex] = false;
            return next;
          });
        }, 60);
      }, 700);
    };

    // Cascade Row 0 immediately
    swapRow(0, [0, 1, 2]);

    // Cascade Row 1 (350ms later)
    setTimeout(() => {
      swapRow(1, [3, 4, 5]);
    }, 350);

    // Cascade Row 2 (700ms later)
    setTimeout(() => {
      swapRow(2, [6, 7, 8]);
    }, 700);

    setActiveSet(nextSetIndex);
  };

  useEffect(() => {
    const mainInterval = setInterval(() => {
      const nextIndex = activeSet === 0 ? 1 : 0;
      triggerTransitionTo(nextIndex);
    }, 7500);

    return () => clearInterval(mainInterval);
  }, [activeSet]);

  const handleManualSwitch = (targetIndex) => {
    if (targetIndex === activeSet) return;
    triggerTransitionTo(targetIndex);
  };

  return (
    <div className="logo-grid-wrapper">
      <div className="logo-3x3-grid">
        {activeLogos.map((partner, index) => {
          const rowIndex = Math.floor(index / 3);
          const isRowFading = fadingRows[rowIndex];

          return (
            <a
              key={`${partner.name}-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`logo-grid-card ${isRowFading ? 'row-fading' : ''}`}
              title={`${partner.name} (${partner.enName})`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="partner-logo-img"
                loading="lazy"
              />
            </a>
          );
        })}
      </div>

      {/* Minimal Sleek Pagination Dots */}
      <div className="grid-pagination-dots">
        <button
          type="button"
          onClick={() => handleManualSwitch(0)}
          className={`page-dot ${activeSet === 0 ? 'active' : ''}`}
          aria-label="Set 1: Korea Innovation & Academic"
        />
        <button
          type="button"
          onClick={() => handleManualSwitch(1)}
          className={`page-dot ${activeSet === 1 ? 'active' : ''}`}
          aria-label="Set 2: Germany & Europe Ecosystem"
        />
      </div>
    </div>
  );
}
