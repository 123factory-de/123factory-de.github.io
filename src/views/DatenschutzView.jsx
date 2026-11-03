import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DatenschutzView() {
  const [lang, setLang] = useState('de'); // 'de' | 'en'
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const blocks = document.querySelectorAll('.legal-scroll-block');
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
  }, [lang]);

  return (
    <main className="datenschutz-page-wrapper">
      <style>{`
        .datenschutz-page-wrapper {
          padding-top: 130px;
          padding-bottom: 160px;
          min-height: 100vh;
          background: #0A0A0C;
          color: var(--color-ivory, #FAF8F5);
          font-family: var(--font-sans, 'Inter', sans-serif);
        }

        .datenschutz-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }

        /* Top Navigation & Badge */
        .datenschutz-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .datenschutz-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
          font-weight: 500;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .datenschutz-back-link:hover {
          color: #E550CE;
          transform: translateX(-3px);
        }

        .datenschutz-nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .datenschutz-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #E550CE;
          background: rgba(229, 80, 206, 0.1);
          border: 1px solid rgba(229, 80, 206, 0.25);
          padding: 5px 12px;
          border-radius: 4px;
        }

        .datenschutz-lang-toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 2px;
        }

        .datenschutz-lang-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .datenschutz-lang-btn.active {
          background: #E550CE;
          color: #FFFFFF;
        }

        /* Giant Main Title */
        .datenschutz-main-title {
          font-family: var(--font-display, 'Space Grotesk', sans-serif);
          font-size: clamp(34px, 4.5vw, 68px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin: 0 0 16px 0;
        }

        .datenschutz-sub-synopsis {
          font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 40px;
        }

        /* Company Identification Box */
        .datenschutz-company-card {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 24px 28px;
          margin-bottom: 48px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }

        .datenschutz-company-field strong {
          color: #FFFFFF;
          display: block;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .datenschutz-company-field a {
          color: #E550CE;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .datenschutz-company-field a:hover {
          text-decoration: underline;
        }

        /* Quick Navigation Bar */
        .datenschutz-quicknav {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 56px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .datenschutz-nav-chip {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px 12px;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .datenschutz-nav-chip:hover {
          color: #FFFFFF;
          background: rgba(229, 80, 206, 0.15);
          border-color: rgba(229, 80, 206, 0.4);
        }

        /* Legal Content Sections */
        .datenschutz-section {
          margin-bottom: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          scroll-margin-top: 140px;
        }

        .datenschutz-section:last-of-type {
          border-bottom: none;
        }

        .datenschutz-sec-title {
          font-family: var(--font-display, 'Space Grotesk', sans-serif);
          font-size: clamp(20px, 2vw, 26px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0 0 16px 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .datenschutz-sec-title::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #E550CE;
          flex-shrink: 0;
        }

        .datenschutz-text {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 16px;
        }

        .datenschutz-text strong {
          color: #FFFFFF;
          font-weight: 600;
        }

        .datenschutz-text a {
          color: #E550CE;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .datenschutz-text a:hover {
          text-decoration: underline;
        }

        .datenschutz-highlight-box {
          background: rgba(229, 80, 206, 0.05);
          border-left: 3px solid #E550CE;
          border-radius: 0 6px 6px 0;
          padding: 16px 20px;
          margin: 20px 0;
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85);
        }

        .datenschutz-list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
        }

        .datenschutz-list li {
          position: relative;
          padding-left: 24px;
          font-size: 15px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 10px;
        }

        .datenschutz-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #E550CE;
        }

        /* Footer Related Links Box */
        .datenschutz-footer-card {
          margin-top: 64px;
          background: rgba(229, 80, 206, 0.04);
          border: 1px solid rgba(229, 80, 206, 0.2);
          border-radius: 8px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .datenschutz-footer-note {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
        }
        .datenschutz-scroll-top-btn {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          color: #E550CE;
          text-decoration: none;
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }
        .datenschutz-scroll-top-btn:hover {
          color: #FF70EA;
          text-shadow: 0 0 8px rgba(229, 80, 206, 0.6);
        }

        .datenschutz-footer-info h4 {
          margin: 0 0 6px 0;
          font-size: 16px;
          color: #FFFFFF;
        }

        .datenschutz-footer-info p {
          margin: 0;
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.6);
        }

        .datenschutz-footer-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .datenschutz-legal-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .datenschutz-legal-btn.primary {
          background: #E550CE;
          color: #FFFFFF;
        }

        .datenschutz-legal-btn.primary:hover {
          background: #D03CB8;
        }

        .datenschutz-legal-btn.secondary {
          background: rgba(255, 255, 255, 0.06);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .datenschutz-legal-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.12);
        }
      `}</style>

      <div className="datenschutz-container">
        {/* Top bar */}
        <div className={`datenschutz-top-nav legal-hero-fade ${entered ? 'is-entered' : ''} delay-1`}>
          <Link to="/" className="datenschutz-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to 123 Factory
          </Link>
          <div className="datenschutz-nav-right">
            <div className="datenschutz-lang-toggle" role="group" aria-label="Language selection">
              <button 
                type="button" 
                className={`datenschutz-lang-btn ${lang === 'de' ? 'active' : ''}`}
                onClick={() => setLang('de')}
              >
                DE
              </button>
              <button 
                type="button" 
                className={`datenschutz-lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            <span className="datenschutz-badge">DSGVO / GDPR</span>
          </div>
        </div>

        {/* Header Title */}
        <h1 className={`datenschutz-main-title legal-hero-fade ${entered ? 'is-entered' : ''} delay-2`}>
          {lang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
        </h1>
        <p className={`datenschutz-sub-synopsis legal-hero-fade ${entered ? 'is-entered' : ''} delay-3`}>
          {lang === 'de'
            ? 'Informationen über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten gemäß der EU-Datenschutz-Grundverordnung (DSGVO) für das Online-Angebot von 123factory.de.'
            : 'Information on the nature, scope, and purpose of processing personal data in accordance with the EU General Data Protection Regulation (GDPR) for 123factory.de.'}
        </p>

        {/* Company Identification Card */}
        <div className={`datenschutz-company-card legal-hero-fade ${entered ? 'is-entered' : ''} delay-4`}>
          <div className="datenschutz-company-field">
            <strong>{lang === 'de' ? 'Verantwortliche Stelle' : 'Data Controller'}</strong>
            123 Factory GmbH
          </div>
          <div className="datenschutz-company-field">
            <strong>{lang === 'de' ? 'Vertretungsberechtigt' : 'Represented By'}</strong>
            Eunseo Yi (Geschäftsführer)
          </div>
          <div className="datenschutz-company-field">
            <strong>{lang === 'de' ? 'Anschrift' : 'Address'}</strong>
            Bismarckstraße 10-12<br />
            10625 Berlin, Deutschland
          </div>
          <div className="datenschutz-company-field">
            <strong>{lang === 'de' ? 'Kontakt' : 'Contact'}</strong>
            E-Mail: <a href="mailto:hello@123factory.de">hello@123factory.de</a><br />
            Web: <a href="https://www.123factory.de">www.123factory.de</a>
          </div>
          <div className="datenschutz-company-field">
            <strong>{lang === 'de' ? 'Hosting-Plattform' : 'Hosting Platform'}</strong>
            GitHub Pages (GitHub, Inc.)<br />
            San Francisco, CA, USA
          </div>
          <div className="datenschutz-company-field">
            <strong>{lang === 'de' ? 'Tracking & Cookies' : 'Tracking & Cookies'}</strong>
            Keine Tracking-Cookies<br />
            100% datenschutzfreundlich
          </div>
        </div>

        {/* Quick jump navigation */}
        <div className={`datenschutz-quicknav legal-hero-fade ${entered ? 'is-entered' : ''} delay-5`}>
          <a href="#ueberblick" className="datenschutz-nav-chip">{lang === 'de' ? '1. Überblick' : '1. Overview'}</a>
          <a href="#verantwortlicher" className="datenschutz-nav-chip">{lang === 'de' ? '2. Verantwortlicher' : '2. Controller'}</a>
          <a href="#hosting" className="datenschutz-nav-chip">{lang === 'de' ? '3. Hosting (GitHub Pages)' : '3. Hosting (GitHub Pages)'}</a>
          <a href="#serverlog" className="datenschutz-nav-chip">{lang === 'de' ? '4. Server-Log-Dateien' : '4. Server Log Files'}</a>
          <a href="#cookies" className="datenschutz-nav-chip">{lang === 'de' ? '5. Cookies & Tracking' : '5. Cookies & Tracking'}</a>
          <a href="#kontakt" className="datenschutz-nav-chip">{lang === 'de' ? '6. Kontaktaufnahme' : '6. Contact'}</a>
          <a href="#rechte" className="datenschutz-nav-chip">{lang === 'de' ? '7. Ihre Rechte' : '7. Your Rights'}</a>
          <a href="#sicherheit" className="datenschutz-nav-chip">{lang === 'de' ? '8. Datensicherheit (SSL)' : '8. Security & SSL'}</a>
        </div>

        {/* Content Body */}
        {lang === 'de' ? (
          <div className="datenschutz-content">
            <section id="ueberblick" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">1. Datenschutz auf einen Blick</h2>
              <p className="datenschutz-text">
                Der Schutz Ihrer persönlichen Daten ist uns ein vorrangiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften der Europäischen Union (DSGVO) sowie dieser Datenschutzerklärung.
              </p>
              <div className="datenschutz-highlight-box">
                <strong>Wichtiger Hinweis:</strong> Unsere Website dient als Unternehmenspräsentation und Studio-Portfolio. Beim reinen Aufrufen der Website werden grundsätzlich keine personenbezogenen Daten erhoben, abgesehen von den technisch unvermeidlichen Server-Log-Daten, die Ihr Browser automatisch an unseren Hosting-Dienstleister übermittelt. Wir setzen keine invasiven Tracking-Tools oder Werbe-Cookies ein.
              </div>
            </section>

            <section id="verantwortlicher" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">2. Name und Kontaktdaten des Verantwortlichen</h2>
              <p className="datenschutz-text">
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung (Art. 4 Nr. 7 DSGVO) und anderer nationaler Datenschutzgesetze ist:
              </p>
              <p className="datenschutz-text">
                <strong>123 Factory GmbH</strong><br />
                Bismarckstraße 10-12<br />
                10625 Berlin<br />
                Deutschland
              </p>
              <p className="datenschutz-text">
                <strong>Geschäftsführer:</strong> Eunseo Yi<br />
                <strong>E-Mail:</strong> <a href="mailto:hello@123factory.de">hello@123factory.de</a><br />
                <strong>Website:</strong> <a href="https://www.123factory.de">https://www.123factory.de</a>
              </p>
            </section>

            <section id="hosting" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">3. Hosting über GitHub Pages</h2>
              <p className="datenschutz-text">
                Wir hosten unsere Website als statische Webanwendung über den Dienst <strong>GitHub Pages</strong>. 
                Anbieter ist die <strong>GitHub, Inc.</strong>, 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (Muttergesellschaft: Microsoft Corporation).
              </p>
              <p className="datenschutz-text">
                Wenn Sie unsere Internetseiten aufrufen, erfasst GitHub Pages unter anderem Ihre IP-Adresse und verarbeitet diese zur technischen Bereitstellung der angeforderten Inhalte sowie zur Absicherung gegen Cyber-Angriffe und DDoS-Attacken.
              </p>
              <p className="datenschutz-text">
                <strong>Rechtsgrundlage:</strong> Die Nutzung von GitHub Pages erfolgt auf Grundlage unseres berechtigten Interesses an einer möglichst sicheren, schnellen und zuverlässigen Bereitstellung unseres Online-Angebots gemäß <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>.
              </p>
              <p className="datenschutz-text">
                <strong>Datenübermittlung in Drittstaaten:</strong> GitHub, Inc. verarbeitet Daten auch in den USA. GitHub ist zertifiziert unter dem <em>EU-U.S. Data Privacy Framework (DPF)</em>, welches ein angemessenes Schutzniveau für Datenübermittlungen an zertifizierte US-Unternehmen sicherstellt. Zudem stützt sich GitHub auf die Standardvertragsklauseln (Standard Contractual Clauses – SCC) der EU-Kommission. 
                Weitere Informationen zum Datenschutz bei GitHub finden Sie unter:{' '}
                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">
                  GitHub Privacy Statement
                </a>.
              </p>
            </section>

            <section id="serverlog" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">4. Erfassung von Server-Log-Dateien</h2>
              <p className="datenschutz-text">
                Beim Aufrufen unserer Website erfasst und speichert der Server automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt:
              </p>
              <ul className="datenschutz-list">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem des zugreifenden Rechners</li>
                <li>Referrer URL (die zuvor besuchte Seite)</li>
                <li>Hostname des zugreifenden Rechners / IP-Adresse</li>
                <li>Datum und Uhrzeit der Serveranfrage</li>
                <li>Übertragene Datenmenge und Zugriffsstatus (HTTP-Statuscode)</li>
              </ul>
              <p className="datenschutz-text">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen oder eine Identifikation einzelner Personen findet nicht statt. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur Gewährleistung der dauerhaften Funktionsfähigkeit, Stabilität und IT-Sicherheit unserer Systeme.
              </p>
            </section>

            <section id="cookies" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">5. Cookies und Tracking</h2>
              <p className="datenschutz-text">
                Unsere Internetseiten verzichten vollständig auf den Einsatz von Werbe-, Remarketing- oder Analyse-Cookies (wie z. B. persistente Marketing-Tracker von Drittanbietern). 
              </p>
              <p className="datenschutz-text">
                Die Website wird als moderne, statische Webpräsenz (Single Page Application) ausgeliefert. Es werden von uns beim einfachen Besuch der Seiten keinerlei Tracking-Cookies auf Ihrem Endgerät gespeichert. Sollten technisch notwendige Session-Speicherungen im lokalen Browserspeicher (Local Storage / Session Storage) für Anzeigeeinstellungen (z. B. Sprachwahl) verwendet werden, dienen diese ausschließlich dem reibungslosen Ablauf und enthalten keine personenbezogenen Identifikatoren.
              </p>
            </section>

            <section id="kontakt" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">6. Kontaktaufnahme per E-Mail</h2>
              <p className="datenschutz-text">
                Wenn Sie uns per E-Mail (beispielsweise an <a href="mailto:hello@123factory.de">hello@123factory.de</a>) oder über Kontaktmöglichkeiten ansprechen, werden Ihre Angaben inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
              <p className="datenschutz-text">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (<strong>Art. 6 Abs. 1 lit. f DSGVO</strong>).
              </p>
              <p className="datenschutz-text">
                Wir geben diese Daten nicht ohne Ihre Einwilligung an Dritte weiter. Die von Ihnen an uns übermittelten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage), unbeschadet zwingender gesetzlicher Aufbewahrungsfristen.
              </p>
            </section>

            <section id="rechte" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">7. Ihre Rechte als betroffene Person</h2>
              <p className="datenschutz-text">
                Nach den Bestimmungen der DSGVO stehen Ihnen umfassende Betroffenenrechte zu:
              </p>
              <ul className="datenschutz-list">
                <li>
                  <strong>Recht auf Auskunft (Art. 15 DSGVO):</strong> Sie haben das Recht, unentgeltlich Bestätigung und Auskunft über die zu Ihrer Person gespeicherten Daten zu verlangen.
                </li>
                <li>
                  <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie haben das Recht, die unverzügliche Berichtigung unrichtiger oder Vervollständigung unvollständiger personenbezogener Daten zu verlangen.
                </li>
                <li>
                  <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie haben das Recht auf Löschung Ihrer bei uns gespeicherten personenbezogenen Daten, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                </li>
                <li>
                  <strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie haben das Recht, unter bestimmten Voraussetzungen die Einschränkung der Datenverarbeitung zu verlangen.
                </li>
                <li>
                  <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Daten, die wir automatisiert verarbeiten, in einem gängigen, maschinenlesbaren Format an sich oder Dritte aushändigen zu lassen.
                </li>
                <li>
                  <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 lit. f DSGVO erfolgt, Widerspruch einzulegen.
                </li>
                <li>
                  <strong>Widerruf Ihrer Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> Eine erteilte Einwilligung zur Datenverarbeitung können Sie jederzeit für die Zukunft widerrufen.
                </li>
                <li>
                  <strong>Beschwerderecht bei der Aufsichtsbehörde (Art. 77 DSGVO):</strong> Im Falle datenschutzrechtlicher Verstöße steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde für unseren Sitz in Berlin ist:
                  <br />
                  <em>Berliner Beauftragte für Datenschutz und Informationsfreiheit, Alt-Moabit 59-61, 10555 Berlin, Deutschland.</em>
                </li>
              </ul>
              <p className="datenschutz-text">
                Zur Ausübung dieser Rechte genügt eine formlose Mitteilung per E-Mail an: <a href="mailto:hello@123factory.de">hello@123factory.de</a>.
              </p>
            </section>

            <section id="sicherheit" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">8. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="datenschutz-text">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine moderne SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. 
              </p>
              <p className="datenschutz-text">
                Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
              </p>
            </section>

            <section id="aktualitaet" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p className="datenschutz-text">
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand <strong>Oktober 2026</strong>. 
                Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung anzupassen. Die jeweils aktuelle Fassung kann jederzeit auf dieser Seite abgerufen werden.
              </p>
            </section>
          </div>
        ) : (
          <div className="datenschutz-content">
            <section id="ueberblick" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">1. Privacy at a Glance</h2>
              <p className="datenschutz-text">
                The protection of your personal data is a top priority for us. We treat your personal data confidentially and in compliance with the statutory data protection provisions of the European Union (GDPR) and this Privacy Policy.
              </p>
              <div className="datenschutz-highlight-box">
                <strong>Important Notice:</strong> Our website serves as an informational venture studio presentation. Merely browsing the website does not collect personal data, other than technically indispensable server log files automatically transmitted by your browser. We do not employ third-party tracking or commercial advertising cookies.
              </div>
            </section>

            <section id="verantwortlicher" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">2. Name and Contact Details of the Controller</h2>
              <p className="datenschutz-text">
                The data controller pursuant to Article 4 (7) of the General Data Protection Regulation (GDPR) and other applicable provisions is:
              </p>
              <p className="datenschutz-text">
                <strong>123 Factory GmbH</strong><br />
                Bismarckstraße 10-12<br />
                10625 Berlin<br />
                Germany
              </p>
              <p className="datenschutz-text">
                <strong>Managing Director:</strong> Eunseo Yi<br />
                <strong>Email:</strong> <a href="mailto:hello@123factory.de">hello@123factory.de</a><br />
                <strong>Website:</strong> <a href="https://www.123factory.de">https://www.123factory.de</a>
              </p>
            </section>

            <section id="hosting" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">3. Hosting via GitHub Pages</h2>
              <p className="datenschutz-text">
                We host our website as a static web application using <strong>GitHub Pages</strong>. 
                The service provider is <strong>GitHub, Inc.</strong>, 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (parent company: Microsoft Corporation).
              </p>
              <p className="datenschutz-text">
                When you visit our website, GitHub Pages automatically processes your IP address to deliver content technically and protect infrastructure from malicious cyber attacks and DDoS attempts.
              </p>
              <p className="datenschutz-text">
                <strong>Legal Basis:</strong> The use of GitHub Pages is based on our legitimate interest in providing a reliable, performant, and secure website pursuant to <strong>Art. 6 (1) (f) GDPR</strong>.
              </p>
              <p className="datenschutz-text">
                <strong>Third-Country Data Transfers:</strong> GitHub, Inc. processes data in the United States and is certified under the <em>EU-U.S. Data Privacy Framework (DPF)</em>, ensuring an adequate level of data protection. GitHub additionally relies on EU Standard Contractual Clauses (SCC). For further details, please consult:{' '}
                <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">
                  GitHub Privacy Statement
                </a>.
              </p>
            </section>

            <section id="serverlog" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">4. Server Log Files</h2>
              <p className="datenschutz-text">
                When accessing our website, the hosting server automatically captures and stores information in server log files:
              </p>
              <ul className="datenschutz-list">
                <li>Browser type and version</li>
                <li>Operating system of the accessing device</li>
                <li>Referrer URL (previously visited website)</li>
                <li>IP address and hostname of the accessing system</li>
                <li>Date and time of server access</li>
                <li>Data volume transmitted and HTTP status code</li>
              </ul>
              <p className="datenschutz-text">
                This data is not combined with other personal data sources. Processing is justified under Art. 6 (1) (f) GDPR to ensure server reliability, error diagnostics, and cybersecurity.
              </p>
            </section>

            <section id="cookies" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">5. Cookies and Tracking</h2>
              <p className="datenschutz-text">
                Our website operates entirely without commercial marketing, advertising, or profiling cookies.
              </p>
              <p className="datenschutz-text">
                As a modern static single-page application, no third-party tracking cookies are placed on your terminal device during standard browsing. If technical session storage is used to store UI preferences (such as selected language), it contains no personally identifiable information.
              </p>
            </section>

            <section id="kontakt" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">6. Contacting Us via Email</h2>
              <p className="datenschutz-text">
                If you contact us via email (e.g., at <a href="mailto:hello@123factory.de">hello@123factory.de</a>), your message and contact details are stored for processing your inquiry and in case of follow-up questions.
              </p>
              <p className="datenschutz-text">
                Processing occurs pursuant to <strong>Art. 6 (1) (b) GDPR</strong> if your inquiry is related to contractual performance or pre-contractual steps, or pursuant to <strong>Art. 6 (1) (f) GDPR</strong> based on our legitimate interest in efficiently managing communications.
              </p>
            </section>

            <section id="rechte" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">7. Your Rights as a Data Subject</h2>
              <p className="datenschutz-text">
                Under the GDPR, you hold comprehensive rights regarding your personal data:
              </p>
              <ul className="datenschutz-list">
                <li><strong>Right of Access (Art. 15 GDPR):</strong> Request confirmation and details about your stored data free of charge.</li>
                <li><strong>Right to Rectification (Art. 16 GDPR):</strong> Request immediate correction of inaccurate data.</li>
                <li><strong>Right to Erasure (Art. 17 GDPR):</strong> Request deletion of your personal data where statutory prerequisites are met.</li>
                <li><strong>Right to Restriction of Processing (Art. 18 GDPR):</strong> Request restricted data processing under certain circumstances.</li>
                <li><strong>Right to Data Portability (Art. 20 GDPR):</strong> Receive data provided to us in a structured, machine-readable format.</li>
                <li><strong>Right to Object (Art. 21 GDPR):</strong> Object to processing based on legitimate interests (Art. 6 (1) (f) GDPR) at any time.</li>
                <li><strong>Right to Withdraw Consent (Art. 7 (3) GDPR):</strong> Revoke previously granted consent with effect for the future.</li>
                <li><strong>Right to Lodge a Complaint (Art. 77 GDPR):</strong> Lodge a complaint with a supervisory authority (e.g., Berliner Beauftragte für Datenschutz und Informationsfreiheit).</li>
              </ul>
              <p className="datenschutz-text">
                To exercise any of these rights, simply email us at: <a href="mailto:hello@123factory.de">hello@123factory.de</a>.
              </p>
            </section>

            <section id="sicherheit" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">8. SSL / TLS Encryption</h2>
              <p className="datenschutz-text">
                For security reasons and to protect the transmission of confidential content, this site employs SSL/TLS encryption. You can identify an encrypted connection by the "https://" prefix in the address bar and the lock icon in your browser.
              </p>
            </section>

            <section id="aktualitaet" className="datenschutz-section legal-scroll-block">
              <h2 className="datenschutz-sec-title">9. Validity and Updates to this Privacy Policy</h2>
              <p className="datenschutz-text">
                This Privacy Policy is current as of <strong>October 2026</strong>. As our website evolves or statutory regulations change, updates to this policy may become necessary. The latest version is always accessible on this page.
              </p>
            </section>
          </div>
        )}

        {/* Footer Note */}
        <div className="datenschutz-footer-note legal-scroll-block">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="datenschutz-scroll-top-btn"
          >
            ↑ Zurück nach oben
          </button>
        </div>
      </div>
    </main>
  );
}
