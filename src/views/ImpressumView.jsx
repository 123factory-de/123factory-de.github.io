import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ImpressumView() {
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
    <main className="impressum-page-wrapper">
      <style>{`
        .impressum-page-wrapper {
          padding-top: 130px;
          padding-bottom: 160px;
          min-height: 100vh;
          background: #0A0A0C;
          color: var(--color-ivory, #FAF8F5);
          font-family: var(--font-sans, 'Inter', sans-serif);
        }
        .impressum-footer-note {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
        }
        .impressum-footer-note a,
        .impressum-scroll-top-btn {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          color: #3CC79B;
          text-decoration: none;
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }
        .impressum-footer-note a:hover,
        .impressum-scroll-top-btn:hover {
          color: #3CC79B;
          text-shadow: 0 0 8px rgba(60,199,155,0.6);
        }

        .impressum-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }

        /* Top Navigation & Badge */
        .impressum-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .impressum-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
          font-weight: 500;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .impressum-back-link:hover {
          color: #3CC79B;
          transform: translateX(-3px);
        }

        .impressum-nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .impressum-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3CC79B;
          background: rgba(60, 199, 155, 0.1);
          border: 1px solid rgba(60, 199, 155, 0.25);
          padding: 5px 12px;
          border-radius: 4px;
        }

        .impressum-lang-toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 2px;
        }

        .impressum-lang-btn {
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

        .impressum-lang-btn.active {
          background: #3CC79B;
          color: #0A0A0C;
        }

        /* Giant Main Title */
        .impressum-main-title {
          font-family: var(--font-display, 'Space Grotesk', sans-serif);
          font-size: clamp(34px, 4.5vw, 68px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin: 0 0 16px 0;
        }

        .impressum-sub-synopsis {
          font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 40px;
        }

        /* Company Identification Box */
        .impressum-company-card {
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

        .impressum-company-field strong {
          color: #FFFFFF;
          display: block;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .impressum-company-field a {
          color: #3CC79B;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .impressum-company-field a:hover {
          text-decoration: underline;
        }

        /* Quick Navigation Bar */
        .impressum-quicknav {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 56px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .impressum-nav-chip {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px 12px;
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .impressum-nav-chip:hover {
          color: #FFFFFF;
          background: rgba(60, 199, 155, 0.15);
          border-color: rgba(60, 199, 155, 0.4);
        }

        /* Legal Content Sections */
        .impressum-section {
          margin-bottom: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          scroll-margin-top: 140px;
        }

        .impressum-section:last-of-type {
          border-bottom: none;
        }

        .impressum-sec-title {
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

        .impressum-sec-title::before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3CC79B;
          flex-shrink: 0;
        }

        .impressum-text {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 16px;
        }

        .impressum-text strong {
          color: #FFFFFF;
          font-weight: 600;
        }

        .impressum-text a {
          color: #3CC79B;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .impressum-text a:hover {
          text-decoration: underline;
        }

        .impressum-list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
        }

        .impressum-list li {
          position: relative;
          padding-left: 24px;
          font-size: 15px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 10px;
        }

        .impressum-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #3CC79B;
        }

        /* Footer Related Links Box */
        .impressum-footer-card {
          margin-top: 64px;
          background: rgba(60, 199, 155, 0.04);
          border: 1px solid rgba(60, 199, 155, 0.2);
          border-radius: 8px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .impressum-footer-info h4 {
          margin: 0 0 6px 0;
          font-size: 16px;
          color: #FFFFFF;
        }

        .impressum-footer-info p {
          margin: 0;
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.6);
        }

        .impressum-footer-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .impressum-legal-btn {
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

        .impressum-legal-btn.primary {
          background: #3CC79B;
          color: #0A0A0C;
        }

        .impressum-legal-btn.primary:hover {
          background: #32A882;
        }

        .impressum-legal-btn.secondary {
          background: rgba(255, 255, 255, 0.06);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .impressum-legal-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.12);
        }
      `}</style>

      <div className="impressum-container">
        {/* Top bar */}
        <div className={`impressum-top-nav legal-hero-fade ${entered ? 'is-entered' : ''} delay-1`}>
          <Link to="/" className="impressum-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to 123 Factory
          </Link>
          <div className="impressum-nav-right">
            <div className="impressum-lang-toggle" role="group" aria-label="Language selection">
              <button 
                type="button" 
                className={`impressum-lang-btn ${lang === 'de' ? 'active' : ''}`}
                onClick={() => setLang('de')}
              >
                DE
              </button>
              <button 
                type="button" 
                className={`impressum-lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            <span className="impressum-badge">§ 5 DDG</span>
          </div>
        </div>

        {/* Header Title */}
        <h1 className={`impressum-main-title legal-hero-fade ${entered ? 'is-entered' : ''} delay-2`}>
          {lang === 'de' ? 'Impressum' : 'Legal Notice'}
        </h1>
        <p className={`impressum-sub-synopsis legal-hero-fade ${entered ? 'is-entered' : ''} delay-3`}>
          {lang === 'de' 
            ? 'Gesetzliche Anbieterkennzeichnung gemäß § 5 Digitale-Dienste-Gesetz (DDG) und rechtliche Hinweise der 123 Factory GmbH.'
            : 'Statutory legal information according to Section 5 of the German Digital Services Act (DDG) and legal notices of 123 Factory GmbH.'}
        </p>

        {/* Company Identification Card */}
        <div className={`impressum-company-card legal-hero-fade ${entered ? 'is-entered' : ''} delay-4`}>
          <div className="impressum-company-field">
            <strong>{lang === 'de' ? 'Unternehmen' : 'Company'}</strong>
            123 Factory GmbH
          </div>
          <div className="impressum-company-field">
            <strong>{lang === 'de' ? 'Geschäftsführung' : 'Managing Director'}</strong>
            Eunseo Yi
          </div>
          <div className="impressum-company-field">
            <strong>{lang === 'de' ? 'Sitz & Anschrift' : 'Registered Office & Address'}</strong>
            Bismarckstraße 10-12<br />
            10625 Berlin, Deutschland
          </div>
          <div className="impressum-company-field">
            <strong>{lang === 'de' ? 'Handelsregister' : 'Commercial Register'}</strong>
            Amtsgericht Charlottenburg<br />
            HRB 240832 B
          </div>
          <div className="impressum-company-field">
            <strong>{lang === 'de' ? 'Kontakt' : 'Contact'}</strong>
            E-Mail: <a href="mailto:hello@123factory.de">hello@123factory.de</a><br />
            Web: <a href="https://www.123factory.de">www.123factory.de</a>
          </div>
          <div className="impressum-company-field">
            <strong>{lang === 'de' ? 'Redaktionell verantwortlich' : 'Content Responsible'}</strong>
            Eunseo Yi (§ 18 Abs. 2 MStV)<br />
            Bismarckstraße 10-12, 10625 Berlin
          </div>
        </div>

        {/* Quick jump navigation */}
        <div className={`impressum-quicknav legal-hero-fade ${entered ? 'is-entered' : ''} delay-5`}>
          <a href="#angaben" className="impressum-nav-chip">{lang === 'de' ? '§ 5 DDG Angaben' : 'Provider Details'}</a>
          <a href="#register" className="impressum-nav-chip">{lang === 'de' ? 'Registereintrag' : 'Register Entry'}</a>
          <a href="#verantwortlich" className="impressum-nav-chip">{lang === 'de' ? 'Verantwortlich nach MStV' : 'MStV Responsible'}</a>
          <a href="#dlinfov" className="impressum-nav-chip">{lang === 'de' ? 'DL-InfoV & AGB' : 'DL-InfoV & Terms'}</a>
          <a href="#streitbeilegung" className="impressum-nav-chip">{lang === 'de' ? 'Streitbeilegung' : 'Dispute Resolution'}</a>
          <a href="#haftung" className="impressum-nav-chip">{lang === 'de' ? 'Haftung für Inhalte & Links' : 'Liability Notice'}</a>
          <a href="#urheberrecht" className="impressum-nav-chip">{lang === 'de' ? 'Urheberrecht' : 'Copyright'}</a>
        </div>

        {/* Content Body */}
        {lang === 'de' ? (
          <div className="impressum-content">
            <section id="angaben" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">1. Anbieterkennzeichnung gemäß § 5 Digitale-Dienste-Gesetz (DDG)</h2>
              <p className="impressum-text">
                Anbieter dieser Internetseite ist:
              </p>
              <p className="impressum-text">
                <strong>123 Factory GmbH</strong><br />
                Bismarckstraße 10-12<br />
                10625 Berlin<br />
                Deutschland
              </p>
              <p className="impressum-text">
                <strong>Vertreten durch den Geschäftsführer:</strong> Eunseo Yi<br />
                <strong>E-Mail:</strong> <a href="mailto:hello@123factory.de">hello@123factory.de</a><br />
                <strong>Internet:</strong> <a href="https://www.123factory.de">https://www.123factory.de</a>
              </p>
            </section>

            <section id="register" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">2. Handelsregister und Registergericht</h2>
              <p className="impressum-text">
                Eintragung im Handelsregister.<br />
                <strong>Registergericht:</strong> Amtsgericht Charlottenburg (Berlin)<br />
                <strong>Registernummer:</strong> HRB 240832 B
              </p>
            </section>

            <section id="verantwortlich" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">3. Verantwortlich im Sinne des § 18 Abs. 2 Medienstaatsvertrag (MStV)</h2>
              <p className="impressum-text">
                Verantwortlich für redaktionell-journalistische Angebote im Sinne des § 18 Abs. 2 MStV:
              </p>
              <p className="impressum-text">
                <strong>Eunseo Yi</strong><br />
                123 Factory GmbH<br />
                Bismarckstraße 10-12<br />
                10625 Berlin<br />
                Deutschland
              </p>
            </section>

            <section id="dlinfov" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">4. Informationen gemäß Dienstleistungs-Informationspflichten-Verordnung (DL-InfoV)</h2>
              <p className="impressum-text">
                Für die von uns erbrachten Leistungen gelten unsere Allgemeinen Geschäftsbedingungen (AGB). Diese finden Sie unter dem Menüpunkt <Link to="/agb">„AGB“</Link>. Darin ist geregelt, dass deutsches Recht Anwendung findet und, soweit gesetzlich zulässig und wirksam vereinbart, Berlin als Gerichtsstand gilt.
              </p>
            </section>

            <section id="streitbeilegung" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">5. Hinweis zur Verbraucherstreitbeilegung & Online-Streitbeilegung (ODR)</h2>
              <p className="impressum-text">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter folgendem Link erreichen:{' '}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.
              </p>
              <p className="impressum-text">
                Unsere E-Mail-Adresse finden Sie oben im Impressum. Die 123 Factory GmbH ist nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section id="haftung" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">6. Haftung für Inhalte und Hyperlinks</h2>
              <p className="impressum-text">
                <strong>Haftung für eigene Inhalte:</strong> Wir sind für die Inhalte unserer Internetseiten nach Maßgabe der allgemeinen Gesetze gemäß § 7 Abs. 1 DDG verantwortlich. Alle Inhalte werden mit der gebotenen Sorgfalt und nach bestem Wissen erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
              <p className="impressum-text">
                <strong>Haftung für externe Links:</strong> Unsere Internetseiten enthalten Hyperlinks zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section id="urheberrecht" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">7. Urheberrecht und Leistungsschutzrechte</h2>
              <p className="impressum-text">
                Die auf unserer Internetseite veröffentlichten Inhalte, Werke und bereitgestellten Informationen (insbesondere Texte, Bildmaterialien, Fotografien, Videos und Grafiken) unterliegen dem deutschen Urheber- und Leistungsschutzrecht.
              </p>
              <p className="impressum-text">
                Jede vom deutschen Urheberrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen.
              </p>
            </section>

            <section id="datenschutz-hinweis" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">8. Datenschutz</h2>
              <p className="impressum-text">
                Ausführliche Informationen zur Verarbeitung personenbezogener Daten, zu Ihren Betroffenenrechten und zu den technischen Sicherheitsmaßnahmen finden Sie in unserer <Link to="/datenschutz">Datenschutzerklärung</Link>.
              </p>
            </section>
          </div>
        ) : (
          <div className="impressum-content">
            <section id="angaben" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">1. Information pursuant to Section 5 Digital Services Act (DDG)</h2>
              <p className="impressum-text">
                The provider of this website is:
              </p>
              <p className="impressum-text">
                <strong>123 Factory GmbH</strong><br />
                Bismarckstraße 10-12<br />
                10625 Berlin<br />
                Germany
              </p>
              <p className="impressum-text">
                <strong>Represented by Managing Director:</strong> Eunseo Yi<br />
                <strong>Email:</strong> <a href="mailto:hello@123factory.de">hello@123factory.de</a><br />
                <strong>Website:</strong> <a href="https://www.123factory.de">https://www.123factory.de</a>
              </p>
            </section>

            <section id="register" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">2. Commercial Register & Court of Registration</h2>
              <p className="impressum-text">
                Registered in the Commercial Register.<br />
                <strong>Court of Registration:</strong> Amtsgericht Charlottenburg (Berlin)<br />
                <strong>Registration Number:</strong> HRB 240832 B
              </p>
            </section>

            <section id="verantwortlich" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">3. Responsible for Content according to Section 18 (2) MStV</h2>
              <p className="impressum-text">
                Responsible for editorial and journalistic content according to Section 18 Paragraph 2 of the German Interstate Media Treaty (MStV):
              </p>
              <p className="impressum-text">
                <strong>Eunseo Yi</strong><br />
                123 Factory GmbH<br />
                Bismarckstraße 10-12<br />
                10625 Berlin<br />
                Germany
              </p>
            </section>

            <section id="dlinfov" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">4. Information pursuant to the Service Information Ordinance (DL-InfoV)</h2>
              <p className="impressum-text">
                Our General Terms and Conditions (AGB) apply to services provided by us. You can review them under <Link to="/agb">"AGB"</Link>. These stipulate that German law applies and, where legally permissible and effectively agreed, Berlin serves as the place of jurisdiction.
              </p>
            </section>

            <section id="streitbeilegung" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">5. Consumer Dispute Resolution & Online Dispute Resolution (ODR)</h2>
              <p className="impressum-text">
                The European Commission provides a platform for online dispute resolution (ODR), accessible at:{' '}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.
              </p>
              <p className="impressum-text">
                Our email address is stated in the company details above. 123 Factory GmbH is neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board.
              </p>
            </section>

            <section id="haftung" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">6. Liability for Content and External Hyperlinks</h2>
              <p className="impressum-text">
                <strong>Liability for own content:</strong> As a service provider, we are responsible for our own content on these pages under general statutory laws pursuant to Section 7 (1) DDG. While all content is created with utmost care, we cannot warrant its ongoing correctness, completeness, or timeliness.
              </p>
              <p className="impressum-text">
                <strong>Liability for links:</strong> Our website contains links to external websites of third parties over whose content we have no influence. Therefore, we cannot assume any liability for such third-party content. The respective provider or operator of the linked pages is always responsible for their content. Should any legal infringements become known to us, we will remove such links immediately.
              </p>
            </section>

            <section id="urheberrecht" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">7. Copyright and Ancillary Rights</h2>
              <p className="impressum-text">
                The content, works, and media published on this website (in particular texts, images, photographs, videos, and graphics) are governed by German copyright law. Any reproduction, processing, distribution, or commercial exploitation requires prior written permission from the respective rights holder.
              </p>
            </section>

            <section id="datenschutz-hinweis" className="impressum-section legal-scroll-block">
              <h2 className="impressum-sec-title">8. Privacy</h2>
              <p className="impressum-text">
                For detailed disclosures regarding the collection, processing, and protection of personal data, please consult our <Link to="/datenschutz">Privacy Policy (Datenschutzerklärung)</Link>.
              </p>
            </section>
          </div>
        )}

        {/* Footer Note */}
        <div className="impressum-footer-note legal-scroll-block">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="impressum-scroll-top-btn"
          >
            ↑ Zurück nach oben
          </button>
        </div>
      </div>
    </main>
  );
}
