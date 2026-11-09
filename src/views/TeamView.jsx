import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import WorldOfficeMap from '../components/WorldOfficeMap';

// 18 Partners Data from Home Marquee
const ALL_PARTNERS = [
  // Korea Partners (8)
  {
    name: 'Seoul Business Agency (SBA)',
    enName: 'Seoul Business Agency',
    logo: '/partners/sba.svg',
    url: 'https://www.sba.seoul.kr/',
    tag: 'Public Agency · Seoul',
    country: 'KR',
    desc: "Leading municipal agency accelerating Seoul's deep-tech ventures into Europe."
  },
  {
    name: 'KOSME (Korea SMEs and Startups Agency)',
    enName: 'KOSME',
    logo: '/partners/kosme.svg',
    url: 'https://www.kosmes.or.kr/',
    tag: 'Gov Agency · Korea',
    country: 'KR',
    desc: 'Government agency funding innovation and scaling Korean startups globally.'
  },
  {
    name: 'KISED (Startup & Entrepreneurship Development)',
    enName: 'KISED',
    logo: '/partners/kised.svg',
    url: 'https://www.kised.or.kr/',
    tag: 'Gov Agency · Korea',
    country: 'KR',
    desc: 'National public institute fostering cross-border entrepreneurship and tech growth.'
  },
  {
    name: 'CCEI (Center for Creative Economy & Innovation)',
    enName: 'CCEI',
    logo: '/partners/ccei.png?v=3',
    url: 'https://ccei.creativekorea.or.kr/',
    tag: 'Innovation Center · Korea',
    country: 'KR',
    desc: 'Regional innovation hub connecting tech ventures with European market pilots.'
  },
  {
    name: 'Korea University Sejong IACF',
    enName: 'Korea University Sejong IACF',
    logo: '/partners/korea_univ.png?v=4',
    url: 'https://innovation.korea.ac.kr/',
    tag: 'Academic Partner',
    country: 'KR',
    desc: 'Academic partner driving bilateral joint R&D and tech commercialization.'
  },
  {
    name: 'SKKU Research & Business Foundation',
    enName: 'SKKU Research & Business Foundation',
    logo: '/partners/skku.png',
    url: 'https://ranbiz.skku.edu/',
    tag: 'Academic Partner',
    country: 'KR',
    desc: 'Premier research university driving global patent transfer and venture spin-offs.'
  },
  {
    name: 'Hanyang University IACF',
    enName: 'Hanyang University IACF',
    logo: '/partners/hanyang_univ.png?v=3',
    url: 'https://research.hanyang.ac.kr/',
    tag: 'Academic Partner',
    country: 'KR',
    desc: 'Industry-academic foundation facilitating European innovation sprints and pilots.'
  },
  {
    name: 'Kwangwoon University IACF',
    enName: 'Kwangwoon University IACF',
    logo: '/partners/kwangwoon_univ.png?v=5',
    url: 'https://iacf.kw.ac.kr/',
    tag: 'Academic Partner',
    country: 'KR',
    desc: 'Pioneering electronics and ICT research consortium for overseas expansion.'
  },
  // Germany & Europe Partners (10)
  {
    name: 'GTAI',
    enName: 'Germany Trade & Invest',
    logo: '/partners/gtai.svg',
    url: 'https://www.gtai.de/',
    tag: 'Federal Agency · Germany',
    country: 'DE',
    desc: "Germany's federal economic development and foreign trade promotion agency."
  },
  {
    name: 'LEG Thüringen',
    enName: 'State Development Thuringia',
    logo: '/partners/leg_thueringen.png?v=3',
    url: 'https://www.leg-thueringen.de/',
    tag: 'Regional Agency · Thuringia',
    country: 'DE',
    desc: 'State agency facilitating German-Korean industrial partnerships and landing.'
  },
  {
    name: 'City of Düsseldorf',
    enName: 'City of Düsseldorf',
    logo: '/partners/duesseldorf.png',
    url: 'https://duesseldorf-business.com/',
    tag: 'City · North Rhine-Westphalia',
    country: 'DE',
    desc: 'Municipal office supporting cross-border expansion in North Rhine-Westphalia.'
  },
  {
    name: 'LIH',
    enName: 'Lufthansa Innovation Hub',
    logo: '/partners/lih.svg',
    url: 'https://lh-innovationhub.de/',
    tag: 'Corporate Hub · Berlin',
    country: 'DE',
    desc: 'Corporate innovation powerhouse spearheading aviation and mobility ventures.'
  },
  {
    name: 'Fraunhofer',
    enName: 'Fraunhofer-Gesellschaft',
    logo: '/partners/fraunhofer.png?v=3',
    url: 'https://www.fraunhofer.de/',
    tag: 'Research Institution · Europe',
    country: 'DE',
    desc: "Europe's leading application-oriented research organization for industry tech."
  },
  {
    name: 'Baker Tilly',
    enName: 'Baker Tilly Germany',
    logo: '/partners/baker_tilly.svg',
    url: 'https://www.bakertilly.de/',
    tag: 'Advisory & Legal · Germany',
    country: 'DE',
    desc: 'Global advisory partner providing cross-border legal, tax, and compliance support.'
  },
  {
    name: 'TU Berlin',
    enName: 'Technische Universität Berlin',
    logo: '/partners/tu_berlin.svg',
    url: 'https://www.tu.berlin/',
    tag: 'Technical University · Berlin',
    country: 'DE',
    desc: 'Top technical university driving deep-tech research, spin-offs, and consortia.'
  },
  {
    name: 'FU Berlin',
    enName: 'Freie Universität Berlin',
    logo: '/partners/fu_berlin.svg',
    url: 'https://www.fu-berlin.de/',
    tag: 'University · Berlin',
    country: 'DE',
    desc: 'Premier university fostering transatlantic startup incubation and venture scaling.'
  },
  {
    name: 'Berlin City',
    enName: 'Berlin Partner',
    logo: '/partners/berlin_city.svg',
    url: 'https://www.berlin.de/',
    tag: 'State & Partner · Berlin',
    country: 'DE',
    desc: 'Public-private agency supporting technology growth and soft-landing in Berlin.'
  },
  {
    name: 'Charité',
    enName: 'Charité Universitätsmedizin',
    logo: '/partners/charite.svg',
    url: 'https://www.charite.de/',
    tag: 'Medical University · Berlin',
    country: 'DE',
    desc: "Europe's largest university hospital and biomedical research innovation hub."
  },
];

// Team Members
const TEAM_MEMBERS = [
  {
    name: 'Eunseo Yi',
    role: 'Founder & CEO',
    location: 'Berlin / Seoul',
    image: '/eunseo-yi.jpg',
    bio: 'Pioneering cross-border venture models between Germany and Korea. Former innovation advisor connecting Asian deep tech with European DAX 40 leaders.',
  },
  {
    name: 'Kyung Jae Leon Kim',
    role: 'Director of Communications',
    location: 'Berlin / Seoul',
    image: '/kyungjae-kim.jpg',
    bio: 'Leading strategic communications, international narrative architecture, and institutional investor relations across Asian and European ecosystems.',
  },
  {
    name: 'June Kim',
    role: 'Partnership & Operations Manager',
    location: 'Seoul / Berlin',
    image: '/june-kim.jpg',
    bio: 'Driving enterprise partnerships, cross-border pilot execution, and startup acceleration programs across healthcare, mobility, and industrial tech.',
  },
  {
    name: 'Ha Linh Nguyen',
    role: 'Office/Admin & Business Development Manager',
    location: 'Berlin',
    image: '/halinh-nguyen.jpg',
    bio: 'Managing European operations, stakeholder engagement, and strategic business development across our Berlin venture ecosystem.',
  },
  {
    name: 'Svenja Wöllecke',
    role: 'Project Manager',
    location: 'Berlin',
    image: '/svenja-woellecke.jpg',
    bio: 'Structuring and executing high-impact international programs, corporate matchmaking summits, and innovation initiatives for global founders.',
  },
  {
    name: 'Claire Seoyeon Lee',
    role: 'Strategy & Operations Manager',
    location: 'Seoul',
    image: '/claire-lee.jpg',
    bio: 'Spearheading deal curation, startup scouting, and dual-hub operational excellence between Korean innovation clusters and European markets.',
  },
];

