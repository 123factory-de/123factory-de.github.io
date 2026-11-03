import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FEED_POSTS } from '../data/feedData';

export default function ArticleDetailView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(timer);
  }, [slug]);

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
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    blocks.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slug]);

  const post = FEED_POSTS.find((p) => p.slug === slug);

  // If post not found, redirect to feed
  useEffect(() => {
    if (!post) {
      navigate('/feed', { replace: true });
    }
  }, [post, navigate]);

  if (!post) return null;

  const relatedPosts = FEED_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Kicker text at top (Category label: e.g. "OPEN CALL", "EVENT", "INSIGHTS", "RECAP")
  const kicker = (post.category?.label || post.categoryType || 'INSIGHTS').toUpperCase();
  const pillCategory = post.category?.label || post.categoryType || 'Insights';

  return (
    <main className="eb-article-page">
      <style>{`
        /* Earlybird Clean Editorial Canvas */
        .eb-article-page {
          padding-top: 110px;
          padding-bottom: 160px;
          min-height: 100vh;
          background: #FFFFFF;
          color: #111111;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .eb-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 56px);
        }

        /* Top Back Nav */
        .eb-top-nav {
          margin-bottom: 36px;
        }

        .eb-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #666666;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -0.01em;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .eb-back-link:hover {
          color: #000000;
          transform: translateX(-3px);
        }

        /* Earlybird Split Header: Kicker + Giant Condensed Title on Left, Subtitle on Right */
        .eb-header-split {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.95fr);
          gap: clamp(28px, 5vw, 68px);
          align-items: flex-start;
          margin-bottom: 36px;
        }

        @media (max-width: 960px) {
          .eb-header-split {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .eb-header-left {
          display: flex;
          flex-direction: column;
        }

        .eb-kicker-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #111111;
          margin-bottom: 16px;
          display: block;
        }

        /* Giant Bold Condensed Headline (Earlybird / Condensed Sans Style) */
        .eb-main-title {
          font-family: 'Anton', 'Impact', sans-serif;
          font-size: clamp(38px, 5vw, 76px);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #111111;
          margin: 0;
          word-break: break-word;
        }

        /* Subtitle / Synopsis Column on the Right */
        .eb-header-right {
          padding-top: 28px;
        }

        @media (max-width: 960px) {
          .eb-header-right {
            padding-top: 0;
          }
        }

        .eb-lead-synopsis {
          font-size: clamp(15px, 1.1vw, 17.5px);
          line-height: 1.55;
          color: #333333;
          margin: 0;
        }

        /* Meta Bar (Calendar Date, Read Time, Pill Tag Badge) */
        .eb-meta-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.12);
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          margin-bottom: clamp(36px, 5vw, 56px);
          flex-wrap: wrap;
          gap: 16px;
        }

        .eb-meta-left {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          font-size: 13.5px;
          color: #333333;
          font-weight: 500;
        }

        .eb-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .eb-meta-icon {
          color: #111111;
          display: inline-flex;
          align-items: center;
        }

        .eb-meta-author {
          color: #111111;
          font-weight: 600;
        }

        /* Earlybird Category Pill Tag */
        .eb-pill-category {
          border: 1px solid #111111;
          border-radius: 9999px;
          padding: 6px 18px;
          font-size: 12.5px;
          font-weight: 600;
          color: #111111;
          background: transparent;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        /* Full-Width Uncropped Hero Image */
        .eb-hero-photo-wrap {
          width: 100%;
          margin-bottom: clamp(48px, 6vw, 76px);
          background: #FAFAFA;
          border-radius: 2px;
          overflow: hidden;
        }

        .eb-hero-photo-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }

        /* Two-Column Editorial Grid: Left Sticky Share, Right Main Content */
        .eb-body-layout {
          display: grid;
          grid-template-columns: 140px minmax(0, 840px);
          gap: clamp(36px, 5vw, 84px);
          max-width: 1140px;
          margin: 0 auto;
        }

        @media (max-width: 880px) {
          .eb-body-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        /* Sticky Left Column: Share */
        .eb-sidebar-col {
          position: sticky;
          top: 120px;
          align-self: start;
        }

        .eb-share-label {
          font-size: 13px;
          font-weight: 600;
          color: #111111;
          margin-bottom: 12px;
          display: block;
        }

        .eb-share-icons-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .eb-share-btn {
          width: 38px;
          height: 38px;
          border: 1px solid rgba(0, 0, 0, 0.18);
          border-radius: 2px;
          background: #FFFFFF;
          color: #111111;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          padding: 0;
        }

        .eb-share-btn:hover {
          border-color: #111111;
          background: #111111;
          color: #FFFFFF;
        }

        /* Main Editorial Content Column */
        .eb-content-col {
          min-width: 0;
        }

        .eb-lead-para {
          font-size: clamp(17px, 1.15vw, 19px);
          line-height: 1.68;
          color: #111111;
          margin-bottom: 28px;
          font-weight: 400;
        }

        .eb-body-para {
          font-size: clamp(16px, 1.08vw, 17.5px);
          line-height: 1.78;
          color: #222222;
          margin-bottom: 24px;
        }

        /* Earlybird Section Subheadings: Bold Condensed Uppercase */
        .eb-section-subheading {
          font-family: 'Anton', 'Impact', sans-serif;
          font-size: clamp(24px, 2.3vw, 32px);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #111111;
          margin: 48px 0 20px 0;
        }

        /* Pullquote / Blockquote */
        .eb-quote-box {
          margin: 40px 0;
          padding: 24px 28px;
          border-left: 2px solid #111111;
          background: #FAFAFA;
        }

        .eb-quote-text {
          font-size: clamp(18px, 1.25vw, 21px);
          line-height: 1.55;
          font-style: italic;
          color: #111111;
          margin: 0 0 10px 0;
        }

        .eb-quote-author {
          font-size: 13px;
          color: #666666;
          margin: 0;
          font-weight: 500;
        }

        /* Callout Box / Event Overview Card */
        .eb-callout-card {
          margin: 36px 0;
          padding: 26px 30px;
          background: #FAFAFA;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }

        .eb-callout-title {
          font-family: 'Anton', 'Impact', sans-serif;
          font-size: 20px;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: #111111;
          margin: 0 0 12px 0;
        }

        .eb-callout-text {
          font-size: 15px;
          line-height: 1.65;
          color: #333333;
          margin: 0;
          white-space: pre-line;
        }

        /* Program / Highlights List */
        .eb-list-card {
          margin: 36px 0;
          padding: 26px 30px;
          background: #FAFAFA;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }

        .eb-list-title {
          font-family: 'Anton', 'Impact', sans-serif;
          font-size: 20px;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: #111111;
          margin: 0 0 16px 0;
        }

        .eb-items-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .eb-item-li {
          font-size: 15px;
          line-height: 1.55;
          color: #222222;
          padding-left: 20px;
          position: relative;
        }

        .eb-item-li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #111111;
          font-weight: 600;
        }

        /* Tags Row */
        .eb-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 44px 0 32px 0;
          padding-top: 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .eb-tag-chip {
          display: inline-block;
          font-size: 12.5px;
          color: #444444;
          background: #F4F4F4;
          padding: 5px 12px;
          border-radius: 2px;
          font-weight: 500;
        }

        /* Action Buttons (Registration / LinkedIn) */
        .eb-cta-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .eb-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 600;
          padding: 12px 24px;
          background: #111111;
          color: #FFFFFF;
          border: 1px solid #111111;
          border-radius: 2px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .eb-primary-btn:hover {
          background: #333333;
          border-color: #333333;
        }

        .eb-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 600;
          padding: 12px 24px;
          background: #FFFFFF;
          color: #111111;
          border: 1px solid #111111;
          border-radius: 2px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .eb-secondary-btn:hover {
          background: #111111;
          color: #FFFFFF;
        }

        /* Related / More Perspectives Section */
        .eb-related-section {
          margin-top: 96px;
          padding-top: 64px;
          border-top: 1px solid rgba(0, 0, 0, 0.12);
        }

        .eb-related-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .eb-related-title {
          font-family: 'Anton', 'Impact', sans-serif;
          font-size: clamp(28px, 3.2vw, 42px);
          font-weight: 400;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #111111;
          margin: 0;
        }

        .eb-see-all-link {
          font-size: 13.5px;
          font-weight: 600;
          color: #111111;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s ease;
        }

        .eb-see-all-link:hover {
          opacity: 0.6;
        }

        .eb-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 3.5vw, 40px);
        }

        @media (max-width: 900px) {
          .eb-related-grid {
            grid-template-columns: 1fr;
          }
        }

        .eb-related-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }

        .eb-related-img-box {
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #F4F4F4;
          margin-bottom: 16px;
          border-radius: 2px;
        }

        .eb-related-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .eb-related-card:hover .eb-related-img {
          transform: scale(1.03);
        }

        .eb-related-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #666666;
          margin-bottom: 8px;
        }

        .eb-related-card-title {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: #111111;
          margin: 0 0 10px 0;
          transition: opacity 0.2s ease;
        }

        .eb-related-card:hover .eb-related-card-title {
          opacity: 0.7;
        }

        .eb-related-card-excerpt {
          font-size: 14px;
          line-height: 1.55;
          color: #555555;
          margin: 0 0 14px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .eb-related-card-meta {
          font-size: 12.5px;
          color: #777777;
          font-weight: 500;
        }
      `}</style>

      <div className="eb-container">
        {/* 1. Top Back Navigation */}
        <div className={`eb-top-nav hero-stagger-fade ${entered ? 'is-entered' : ''} delay-1`}>
          <Link to="/feed" className="eb-back-link">
            <span>&larr;</span>
            <span>Back to Feed</span>
          </Link>
        </div>

        {/* 2. Earlybird Split Header: Kicker + Giant Headline on Left, Subtitle on Right */}
        <div className={`eb-header-split hero-stagger-fade ${entered ? 'is-entered' : ''} delay-2`}>
          <div className="eb-header-left">
            <span className="eb-kicker-tag">{kicker}</span>
            <h1 className="eb-main-title">{post.title}</h1>
          </div>

          {post.subtitle && (
            <div className="eb-header-right">
              <p className="eb-lead-synopsis">{post.subtitle}</p>
            </div>
          )}
        </div>

        {/* 3. Earlybird Meta Bar: Calendar Date, Read Time, Author on Left | Pill Tag on Right */}
        <div className={`eb-meta-bar hero-stagger-fade ${entered ? 'is-entered' : ''} delay-3`}>
          <div className="eb-meta-left">
            {/* Calendar Date */}
            <span className="eb-meta-item">
              <span className="eb-meta-icon" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <span>{post.date}</span>
            </span>

            {/* Read Time */}
            <span className="eb-meta-item">
              <span className="eb-meta-icon" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span>{post.readTime}</span>
            </span>

            {/* Author */}
            {post.author && (
              <span className="eb-meta-item">
                <span>By</span>
                <span className="eb-meta-author">{post.author}</span>
              </span>
            )}
          </div>

          {/* Right Pill Badge Tag */}
          <span className="eb-pill-category">
            {pillCategory}
          </span>
        </div>

        {/* 4. Full-Width Hero Photo (Original Uncropped Aspect Ratio) */}
        <div className={`eb-hero-photo-wrap hero-stagger-fade ${entered ? 'is-entered' : ''} delay-4`}>
          <img src={post.image} alt={post.title} className="eb-hero-photo-img" />
        </div>

        {/* 5. Two-Column Editorial Layout: Left Share Sidebar + Right Main Content */}
        <div className="eb-body-layout scroll-reveal-block">
          {/* Left Column: Share */}
          <aside className="eb-sidebar-col">
            <span className="eb-share-label">Share</span>
            <div className="eb-share-icons-row">
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="eb-share-btn"
                title="Share on LinkedIn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="eb-share-btn"
                title="Share on X"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="eb-share-btn"
                title="Copy link"
              >
                {copied ? (
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>✓</span>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                )}
              </button>
            </div>
          </aside>

          {/* Right Column: Editorial Body */}
          <article className="eb-content-col">
            {post.content.map((block, idx) => {
              if (block.type === 'lead') {
                return (
                  <p key={idx} className="eb-lead-para">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'paragraph') {
                return (
                  <p key={idx} className="eb-body-para">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'quote') {
                return (
                  <blockquote key={idx} className="eb-quote-box">
                    <p className="eb-quote-text">„{block.text}“</p>
                    {block.author && <p className="eb-quote-author">— {block.author}</p>}
                  </blockquote>
                );
              }
              if (block.type === 'callout') {
                return (
                  <div key={idx} className="eb-callout-card">
                    <h4 className="eb-callout-title">{block.title}</h4>
                    <p className="eb-callout-text">{block.text}</p>
                  </div>
                );
              }
              if (block.type === 'list') {
                return (
                  <div key={idx} className="eb-list-card">
                    <h4 className="eb-list-title">{block.title}</h4>
                    <ul className="eb-items-list">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="eb-item-li">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })}

            {/* Tags Row */}
            {post.tags && post.tags.length > 0 && (
              <div className="eb-tags-row">
                {post.tags.map((t) => (
                  <span key={t} className="eb-tag-chip">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons: Registration / LinkedIn */}
            <div className="eb-cta-row">
              {post.registrationUrl && (
                <a
                  href={post.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eb-primary-btn"
                >
                  <span>Register for Event (Google Forms)</span>
                  <span>&rarr;</span>
                </a>
              )}

              {post.linkedinUrl && (
                <a
                  href={post.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eb-secondary-btn"
                >
                  <span>
                    {post.externalUrl
                      ? 'Read Original Article on BizHankook'
                      : post.registrationUrl
                      ? 'View Announcement on LinkedIn'
                      : 'View Original on LinkedIn'}
                  </span>
                  <span>&rarr;</span>
                </a>
              )}
            </div>
          </article>
        </div>

        {/* 6. Bottom "More Perspectives" Section */}
        <section className="eb-related-section scroll-reveal-block">
          <div className="eb-related-header">
            <h3 className="eb-related-title">More Perspectives</h3>
            <Link to="/feed" className="eb-see-all-link">
              <span>View all stories</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="eb-related-grid">
            {relatedPosts.map((rel, idx) => {
              const relInner = (
                <>
                  <div className="eb-related-img-box">
                    <img src={rel.image} alt={rel.title} className="eb-related-img" />
                  </div>
                  <span className="eb-related-tag">
                    {rel.category?.label || 'Insights'}
                  </span>
                  <h4 className="eb-related-card-title">{rel.title}</h4>
                  <p className="eb-related-card-excerpt">{rel.excerpt}</p>
                  <div className="eb-related-card-meta">
                    <span>{rel.author}</span> • <span>{rel.date}</span>
                  </div>
                </>
              );

              const staggerClass = `stagger-${(idx % 3) + 1}`;

              return rel.externalUrl ? (
                <a
                  key={rel.slug}
                  href={rel.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`eb-related-card scroll-reveal-block ${staggerClass}`}
                >
                  {relInner}
                </a>
              ) : (
                <Link key={rel.slug} to={`/feed/${rel.slug}`} className={`eb-related-card scroll-reveal-block ${staggerClass}`}>
                  {relInner}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
