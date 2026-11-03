import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AgbView() {
  const [entered, setEntered] = useState(false);
  const [lang, setLang] = useState('de'); // 'de' | 'en'

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
  }, []);

  return (
    <main className="agb-page-wrapper">
      <style>{`
        .agb-page-wrapper {
          padding-top: 130px;
          padding-bottom: 160px;
          min-height: 100vh;
          background: #0A0A0C;
          color: var(--color-ivory, #FAF8F5);
          font-family: var(--font-sans, 'Inter', sans-serif);
        }

        .agb-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 48px);
        }

        /* Top Navigation & Badge */
        .agb-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .agb-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
          font-weight: 500;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .agb-back-link:hover {
          color: #FFAB00;
          transform: translateX(-3px);
        }

        .agb-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FFAB00;
          background: rgba(255, 171, 0, 0.1);
          border: 1px solid rgba(255, 171, 0, 0.25);
          padding: 5px 12px;
          border-radius: 4px;
        }
        .agb-lang-toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 2px;
        }
        .agb-lang-btn {
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
        .agb-lang-btn.active {
          background: #FFAB00;
          color: #0A0A0C;
        }

        /* Giant Main Title */
        .agb-main-title {
          font-family: var(--font-display, 'Space Grotesk', sans-serif);
          font-size: clamp(34px, 4.5vw, 68px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin: 0 0 16px 0;
        }

        .agb-sub-synopsis {
          font-size: clamp(16px, 1.2vw, 19px);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 40px;
        }

        /* Company Identification Box */
        .agb-company-card {
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

        .agb-company-field strong {
          color: #FFFFFF;
          display: block;
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .agb-company-field a {
          color: #FFAB00;
          text-decoration: none;
        }

        .agb-company-field a:hover {
          text-decoration: underline;
        }

        /* Section Navigation Pills */
        .agb-nav-pills {
          display: flex;
          gap: 12px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }

        .agb-nav-pill-btn {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 10px 20px;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .agb-nav-pill-btn:hover {
          background: rgba(255, 171, 0, 0.15);
          border-color: #FFAB00;
          color: #FFAB00;
        }

        /* Part Divider Headline */
        .agb-part-block {
          margin-bottom: 64px;
        }

        .agb-part-header {
          padding-bottom: 16px;
          margin-bottom: 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .agb-part-kicker {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #FFAB00;
          display: block;
          margin-bottom: 8px;
        }

        .agb-part-title {
          font-family: var(--font-display, 'Space Grotesk', sans-serif);
          font-size: clamp(24px, 2.5vw, 36px);
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.02em;
        }

        /* Section Clause Styling */
        .agb-clause {
          margin-bottom: 36px;
        }

        .agb-clause-title {
          font-size: clamp(17px, 1.25vw, 20px);
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 14px 0;
          letter-spacing: -0.01em;
        }

        .agb-clause-para {
          font-size: 15px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.72);
          margin: 0 0 14px 0;
        }

        .agb-clause-para strong {
          color: #FFFFFF;
        }

        .agb-clause-para a {
          color: #FFAB00;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* Footer Return Notice */
        .agb-footer-note {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .agb-scroll-top-btn {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          color: #FFAB00;
          text-decoration: none;
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }
        .agb-scroll-top-btn:hover {
          color: #FFC043;
          text-shadow: 0 0 8px rgba(255, 171, 0, 0.6);
        }
      `}</style>

      <div className="agb-container">
        {/* Top Navigation */}
        <div className={`agb-top-nav legal-hero-fade ${entered ? 'is-entered' : ''} delay-1`}>
          <Link to="/" className="agb-back-link">
            <span>&larr;</span>
            <span>Zurück zur Startseite</span>
          </Link>
          <div className="agb-lang-toggle" role="group" aria-label="Language selection">
            <button type="button" className={`agb-lang-btn ${lang === 'de' ? 'active' : ''}`} onClick={() => setLang('de')}>DE</button>
            <button type="button" className={`agb-lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>

        {/* Title */}
        <h1 className={`agb-main-title legal-hero-fade ${entered ? 'is-entered' : ''} delay-2`}>
          Allgemeine Geschäftsbedingungen
        </h1>
        <p className={`agb-sub-synopsis legal-hero-fade ${entered ? 'is-entered' : ''} delay-3`}>
          Allgemeine Geschäftsbedingungen (AGB) und Mandatsbedingungen der 123 Factory GmbH.
        </p>

        {/* Company Identification Box */}
        <div className={`agb-company-card legal-hero-fade ${entered ? 'is-entered' : ''} delay-4`}>
          <div className="agb-company-field">
            <strong>Unternehmen</strong>
            123 Factory GmbH
          </div>
          <div className="agb-company-field">
            <strong>Anschrift</strong>
            Bismarckstraße 10-12, 10625 Berlin
          </div>
          <div className="agb-company-field">
            <strong>Registergericht &amp; HRB</strong>
            Amtsgericht Charlottenburg, <span style={{ whiteSpace: 'nowrap' }}>HRB 240832 B</span>
          </div>
          <div className="agb-company-field">
            <strong>Geschäftsführung</strong>
            Eunseo Yi
          </div>
          <div className="agb-company-field">
            <strong>Kontakt</strong>
            <a href="mailto:hello@123factory.de">hello@123factory.de</a>
          </div>
          <div className="agb-company-field">
            <strong>Webseite</strong>
            <a href="https://www.123factory.de" target="_blank" rel="noopener noreferrer">www.123factory.de</a>
          </div>
        </div>

        {/* Quick Anchor Navigation */}
        <div className={`agb-nav-pills legal-hero-fade ${entered ? 'is-entered' : ''} delay-5`}>
          <a href="#teil-1" className="agb-nav-pill-btn">
            Teil 1: AGB für Endkunden &darr;
          </a>
          <a href="#teil-2" className="agb-nav-pill-btn">
            Teil 2: Mandatsbedingungen für Kunden &darr;
          </a>
        </div>

        {/* ================================================================ */}
        {/* TEIL 1: AGB FÜR ENDKUNDEN                                        */}
        {/* ================================================================ */}
        <section id="teil-1" className="agb-part-block">
          <div className="agb-part-header legal-scroll-block">
            <span className="agb-part-kicker">Teil 1</span>
            <h2 className="agb-part-title">
              Allgemeine Geschäftsbedingungen (AGB) für Endkunden
            </h2>
          </div>

          {/* § 1 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 1 Geltungsbereich, Begriffsbestimmung</h3>
            <p className="agb-clause-para">
              (1) Diese AGB bilden die Grundlage für die Bereitstellung der technischen Infrastruktur zur Kommunikation und Abwicklung des Vertragsverhältnisses zwischen den Rechtsanwälten und Nutzern durch die 123 Factory GmbH (nachfolgend „123factory“) mittels des Webangebotes unter <a href="https://www.123factory.de" target="_blank" rel="noopener noreferrer">www.123factory.de</a> (nachfolgend „Webseite“). Diese AGB regeln nur das Verhältnis zwischen dem Nutzer und 123factory. Hinsichtlich der Rechtsberatungsleistung von Rechtsanwälten gelten ausdrücklich ergänzend die Mandatsbestimmungen.
            </p>
            <p className="agb-clause-para">
              (2) Die AGB können auf der Webseite jederzeit auf der Detailseite „AGB“ eingesehen werden. Dort besteht die Möglichkeit, die AGB zu speichern oder auszudrucken.
            </p>
            <p className="agb-clause-para">
              (3) Abweichende Bedingungen akzeptiert 123factory nicht. Dies gilt auch, wenn 123factory der Einbeziehung nicht ausdrücklich widerspricht.
            </p>
          </div>

          {/* § 2 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 2 Vertragsschluss</h3>
            <p className="agb-clause-para">
              (1) Um die Angebote von 123factory nutzen zu können, ist das Ausfüllen des Anmeldeformulars unter Angabe der Kontaktdaten sowie die Zustimmung zu den vorliegenden AGB erforderlich.
            </p>
            <p className="agb-clause-para">
              (2) Für den Fall, dass der Nutzer das Anmeldeformular auf der Webseite ausfüllt, gilt dass er mit dem Abschluss des Checkouts ein verbindliches Angebot zum Abschluss eines Nutzungsvertrages über die Angebote von 123factory abgibt. Vor dem Abschicken des Anmeldeformulars kann der Nutzer seine Angaben jederzeit ändern und einsehen. Der Nutzungsvertrag kommt durch das Versenden einer Bestätigungs-E-Mail von 123factory zustande. 123factory behält sich ausdrücklich vor, weiterführende Informationen und Unterlagen beim Nutzer abzufragen und Anfragen ohne Angabe von Gründen abzulehnen.
            </p>
            <p className="agb-clause-para">
              (3) In anderen Fällen kommt der Vertrag in der Regel mit schriftlicher oder mündlicher Einwilligung des Kunden zustande.
            </p>
          </div>

          {/* § 3 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 3 Leistungen von 123factory</h3>
            <p className="agb-clause-para">
              (1) Mit Beginn der Mitgliedschaft gewährt 123factory dem Nutzer einen sofortigen Zugriff auf das gesamte System. Die Leistungen sind in den Produktblättern von 123factory umfassend und abschließend umschrieben.
            </p>
            <p className="agb-clause-para">
              (2) 123factory erbringt keinerlei Rechtsberatungsleistungen und stellt mittels der Webseite lediglich eine Plattform zur Verfügung, um den Abschluss eines Rechtsberatungsvertrages zwischen Nutzer und Rechtsanwalt zu vermitteln und diesen technisch abzuwickeln.
            </p>
            <p className="agb-clause-para">
              (3) Sofern 123factory dem Nutzer kostenlose Leistungen zur Verfügung stellt, so ist 123factory im Zweifel berechtigt, diese Leistungen jederzeit abzustellen. Ein Anspruch des Nutzers auf diese kostenlose Leistung besteht auch nach mehrmaliger Zuverfügungstellung durch 123factory nicht.
            </p>
            <p className="agb-clause-para">
              (4) 123factory ist berechtigt, den Zugang zu einzelnen Inhalten zu sperren oder Inhalte zu löschen, sofern ein begründeter Verdacht auf eine missbräuchliche Nutzung besteht oder Drittrechte potentiell verletzt werden können. Ferner können Nutzer mit sofortiger Wirkung von der Nutzung ausgeschlossen werden, wenn der Nutzer wesentliche Pflichten oder geltende Gesetze verletzt.
            </p>
          </div>

          {/* § 4 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 4 Rechte und Pflichten des Nutzers</h3>
            <p className="agb-clause-para">
              (1) Der Nutzer verpflichtet sich, sämtliche Informationen und Dokumente stets vollständig und korrekt zu überlassen. Die Nutzung der Angebote von 123factory ist nur unbeschränkt geschäftsfähigen natürlichen Personen gestattet.
            </p>
            <p className="agb-clause-para">
              (2) Der Nutzer stellt 123factory von allen Ansprüchen Dritter aus einer Drittrechtsverletzung (z.B. Datenschutz- und Persönlichkeitsrechtsverletzungen), die gegen 123factory im Zusammenhang mit der Nutzung der Angebote von 123factory durch den Nutzer erhoben werden, auf erstes Anfordern hin frei. Der Nutzer hat eine ihm bekannt werdende Erhebung von Ansprüchen Dritter, die im Zusammenhang mit der Nutzung der Angebote von 123factory steht, unverzüglich mitzuteilen. 123factory ist berechtigt, selbst geeignete Maßnahmen zur Abwehr von Ansprüchen Dritter oder zur Rechtsverfolgung vorzunehmen. Die Freistellung beinhaltet auch den Ersatz angemessener Kosten, die 123factory durch eine Rechtsverfolgung/-verteidigung entstehen bzw. entstanden sind.
            </p>
          </div>

          {/* § 5 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 5 Zahlungsbedingungen</h3>
            <p className="agb-clause-para">
              (1) Die innerhalb der Webseite aufgeführten Preise stellen Endpreise dar. Sie beinhalten im Zweifel alle Preisbestandteile einschließlich etwaig anfallender Steuern.
            </p>
            <p className="agb-clause-para">
              (2) Das vereinbarte Entgelt ist eine Pauschale und ist mit der Übermittlung der Bestätigungs-E-Mail (§ 2 Abs. 2) fällig und wird über den gewählten Bezahlweg im Voraus belastet.
            </p>
            <p className="agb-clause-para">
              (3) Zahlt der Nutzer den Gesamtbetrag an den von ihm gebuchten Anwalt, bewirkt er gleichzeitig mit befreiender Wirkung auch die Leistung gegenüber 123factory.
            </p>
            <p className="agb-clause-para">
              (4) Wird als Zahlungsbedingung PayPal oder Überweisung angeboten, so zahlt der Nutzer den jährlichen Beitrag der 123factory-Clubmitgliedschaft mit befreiender Wirkung an den gebuchten Partneranwalt von 123factory.
            </p>
          </div>

          {/* § 6 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 6 Kündigung</h3>
            <p className="agb-clause-para">
              (1) Sowohl der Nutzer als auch 123factory sind berechtigt, den Nutzungsvertrag jederzeit mit einer Frist von einem (1) Monat zu kündigen.
            </p>
            <p className="agb-clause-para">
              (2) Eine Kündigung des Nutzungsvertrages bedeutet jedoch zugleich eine Kündigung des Beratervertrags.
            </p>
          </div>

          {/* § 7 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 7 Haftung</h3>
            <p className="agb-clause-para">
              (1) 123factory haftet uneingeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die auf einer vorsätzlichen oder fahrlässigen Pflichtverletzung beruhen sowie für sonstige Schäden, die auf einer vorsätzlichen oder grob fahrlässigen Pflichtverletzung sowie Arglist beruhen. Darüber hinaus haftet 123factory uneingeschränkt für Schäden, die von der Haftung nach zwingenden gesetzlichen Vorschriften, wie dem Produkthaftungsgesetz, umfasst werden sowie im Fall der Übernahme von Garantien.
            </p>
            <p className="agb-clause-para">
              (2) Für solche Schäden, die nicht von § 7 Abs. 1 erfasst und die durch einfache oder leichte Fahrlässigkeit verursacht werden, haftet 123factory nur, soweit diese Fahrlässigkeit die Verletzung von Vertragspflichten betrifft, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Nutzer regelmäßig vertrauen darf (sog. Kardinalpflichten). Dabei beschränkt sich die Haftung von 123factory auf die vertragstypischen vorhersehbaren Schäden.
            </p>
            <p className="agb-clause-para">
              (3) Die vorstehenden Regelungen gelten auch zugunsten der Mitarbeiter, Vertreter und Erfüllungsgehilfen von 123factory.
            </p>
            <p className="agb-clause-para">
              (4) 123factory haftet ausdrücklich nicht für Beratungsfehler der vermittelten Rechtsanwälte. 123factory wird zu keinem Zeitpunkt Vertragspartei des Rechtsberatungsvertrages zwischen Nutzer und Rechtsanwalt.
            </p>
          </div>

          {/* § 8 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 8 Schlussbestimmungen</h3>
            <p className="agb-clause-para">
              (1) 123factory ist berechtigt, diese AGB jederzeit zu ändern. Im Falle einer Änderung der AGB wird der Nutzer hierüber schriftlich, per E-Mail oder in ähnlicher Form (z.B. durch eine Benachrichtigung beim Login) in Kenntnis gesetzt. Die Zustimmung zu den Änderungen gilt dabei als erteilt, sofern der Nutzer der Änderung der AGB nicht binnen vier (4) Wochen nach Zugang der Änderungsmitteilung widerspricht. 123factory wird den Nutzer zusammen mit der Änderungsmitteilung nochmals ausdrücklich auf diese Folge eines unterlassenen Widerspruchs hinweisen. Für den Fall, dass der Nutzer seine Zustimmung zu den Änderungen verweigert, wird das Vertragsverhältnis noch bis zur Fertigstellung der aktuellen Anfrage zu den bisherigen Bedingungen fortgeführt. Eine erneute Nutzung wird dem Nutzer anschließend jedoch nur noch zu den jeweils aktuellen AGB angeboten.
            </p>
            <p className="agb-clause-para">
              (2) Es gilt das Recht der Bundesrepublik Deutschland. Die Vertragssprache ist Deutsch.
            </p>
            <p className="agb-clause-para">
              (3) 123factory ist berechtigt, alle in den Anwendungsbereich dieser AGB fallenden Rechte und Pflichten ganz oder teilweise mit befreiender Wirkung auf einen Dritten zu übertragen. Der Nutzer stimmt einer solchen Vertragsübernahme hiermit bereits jetzt zu. Für den Fall, dass 123factory von dieser Übertragungsmöglichkeit Gebrauch macht, steht dem Nutzer das Recht zu, den Vertrag zu kündigen.
            </p>
            <p className="agb-clause-para">
              (4) Sämtliche Änderungen oder Ergänzungen der AGB bedürfen der Textform. Das Textformerfordernis gilt auch für die Aufhebung des Schriftformerfordernisses selbst.
            </p>
            <p className="agb-clause-para">
              (5) Der Nutzer ist nicht berechtigt, gegenüber Forderungen von 123factory aufzurechnen, es sei denn, sie sind rechtskräftig festgestellt oder unbestritten.
            </p>
            <p className="agb-clause-para">
              (6) Sofern es sich bei dem Nutzer um einen Kaufmann, eine juristische Person des öffentlichen Rechts oder um ein öffentlich-rechtliches Sondervermögen handelt, ist Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis der Sitz von 123factory. Erfüllungsort ist der Sitz von 123factory. Hat der Nutzer keinen allgemeinen Gerichtsstand in Deutschland oder in einem anderen EU-Mitgliedstaat oder hat der Nutzer seinen Wohnsitz nach Wirksamwerden dieser AGB in ein Land außerhalb der EU verlegt oder ist sein Wohnsitz oder gewöhnlicher Aufenthaltsort im Zeitpunkt der Klageerhebung nicht bekannt, ist ausschließlicher Gerichtsstand für sämtliche Streitigkeiten aus diesem Vertrag der Geschäftssitz von 123factory.
            </p>
            <p className="agb-clause-para">
              (7) Zur alternativen außergerichtlichen Beilegung von Streitigkeiten über im Internet abgeschlossene Kauf- und Dienstleistungsverträge zwischen Verbrauchern und Unternehmen hat die Europäische Kommission eine europäische Online-Streitbeilegungsplattform eingerichtet: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>. Wir nehmen an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle nicht teil.
            </p>
            <p className="agb-clause-para">
              (8) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der restlichen Bestimmungen davon unberührt. Die unwirksame Bestimmung ist sodann durch eine Regelung zu ersetzen, die der wirtschaftlichen Zielsetzung der Parteien am nächsten kommt. Entsprechendes gilt, wenn diese AGB Lücken enthalten.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* TEIL 2: MANDATSBEDINGUNGEN FÜR KUNDEN                            */}
        {/* ================================================================ */}
        <section id="teil-2" className="agb-part-block">
          <div className="agb-part-header legal-scroll-block">
            <span className="agb-part-kicker">Teil 2</span>
            <h2 className="agb-part-title">
              Mandatsbedingungen für Kunden
            </h2>
          </div>

          {/* Mandat § 1 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 1 Geltungsbereich</h3>
            <p className="agb-clause-para">
              (1) Diese Mandatsbedingungen gelten für alle rechtsgeschäftlichen Erklärungen und Verträge, deren Gegenstand die Erteilung von Rat und Auskünften durch den Rechtsanwalt an den Mandanten einschließlich etwaiger Geschäftsbesorgung und Prozessführung ist.
            </p>
            <p className="agb-clause-para">
              (2) Geschäftsbedingungen der Mandanten finden nur Anwendung, wenn dies ausdrücklich schriftlich vereinbart wurde.
            </p>
          </div>

          {/* Mandat § 2 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 2 Vertragsgegenstand / Leistungsumfang</h3>
            <p className="agb-clause-para">
              (1) Gegenstand des Auftrags ist die im Rahmen der Beauftragung vereinbarte Tätigkeit, nicht die Erzielung eines bestimmten rechtlichen oder wirtschaftlichen Erfolges.
            </p>
            <p className="agb-clause-para">
              (2) Der Rechtsanwalt führt alle Aufträge sorgfältig unter Beachtung der für ihn geltenden Berufsordnungen und Standesrichtlinien und stets auf die individuelle Situation und die Bedürfnisse des Mandanten bezogen durch.
            </p>
            <p className="agb-clause-para">
              (3) Der Rechtsanwalt ist verpflichtet, im Rahmen seiner Auftragsdurchführung die tatsächliche, wirtschaftliche und rechtliche Situation des Mandanten richtig und im notwendigen Umfang wiederzugeben. Dabei ist er berechtigt, die von dem Mandanten genannten Tatsachen, insbesondere Zahlenangaben, als richtig zugrunde zu legen. Entsprechend von Dritten oder von dem Mandanten gelieferte Daten werden nur auf Plausibilität überprüft.
            </p>
          </div>

          {/* Mandat § 3 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 3 Schweigepflicht / Datenschutz</h3>
            <p className="agb-clause-para">
              (1) Der Rechtsanwalt ist zeitlich unbegrenzt verpflichtet, über alle Informationen oder Geschäfts- und Betriebsgeheimnisse des Mandanten, die ihm im Zusammenhang mit dem Auftrag bekannt werden, Stillschweigen zu wahren. Die Weitergabe an nicht mit der Durchführung des Auftrags beschäftigte Dritte darf nur mit Einwilligung des Mandanten erfolgen. Die <strong>123 Factory GmbH, Bismarckstraße 10-12, 10625 Berlin</strong> (vormals 123 Factory UG) ist mit der Durchführung des Auftrages, insbesondere als technischer Dienstleister, betraut und damit kein Dritter im Sinne dieser Bestimmung. Der Mandant befreit den Rechtsanwalt im Verhältnis zu 123factory zum Zwecke der technischen Abwicklung dennoch ausdrücklich von seiner Verschwiegenheitspflicht.
            </p>
            <p className="agb-clause-para">
              (2) Andere Partneranwälte von 123factory, die während Krankheit oder Urlaub des Rechtsanwalts Vertretungsleistungen übernehmen, gelten ebenfalls nicht als Dritter im Sinne dieser Regelung. Der Mandant befreit den Rechtsanwalt im Verhältnis zu anderen Partneranwälten von 123factory zum Zwecke der Vertretung des Rechtsanwalts ausdrücklich von seiner Verschwiegenheitspflicht.
            </p>
            <p className="agb-clause-para">
              (3) Der Rechtsanwalt ist befugt, im Rahmen der Zweckbestimmung des Auftrags die ihm anvertrauten personenbezogenen Daten des Mandanten unter Beachtung der Datenschutzbestimmungen zu verarbeiten oder durch Dritte verarbeiten zu lassen.
            </p>
          </div>

          {/* Mandat § 4 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 4 Mitwirkungspflichten des Mandanten</h3>
            <p className="agb-clause-para">
              Der Mandant ist verpflichtet, den Rechtsanwalt nach Kräften zu unterstützen und in seiner Sphäre alle zur ordnungsgemäßen Auftragsausführung notwendigen Voraussetzungen zu schaffen; insbesondere hat der Mandant alle für die Auftragsdurchführung notwendigen oder bedeutsamen Informationen rechtzeitig, ggf. auf Verlangen schriftlich, zur Verfügung zu stellen.
            </p>
          </div>

          {/* Mandat § 5 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 5 Vergütung / Haftung</h3>
            <p className="agb-clause-para">
              (1) Die Vergütung des Rechtsanwalts richtet sich nach dem im Zeitpunkt des Vertragsschlusses genannten Honorar, sofern nicht im Einzelfall eine abweichende Vereinbarung getroffen wird.
            </p>
            <p className="agb-clause-para">
              (2) Alle Honorarforderungen sind im Voraus zur Zahlung fällig. Auf Honorarforderungen sind Leistungen an Erfüllung Statt und erfüllungshalber ausgeschlossen. Eine Aufrechnung gegen Forderungen des Rechtsanwalts ist nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen zulässig.
            </p>
            <p className="agb-clause-para">
              (3) Die Haftung des Rechtsanwalts für Schäden, die auf einfacher Fahrlässigkeit beruhen, wird auf 250.000,00 EUR begrenzt.
            </p>
            <p className="agb-clause-para">
              (4) Die Parteien verpflichten sich zur gegenseitigen Loyalität. Sie informieren sich unverzüglich wechselseitig über alle Umstände, die im Verlauf der Auftragsdurchführung auftreten und die Bearbeitung beeinflussen können.
            </p>
          </div>

          {/* Mandat § 6 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 6 Kündigung</h3>
            <p className="agb-clause-para">
              (1) Soweit nichts anderes vereinbart ist, kann das Vertragsverhältnis von dem Mandanten jederzeit gekündigt werden.
            </p>
            <p className="agb-clause-para">
              (2) Das Kündigungsrecht steht auch dem Rechtsanwalt zu, wobei eine Beendigung des Mandats nicht zur Unzeit erfolgen darf, es sei denn, das für die Bearbeitung des übertragenen Mandats notwendige Vertrauensverhältnis ist nachhaltig gestört.
            </p>
            <p className="agb-clause-para">
              (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
            </p>
          </div>

          {/* Mandat § 7 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 7 Ausscheiden als Partneranwalt</h3>
            <p className="agb-clause-para">
              (1) Der Mandant ist mit der Übertragung des Mandats und der damit verbundenen Weitergabe seiner Daten an einen anderen Partneranwalt von 123factory einverstanden. Der Mandant entbindet den Rechtsanwalt zum Zwecke der Übertragung des Mandats ausdrücklich von seiner Schweigepflicht.
            </p>
            <p className="agb-clause-para">
              (2) Sollte ein Anwalt neuer Vertragspartner werden, der bei Abschluss der Mandatsbestimmungen noch nicht Partneranwalt von 123factory war, hat der Kunde das Recht innerhalb von 2 Wochen nach Anzeige des Wechsels den Vertrag ohne Angabe von Gründen zu kündigen.
            </p>
          </div>

          {/* Mandat § 8 */}
          <div className="agb-clause legal-scroll-block">
            <h3 className="agb-clause-title">§ 8 Schlussbestimmungen</h3>
            <p className="agb-clause-para">
              (1) Der Rechtsanwalt ist berechtigt, diese Mandatsbestimmungen jederzeit zu ändern. Im Falle einer Änderung der Mandatsbestimmungen wird der Mandant hierüber schriftlich, per E-Mail oder in ähnlicher Form in Kenntnis gesetzt. Die Zustimmung zu den Änderungen gilt dabei als erteilt, sofern der Mandant der Änderung der Mandatsbestimmungen nicht binnen vier (4) Wochen nach Zugang der Änderungsmitteilung widerspricht. Der Rechtsanwalt wird den Mandanten zusammen mit der Änderungsmitteilung nochmals ausdrücklich auf diese Folge eines unterlassenen Widerspruchs hinweisen. Für den Fall, dass der Mandant seine Zustimmung zu den Änderungen verweigert, wird das Vertragsverhältnis noch bis zur Fertigstellung der aktuellen Anfrage zu den bisherigen Bedingungen fortgeführt. Eine erneute Beauftragung wird dem Mandanten anschließend jedoch nur noch zu den jeweils aktuellen Mandatsbestimmungen angeboten.
            </p>
            <p className="agb-clause-para">
              (2) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss aller internationalen und supranationalen (Vertrags-) Rechtsordnungen. Bei Verbrauchern innerhalb der Europäischen Union kann auch das Recht am Wohnsitz des Verbrauchers anwendbar sein, sofern es sich um zwingend anzuwendende verbraucherrechtliche Bestimmungen handelt. Die Vertragssprache ist Deutsch.
            </p>
            <p className="agb-clause-para">
              (3) Sämtliche Änderungen oder Ergänzungen der Mandatsbestimmungen bedürfen der Schriftform. Das Schriftformerfordernis gilt auch für die Aufhebung des Schriftformerfordernisses selbst.
            </p>
            <p className="agb-clause-para">
              (4) Rechte aus dem Vertragsverhältnis mit dem Rechtsanwalt dürfen nur nach vorheriger schriftlicher Zustimmung abgetreten werden.
            </p>
            <p className="agb-clause-para">
              (5) Sofern es sich bei dem Mandanten um einen Kaufmann, eine juristische Person des öffentlichen Rechts oder um ein öffentlich-rechtliches Sondervermögen handelt, ist Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis der Sitz des Rechtsanwalts. Erfüllungsort ist der Sitz des Rechtsanwalts. Hat der Mandant keinen allgemeinen Gerichtsstand in Deutschland oder in einem anderen EU-Mitgliedstaat oder hat der Mandant seinen Wohnsitz nach Wirksamwerden dieser Mandatsbestimmungen in ein Land außerhalb der EU verlegt oder ist sein Wohnsitz oder gewöhnlicher Aufenthaltsort im Zeitpunkt der Klageerhebung nicht bekannt, ist ausschließlicher Gerichtsstand für sämtliche Streitigkeiten aus diesem Vertrag der Geschäftssitz des Rechtsanwalts.
            </p>
            <p className="agb-clause-para">
              (6) Sollten einzelne Bestimmungen dieser Mandatsbestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der restlichen Bestimmungen davon unberührt. Die unwirksame Bestimmung ist sodann durch eine Regelung zu ersetzen, die der wirtschaftlichen Zielsetzung der Parteien am nächsten kommt. Entsprechendes gilt, wenn diese Mandatsbestimmungen Lücken enthalten.
            </p>
          </div>
        </section>

        {/* Footer Note */}
        <div className="agb-footer-note legal-scroll-block">
          <span>Stand: 2026 · 123 Factory GmbH</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="agb-scroll-top-btn"
          >
            &uarr; Zurück nach oben
          </button>
        </div>
      </div>
    </main>
  );
}