// 6 PSL-Style Accelerator Stages
const ACCELERATOR_STEPS = [
  {
    num: '01',
    phase: 'Scouting & Dual-Hub Sourcing',
    title: 'Deep-Tech Potential in Seoul & Berlin',
    headline: 'It starts with high cross-border elasticity.',
    body: 'We identify venture-scale tech founders solving foundational problems across artificial intelligence, mobility, robotics, green tech, and industrial SaaS. Through proactive dual-hub scouting in Seoul and Berlin, we filter for defensible IP, founder resilience, and genuine scalability into the European single market.',
    pills: ['Dual-Hub Screening', 'Proprietary Tech IP', 'Cross-Border Elasticity', 'Founder Evaluation'],
    stat: 'Top 3%',
    statLabel: 'Cohort Acceptance Rate',
  },
  {
    num: '02',
    phase: 'Validation & PMF Sprints',
    title: 'Europe is Not One Single Market',
    headline: 'Every startup has assumptions. We stress-test them on the ground.',
    body: 'Expanding to Europe requires navigating localized customer behaviors, language nuances, and fragmented industrial ecosystems. We put unit economics, compliance hurdles (GDPR, CE certification), willingness-to-pay, and European competitor benchmarks through structured validation sprints before deploying capital.',
    pills: ['CE & GDPR Compliance', 'Unit Economics Testing', 'Customer Discovery Sprints', 'Competitor Benchmarking'],
    stat: '4–6 Wks',
    statLabel: 'Rapid Validation Cycle',
  },
  {
    num: '03',
    phase: 'Capital Architecture & R&D Grants',
    title: 'De-Risking with Non-Dilutive Capital',
    headline: '€50M+ in bilateral public grant intelligence.',
    body: 'Before giving away valuable company equity, we engineer non-dilutive public funding consortia. Using our proprietary Funding DB platform, we align Korean and European tech ventures with Horizon Europe calls, Korea-Germany 2+2 joint programs, and Eureka clusters to finance mission-critical R&D without diluting founder ownership.',
    pills: ['Horizon Europe', 'Korea-Germany 2+2', 'Eureka Clusters', 'Zero Equity Dilution'],
    stat: '€50M+',
    statLabel: 'Non-Dilutive R&D Capital',
  },
  {
    num: '04',
    phase: 'Corporate Venture & Pilots',
    title: 'Commercial Contracts, Not Vanity Meetings',
    headline: 'Direct access to DAX 40 and European industry leaders.',
    body: 'Through our Open Innovation Hub, we connect validated ventures directly into corporate pilot challenges with leading European industrial leaders (automotive, logistics, chemicals, energy). We facilitate paid PoCs, joint innovation pilots, and corporate venture client agreements.',
    pills: ['Paid PoC Sprints', 'Venture Clienting', 'DAX 40 Matchmaking', 'Pilot Architecture'],
    stat: '30+',
    statLabel: 'Active Corporate Calls',
  },
  {
    num: '05',
    phase: 'Commercial Execution & Sales',
    title: 'On-the-Ground Market Entry',
    headline: 'Immediate distribution across Germany & France.',
    body: 'Through our dedicated commercial sales platform Mobani (mobani.eu) and Berlin soft-landing infrastructure, we handle local entity incorporation, VAT compliance, warehousing, showroom distribution, and direct retail buyer negotiations for consumer, fashion, and enterprise brands.',
    pills: ['Mobani Commercial Platform', 'Direct Retail Distribution', 'German GmbH Setup', 'French Market Entry'],
    stat: '2 Key Hubs',
    statLabel: 'Germany & France Expansion',
  },
  {
    num: '06',
    phase: 'Global Syndicate & Scale-Up',
    title: 'Institutional European Venture Backing',
    headline: 'Closing the transatlantic growth gap.',
    body: 'We prepare founders for institutional European fundraising: valuation alignment, cross-border cap table structuring, term sheet negotiations, and syndicate introductions to leading European venture capital firms and strategic investors for Series A and growth rounds.',
    pills: ['Tier-1 European VCs', 'Cap Table Structuring', 'Cross-Border Syndication', 'Series A+ Acceleration'],
    stat: '€20M+',
    statLabel: 'Follow-On Co-Investment',
  },
];

// Helper Animated Counter Component
function AnimatedStatCounter({ value, inView }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = parseInt(value, 10);
    if (isNaN(target)) return;

    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(ease * target));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [inView, value]);

  return <span>{displayValue}+</span>;
}

