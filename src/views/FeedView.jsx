import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FEED_POSTS } from '../data/feedData';

export default function FeedView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(catParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(timer);
  }, []);

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
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (catParam) {
      setActiveCategory(catParam);
    }
  }, [catParam]);

  // Exactly 5 categories: All, Event, Insights, Recap, Open Call
  const filterTabs = [
    { label: 'All', value: 'All' },
    { label: 'Event', value: 'Event' },
    { label: 'Insights', value: 'Insights' },
    { label: 'Recap', value: 'Recap' },
    { label: 'Open Call', value: 'Open Call' },
  ];

  const filteredPosts = FEED_POSTS.filter((post) => {
    const postCat = post.category?.label || post.categoryType || '';
    const active = activeCategory.toLowerCase();

    const matchesCategory =
      active === 'all' ||
      postCat.toLowerCase() === active ||
      (post.categoryType && post.categoryType.toLowerCase() === active);

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = FEED_POSTS[0];

  return (
    <main className="feed-ivory-page">
      <style>{`
        /* 100% Exact Pioneer Square Labs (PSL) Design System ported from Portfolio */
        :root {
          --psl-bg: #FFFFFF;
          --psl-black: #252423;
          --psl-smoke: #ECECEC;
          --psl-muted: #8C8C8C;
          --font-psl: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          --font-editorial: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          --font-mono-editorial: 'Space Grotesk', -apple-system, monospace;
        }

        .feed-ivory-page {
          background-color: var(--psl-bg);
          color: var(--psl-black);
          font-family: var(--font-psl);
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          padding-top: clamp(100px, 8vw, 120px);
          padding-bottom: 140px;
        }

        /* Hero Header Section - Generous, airy breathing room */
        .psl-header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(48px, 6vw, 88px) clamp(24px, 4.5vw, 64px) 0;
        }

        .psl-hero-title {
          font-family: var(--font-psl);
          font-size: clamp(38px, 5.6vw, 76px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: var(--psl-black);
          margin: 0 0 clamp(48px, 5.5vw, 76px) 0;
          max-width: 960px;
        }

        /* PSL Tabs (All, Press, Insights, etc.) */
        .psl-tabs-row {
          display: flex;
          align-items: center;
          gap: 10px 12px;
          flex-wrap: wrap;
          margin-bottom: clamp(40px, 4.4vw, 62px);
        }

        .psl-tab-btn {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 999px;
          padding: 8.5px 22px;
          font-family: var(--font-psl);
          font-size: 15.5px;
          font-weight: 500;
          color: var(--psl-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
          white-space: nowrap;
        }

        .psl-tab-btn:hover {
          color: var(--psl-black);
        }

        .psl-tab-btn.active {
          border-color: var(--psl-black);
          color: var(--psl-black);
        }

        /* Clean search pill aligned with tabs */
        .psl-search-wrap {
          margin-left: auto;
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .psl-search-wrap {
            margin-left: 0;
            width: 100%;
            margin-top: 6px;
          }
        }

        .psl-search-input {
          font-family: var(--font-psl);
          font-size: 14.5px;
          padding: 8.5px 20px;
          border-radius: 999px;
          border: 1px solid var(--psl-smoke);
          background: #FFFFFF;
          color: var(--psl-black);
          outline: none;
          min-width: 220px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .psl-search-input:focus {
          border-color: var(--psl-black);
          box-shadow: 0 0 0 1px var(--psl-black);
        }

        /* Wide, expansive layout for stories as requested */
        .feed-content-container {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 clamp(20px, 3vw, 56px);
        }

        /* Top Featured Story (Wide horizontal card) */
        .featured-story-banner {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: clamp(24px, 4vw, 56px);
          align-items: center;
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.08);
          overflow: hidden;
          margin-bottom: 70px;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s ease;
          width: 100%;
        }

        .featured-story-banner:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.07);
        }

        @media (max-width: 900px) {
          .featured-story-banner {
            grid-template-columns: 1fr;
          }
        }

        .featured-photo-box {
          width: 100%;
          height: 100%;
          min-height: 340px;
          max-height: 500px;
          overflow: hidden;
          background: #F4F4F4;
        }

        .featured-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.6s ease;
        }

        .featured-story-banner:hover .featured-photo-img {
          transform: scale(1.03);
        }

        .featured-text-box {
          padding: clamp(28px, 3.5vw, 48px);
          display: flex;
          flex-direction: column;
        }

        .featured-tag-badge {
          font-family: var(--font-mono-editorial);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.55);
          margin-bottom: 12px;
          display: inline-block;
        }

        .featured-main-headline {
          font-family: var(--font-editorial);
          font-size: clamp(30px, 3.2vw, 46px);
          font-weight: 700;
          line-height: 0.96;
          letter-spacing: -0.04em;
          color: #000000;
          margin: 0 0 16px 0;
        }

        .featured-desc-text {
          font-family: var(--font-editorial);
          font-size: 15.5px;
          line-height: 1.4;
          letter-spacing: -0.015em;
          color: #111111;
          margin-bottom: 22px;
        }

        .featured-meta-author {
          font-size: 12.5px;
          color: rgba(0, 0, 0, 0.6);
          font-family: var(--font-editorial);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        /* ----------------------------------------------------
           NEW BORDERLESS EDITORIAL GRID (EXACTLY LIKE REFERENCE)
           ---------------------------------------------------- */
        .editorial-stories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(28px, 3.5vw, 48px);
        }

        @media (max-width: 960px) {
          .editorial-stories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .editorial-stories-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Pure borderless, no background box */
        .editorial-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        /* 1. Large rectangular image */
        .editorial-image-frame {
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #EAE6DF;
          margin-bottom: 22px;
        }

        .editorial-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.45s ease, filter 0.3s ease;
        }

        .editorial-card:hover .editorial-photo {
          transform: scale(1.03);
          filter: brightness(0.96);
        }

        .editorial-card-tag {
          font-family: var(--font-mono-editorial);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #252423;
          margin-bottom: 12px;
          display: inline-block;
        }

        /* 2. Bold Heavy Title */
        .editorial-headline {
          font-family: var(--font-editorial);
          font-size: clamp(28px, 2.3vw, 36px);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.038em;
          color: #000000;
          margin: 0 0 16px 0;
          transition: opacity 0.2s ease;
          word-break: break-word;
        }

        .editorial-card:hover .editorial-headline {
          opacity: 0.75;
        }

        /* 3. Short Summary Excerpt */
        .editorial-summary {
          font-family: var(--font-editorial);
          font-size: 16px;
          line-height: 1.5;
          color: #111111;
          letter-spacing: -0.012em;
          margin: 0 0 24px 0;
          font-weight: 400;
          flex: 1;
        }

        /* 4. Bottom Meta: Author & Date/Read Time */
        .editorial-meta-footer {
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-family: var(--font-editorial);
          font-size: 12.5px;
          color: #000000;
          margin-top: auto;
        }

        .editorial-author-name {
          font-weight: 500;
          color: #000000;
        }

        .editorial-date-time {
          color: #666666;
          font-size: 12px;
        }
      `}</style>

      {/* Hero Header Section - Ported 100% from Portfolio */}
      <section className="psl-header-container">
        <h1 className="psl-hero-title">
          Fresh from the Factory
        </h1>

        {/* PSL Exact Industry Category Tabs Menu */}
        <div className="psl-tabs-row" role="tablist">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={activeCategory.toLowerCase() === tab.value.toLowerCase()}
              onClick={() => {
                setActiveCategory(tab.value);
                setSearchParams(tab.value === 'All' ? {} : { category: tab.value });
              }}
              className={`psl-tab-btn ${activeCategory.toLowerCase() === tab.value.toLowerCase() ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}

          {/* Clean search pill aligned with tabs */}
          <div className="psl-search-wrap">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="psl-search-input"
            />
          </div>
        </div>
      </section>

      {/* Main Stories Content Area - Flush with 1400px Header */}
      <div className="feed-content-container">
        {/* Top Featured Story Banner (Wide format) */}
        {activeCategory === 'All' && !searchQuery && featuredPost && (
          featuredPost.externalUrl ? (
            <a
              href={featuredPost.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-story-banner scroll-reveal-block"
            >
              <div className="featured-photo-box">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="featured-photo-img"
                />
              </div>
              <div className="featured-text-box">
                <span className="featured-tag-badge">
                  {featuredPost.category.label}
                </span>
                <h2 className="featured-main-headline">{featuredPost.title}</h2>
                <p className="featured-desc-text">{featuredPost.excerpt}</p>
                <div className="featured-meta-author">
                  <span>{featuredPost.author}</span>
                  <span>{featuredPost.date} | {featuredPost.readTime}</span>
                </div>
              </div>
            </a>
          ) : (
            <Link to={`/feed/${featuredPost.slug}`} className="featured-story-banner scroll-reveal-block">
              <div className="featured-photo-box">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="featured-photo-img"
                />
              </div>
              <div className="featured-text-box">
                <span className="featured-tag-badge">
                  {featuredPost.category.label}
                </span>
                <h2 className="featured-main-headline">{featuredPost.title}</h2>
                <p className="featured-desc-text">{featuredPost.excerpt}</p>
                <div className="featured-meta-author">
                  <span>{featuredPost.author}</span>
                  <span>{featuredPost.date} | {featuredPost.readTime}</span>
                </div>
              </div>
            </Link>
          )
        )}

        {/* Reference-Styled Borderless Editorial Grid */}
        <div className="editorial-stories-grid">
          {filteredPosts.map((post, idx) => {
            const cardInner = (
              <>
                {/* 1. Large 16:10 Photo */}
                <div className="editorial-image-frame">
                  <img src={post.image} alt={post.title} className="editorial-photo" style={post.imageStyle} />
                </div>

                {/* Category Tag Badge */}
                <span className="editorial-card-tag">
                  {post.category?.label || post.categoryType}
                </span>

                {/* 2. Bold Title */}
                <h3 className="editorial-headline">{post.title}</h3>

                {/* 3. Excerpt */}
                <p className="editorial-summary">{post.excerpt}</p>

                {/* 4. Bottom Meta (Author & Date | Read Time) */}
                <div className="editorial-meta-footer">
                  <span className="editorial-author-name">{post.author}</span>
                  <span className="editorial-date-time">
                    {post.date} | {post.readTime}
                  </span>
                </div>
              </>
            );

            const staggerClass = `stagger-${(idx % 3) + 1}`;

            return post.externalUrl ? (
              <a
                key={post.slug}
                href={post.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`editorial-card scroll-reveal-block ${staggerClass}`}
              >
                {cardInner}
              </a>
            ) : (
              <Link key={post.slug} to={`/feed/${post.slug}`} className={`editorial-card scroll-reveal-block ${staggerClass}`}>
                {cardInner}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
