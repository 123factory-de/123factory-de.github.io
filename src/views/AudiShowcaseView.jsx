import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolioData.json';

// =========================================================================
// GOOGLE DRIVE IR DECK LINK CONFIGURATION
// Easily paste Google Drive URLs here for each startup.
// If a URL is empty, an interactive slide preview & placeholder is shown.
// =========================================================================
export const IR_DECK_LINKS = {
  // Mobility
  banf: '',
  perseus: '',
  vtouch: '',
  linetron: '',
  mobilwithus: '',
  smartride: '',
  'klio-design': '',

  // Energy & Battery
  abr: '',
  poen: '',
  vsion: '',
  apgreen: '',
  day1lab: '',
  somuna: '',

  // AI & Deep Tech
  'nota-ai': '',
  visionspace: '',
  trobai: '',
  'ipin-labs': '',
  'ait-studio': '',
};

// =========================================================================
// CURATED STARTUP METADATA (AUTOMOTIVE & AUDI FIT)
// Enriches portfolio data with OEM, Tier-1 & Audi-specific strategic relevance
// =========================================================================
const CURATED_DETAILS = {
  // -----------------------------------------------------------------------
  // MOBILITY & SDV
  // -----------------------------------------------------------------------
  banf: {
    category: 'mobility',
    categoryLabel: 'Mobility // Smart Sensors & Dynamics',
    audiRelevance: 'Real-time tire dynamics and road friction sensing for next-gen Quattro all-wheel drive, autonomous slip prevention, and predictive fleet maintenance.',
    oemValidation: 'Proven automotive sensor integration with major tire makers and commercial autonomous vehicle testing programs.',
    keyMetrics: ['Sub-millisecond friction telemetry', 'Wireless in-tire power harvesting', 'Autonomous driving safety layer'],
    pocScope: 'Pilot tire sensor integration into Audi experimental testbed to validate real-time friction coefficient estimation on varying European road surfaces (rain, ice, asphalt).',
  },
  perseus: {
    category: 'mobility',
    categoryLabel: 'Mobility // SDV & Compute Virtualization',
    audiRelevance: 'Software-Defined Vehicle hypervisor providing mixed-criticality isolation between safety-critical RTOS (ADAS/Braking) and high-performance Linux/Android IVI on unified domain controllers.',
    oemValidation: 'ISO 26262 ASIL-D functional safety compliant architecture designed for automotive Tier-1 chipsets.',
    keyMetrics: ['Microsecond context switching', 'Hardware-assisted ECU consolidation', 'Zero hypervisor-induced latency'],
    pocScope: 'Benchmark hypervisor deployment on Audi/CARIAD-compatible multi-core automotive SoC to evaluate compute resource sharing without compromising functional safety boundaries.',
  },
  vtouch: {
    category: 'mobility',
    categoryLabel: 'Mobility // In-Cabin Natural Interface',
    audiRelevance: 'Touchless spatial touch and mid-air holographic control allowing drivers and passengers to interact with dashboard displays without smudging screens or taking eyes off the road.',
    oemValidation: 'CES Innovation Award honoree; deployed in smart mobility concepts, public kiosks, and enterprise smart cockpit demos.',
    keyMetrics: ['Sub-centimeter 3D spatial pointing', 'AI whisper voice wearable (WIZPR RING)', 'Zero screen smudging & driver distraction'],
    pocScope: 'In-cabin cockpit prototype evaluation integrating VTouch spatial tracking into Audi virtual cockpit / MMI touch interface.',
  },
  linetron: {
    category: 'mobility',
    categoryLabel: 'Mobility // SDV Software Verification',
    audiRelevance: 'AutoTest AI-driven automated test generation and validation platform for complex automotive ECU firmware, accelerating OTA software release cycles for SDV architectures.',
    oemValidation: 'Specialized for automotive Tier-1 and OEM software verification pipelines; reduces test scripting overhead by >60%.',
    keyMetrics: ['Automated test-case generation', 'CI/CD pipeline native for SDV', 'AUTOSAR and ISO 26262 testing suite'],
    pocScope: 'Automate verification test vectors for an Audi domain controller software module, benchmarking cycle time against manual test procedures.',
  },
  mobilwithus: {
    category: 'mobility',
    categoryLabel: 'Mobility // Automotive Cybersecurity',
    audiRelevance: 'Automotive embedded security firmware (MOBIL Sherpa+) for ECU, SDV gateway, and EV battery management systems (BMS), ensuring UN R155/R156 and ISO/SAE 21434 compliance.',
    oemValidation: 'Direct integration support with automotive semiconductor HSM/HSE modules from global chipmakers.',
    keyMetrics: ['Hardware Security Module (HSM) drivers', 'Secure Boot & OTA integrity', 'UN R155 / ISO/SAE 21434 compliant'],
    pocScope: 'Security audit and embedded security driver integration onto an Audi target gateway or battery management ECU.',
  },
  smartride: {
    category: 'mobility',
    categoryLabel: 'Mobility // Fleet Intelligence & Operations',
    audiRelevance: 'Cloud-native SaaS fleet management and maintenance coordination engine for OEM mobility services, commercial fleets, and automated service booking.',
    oemValidation: 'Commercial operations handling corporate vehicle fleets and logistics operators across South Korea.',
    keyMetrics: ['Predictive service scheduling', 'Automated dispatch & telemetry', 'OEM after-sales workflow digitization'],
    pocScope: 'Deploy digital fleet operations interface for Audi corporate fleet pilot or on-demand shared mobility testbed.',
  },
  'klio-design': {
    category: 'mobility',
    categoryLabel: 'Mobility // Concept & CMF Experience',
    audiRelevance: 'Advanced mobility design studio specializing in future cabin UX/UI, physical-digital touchpoints, and sustainable Color, Material, and Finish (CMF) research.',
    oemValidation: 'Collaborated with global automotive brands, concept car developers, and smart mobility ventures.',
    keyMetrics: ['Concept vehicle UX/UI prototyping', 'Sustainable circular CMF development', 'Physical-to-digital cockpit integration'],
    pocScope: 'Co-design an exploratory concept study for Audi future interior lighting, interactive surfaces, and recycled material integration.',
  },

  // -----------------------------------------------------------------------
  // ENERGY & SUSTAINABILITY
  // -----------------------------------------------------------------------
  abr: {
    category: 'energy',
    categoryLabel: 'Energy // Battery Direct Recycling',
    audiRelevance: 'Zero-chemical, water and ultrasonic direct recycling technology that reclaims battery-grade cathode and anode powders from production scrap and end-of-life cells with lowest carbon footprint.',
    oemValidation: 'Active technical validation and collaboration with PowerCo SE (Volkswagen Group battery subsidiary, Germany) and Exide Energy.',
    keyMetrics: ['Water + ultrasonic direct separation', 'Zero hazardous acid leaching', 'Direct cathode material regeneration'],
    pocScope: 'Expand joint PoC validation on Audi/VW Group production scrap and prototype cell dismantling to verify remanufactured powder electrochemical capacity.',
  },
  poen: {
    category: 'energy',
    categoryLabel: 'Energy // Circular Battery Reuse & ESS',
    audiRelevance: 'Proprietary non-destructive EV battery diagnostic platform and remanufacturing system, converting retired automotive battery modules into certified Energy Storage Systems (ESS).',
    oemValidation: 'Tier-1 partnerships with Hyundai Motor Group, major Korean utilities, and European recycling networks.',
    keyMetrics: ['Fast battery SOH non-destructive testing', 'Module-level safety grading', 'Second-life ESS repurposing'],
    pocScope: 'Pilot circular lifecycle evaluation on retired Audi e-tron battery packs, assessing module reusability for stationary energy storage.',
  },
  vsion: {
    category: 'energy',
    categoryLabel: 'Energy // Smart Glass & Thermal Management',
    audiRelevance: 'Transmittance-variable black PDLC smart-glass film for automotive panoramic roofs and side glazing, providing instant on-demand shading and solar heat rejection to reduce cabin HVAC energy consumption.',
    oemValidation: 'Automotive grade environmental and durability testing passed; collaboration discussions with premium vehicle OEMs.',
    keyMetrics: ['Deep opaque black to high transparency', 'Solar heat rejection (reduces HVAC load)', 'Zero glare and instant electrical switching'],
    pocScope: 'Fabricate and install a custom prototype switchable panoramic glass roof panel for thermal and optical evaluation on an Audi e-tron cabin test vehicle.',
  },
  apgreen: {
    category: 'energy',
    categoryLabel: 'Energy // Distributed Clean Hydrogen',
    audiRelevance: 'On-site containerized hydrogen production and power units utilizing Catalytic Partial Oxidation (CPOX) reforming, enabling flexible hydrogen supply for factory logistics and test tracks.',
    oemValidation: 'Series A funded deep-tech with containerized deployable units for industrial energy transition.',
    keyMetrics: ['Modular containerized deployment', 'CPOX reforming efficiency', 'Distributed zero-pipeline hydrogen'],
    pocScope: 'Feasibility study for on-site clean hydrogen fueling at Audi testing grounds or decentralized factory microgrids.',
  },
  day1lab: {
    category: 'energy',
    categoryLabel: 'Energy // Circular Biodegradable Polymers',
    audiRelevance: 'RETARCH 100% microplastic-free thermoplastic starch natural polymer for automotive interior door trims, dashboard inserts, and recyclable lightweight composites.',
    oemValidation: 'Series A backed; certified biodegradability and non-toxic decomposition under natural conditions.',
    keyMetrics: ['Zero microplastic generation', 'Drop-in replacement for injection plastics', 'Substantial lifecycle CO2 reduction'],
    pocScope: 'Material sample qualification and injection-molding trial for Audi interior trim parts adhering to OEM thermal and scratch resistance specs.',
  },
  somuna: {
    category: 'energy',
    categoryLabel: 'Energy // Dual-Battery Management',
    audiRelevance: 'AI dual-battery management and idle-free auxiliary power system for temperature-sensitive commercial transport and specialty utility vehicles.',
    oemValidation: 'Selected for Korean government TIPS; commercialized with cold-chain logistics providers.',
    keyMetrics: ['Zero engine idling operation', 'Smart battery health balancing', 'Optimized auxiliary power split'],
    pocScope: 'Implement smart auxiliary power management module for Audi commercial or specialty fleet vehicle trials.',
  },

  // -----------------------------------------------------------------------
  // AI & DEEP TECH
  // -----------------------------------------------------------------------
  'nota-ai': {
    category: 'ai',
    categoryLabel: 'AI // Edge Model Compression & Optimization',
    audiRelevance: 'NetsPresso hardware-aware AI model compression platform that optimizes computer vision and perception models for ultra-low latency execution on edge automotive chips (NVIDIA Drive, Qualcomm Snapdragon Ride, NXP).',
    oemValidation: 'Strategic partnerships with NVIDIA, Arm, Qualcomm, and global Tier-1 automotive camera and ADAS suppliers.',
    keyMetrics: ['Up to 8x latency reduction', 'Zero accuracy degradation post-quantization', 'Automated hardware-specific pruning'],
    pocScope: 'Compress Audi in-cabin occupant monitoring or surround-view perception neural networks to run at higher frame rates on resource-constrained automotive edge processors.',
  },
  visionspace: {
    category: 'ai',
    categoryLabel: 'AI // Physical AI & Smart Factory Simulation',
    audiRelevance: 'TESSERACT Physical AI and digital twin software simulating robot placement, AGV/AMR autonomous workflows, and automated assembly line operations with physics-accurate precision.',
    oemValidation: 'TIPS-backed Korean deep-tech company deployed across high-precision manufacturing and automated logistics hubs.',
    keyMetrics: ['Real-time digital twin synchronization', 'Physics-accurate robot motion planning', 'Shop-floor AGV fleet optimization'],
    pocScope: 'Build a high-fidelity digital twin simulation for an Audi smart factory assembly cell or logistics transfer corridor.',
  },
  trobai: {
    category: 'ai',
    categoryLabel: 'AI // Neuro-Symbolic Decision Intelligence',
    audiRelevance: 'KAIST PhD-led neuro-symbolic AI combining generative natural language understanding with deterministic safety constraints for intelligent in-cabin travel assistance and navigation decisioning.',
    oemValidation: 'Proprietary neuro-symbolic algorithms designed for complex contextual reasoning with strict safety verification.',
    keyMetrics: ['Zero hallucination deterministic logic', 'Multi-modal natural voice context', 'Real-time routing constraint validation'],
    pocScope: 'Pilot in-cabin travel assistant prototype connecting Audi navigation telemetry with real-time POI recommendations and driver preferences.',
  },
  'ipin-labs': {
    category: 'ai',
    categoryLabel: 'AI // GPS-Denied Indoor Positioning',
    audiRelevance: 'Sub-meter accurate indoor positioning technology using geomagnetic field mapping and sensor fusion, enabling automated vehicle localization in underground parking structures and factory floors without GPS.',
    oemValidation: 'Commercialized in mega-scale subterranean complexes, smart factories, and indoor automated guidance systems.',
    keyMetrics: ['Sub-meter indoor accuracy', 'Zero additional beacon infrastructure', 'Geomagnetic sensor fusion'],
    pocScope: 'Test autonomous valet parking (AVP) localization in a GPS-denied multi-level Audi parking facility or assembly plant.',
  },
  'ait-studio': {
    category: 'ai',
    categoryLabel: 'AI // Markerless Computer Vision',
    audiRelevance: 'Single-camera markerless computer vision biomechanics platform (KAIST mechanical engineering spin-off) analyzing occupant posture, seating ergonomics, and movement without physical body sensors.',
    oemValidation: 'CE-MDR certified technology adopted by premier medical institutions in Korea and Switzerland (Basel); CES 2025 exhibitor.',
    keyMetrics: ['Single-camera 3D motion capture', 'No wearable sensors required', 'Real-time posture and fatigue telemetry'],
    pocScope: 'Evaluate in-cabin driver posture and ergonomic comfort analytics using Audi interior cabin monitoring camera.',
  },
};