function formatOfficeTime(timeZone) {
  try {
    return new Date().toLocaleTimeString('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  } catch (e) {
    return '--:--:--';
  }
}



export default function TeamView() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeStep, setActiveStep] = useState(0);
  const [metricsInView, setMetricsInView] = useState(false);
  const metricsRef = useRef(null);

  const [officeTimes, setOfficeTimes] = useState({
    berlin: formatOfficeTime('Europe/Berlin'),
    seoul: formatOfficeTime('Asia/Seoul'),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setOfficeTimes({
        berlin: formatOfficeTime('Europe/Berlin'),
        seoul: formatOfficeTime('Asia/Seoul'),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'how-we-work', label: '01 · Our Methodology' },
    { id: 'impact', label: '02 · Impact & Numbers' },
    { id: 'services', label: '03 · Our Services' },
    { id: 'team', label: '04 · Leadership & Team' },
    { id: 'partners', label: '05 · 18 Global Partners' },
    { id: 'offices', label: '06 · Global Hubs' },
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

  // Scroll spy to update active nav tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'how-we-work', 'impact', 'services', 'team', 'partners', 'offices'];
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

  // Intersection observer for metric counter trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-dark-page">
      <style>{`
        /* =========================================================================
           DARK MODE MASTER CANVAS (Obsidian Black / Apple Off-Black Theme)
           ========================================================================= */
        .about-dark-page {
          background-color: #0A0A0A;
          color: #FFFFFF;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          min-height: 100vh;
          padding-bottom: clamp(100px, 12vw, 180px);
          -webkit-font-smoothing: antialiased;
        }

        .about-container {
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 80px);
          box-sizing: border-box;
        }

        /* Sticky Minimal Subnav Bar (Dark Translucent Glass) */
        .about-subnav-sticky {
          position: sticky;
          top: 64px;
          z-index: 100;
          background: rgba(10, 10, 10, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px 0;
          transition: background-color 0.25s ease;
        }

        .about-subnav-inner {
          display: flex;
          align-items: center;
          gap: clamp(16px, 2.5vw, 36px);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .about-subnav-inner::-webkit-scrollbar {
          display: none;
        }

        .about-subnav-btn {
          background: transparent;
          border: none;
          padding: 8px 0;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.45);
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          transition: color 0.2s ease;
        }

        .about-subnav-btn:hover {
          color: #FFFFFF;
        }

        .about-subnav-btn.is-active {
          color: #FFFFFF;
          font-weight: 600;
        }

        .about-subnav-btn.is-active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -16px;
          height: 2px;
          background: #FFAB00;
        }

        /* Section Spacing & Headers */
        .about-section {
          padding-top: clamp(90px, 12vh, 160px);
        }

        .about-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          display: block;
          margin-bottom: clamp(18px, 2.5vh, 28px);
        }

        .about-display-h1 {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(38px, 5.6vw, 76px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #FFFFFF;
          margin: 0 0 clamp(48px, 5.5vw, 76px) 0;
          width: 100%;
          max-width: 100%;
          text-align: left;
          word-break: keep-all;
        }

        .about-display-h2 {
          font-size: clamp(28px, 3.2vw, 46px);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin: 0 0 clamp(20px, 2.5vh, 32px) 0;
          max-width: 980px;
        }

        /* Lede Grid matching Startups & Corporates */
        .about-lede-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: flex-start;
          margin-bottom: clamp(56px, 7vh, 96px);
        }

        @media (max-width: 768px) {
          .about-lede-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .about-lede-p-lead {
          font-size: clamp(20px, 1.8vw, 28px);
          font-weight: 400;
          line-height: 1.35;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
        }

        .about-lede-p-body {
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.65);
          margin: 0 0 16px 0;
        }

        /* Photo Frames */
        .about-photo-frame {
          width: 100%;
          overflow: hidden;
          background: #141417;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          margin: clamp(48px, 6vw, 80px) 0 0 0;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .about-photo-frame img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
          object-position: center 25%;
          aspect-ratio: 16 / 9.2;
          max-height: clamp(540px, 60vw, 860px);
        }

        /* Mission Lead Subtitle */
        .about-hero-mission-lead {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 400;
          line-height: 1.45;
          letter-spacing: -0.015em;
          color: rgba(255, 255, 255, 0.65);
          max-width: 1040px;
          margin: 0;
          word-break: keep-all;
        }

        /* Hero Expanded Breakout Container (Ultra-Wide Cinematic Presentation) */
        .about-hero-full-container {
          width: 100%;
          max-width: 1840px;
          margin: clamp(80px, 9.5vw, 140px) auto 0;
          padding: 0 clamp(16px, 1.8vw, 32px);
          box-sizing: border-box;
        }

        .about-photo-frame-hero {
          margin: 0 !important;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 35px 110px rgba(0, 0, 0, 0.8);
        }

        .about-photo-frame-hero img {
          width: 100%;
          height: auto;
          max-height: none;
          aspect-ratio: 16 / 9;
          object-position: center 25%;
          display: block;
        }

        .about-photo-caption {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.45);
          display: block;
          margin-bottom: clamp(48px, 6vh, 80px);
          letter-spacing: -0.01em;
        }

        /* Methodology Wide Container: Reduced side margins, broader span */
        .methodology-wide-container {
          width: 100%;
          max-width: 1560px;
          margin: clamp(60px, 7vw, 100px) auto 0;
          padding: 0 clamp(16px, 2.5vw, 40px);
          box-sizing: border-box;
        }

        .methodology-rows-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(64px, 8vw, 110px);
          width: 100%;
        }

        .methodology-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
          gap: clamp(40px, 5.5vw, 84px);
          align-items: center;
          padding-bottom: clamp(48px, 6vw, 84px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .methodology-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        @media (max-width: 960px) {
          .methodology-row {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        .methodology-visual-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: clamp(24px, 4vw, 48px) clamp(16px, 2.5vw, 32px);
          box-sizing: border-box;
          background: transparent;
        }

        .methodology-visual-wrap svg {
          width: 100%;
          max-width: 380px;
          height: auto;
          display: block;
          overflow: visible;
        }

        /* Celestial Kinetic Loop Animation for Symbol */
        @keyframes symSpinSystem {
          0%, 5% {
            transform: rotate(-45deg);
          }
          37%, 63% {
            transform: rotate(0deg);
          }
          95%, 100% {
            transform: rotate(-45deg);
          }
        }

        @keyframes symSlideLeftHub {
          0%, 5% {
            transform: translate(45px, 0);
          }
          37%, 63% {
            transform: translate(0px, 0);
          }
          95%, 100% {
            transform: translate(45px, 0);
          }
        }

        @keyframes symSlideRightHub {
          0%, 5% {
            transform: translate(-45px, 0);
          }
          37%, 63% {
            transform: translate(0px, 0);
          }
          95%, 100% {
            transform: translate(-45px, 0);
          }
        }

        @keyframes symSatelliteTop {
          0%, 5% {
            transform: translate(0, 36px) scale(0.45);
            opacity: 0.25;
          }
          37%, 63% {
            transform: translate(0, 0px) scale(1);
            opacity: 1;
          }
          95%, 100% {
            transform: translate(0, 36px) scale(0.45);
            opacity: 0.25;
          }
        }

        @keyframes symSatelliteBottom {
          0%, 5% {
            transform: translate(0, -36px) scale(0.45);
            opacity: 0.25;
          }
          37%, 63% {
            transform: translate(0, 0px) scale(1);
            opacity: 1;
          }
          95%, 100% {
            transform: translate(0, -36px) scale(0.45);
            opacity: 0.25;
          }
        }

        .sym-system-group {
          transform-origin: 180px 120px;
          animation: symSpinSystem 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym-left-group {
          animation: symSlideLeftHub 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym-right-group {
          animation: symSlideRightHub 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym-satellite-top {
          transform-origin: 135px 46px;
          animation: symSatelliteTop 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform, opacity;
        }

        .sym-satellite-bottom {
          transform-origin: 225px 194px;
          animation: symSatelliteBottom 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform, opacity;
        }

        /* Step 02: Optical Eclipse (Validation & PMF Sprints) */
        @keyframes sym02EclipseLeft {
          0%, 5% { transform: translate(0px, 0); }
          37%, 63% { transform: translate(32px, 0); }
          95%, 100% { transform: translate(0px, 0); }
        }

        @keyframes sym02EclipseRight {
          0%, 5% { transform: translate(0px, 0); }
          37%, 63% { transform: translate(-32px, 0); }
          95%, 100% { transform: translate(0px, 0); }
        }

        @keyframes sym02FocusDot {
          0%, 5% { transform: scale(0.4); opacity: 0.2; }
          37%, 63% { transform: scale(1.2); opacity: 1; }
          95%, 100% { transform: scale(0.4); opacity: 0.2; }
        }

        .sym02-left-circle {
          animation: sym02EclipseLeft 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym02-right-circle {
          animation: sym02EclipseRight 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym02-focus-dot {
          transform-origin: 180px 120px;
          animation: sym02FocusDot 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform, opacity;
        }

        /* Step 03: Harmonic Dot Progression (Non-Dilutive Capital) */
        @keyframes sym03AnchorPulse {
          0%, 5% { transform: scale(1); }
          37%, 63% { transform: scale(1.08); }
          95%, 100% { transform: scale(1); }
        }

        @keyframes sym03DotWave1 {
          0%, 5% { transform: translateX(0); opacity: 0.5; }
          37%, 63% { transform: translateX(10px); opacity: 1; }
          95%, 100% { transform: translateX(0); opacity: 0.5; }
        }

        @keyframes sym03DotWave2 {
          0%, 5% { transform: translateX(0); opacity: 0.5; }
          40%, 63% { transform: translateX(18px); opacity: 1; }
          95%, 100% { transform: translateX(0); opacity: 0.5; }
        }

        @keyframes sym03DotWave3 {
          0%, 5% { transform: translateX(0); opacity: 0.4; }
          43%, 63% { transform: translateX(24px); opacity: 1; }
          95%, 100% { transform: translateX(0); opacity: 0.4; }
        }

        @keyframes sym03DotWave4 {
          0%, 5% { transform: translateX(0); opacity: 0.3; }
          46%, 63% { transform: translateX(28px); opacity: 1; }
          95%, 100% { transform: translateX(0); opacity: 0.3; }
        }

        .sym03-anchor {
          transform-origin: 85px 120px;
          animation: sym03AnchorPulse 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym03-dot-1 {
          animation: sym03DotWave1 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform, opacity;
        }
        .sym03-dot-2 {
          animation: sym03DotWave2 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform, opacity;
        }
        .sym03-dot-3 {
          animation: sym03DotWave3 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform, opacity;
        }
        .sym03-dot-4 {
          animation: sym03DotWave4 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform, opacity;
        }

        /* Step 04: Foundation & Bridge (Corporate Venture & Pilots) */
        @keyframes sym04HeadFloat {
          0%, 5% { transform: translateY(0); }
          37%, 63% { transform: translateY(-10px); }
          95%, 100% { transform: translateY(0); }
        }

        @keyframes sym04BarTopSlide {
          0%, 5% { transform: translateX(0); }
          37%, 63% { transform: translateX(-12px); }
          95%, 100% { transform: translateX(0); }
        }

        @keyframes sym04BarBottomSlide {
          0%, 5% { transform: translateX(0); }
          37%, 63% { transform: translateX(12px); }
          95%, 100% { transform: translateX(0); }
        }

        .sym04-head {
          animation: sym04HeadFloat 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym04-bar-top {
          animation: sym04BarTopSlide 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym04-bar-bottom {
          animation: sym04BarBottomSlide 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        /* Step 05: Unfolding Circular Aperture (Market Entry) */
        @keyframes sym05PhaseRotate {
          0%, 5% { transform: rotate(0deg); }
          37%, 63% { transform: rotate(90deg); }
          95%, 100% { transform: rotate(0deg); }
        }

        @keyframes sym05PulseFull {
          0%, 5% { transform: scale(0.92); opacity: 0.7; }
          37%, 63% { transform: scale(1.08); opacity: 1; }
          95%, 100% { transform: scale(0.92); opacity: 0.7; }
        }

        .sym05-phase-1 {
          transform-origin: 90px 120px;
          animation: sym05PhaseRotate 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym05-phase-2 {
          transform-origin: 150px 120px;
          animation: sym05PhaseRotate 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym05-phase-3 {
          transform-origin: 210px 120px;
          animation: sym05PhaseRotate 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform;
        }

        .sym05-phase-4 {
          transform-origin: 270px 120px;
          animation: sym05PulseFull 6s cubic-bezier(0.25, 1, 0.3, 1) infinite;
          will-change: transform, opacity;
        }

        .methodology-content-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .methodology-title {
          font-family: var(--font-sans);
          font-size: clamp(26px, 2.6vw, 38px);
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: -0.025em;
          color: #FFFFFF;
          margin: 0 0 16px 0;
          word-break: keep-all;
        }

        .methodology-headline {
          font-family: var(--font-sans);
          font-size: clamp(17px, 1.4vw, 21px);
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: -0.015em;
          color: #FFAB00;
          margin: 0 0 24px 0;
          word-break: keep-all;
        }

        .methodology-body {
          font-family: var(--font-sans);
          font-size: clamp(15px, 1.2vw, 17px);
          line-height: 1.75;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.68);
          margin: 0;
          word-break: keep-all;
          max-width: 620px;
        }

        /* Earlybird-Inspired Minimal Bento Grid for The Numbers */
        .earlybird-bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.08fr;
          grid-template-rows: minmax(260px, auto) minmax(260px, auto);
          gap: clamp(16px, 1.8vw, 24px);
          width: 100%;
          box-sizing: border-box;
        }

        .earlybird-card {
          background: #0B0B0E;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: clamp(28px, 3vw, 40px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          border-radius: 4px;
          transition: border-color 0.25s ease;
        }

        .earlybird-card:hover {
          border-color: rgba(255, 255, 255, 0.18);
        }

        .earlybird-card-wide {
          grid-column: 1 / 3;
          grid-row: 1;
        }

        .earlybird-card-tall {
          grid-column: 3 / 4;
          grid-row: 1 / 3;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 1024px) {
          .earlybird-bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .earlybird-card-wide {
            grid-column: 1 / 3;
          }
          .earlybird-card-tall {
            grid-column: 1 / 3;
            grid-row: auto;
            min-height: 320px;
          }
        }

        @media (max-width: 640px) {
          .earlybird-bento-grid {
            grid-template-columns: 1fr;
          }
          .earlybird-card-wide,
          .earlybird-card-tall {
            grid-column: 1;
            grid-row: auto;
          }
        }

        .earlybird-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: clamp(24px, 3vw, 36px);
        }

        .earlybird-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }

        .earlybird-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.85);
        }

        .earlybird-number-wrap {
          font-family: var(--font-sans);
          font-weight: 800;
          letter-spacing: -0.05em;
          line-height: 0.88;
          font-size: clamp(64px, 7vw, 108px);
          color: #FFFFFF;
          margin-bottom: clamp(20px, 2.5vw, 32px);
        }

        .earlybird-number-hero {
          font-size: clamp(84px, 9.5vw, 148px);
          line-height: 0.85;
          color: #FFFFFF;
        }

        .earlybird-card-footer {
          margin-top: auto;
        }

        .earlybird-label {
          font-family: var(--font-sans);
          font-size: clamp(14px, 1.15vw, 17px);
          font-weight: 600;
          letter-spacing: -0.015em;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.35;
          display: block;
          word-break: keep-all;
        }

        /* Services Dual Portal Cards */
        .about-services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 5.5vw, 76px);
          margin-top: 0;
        }

        @media (max-width: 860px) {
          .about-services-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        .about-service-card {
          background: #141417;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: clamp(36px, 4.5vw, 64px);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 480px;
          border-radius: 4px;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .about-service-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .about-service-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 16px;
          display: block;
        }

        .about-service-title {
          font-size: clamp(26px, 2.5vw, 38px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0 0 20px 0;
          word-break: keep-all;
        }

        /* Service Cards Action Buttons with Landing Page Brand Glow */
        .about-btn-startups {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #FFAB00;
          color: #0A0A0A;
          border: 1px solid #FFAB00;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
          padding: 18px 36px;
          text-decoration: none;
          border-radius: 2px;
          box-shadow: 0 4px 16px rgba(255, 171, 0, 0.25);
          transition: background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .about-btn-startups:hover {
          background: #FFB81E;
          border-color: #FFB81E;
          transform: translateY(-2px);
          box-shadow: 0 0 32px rgba(255, 171, 0, 0.65), 0 0 65px rgba(255, 171, 0, 0.35), 0 8px 24px rgba(0, 0, 0, 0.5);
        }

        .about-btn-corporates {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #27C99F;
          color: #0A0A0A;
          border: 1px solid #27C99F;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
          padding: 18px 36px;
          text-decoration: none;
          border-radius: 2px;
          box-shadow: 0 4px 16px rgba(39, 201, 159, 0.25);
          transition: background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .about-btn-corporates:hover {
          background: #34D6AC;
          border-color: #34D6AC;
          transform: translateY(-2px);
          box-shadow: 0 0 32px rgba(39, 201, 159, 0.65), 0 0 65px rgba(39, 201, 159, 0.35), 0 8px 24px rgba(0, 0, 0, 0.5);
        }

        .about-service-desc {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.65);
          margin: 0 0 32px 0;
        }

        .about-service-list {
          list-style: none;
          padding: 0;
          margin: 0 0 36px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .about-service-item {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .about-service-item::before {
          content: '—';
          color: rgba(255, 255, 255, 0.35);
        }

        /* Team Section Grid */
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 3.5vw, 44px);
          margin-top: 0;
        }

        @media (max-width: 992px) {
          .about-team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .about-team-grid {
            grid-template-columns: 1fr;
          }
        }

        .about-team-card {
          position: relative;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          border-radius: 4px;
          overflow: hidden;
          transition: filter 0.35s ease, opacity 0.35s ease, transform 0.35s ease;
        }

        /* Hover interaction: dim & desaturate other members when any card is hovered */
        .about-team-grid:hover .about-team-card {
          filter: grayscale(100%);
          opacity: 0.38;
        }

        .about-team-grid .about-team-card:hover {
          filter: grayscale(0%);
          opacity: 1;
          transform: translateY(-2px);
        }

        .about-team-img-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #111114;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          box-sizing: border-box;
          border-radius: 4px;
        }

        .about-team-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(0%);
          transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .about-team-card:hover .about-team-img-wrap img {
          transform: scale(1.04);
        }

        /* Sleek overlay: appears on hover showing name & role */
        .about-team-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 35%, rgba(0, 0, 0, 0.55) 70%, rgba(0, 0, 0, 0.94) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(18px, 2.2vw, 28px);
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          pointer-events: none;
        }

        .about-team-card:hover .about-team-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .about-team-name {
          font-family: var(--font-sans);
          font-size: clamp(18px, 1.6vw, 22px);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #FFFFFF;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }

        .about-team-role {
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 500;
          color: #FFAB00;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.35;
        }

        /* 18 Partners Continuous Full-Bleed Grid (Portfolio Style) */
        .about-partners-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          margin-top: 0;
          margin-bottom: clamp(60px, 8vw, 100px);
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 1280px) {
          .about-partners-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .about-partners-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .about-partners-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .about-partner-card {
          border-right: 1px solid rgba(255, 255, 255, 0.12);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          aspect-ratio: 1 / 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          background: #0A0A0C;
          box-sizing: border-box;
          overflow: hidden;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .about-partner-card:hover {
          background: #141418;
        }

        .about-partner-logo-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: clamp(18px, 2.5vw, 36px);
          box-sizing: border-box;
          pointer-events: none;
        }

        .about-partner-logo {
          width: 100%;
          height: 100%;
          max-width: clamp(120px, 9.5vw, 160px);
          max-height: clamp(44px, 3.8vw, 58px);
          object-fit: contain;
          object-position: center;
          filter: brightness(0) invert(1);
          opacity: 0.9;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease;
        }

        .about-partner-card:hover .about-partner-logo {
          transform: scale(1.06);
          opacity: 1;
        }

        /* Portfolio Dark Mode Hover Reveal Overlay */
        .about-partner-hover-overlay {
          position: absolute;
          inset: 0;
          background: #141418;
          padding: clamp(14px, 1.6vw, 22px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          box-sizing: border-box;
          transition: opacity 0.24s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 2;
        }

        .about-partner-card:hover .about-partner-hover-overlay {
          opacity: 1;
        }

        .about-partner-hover-mid {
          margin: auto 0;
        }

        .about-partner-hover-name {
          font-family: var(--font-sans);
          font-size: clamp(12.5px, 1vw, 14.5px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0 0 5px 0;
          line-height: 1.25;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .about-partner-hover-desc {
          font-family: var(--font-sans);
          font-size: 11px;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          letter-spacing: -0.01em;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .about-partner-hover-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
        }

        .about-partner-hover-tag {
          font-family: var(--font-mono, monospace);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.08);
          padding: 2.5px 7px;
          border-radius: 3px;
          white-space: nowrap;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* =========================================================================
           SECTION 7: DUAL-HUB PRESENCE (ZOOMED CORRIDOR MAP // BERLIN & SEOUL)
           ========================================================================= */
        .about-office-map-bleed {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 clamp(16px, 2.5vw, 36px);
          box-sizing: border-box;
        }

        .corridor-map-container {
          width: 100%;
          max-width: 100%;
          position: relative;
          aspect-ratio: 400 / 185;
          margin: 0 auto;
          background: transparent;
          border: none;
          box-shadow: none;
        }

        .corridor-map-svg {
          width: 100%;
          height: 100%;
          display: block;
          -webkit-mask-image: radial-gradient(ellipse 84% 80% at 50% 50%, #000 55%, transparent 100%);
          mask-image: radial-gradient(ellipse 84% 80% at 50% 50%, #000 55%, transparent 100%);
        }

        /* Grayish matte tech continent styling - 100% Seamless Borderless Silhouette */
        .corridor-countries-group {
          pointer-events: none;
        }

        .corridor-countries-group path {
          fill: #191B22;
          stroke: #191B22;
          stroke-width: 2.2px;
          stroke-linejoin: round;
          stroke-linecap: round;
          paint-order: stroke fill;
        }

        .corridor-countries-group #de,
        .corridor-countries-group #kr {
          fill: #191B22;
          stroke: #191B22;
          stroke-width: 2.2px;
        }

        /* Thin & Smooth Flowing Flight Arc connecting Berlin and Seoul (Neutral Tone) */
        .corridor-arc-flight-line {
          animation: corridorFlow 8s linear infinite;
        }

        @keyframes corridorFlow {
          from {
            stroke-dashoffset: 40;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        /* =========================================================================
           HIGHLIGHTED TERRITORIES: GERMANY & SOUTH KOREA (BRIGHT NEUTRAL TONES)
           ========================================================================= */
        .corridor-hub-countries {
          pointer-events: auto;
        }

        .country-link {
          cursor: pointer;
          outline: none;
        }

        .country-shape {
          cursor: pointer;
          transform-box: fill-box;
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      fill 0.3s ease,
                      stroke 0.3s ease,
                      filter 0.3s ease;
        }

        /* Germany - Luminous Crisp Platinum Neutral (Berlin HQ) */
        .country-shape.country-germany {
          fill: #D8DFE8;
          stroke: #D8DFE8;
          stroke-width: 0.8px;
          stroke-linejoin: round;
          stroke-linecap: round;
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.45));
        }

        .germany-link:hover .country-germany,
        .country-shape.country-germany.is-active,
        .country-germany:hover {
          transform: scale(1.22);
          fill: #FFFFFF;
          stroke: #FFFFFF;
          stroke-width: 1.2px;
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 24px rgba(255, 255, 255, 0.6));
        }

        /* South Korea - Luminous Crisp Platinum Neutral (Seoul Office) */
        .country-shape.country-korea {
          fill: #D8DFE8;
          stroke: #D8DFE8;
          stroke-width: 0.8px;
          stroke-linejoin: round;
          stroke-linecap: round;
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.45));
        }

        .korea-link:hover .country-korea,
        .country-shape.country-korea.is-active,
        .country-korea:hover {
          transform: scale(1.3);
          fill: #FFFFFF;
          stroke: #FFFFFF;
          stroke-width: 1.2px;
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 24px rgba(255, 255, 255, 0.6));
        }

        /* =========================================================================
           FLOATING OFFICE CARDS ANCHORED ABOVE BERLIN & SEOUL (PHOTOS + ADDRESS)
           ========================================================================= */
        .corridor-office-card {
          position: absolute;
          text-decoration: none;
          cursor: pointer;
          z-index: 25;
          width: clamp(175px, 14vw, 220px);
          background: rgba(14, 16, 22, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 8px;
          padding: 8px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.75), 0 0 20px rgba(255, 255, 255, 0.04);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }

        .corridor-office-card.berlin-card {
          left: 19%;
          top: 52%;
          transform: translate(-50%, -100%);
        }

        .corridor-office-card.seoul-card {
          left: 84%;
          top: 64%;
          transform: translate(-70%, -100%);
        }

        .corridor-office-card:hover,
        .corridor-office-card.is-active {
          border-color: rgba(255, 255, 255, 0.65);
          box-shadow: 0 20px 44px rgba(0, 0, 0, 0.9), 0 0 28px rgba(255, 255, 255, 0.25);
        }

        .corridor-office-card.berlin-card:hover,
        .corridor-office-card.berlin-card.is-active {
          transform: translate(-50%, -104%) scale(1.03);
        }

        .corridor-office-card.seoul-card:hover,
        .corridor-office-card.seoul-card.is-active {
          transform: translate(-70%, -104%) scale(1.03);
        }

        .card-thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 5px;
          overflow: hidden;
          background: #0A0A0A;
        }

        .card-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .corridor-office-card:hover .card-thumb-img,
        .corridor-office-card.is-active .card-thumb-img {
          transform: scale(1.06);
        }

        .card-city-tag {
          position: absolute;
          top: 6px;
          left: 6px;
          background: rgba(10, 12, 16, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.02em;
          padding: 3px 7px;
          border-radius: 3px;
          line-height: 1.2;
        }

        .card-info {
          padding: 7px 4px 2px 4px;
        }

        .card-street {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-city {
          font-family: var(--font-sans);
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.65);
          margin-top: 2px;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-connector-line {
          position: absolute;
          bottom: -14px;
          left: 50%;
          width: 1px;
          height: 14px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent);
          transform: translateX(-50%);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .corridor-office-card {
            width: clamp(140px, 36vw, 175px);
            padding: 6px;
          }
          .card-city-tag {
            font-size: 9.5px;
            padding: 2px 5px;
          }
          .card-street {
            font-size: 10.5px;
          }
          .card-city {
            font-size: 9px;
          }
        }

        /* Divider Line */
        .about-divider-line {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: clamp(70px, 9vh, 120px) 0 0 0;
        }

        /* Minimal Closing CTA */
        .about-cta-wrap {
          margin-top: clamp(100px, 14vh, 180px);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: clamp(60px, 8vh, 100px);
        }

        .about-cta-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: flex-end;
        }

        @media (max-width: 860px) {
          .about-cta-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .about-cta-title {
          font-size: clamp(36px, 5vw, 76px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #FFFFFF;
          margin: 0;
        }

        .about-cta-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .about-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          color: #0A0A0A;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 18px 36px;
          text-decoration: none;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .about-btn-primary:hover {
          background: #E5E5E5;
          transform: translateY(-1px);
        }

        .about-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.25);
          font-family: var(--font-sans);
          font-size: 15px;
        .about-btn-secondary:hover {
          border-color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>

      {/* =========================================================================
          SECTION 0: OVERVIEW & MISSION
         ========================================================================= */}
      <section id="overview" className="about-section">
        <div className="about-container">
          <h1 className="about-display-h1">
            We connect and accelerate startups between Korea and Europe, providing strategic guidance and mentorship for seamless market entry.
          </h1>

          <p className="about-hero-mission-lead">
            Our mission is to build a cross-border innovation ecosystem, empowering entrepreneurs with the resources to thrive globally.
          </p>
        </div>

        {/* Ultra-Wide Cinematic Hero Keynote Image (Breakout) */}
        <div className="about-hero-full-container">
          <div className="about-photo-frame about-photo-frame-hero">
            <img
              src="/about/about-hero-keynote.jpg"
              alt="123 Factory CEO Eunseo Yi Keynote"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: HOW WE WORK (PSL STUDIO INSPIRED 6-STEP ACCELERATOR METHODOLOGY)
         ========================================================================= */}
      <section id="how-we-work" className="about-section">
        <div className="about-container">
          <h2 className="about-display-h2">
            Our Methodology
          </h2>
          <p style={{
            fontSize: 'clamp(21px, 2vw, 28px)',
            color: 'rgba(255, 255, 255, 0.72)',
            maxWidth: '100%',
            lineHeight: 1.45,
            letterSpacing: '-0.015em',
            margin: '0 0 clamp(80px, 9vw, 130px) 0',
            wordBreak: 'keep-all'
          }}>
            Expanding across continents cannot be left to trial and error. Inspired by top global venture studios, our 5-phase acceleration methodology systematically de-risks cross-border venture creation from Day 0 scouting to institutional syndication.
          </p>
        </div>

        {/* METHODOLOGY ROWS (WIDER SPREAD WITH REDUCED SIDE MARGINS) */}
        <div className="methodology-wide-container">
          <div className="methodology-rows-wrap">
            {/* STEP 01 */}
            <div className="methodology-row">
              {/* LEFT: PURE FLOATING MINIMALIST GEOMETRIC SYMBOL (NO CARD BOX) */}
              <div className="methodology-visual-wrap">
                <svg viewBox="0 0 360 240" width="100%" height="100%">
                  {/* System Rotating Group (Centered at 180, 120) */}
                  <g className="sym-system-group">
                    {/* Left Hub Group (Solid Circle + Top Satellite) */}
                    <g className="sym-left-group">
                      {/* Left Hub: Pure Solid Circle (Seoul) */}
                      <circle cx="135" cy="120" r="42" fill="#FFFFFF" />
                      
                      {/* Top-Left Satellite Beacon: Solid Accent Dot */}
                      <g className="sym-satellite-top">
                        <circle cx="135" cy="46" r="7.5" fill="#FFFFFF" />
                      </g>
                    </g>

                    {/* Right Hub Group (Outline Ring + Bottom Satellite) */}
                    <g className="sym-right-group">
                      {/* Right Hub: Crisp Outline Ring in Magnetic Tension (Berlin) */}
                      <circle cx="225" cy="120" r="42" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />

                      {/* Bottom-Right Satellite: Fine Outline Dot */}
                      <g className="sym-satellite-bottom">
                        <circle cx="225" cy="194" r="7.5" fill="none" stroke="#FFFFFF" strokeWidth="2" />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>

              {/* RIGHT: EDITORIAL TEXT CONTENT */}
              <div className="methodology-content-card">
                <h3 className="methodology-title">
                  Cross-Border Deal Sourcing
                </h3>
                <p className="methodology-body">
                  We identify ambitious tech ventures across AI, mobility, robotics, green tech, and industrial SaaS. Through active scouting in Seoul and Berlin, we assess technological differentiation, defensible IP, founder strength, and scalability in the European market.
                </p>
              </div>
            </div>

            {/* STEP 02 */}
            <div className="methodology-row">
              {/* LEFT: MINIMALIST OPTICAL ECLIPSE SYMBOL */}
              <div className="methodology-visual-wrap">
                <svg viewBox="0 0 360 240" width="100%" height="100%">
                  <g>
                    {/* Left Solid Body Gliding Inward */}
                    <circle cx="140" cy="120" r="46" fill="#FFFFFF" className="sym02-left-circle" />
                    {/* Right Outline Body Gliding Inward */}
                    <circle cx="220" cy="120" r="46" fill="none" stroke="#FFFFFF" strokeWidth="2.5" className="sym02-right-circle" />
                    {/* Central Focus Aperture Dot */}
                    <circle cx="180" cy="120" r="7" fill="#FFFFFF" className="sym02-focus-dot" />
                  </g>
                </svg>
              </div>

              {/* RIGHT: EDITORIAL TEXT CONTENT */}
              <div className="methodology-content-card">
                <h3 className="methodology-title">
                  European Market Validation
                </h3>
                <p className="methodology-body">
                  Europe is not a single market. We test business models against local customer needs, industry dynamics, regulatory requirements, and competitive landscapes. Our validation process focuses on product-market fit, unit economics, and commercial viability before capital is deployed.
                </p>
              </div>
            </div>

            {/* STEP 03 */}
            <div className="methodology-row">
              {/* LEFT: MINIMALIST HARMONIC DOT PROGRESSION SYMBOL */}
              <div className="methodology-visual-wrap">
                <svg viewBox="0 0 360 240" width="100%" height="100%">
                  <g>
                    {/* Left Heavy Gravity Anchor */}
                    <circle cx="85" cy="120" r="38" fill="#FFFFFF" className="sym03-anchor" />
                    {/* Cascading Harmonic Dots */}
                    <circle cx="170" cy="120" r="16" fill="#FFFFFF" className="sym03-dot-1" />
                    <circle cx="220" cy="120" r="12" fill="#FFFFFF" className="sym03-dot-2" />
                    <circle cx="260" cy="120" r="8.5" fill="#FFFFFF" className="sym03-dot-3" />
                    <circle cx="292" cy="120" r="5" fill="#FFFFFF" className="sym03-dot-4" />
                  </g>
                </svg>
              </div>

              {/* RIGHT: EDITORIAL TEXT CONTENT */}
              <div className="methodology-content-card">
                <h3 className="methodology-title">
                  Non-Dilutive Funding
                </h3>
                <p className="methodology-body">
                  We structure cross-border funding consortia that help startups finance critical R&D without diluting equity. Through our proprietary Funding DB, we connect Korean and European ventures with Horizon Europe, Korea-Germany joint R&D programmes, and Eureka funding schemes.
                </p>
              </div>
            </div>

            {/* STEP 04 */}
            <div className="methodology-row">
              {/* LEFT: MINIMALIST FOUNDATION & BRIDGE SYMBOL */}
              <div className="methodology-visual-wrap">
                <svg viewBox="0 0 360 240" width="100%" height="100%">
                  <g>
                    {/* Floating Circle Anchor */}
                    <circle cx="180" cy="85" r="32" fill="#FFFFFF" className="sym04-head" />
                    {/* Foundation Balance Rail Top */}
                    <rect x="110" y="142" width="140" height="4" rx="2" fill="#FFFFFF" className="sym04-bar-top" />
                    {/* Foundation Balance Rail Bottom */}
                    <rect x="135" y="158" width="90" height="4" rx="2" fill="rgba(255, 255, 255, 0.45)" className="sym04-bar-bottom" />
                  </g>
                </svg>
              </div>

              {/* RIGHT: EDITORIAL TEXT CONTENT */}
              <div className="methodology-content-card">
                <h3 className="methodology-title">
                  Corporate Market Access
                </h3>
                <p className="methodology-body">
                  Through our Open Innovation Hub, we connect validated startups with leading European corporations, including DAX 40 companies. We facilitate paid PoCs, joint innovation projects, and venture client partnerships that turn corporate interest into tangible business opportunities.
                </p>
              </div>
            </div>

            {/* STEP 05 */}
            <div className="methodology-row">
              {/* LEFT: MINIMALIST UNFOLDING CIRCULAR APERTURE PHASES */}
              <div className="methodology-visual-wrap">
                <svg viewBox="0 0 360 240" width="100%" height="100%">
                  <g>
                    {/* Phase 1: 90 deg Quarter Sector */}
                    <g className="sym05-phase-1">
                      <circle cx="90" cy="120" r="22" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
                      <path d="M 90 120 L 90 98 A 22 22 0 0 1 112 120 Z" fill="#FFFFFF" />
                    </g>

                    {/* Phase 2: 180 deg Half Sector */}
                    <g className="sym05-phase-2">
                      <circle cx="150" cy="120" r="22" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
                      <path d="M 150 98 A 22 22 0 0 1 150 142 Z" fill="#FFFFFF" />
                    </g>

                    {/* Phase 3: 270 deg Arc Sector */}
                    <g className="sym05-phase-3">
                      <circle cx="210" cy="120" r="22" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
                      <path d="M 210 120 L 232 120 A 22 22 0 1 1 210 98 Z" fill="#FFFFFF" />
                    </g>

                    {/* Phase 4: Full Solid Circle */}
                    <g className="sym05-phase-4">
                      <circle cx="270" cy="120" r="22" fill="#FFFFFF" />
                    </g>
                  </g>
                </svg>
              </div>

              {/* RIGHT: EDITORIAL TEXT CONTENT */}
              <div className="methodology-content-card">
                <h3 className="methodology-title">
                  Market Entry & Commercialization
                </h3>
                <p className="methodology-body">
                  We accelerate market entry across Germany and France through our Berlin-based infrastructure and commercial platform, Mobani. From company incorporation and regulatory compliance to warehousing, distribution, and retail partnerships, we provide hands-on support to establish and grow local operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="about-container"><div className="about-divider-line" /></div>

      {/* =========================================================================
          SECTION 3: IMPACT & METRICS (THE 4 CORE NUMBERS FROM HERO)
         ========================================================================= */}
      <section id="impact" className="about-section" ref={metricsRef}>
        <div className="about-container">
          <h2 className="about-display-h2">
            The Numbers Behind Our Ecosystem
          </h2>
          <p style={{
            fontSize: 'clamp(21px, 2vw, 28px)',
            color: 'rgba(255, 255, 255, 0.72)',
            maxWidth: '100%',
            lineHeight: 1.45,
            letterSpacing: '-0.015em',
            margin: '0 0 clamp(80px, 9vw, 130px) 0',
            wordBreak: 'keep-all'
          }}>
            Over the past years, 123 Factory has translated bilateral strategic initiatives into quantifiable commercial traction across Europe and Asia.
          </p>
          {/* EARLYBIRD-INSPIRED MINIMAL BENTO GRID (COMPACT & ALIGNED TO TEXT) */}
          <div className="earlybird-bento-grid">
            {/* CARD 1: 100+ (Wide Card: Workshops & Executive Seminars) */}
            <div className="earlybird-card earlybird-card-wide">
              <div className="earlybird-card-header">
                <span className="earlybird-tag">01 // PLATFORM</span>
                <div className="earlybird-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
              <div className="earlybird-number-wrap">
                <AnimatedStatCounter value={100} inView={metricsInView} />
              </div>
              <div className="earlybird-card-footer">
                <span className="earlybird-label">Workshops & Executive Seminars</span>
              </div>
            </div>

            {/* CARD 2: 200+ (Matchmaking & Industry Showcases) */}
            <div className="earlybird-card">
              <div className="earlybird-card-header">
                <span className="earlybird-tag">02 // NETWORK</span>
                <div className="earlybird-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
              <div className="earlybird-number-wrap">
                <AnimatedStatCounter value={200} inView={metricsInView} />
              </div>
              <div className="earlybird-card-footer">
                <span className="earlybird-label">Matchmaking & Industry Showcases</span>
              </div>
            </div>

            {/* CARD 3: 300+ (GtM & Market Access) */}
            <div className="earlybird-card">
              <div className="earlybird-card-header">
                <span className="earlybird-tag">03 // MARKET ACCESS</span>
                <div className="earlybird-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
              <div className="earlybird-number-wrap">
                <AnimatedStatCounter value={300} inView={metricsInView} />
              </div>
              <div className="earlybird-card-footer">
                <span className="earlybird-label">GtM & Market Access</span>
              </div>
            </div>

            {/* CARD 4: 400+ (Hero Tall Card: Strategic Insights & Market Intelligence) */}
            <div className="earlybird-card earlybird-card-tall">
              <div className="earlybird-card-header">
                <span className="earlybird-tag">04 // INTELLIGENCE</span>
                <div className="earlybird-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
              <div className="earlybird-number-wrap earlybird-number-hero">
                <AnimatedStatCounter value={400} inView={metricsInView} />
              </div>
              <div className="earlybird-card-footer">
                <span className="earlybird-label">Strategic Insights & Market Intelligence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ultra-Wide Workshop Photo Matching Hero Presentation */}
        <div className="about-hero-full-container" style={{ marginTop: 'clamp(56px, 7vw, 96px)' }}>
          <div className="about-photo-frame about-photo-frame-hero">
            <img
              src="/about/about-team-table.jpg"
              alt="123 Factory Executive Workshop"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <div className="about-container"><div className="about-divider-line" /></div>

      {/* =========================================================================
          SECTION 4: OUR SERVICES (FOR STARTUPS & FOR CORPORATES)
         ========================================================================= */}
      <section id="services" className="about-section">
        <div className="about-container">
          <h2 className="about-display-h2">
            Core Capabilities
          </h2>
          <p style={{
            fontSize: 'clamp(21px, 2vw, 28px)',
            color: 'rgba(255, 255, 255, 0.72)',
            maxWidth: '100%',
            lineHeight: 1.45,
            letterSpacing: '-0.015em',
            margin: '0 0 clamp(80px, 9vw, 130px) 0',
            wordBreak: 'keep-all'
          }}>
            We serve both sides of the innovation equation: empowering tech ventures to scale internationally while helping European enterprises build agile startup partnerships.
          </p>

          <div className="about-services-grid">
            {/* CARD 1: FOR STARTUPS */}
            <div className="about-service-card">
              <div>
                <h3 className="about-service-title">Cross-Border Acceleration<br />& Market Entry</h3>
                <p className="about-service-desc">
                  Tailored acceleration pipelines providing founders with on-the-ground operational support, market validation, non-dilutive capital, and European distribution channels.
                </p>
                <ul className="about-service-list">
                  <li className="about-service-item">Early-Stage Go-to-Market & PMF Validation Sprints</li>
                  <li className="about-service-item">Accelerators & Scale-ups Soft-Landing (Berlin)</li>
                  <li className="about-service-item">Bilateral R&D Public Grants Intelligence (Funding DB)</li>
                  <li className="about-service-item">Corporate Pilots & Challenges (Open Innovation Hub)</li>
                  <li className="about-service-item">European Retail & B2B Commercial Sales (Mobani)</li>
                </ul>
              </div>
              <div>
                <Link to="/startups" className="about-btn-startups" style={{ width: '100%', boxSizing: 'border-box' }}>
                  Explore Startups Programs →
                </Link>
              </div>
            </div>

            {/* CARD 2: FOR CORPORATES */}
            <div className="about-service-card">
              <div>
                <h3 className="about-service-title">Corporate Venturing<br />& Strategic Scouting</h3>
                <p className="about-service-desc">
                  Helping multinational corporations and mid-market leaders identify breakthrough startups, run high-velocity commercial pilots, and build sustainable venture arms.
                </p>
                <ul className="about-service-list">
                  <li className="about-service-item">Curated Startup Deal Sourcing & Deep-Tech Scouting</li>
                  <li className="about-service-item">Commercial Pilot & Paid PoC Project Management</li>
                  <li className="about-service-item">Venture Clienting & Open Innovation Hub Governance</li>
                  <li className="about-service-item">Corporate Venture Capital (CVC) Co-Investment</li>
                  <li className="about-service-item">Bilateral Ecosystem Immersion & Executive Summits</li>
                </ul>
              </div>
              <div>
                <Link to="/corporates" className="about-btn-corporates" style={{ width: '100%', boxSizing: 'border-box' }}>
                  Explore Corporate Venturing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="about-container"><div className="about-divider-line" /></div>

      {/* =========================================================================
          SECTION 5: THE BUILDERS
         ========================================================================= */}
      <section id="team" className="about-section">
        <div className="about-container">
          <h2 className="about-display-h2">
            The Builders
          </h2>
          <p style={{
            fontSize: 'clamp(21px, 2vw, 28px)',
            color: 'rgba(255, 255, 255, 0.72)',
            maxWidth: '100%',
            lineHeight: 1.45,
            letterSpacing: '-0.015em',
            margin: '0 0 clamp(80px, 9vw, 130px) 0',
            wordBreak: 'keep-all'
          }}>
            We are entrepreneurs, venture builders, and international operators stationed between Berlin and Seoul — dedicated to eliminating the friction of cross-border growth.
          </p>

          <div className="about-team-grid">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="about-team-card">
                <div className="about-team-img-wrap">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <div className="about-team-overlay">
                    <h3 className="about-team-name">{member.name}</h3>
                    <p className="about-team-role">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="about-container"><div className="about-divider-line" /></div>

      {/* =========================================================================
          SECTION 6: 18 GLOBAL PARTNERS (COMPREHENSIVE GRID VIEW)
         ========================================================================= */}
      <section id="partners" className="about-section">
        <div className="about-container">
          <h2 className="about-display-h2">
            Built Alongside Industry Leaders
          </h2>
          <p style={{
            fontSize: 'clamp(21px, 2vw, 28px)',
            color: 'rgba(255, 255, 255, 0.72)',
            maxWidth: '100%',
            lineHeight: 1.45,
            letterSpacing: '-0.015em',
            margin: '0 0 clamp(60px, 7vw, 90px) 0',
            wordBreak: 'keep-all'
          }}>
            Our cross-border programs are co-created with top public agencies, research universities, multinational corporate innovation hubs, and trade associations across Korea and Germany.
          </p>
        </div>

        {/* 18 Partners Edge-to-Edge Grid (Portfolio Style: 6 cols x 3 rows, no side margins) */}
        <div className="about-partners-grid">
          {ALL_PARTNERS.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="about-partner-card"
              title={`${partner.enName || partner.name} — ${partner.tag}`}
            >
              <div className="about-partner-logo-wrap">
                <img
                  src={partner.logo}
                  alt={partner.enName || partner.name}
                  className="about-partner-logo"
                  loading="lazy"
                />
              </div>

              <div className="about-partner-hover-overlay">
                <div className="about-partner-hover-mid">
                  <h4 className="about-partner-hover-name">{partner.enName || partner.name}</h4>
                  {partner.desc && (
                    <p className="about-partner-hover-desc">{partner.desc}</p>
                  )}
                </div>
                <div className="about-partner-hover-bottom">
                  <span className="about-partner-hover-tag">{partner.tag}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="about-container"><div className="about-divider-line" /></div>

      {/* =========================================================================
          SECTION 7: DUAL-HUB PRESENCE (BERLIN HQ & SEOUL OFFICE)
         ========================================================================= */}
      <section id="offices" className="about-section" style={{ paddingTop: 'clamp(70px, 9vh, 120px)' }}>
        <div className="about-container">
          <h2 className="about-display-h2">
            Anchored in Berlin and Seoul
          </h2>
          <p style={{
            fontSize: 'clamp(21px, 2vw, 28px)',
            color: 'rgba(255, 255, 255, 0.72)',
            maxWidth: '100%',
            lineHeight: 1.45,
            letterSpacing: '-0.015em',
            margin: '0 0 clamp(48px, 6vw, 72px) 0',
            wordBreak: 'keep-all'
          }}>
            Our cross-border infrastructure bridges Europe and Asia in real time. We operate dedicated hubs in Berlin and Seoul to provide ground-level market entry, regulatory landing, and cross-border syndication.
          </p>
        </div>

        {/* Wide bleed map with minimal edge margins */}
        <div className="about-office-map-bleed">
          <WorldOfficeMap />
        </div>
      </section>

      {/* =========================================================================
          MINIMALIST DIRECT CTA
         ========================================================================= */}
      <div className="about-container">
        <div className="about-cta-wrap">
          <div className="about-cta-grid">
            <div>
              <span className="about-eyebrow" style={{ marginBottom: '16px' }}>
                Start the Dialogue
              </span>
              <h2 className="about-cta-title">
                Let’s build cross-border ventures together.
              </h2>
            </div>
            <div className="about-cta-actions">
              <a
                href="mailto:hello@123factory.de"
                className="about-btn-primary"
              >
                Contact Berlin & Seoul Office →
              </a>
              <Link
                to="/startups"
                className="about-btn-secondary"
              >
                Explore Acceleration Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