// =========================================================================
// AUDI SHOWCASE COMPONENT
// =========================================================================
export default function AudiShowcaseView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCompany, setActiveCompany] = useState(null);
  const [activeTabInModal, setActiveTabInModal] = useState('overview');
  const [deckModalCompany, setDeckModalCompany] = useState(null);
  const [deckSlideIndex, setDeckSlideIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter curated companies from portfolioData.json
  const curatedList = useMemo(() => {
    const curatedKeys = Object.keys(CURATED_DETAILS);
    return portfolioData
      .filter(item => curatedKeys.includes(item.id))
      .map(item => ({
        ...item,
        curated: CURATED_DETAILS[item.id],
      }))
      .sort((a, b) => {
        // Order by category: mobility -> energy -> ai
        const catOrder = { mobility: 1, energy: 2, ai: 3 };
        const orderA = catOrder[a.curated.category] || 99;
        const orderB = catOrder[b.curated.category] || 99;
        if (orderA !== orderB) return orderA - orderB;
        return a.name.localeCompare(b.name);
      });
  }, []);

  // Filtered by Category & Search
  const filteredCompanies = useMemo(() => {
    return curatedList.filter(company => {
      const matchesCat =
        selectedCategory === 'all' || company.curated.category === selectedCategory;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const searchable = [
        company.name,
        company.summary,
        company.curated.categoryLabel,
        company.curated.audiRelevance,
        ...(company.verticals || []),
        ...(company.industries || []),
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(q);
    });
  }, [curatedList, selectedCategory, searchQuery]);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (deckModalCompany) {
          setDeckModalCompany(null);
        } else if (activeCompany) {
          setActiveCompany(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deckModalCompany, activeCompany]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (activeCompany || deckModalCompany) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCompany, deckModalCompany]);

  // Copy link handler
  const handleCopyDeckLink = (companyId) => {
    const driveLink = IR_DECK_LINKS[companyId] || window.location.href;
    navigator.clipboard.writeText(driveLink).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  return (
    <div className="audi-showcase-page">
      {/* ===================================================================
          1. HEADER & STRATEGIC CONTEXT
          =================================================================== */}
      <section className="audi-hero-section">
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 4.5vw, 64px)' }}>
          {/* Breadcrumb / Exit Navigation */}
          <div className="audi-nav-top">
            <Link to="/" className="audi-back-link">
              <span className="audi-back-arrow">←</span>
              <span>123 Factory Home</span>
            </Link>
            <div className="audi-status-pill">
              <span className="audi-pulse-dot" />
              <span>Curated Innovation Showcase</span>
            </div>
          </div>

          {/* Hero Main Content */}
          <div className="audi-hero-content">
            <div className="audi-hero-eyebrow">
              <span className="audi-tag-primary">AUDI VENTURE CLIENTING &amp; OPEN INNOVATION</span>
              <span className="audi-tag-sub">CONFIDENTIAL DEALFLOW</span>
            </div>

            <h1 className="audi-hero-title">
              Deep-Tech Innovation for Next-Generation Mobility
            </h1>

            <p className="audi-hero-desc">
              Curated by <strong>123 Factory</strong> (Berlin &amp; Seoul), connecting European automotive leaders
              with pre-vetted Korean deep-tech startups. Explore targeted technology stacks across
              <strong> Next-Gen Mobility &amp; SDV</strong>, <strong>Clean Energy &amp; Battery Circularity</strong>,
              and <strong>Industrial &amp; Edge AI</strong>.
            </p>

            {/* Quick Metrics Bar */}
            <div className="audi-metrics-grid">
              <div className="audi-metric-item">
                <span className="audi-metric-num">18</span>
                <span className="audi-metric-label">Curated Startups</span>
              </div>
              <div className="audi-metric-divider" />
              <div className="audi-metric-item">
                <span className="audi-metric-num">3</span>
                <span className="audi-metric-label">Core Tech Pillars</span>
              </div>
              <div className="audi-metric-divider" />
              <div className="audi-metric-item">
                <span className="audi-metric-num">100%</span>
                <span className="audi-metric-label">Enterprise PoC Ready</span>
              </div>
              <div className="audi-metric-divider" />
              <div className="audi-metric-item">
                <span className="audi-metric-num">OEM &amp; Tier-1</span>
                <span className="audi-metric-label">Validated Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. INTERACTIVE CONTROLS (CATEGORY TABS + SEARCH)
          =================================================================== */}
      <section className="audi-controls-section">
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 4.5vw, 64px)' }}>
          <div className="audi-controls-bar">
            {/* Category Filter Tabs */}
            <div className="audi-category-tabs">
              <button
                className={`audi-tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Technologies <span className="audi-tab-count">({curatedList.length})</span>
              </button>
              <button
                className={`audi-tab-btn ${selectedCategory === 'mobility' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('mobility')}
              >
                <span className="audi-cat-icon">🚗</span> 01 // Mobility &amp; SDV
                <span className="audi-tab-count">(7)</span>
              </button>
              <button
                className={`audi-tab-btn ${selectedCategory === 'energy' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('energy')}
              >
                <span className="audi-cat-icon">⚡</span> 02 // Energy &amp; Battery
                <span className="audi-tab-count">(6)</span>
              </button>
              <button
                className={`audi-tab-btn ${selectedCategory === 'ai' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('ai')}
              >
                <span className="audi-cat-icon">🧠</span> 03 // Edge &amp; Industrial AI
                <span className="audi-tab-count">(5)</span>
              </button>
            </div>

            {/* Quick Keyword Search */}
            <div className="audi-search-wrap">
              <span className="audi-search-icon">🔍</span>
              <input
                type="text"
                className="audi-search-input"
                placeholder="Search technology, keyword, or startup..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="audi-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. CURATED STARTUP GRID
          =================================================================== */}
      <section className="audi-grid-section">
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 4.5vw, 64px)' }}>
          {filteredCompanies.length === 0 ? (
            <div className="audi-empty-state">
              <p>No startups match your search criteria.</p>
              <button
                className="audi-btn-outline"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="audi-cards-grid">
              {filteredCompanies.map((company) => {
                const isMobility = company.curated.category === 'mobility';
                const isEnergy = company.curated.category === 'energy';
                const isAI = company.curated.category === 'ai';

                const themeColor = isMobility
                  ? '#FFAB00'
                  : isEnergy
                  ? '#3CC79B'
                  : '#4DA2FF';

                const themeGlow = isMobility
                  ? 'rgba(255, 171, 0, 0.25)'
                  : isEnergy
                  ? 'rgba(60, 199, 155, 0.25)'
                  : 'rgba(77, 162, 255, 0.25)';

                return (
                  <div
                    key={company.id}
                    className="audi-company-card"
                    style={{ '--accent-color': themeColor, '--accent-glow': themeGlow }}
                    onClick={() => {
                      setActiveCompany(company);
                      setActiveTabInModal('overview');
                    }}
                  >
                    {/* Top Row: Category & Badges */}
                    <div className="audi-card-top">
                      <span className="audi-card-category">{company.curated.categoryLabel}</span>
                      {company.badge && (
                        <span className="audi-card-stage-badge">{company.badge}</span>
                      )}
                    </div>

                    {/* Logo & Name Header */}
                    <div className="audi-card-header">
                      <div className="audi-card-logo-wrap">
                        {company.localLogo || company.logo ? (
                          <img
                            src={company.localLogo || company.logo}
                            alt={`${company.name} logo`}
                            className="audi-card-logo-img"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : null}
                      </div>
                      <div className="audi-card-title-wrap">
                        <h3 className="audi-card-title">{company.name}</h3>
                        <div className="audi-card-verticals">
                          {(company.verticals || []).slice(0, 2).map((v, i) => (
                            <span key={i} className="audi-vertical-tag">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="audi-card-summary">{company.summary}</p>

                    {/* Audi Strategic Fit Highlight Box */}
                    <div className="audi-card-fit-box">
                      <div className="audi-card-fit-label">
                        <span className="audi-fit-dot" />
                        <span>Audi Strategic Fit</span>
                      </div>
                      <p className="audi-card-fit-text">{company.curated.audiRelevance}</p>
                    </div>

                    {/* Key Metrics / Highlights */}
                    <div className="audi-card-tags-list">
                      {company.curated.keyMetrics.map((km, idx) => (
                        <span key={idx} className="audi-metric-chip">
                          • {km}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="audi-card-actions">
                      <button
                        className="audi-card-btn-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCompany(company);
                          setActiveTabInModal('overview');
                        }}
                      >
                        Deep Dive
                        <span className="audi-btn-arrow">→</span>
                      </button>

                      <button
                        className="audi-card-btn-deck"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeckModalCompany(company);
                          setDeckSlideIndex(0);
                        }}
                      >
                        <span className="audi-deck-icon">📄</span>
                        IR Deck
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===================================================================
          4. CLOSING EXECUTIVE CALL TO ACTION
          =================================================================== */}
      <section className="audi-closing-section">
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 4.5vw, 64px)' }}>
          <div className="audi-closing-card">
            <div className="audi-closing-left">
              <span className="audi-closing-tag">NEXT STEPS // AUDI VENTURE PILOT</span>
              <h2 className="audi-closing-title">
                Ready to explore a direct PoC or executive intro?
              </h2>
              <p className="audi-closing-desc">
                123 Factory coordinates bilateral technical vetting, NDAs, and structured pilot scopes
                between Audi engineering teams and Korean deep-tech founders.
              </p>
            </div>
            <div className="audi-closing-right">
              <a
                href="mailto:hello@123factory.de?subject=Audi%20Innovation%20Inquiry%20-%20Curated%20Deep-Tech%20Pipeline"
                className="audi-closing-cta-btn"
              >
                Connect with 123 Factory Team ↗
              </a>
              <span className="audi-closing-subnote">
                Operating directly across Berlin and Seoul
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          MODAL 1: COMPANY DEEP DIVE MODAL
          =================================================================== */}
      {activeCompany && (
        <div className="audi-modal-backdrop" onClick={() => setActiveCompany(null)}>
          <div
            className="audi-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="audi-modal-header">
              <div className="audi-modal-header-left">
                <div className="audi-modal-logo-wrap">
                  {activeCompany.localLogo || activeCompany.logo ? (
                    <img
                      src={activeCompany.localLogo || activeCompany.logo}
                      alt={activeCompany.name}
                      className="audi-modal-logo-img"
                    />
                  ) : null}
                </div>
                <div>
                  <div className="audi-modal-cat-row">
                    <span className="audi-modal-category">
                      {activeCompany.curated.categoryLabel}
                    </span>
                    {activeCompany.badge && (
                      <span className="audi-modal-badge">{activeCompany.badge}</span>
                    )}
                  </div>
                  <h2 className="audi-modal-title">{activeCompany.name}</h2>
                </div>
              </div>

              <div className="audi-modal-header-actions">
                <button
                  className="audi-btn-deck-highlight"
                  onClick={() => {
                    setDeckModalCompany(activeCompany);
                    setDeckSlideIndex(0);
                  }}
                >
                  <span>📄 View IR Deck</span>
                </button>
                <button
                  className="audi-modal-close-btn"
                  onClick={() => setActiveCompany(null)}
                  title="Close (ESC)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="audi-modal-tabs">
              <button
                className={`audi-modal-tab ${activeTabInModal === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTabInModal('overview')}
              >
                1. Overview &amp; Audi Fit
              </button>
              <button
                className={`audi-modal-tab ${activeTabInModal === 'tech' ? 'active' : ''}`}
                onClick={() => setActiveTabInModal('tech')}
              >
                2. Technology &amp; Architecture
              </button>
              <button
                className={`audi-modal-tab ${activeTabInModal === 'poc' ? 'active' : ''}`}
                onClick={() => setActiveTabInModal('poc')}
              >
                3. Proposed PoC &amp; Use Cases
              </button>
              <button
                className={`audi-modal-tab ${activeTabInModal === 'traction' ? 'active' : ''}`}
                onClick={() => setActiveTabInModal('traction')}
              >
                4. Traction &amp; References
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="audi-modal-body">
              {activeTabInModal === 'overview' && (
                <div className="audi-tab-pane">
                  {/* Executive Summary */}
                  <div className="audi-pane-block">
                    <h4 className="audi-pane-label">Executive Summary</h4>
                    <p className="audi-pane-text large">{activeCompany.summary}</p>
                  </div>

                  {/* Strategic Audi Value Proposition */}
                  <div className="audi-pane-highlight-card">
                    <div className="audi-pane-card-header">
                      <span className="audi-highlight-icon">🎯</span>
                      <h4 className="audi-pane-card-title">Audi Venture Clienting Fit</h4>
                    </div>
                    <p className="audi-pane-card-body">{activeCompany.curated.audiRelevance}</p>
                  </div>

                  {/* Company Overview from Parsed Data */}
                  {activeCompany.parsedSections && activeCompany.parsedSections['Company Overview'] && (
                    <div className="audi-pane-block">
                      <h4 className="audi-pane-label">Founding Background &amp; Core Capability</h4>
                      <p className="audi-pane-text">
                        {activeCompany.parsedSections['Company Overview']}
                      </p>
                    </div>
                  )}

                  {/* Highlights Grid */}
                  <div className="audi-pane-block">
                    <h4 className="audi-pane-label">Key Highlights</h4>
                    <div className="audi-pill-grid">
                      {activeCompany.curated.keyMetrics.map((km, i) => (
                        <div key={i} className="audi-pill-item">
                          <span className="audi-pill-bullet">✓</span>
                          <span>{km}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTabInModal === 'tech' && (
                <div className="audi-tab-pane">
                  <div className="audi-pane-block">
                    <h4 className="audi-pane-label">Core Technology &amp; Product Architecture</h4>
                    <p className="audi-pane-text">
                      {activeCompany.parsedSections && activeCompany.parsedSections['Technology & Product']
                        ? activeCompany.parsedSections['Technology & Product']
                        : activeCompany.summary}
                    </p>
                  </div>

                  <div className="audi-pane-block">
                    <h4 className="audi-pane-label">Industry Verticals &amp; Classification</h4>
                    <div className="audi-tag-cluster">
                      {(activeCompany.verticals || []).map((v, i) => (
                        <span key={i} className="audi-cluster-tag">{v}</span>
                      ))}
                      {(activeCompany.industries || []).map((ind, i) => (
                        <span key={i} className="audi-cluster-tag secondary">{ind}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTabInModal === 'poc' && (
                <div className="audi-tab-pane">
                  {/* Proposed Audi PoC Scope */}
                  <div className="audi-pane-highlight-card poc-accent">
                    <div className="audi-pane-card-header">
                      <span className="audi-highlight-icon">🔬</span>
                      <h4 className="audi-pane-card-title">Proposed Pilot / PoC Scope with Audi</h4>
                    </div>
                    <p className="audi-pane-card-body">{activeCompany.curated.pocScope}</p>
                  </div>

                  {/* Market & Use Cases */}
                  {activeCompany.parsedSections && activeCompany.parsedSections['Market & Use Cases'] && (
                    <div className="audi-pane-block">
                      <h4 className="audi-pane-label">Target Market &amp; Deployment Scenarios</h4>
                      <p className="audi-pane-text">
                        {activeCompany.parsedSections['Market & Use Cases']}
                      </p>
                    </div>
                  )}

                  {/* Collaboration Relevance */}
                  {activeCompany.parsedSections && activeCompany.parsedSections['Collaboration Relevance'] && (
                    <div className="audi-pane-block">
                      <h4 className="audi-pane-label">Enterprise Collaboration Formats</h4>
                      <p className="audi-pane-text">
                        {activeCompany.parsedSections['Collaboration Relevance']}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTabInModal === 'traction' && (
                <div className="audi-tab-pane">
                  {/* OEM & Tier-1 Validation */}
                  <div className="audi-pane-block">
                    <h4 className="audi-pane-label">OEM &amp; Enterprise Validation</h4>
                    <div className="audi-validation-card">
                      <p className="audi-pane-text">{activeCompany.curated.oemValidation}</p>
                    </div>
                  </div>

                  {/* Traction & References */}
                  {activeCompany.parsedSections && activeCompany.parsedSections['Traction & References'] && (
                    <div className="audi-pane-block">
                      <h4 className="audi-pane-label">Fundraising, Certifications &amp; Commercial Milestones</h4>
                      <p className="audi-pane-text">
                        {activeCompany.parsedSections['Traction & References']}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="audi-modal-footer">
              <button
                className="audi-btn-outline"
                onClick={() => setActiveCompany(null)}
              >
                Close
              </button>
              <div className="audi-modal-footer-right">
                <button
                  className="audi-btn-secondary"
                  onClick={() => {
                    setDeckModalCompany(activeCompany);
                    setDeckSlideIndex(0);
                  }}
                >
                  Open IR Pitch Deck ↗
                </button>
                <a
                  href={`mailto:hello@123factory.de?subject=PoC%20Inquiry%20-%20${encodeURIComponent(activeCompany.name)}`}
                  className="audi-btn-primary"
                >
                  Request Technical Intro
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: IR DECK VIEWER & GOOGLE DRIVE CONNECTOR
          =================================================================== */}
      {deckModalCompany && (
        <div className="audi-modal-backdrop" onClick={() => setDeckModalCompany(null)}>
          <div
            className="audi-deck-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Deck Header */}
            <div className="audi-deck-header">
              <div className="audi-deck-header-info">
                <span className="audi-deck-confidential-tag">
                  CONFIDENTIAL // AUDI VENTURE SCOUTING
                </span>
                <h3 className="audi-deck-title">
                  {deckModalCompany.name} — Executive Pitch &amp; PoC Deck
                </h3>
              </div>
              <button
                className="audi-modal-close-btn"
                onClick={() => setDeckModalCompany(null)}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Google Drive Status Bar */}
            <div className="audi-deck-drive-bar">
              <div className="audi-drive-status-left">
                <span className="audi-drive-logo">▲</span>
                <div className="audi-drive-texts">
                  <strong>Google Drive Link:</strong>{' '}
                  {IR_DECK_LINKS[deckModalCompany.id] ? (
                    <span className="audi-drive-connected">Connected &amp; Ready</span>
                  ) : (
                    <span className="audi-drive-pending">Staged Placeholder (Ready for Drive URL)</span>
                  )}
                </div>
              </div>

              <div className="audi-drive-actions">
                <button
                  className="audi-deck-copy-btn"
                  onClick={() => handleCopyDeckLink(deckModalCompany.id)}
                >
                  {copiedLink ? '✓ Copied!' : 'Copy Link'}
                </button>

                {IR_DECK_LINKS[deckModalCompany.id] ? (
                  <a
                    href={IR_DECK_LINKS[deckModalCompany.id]}
                    target="_blank"
                    rel="noreferrer"
                    className="audi-deck-open-btn"
                  >
                    Open in Google Drive ↗
                  </a>
                ) : (
                  <button
                    className="audi-deck-open-btn"
                    onClick={() => {
                      alert(
                        `[Demo Mode] Real Google Drive link has not been linked yet for ${deckModalCompany.name}. Paste the URL into IR_DECK_LINKS['${deckModalCompany.id}'] in AudiShowcaseView.jsx to link it instantly.`
                      );
                    }}
                  >
                    Connect Drive Link ↗
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Presentation Slide Viewer Frame */}
            <div className="audi-deck-viewer-frame">
              {/* Slide 0: Executive Overview */}
              {deckSlideIndex === 0 && (
                <div className="audi-slide-content">
                  <div className="audi-slide-badge">SLIDE 01 // EXECUTIVE SUMMARY</div>
                  <h2 className="audi-slide-heading">{deckModalCompany.name}</h2>
                  <p className="audi-slide-subheading">{deckModalCompany.summary}</p>

                  <div className="audi-slide-card">
                    <span className="audi-slide-label">AUDI INNOVATION FIT</span>
                    <p className="audi-slide-text">{deckModalCompany.curated.audiRelevance}</p>
                  </div>

                  <div className="audi-slide-metrics">
                    <div className="audi-slide-stat">
                      <span className="stat-label">Category</span>
                      <span className="stat-val">{deckModalCompany.curated.categoryLabel}</span>
                    </div>
                    <div className="audi-slide-stat">
                      <span className="stat-label">Stage</span>
                      <span className="stat-val">{deckModalCompany.badge || 'Venture Ready'}</span>
                    </div>
                    <div className="audi-slide-stat">
                      <span className="stat-label">Origin</span>
                      <span className="stat-val">Seoul, South Korea</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 1: Technology & IP */}
              {deckSlideIndex === 1 && (
                <div className="audi-slide-content">
                  <div className="audi-slide-badge">SLIDE 02 // PROPRIETARY IP &amp; ARCHITECTURE</div>
                  <h2 className="audi-slide-heading">Core Technology Deep Dive</h2>
                  <p className="audi-slide-body">
                    {deckModalCompany.parsedSections && deckModalCompany.parsedSections['Technology & Product']
                      ? deckModalCompany.parsedSections['Technology & Product']
                      : deckModalCompany.summary}
                  </p>

                  <div className="audi-slide-pills">
                    {deckModalCompany.curated.keyMetrics.map((km, i) => (
                      <span key={i} className="audi-slide-pill">• {km}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Slide 2: Pilot / PoC Scope */}
              {deckSlideIndex === 2 && (
                <div className="audi-slide-content">
                  <div className="audi-slide-badge">SLIDE 03 // AUDI PILOT &amp; POC PROPOSAL</div>
                  <h2 className="audi-slide-heading">Enterprise Engagement Scope</h2>
                  <p className="audi-slide-body highlight">
                    {deckModalCompany.curated.pocScope}
                  </p>

                  <div className="audi-slide-card">
                    <span className="audi-slide-label">VALIDATION BENCHMARK</span>
                    <p className="audi-slide-text">{deckModalCompany.curated.oemValidation}</p>
                  </div>
                </div>
              )}

              {/* Slide 3: Commercial Traction & Roadmaps */}
              {deckSlideIndex === 3 && (
                <div className="audi-slide-content">
                  <div className="audi-slide-badge">SLIDE 04 // TRACTION &amp; COLLABORATION</div>
                  <h2 className="audi-slide-heading">Milestones &amp; Next Steps</h2>
                  <p className="audi-slide-body">
                    {deckModalCompany.parsedSections && deckModalCompany.parsedSections['Traction & References']
                      ? deckModalCompany.parsedSections['Traction & References']
                      : 'Commercial deployment underway with verified enterprise partnerships and technical certifications.'}
                  </p>

                  <div className="audi-slide-cta-banner">
                    <span>Contact 123 Factory for full 20+ page unredacted data room and bilateral technical meetings.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Slide Navigation Controls */}
            <div className="audi-deck-footer">
              <div className="audi-deck-counter">
                Slide <strong>{deckSlideIndex + 1}</strong> of <strong>4</strong>
              </div>

              <div className="audi-deck-nav-buttons">
                <button
                  className="audi-btn-deck-nav"
                  disabled={deckSlideIndex === 0}
                  onClick={() => setDeckSlideIndex((prev) => Math.max(0, prev - 1))}
                >
                  ← Previous
                </button>
                <button
                  className="audi-btn-deck-nav"
                  disabled={deckSlideIndex === 3}
                  onClick={() => setDeckSlideIndex((prev) => Math.min(3, prev + 1))}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          STYLES (PREMIUM DARK EXECUTIVE AESTHETIC)
          =================================================================== */}
      <style>{`
        .audi-showcase-page {
          background-color: #0A0A0A;
          color: #EDEDED;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          padding-top: clamp(100px, 8vw, 130px);
          padding-bottom: clamp(100px, 12vw, 160px);
          overflow-x: hidden;
        }

        /* -------------------------------------------------------------
           HERO & TOP NAV
           ------------------------------------------------------------- */
        .audi-nav-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: clamp(32px, 4vw, 48px);
        }

        .audi-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .audi-back-link:hover {
          color: #FFFFFF;
        }
        .audi-back-arrow {
          font-size: 16px;
          transition: transform 0.2s ease;
        }
        .audi-back-link:hover .audi-back-arrow {
          transform: translateX(-3px);
        }

        .audi-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.02em;
        }

        .audi-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FFAB00;
          box-shadow: 0 0 10px rgba(255, 171, 0, 0.8);
          animation: audiPulse 2s infinite ease-in-out;
        }
        @keyframes audiPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .audi-hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .audi-tag-primary {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #FFAB00;
          background: rgba(255, 171, 0, 0.1);
          border: 1px solid rgba(255, 171, 0, 0.3);
          border-radius: 4px;
          padding: 4px 10px;
        }

        .audi-tag-sub {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.45);
        }

        .audi-hero-title {
          font-size: clamp(38px, 5.2vw, 76px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: #FFFFFF;
          margin: 0 0 24px 0;
          max-width: 1040px;
          word-break: keep-all;
        }

        .audi-hero-desc {
          font-size: clamp(16px, 1.4vw, 21px);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.7);
          max-width: 880px;
          margin: 0 0 clamp(40px, 5vw, 64px) 0;
        }
        .audi-hero-desc strong {
          color: #FFFFFF;
        }

        /* Metrics Bar */
        .audi-metrics-grid {
          display: flex;
          align-items: center;
          gap: clamp(20px, 3.5vw, 48px);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: clamp(20px, 2.5vw, 28px) clamp(24px, 3.5vw, 40px);
          flex-wrap: wrap;
        }

        .audi-metric-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .audi-metric-num {
          font-size: clamp(24px, 2.4vw, 36px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #FFFFFF;
        }
        .audi-metric-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .audi-metric-divider {
          width: 1px;
          height: 36px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* -------------------------------------------------------------
           CONTROLS BAR (TABS & SEARCH)
           ------------------------------------------------------------- */
        .audi-controls-section {
          padding-top: clamp(48px, 6vw, 72px);
          padding-bottom: clamp(24px, 3vw, 40px);
          position: sticky;
          top: 70px;
          z-index: 20;
          background: rgba(10, 10, 10, 0.88);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .audi-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .audi-category-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .audi-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.65);
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .audi-tab-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.2);
        }
        .audi-tab-btn.active {
          background: #FFFFFF;
          color: #0A0A0A;
          border-color: #FFFFFF;
          font-weight: 600;
        }
        .audi-tab-count {
          opacity: 0.7;
          font-size: 12px;
        }

        .audi-search-wrap {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          padding: 8px 16px;
          min-width: 280px;
          transition: border-color 0.2s ease;
        }
        .audi-search-wrap:focus-within {
          border-color: rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.09);
        }
        .audi-search-icon {
          font-size: 14px;
          margin-right: 8px;
          opacity: 0.6;
        }
        .audi-search-input {
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-size: 14px;
          width: 100%;
        }
        .audi-search-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .audi-search-clear {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 12px;
          padding: 2px 6px;
        }

        /* -------------------------------------------------------------
           GRID & COMPANY CARDS
           ------------------------------------------------------------- */
        .audi-grid-section {
          padding-top: clamp(40px, 5vw, 64px);
        }

        .audi-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 3vw, 36px);
        }

        @media (max-width: 1200px) {
          .audi-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .audi-cards-grid {
            grid-template-columns: 1fr;
          }
        }

        .audi-company-card {
          background: #121214;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 20px;
          padding: clamp(24px, 2.5vw, 32px);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }
        .audi-company-card:hover {
          transform: translateY(-6px);
          border-color: var(--accent-color, #FFAB00);
          box-shadow: 0 16px 36px -12px var(--accent-glow, rgba(255, 171, 0, 0.2));
        }

        .audi-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .audi-card-category {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-color, #FFAB00);
        }

        .audi-card-stage-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          padding: 2px 8px;
        }

        .audi-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .audi-card-logo-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: #1c1c20;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          flex-shrink: 0;
        }

        .audi-card-logo-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: brightness(1.05);
        }

        .audi-card-title-wrap {
          flex: 1;
          min-width: 0;
        }

        .audi-card-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .audi-card-verticals {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .audi-vertical-tag {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.04);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .audi-card-summary {
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.65);
          margin: 0 0 20px 0;
          min-height: 42px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Audi Fit Box */
        .audi-card-fit-box {
          background: rgba(255, 255, 255, 0.03);
          border-left: 3px solid var(--accent-color, #FFAB00);
          border-radius: 0 10px 10px 0;
          padding: 12px 14px;
          margin-bottom: 20px;
        }

        .audi-card-fit-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #FFFFFF;
          margin-bottom: 6px;
        }
        .audi-fit-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-color, #FFAB00);
        }

        .audi-card-fit-text {
          font-size: 13px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .audi-card-tags-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 24px;
          margin-top: auto;
        }

        .audi-metric-chip {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.55);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .audi-card-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 18px;
        }

        .audi-card-btn-primary {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .audi-card-btn-primary:hover {
          background: #FFFFFF;
          color: #0A0A0A;
          border-color: #FFFFFF;
        }
        .audi-btn-arrow {
          transition: transform 0.2s ease;
        }
        .audi-card-btn-primary:hover .audi-btn-arrow {
          transform: translateX(3px);
        }

        .audi-card-btn-deck {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .audi-card-btn-deck:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.25);
        }

        /* -------------------------------------------------------------
           CLOSING CTA
           ------------------------------------------------------------- */
        .audi-closing-section {
          padding-top: clamp(80px, 10vh, 140px);
        }

        .audi-closing-card {
          background: linear-gradient(135deg, rgba(25, 25, 28, 0.9) 0%, rgba(15, 15, 17, 0.9) 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: clamp(36px, 5vw, 64px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }

        .audi-closing-left {
          max-width: 680px;
        }

        .audi-closing-tag {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #FFAB00;
          display: inline-block;
          margin-bottom: 14px;
        }

        .audi-closing-title {
          font-size: clamp(28px, 3.2vw, 44px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin: 0 0 16px 0;
        }

        .audi-closing-desc {
          font-size: clamp(15px, 1.2vw, 17px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }

        .audi-closing-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }

        .audi-closing-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          color: #0A0A0A;
          border-radius: 12px;
          padding: 16px 28px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .audi-closing-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(255, 255, 255, 0.2);
        }

        .audi-closing-subnote {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }

        /* -------------------------------------------------------------
           MODALS (DEEP DIVE & IR DECK)
           ------------------------------------------------------------- */
        .audi-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(14px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: audiFadeIn 0.25s ease-out;
        }

        @keyframes audiFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .audi-modal-container {
          background: #141416;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 32px 72px -16px rgba(0, 0, 0, 0.8);
          animation: audiModalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        @keyframes audiModalSlideUp {
          from { transform: translateY(30px) scale(0.97); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .audi-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 32px 20px 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 20px;
        }

        .audi-modal-header-left {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .audi-modal-logo-wrap {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: #1e1e22;
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          flex-shrink: 0;
        }

        .audi-modal-logo-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .audi-modal-cat-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .audi-modal-category {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FFAB00;
        }

        .audi-modal-badge {
          font-size: 10px;
          font-weight: 700;
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .audi-modal-title {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0;
        }

        .audi-modal-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .audi-btn-deck-highlight {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 171, 0, 0.15);
          border: 1px solid rgba(255, 171, 0, 0.4);
          color: #FFAB00;
          border-radius: 10px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .audi-btn-deck-highlight:hover {
          background: #FFAB00;
          color: #000000;
        }

        .audi-modal-close-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .audi-modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        /* Modal Tabs */
        .audi-modal-tabs {
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          overflow-x: auto;
        }

        .audi-modal-tab {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.55);
          padding: 14px 22px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .audi-modal-tab:hover {
          color: #FFFFFF;
        }
        .audi-modal-tab.active {
          color: #FFFFFF;
          border-bottom-color: #FFAB00;
          background: rgba(255, 255, 255, 0.04);
        }

        /* Modal Body */
        .audi-modal-body {
          padding: 32px;
          overflow-y: auto;
          flex: 1;
        }

        .audi-tab-pane {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .audi-pane-block {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .audi-pane-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin: 0;
        }

        .audi-pane-text {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          white-space: pre-line;
        }
        .audi-pane-text.large {
          font-size: 17px;
          line-height: 1.55;
          color: #FFFFFF;
          font-weight: 500;
        }

        .audi-pane-highlight-card {
          background: rgba(255, 171, 0, 0.06);
          border: 1px solid rgba(255, 171, 0, 0.25);
          border-radius: 16px;
          padding: 22px;
        }
        .audi-pane-highlight-card.poc-accent {
          background: rgba(60, 199, 155, 0.06);
          border-color: rgba(60, 199, 155, 0.25);
        }

        .audi-pane-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .audi-highlight-icon {
          font-size: 18px;
        }

        .audi-pane-card-title {
          font-size: 15px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
        }

        .audi-pane-card-body {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .audi-pill-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (max-width: 600px) {
          .audi-pill-grid {
            grid-template-columns: 1fr;
          }
        }

        .audi-pill-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          color: #FFFFFF;
        }
        .audi-pill-bullet {
          color: #3CC79B;
          font-weight: bold;
        }

        .audi-tag-cluster {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .audi-cluster-tag {
          font-size: 12px;
          font-weight: 500;
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          padding: 5px 12px;
        }
        .audi-cluster-tag.secondary {
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.06);
        }

        .audi-validation-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 18px;
        }

        /* Modal Footer */
        .audi-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .audi-modal-footer-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .audi-btn-outline {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .audi-btn-outline:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.4);
        }

        .audi-btn-secondary {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          border-radius: 10px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .audi-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .audi-btn-primary {
          background: #FFFFFF;
          color: #0A0A0A;
          border: 1px solid #FFFFFF;
          border-radius: 10px;
          padding: 10px 20px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .audi-btn-primary:hover {
          background: #EDEDED;
          transform: translateY(-1px);
        }

        /* -------------------------------------------------------------
           IR DECK VIEWER MODAL
           ------------------------------------------------------------- */
        .audi-deck-modal-container {
          background: #111113;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          width: 100%;
          max-width: 860px;
          max-height: 92vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.9);
          animation: audiModalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .audi-deck-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .audi-deck-confidential-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #FFAB00;
          display: block;
          margin-bottom: 4px;
        }

        .audi-deck-title {
          font-size: 20px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
        }

        .audi-deck-drive-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 30px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 16px;
          flex-wrap: wrap;
        }

        .audi-drive-status-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .audi-drive-logo {
          color: #4DA2FF;
          font-size: 18px;
        }
        .audi-drive-texts {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
        }
        .audi-drive-connected {
          color: #3CC79B;
          font-weight: 600;
        }
        .audi-drive-pending {
          color: #FFAB00;
        }

        .audi-drive-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .audi-deck-copy-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.85);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .audi-deck-copy-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .audi-deck-open-btn {
          background: #FFFFFF;
          color: #0A0A0A;
          border: none;
          border-radius: 8px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .audi-deck-open-btn:hover {
          background: #EDEDED;
        }

        /* Slide Viewer Frame */
        .audi-deck-viewer-frame {
          padding: 40px;
          background: #0D0D0E;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .audi-slide-content {
          animation: audiFadeIn 0.2s ease;
        }

        .audi-slide-badge {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 12px;
        }

        .audi-slide-heading {
          font-size: clamp(26px, 3.2vw, 36px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0 0 12px 0;
        }

        .audi-slide-subheading {
          font-size: 17px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 28px 0;
        }

        .audi-slide-body {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 24px 0;
        }
        .audi-slide-body.highlight {
          color: #3CC79B;
          font-weight: 500;
          background: rgba(60, 199, 155, 0.08);
          border-left: 3px solid #3CC79B;
          padding: 16px;
          border-radius: 0 8px 8px 0;
        }

        .audi-slide-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 24px;
        }
        .audi-slide-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #FFAB00;
          display: block;
          margin-bottom: 6px;
        }
        .audi-slide-text {
          font-size: 14px;
          line-height: 1.5;
          color: #FFFFFF;
          margin: 0;
        }

        .audi-slide-metrics {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }

        .audi-slide-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.45);
          text-transform: uppercase;
        }
        .stat-val {
          font-size: 15px;
          font-weight: 600;
          color: #FFFFFF;
        }

        .audi-slide-pills {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .audi-slide-pill {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
        }

        .audi-slide-cta-banner {
          background: rgba(255, 171, 0, 0.1);
          border: 1px solid rgba(255, 171, 0, 0.3);
          border-radius: 10px;
          padding: 14px 18px;
          font-size: 13px;
          color: #FFAB00;
        }

        /* Slide Footer */
        .audi-deck-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .audi-deck-counter {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }
        .audi-deck-counter strong {
          color: #FFFFFF;
        }

        .audi-deck-nav-buttons {
          display: flex;
          gap: 10px;
        }

        .audi-btn-deck-nav {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .audi-btn-deck-nav:hover:not(:disabled) {
          background: #FFFFFF;
          color: #0A0A0A;
        }
        .audi-btn-deck-nav:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .audi-empty-state {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
      `}</style>
    </div>
  );
}
