import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Views
import HomeView from './views/HomeView';
import StudioView from './views/StudioView';
import VenturesView from './views/VenturesView';
import CompaniesView from './views/CompaniesView';
import TeamView from './views/TeamView';
import CareersView from './views/CareersView';
import FeedView from './views/FeedView';
import ArticleDetailView from './views/ArticleDetailView';
import AgbView from './views/AgbView';
import ImpressumView from './views/ImpressumView';
import DatenschutzView from './views/DatenschutzView';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<TeamView />} />
        <Route path="/startups" element={<StudioView />} />
        <Route path="/corporates" element={<VenturesView />} />
        <Route path="/portfolio" element={<CompaniesView />} />
        <Route path="/contact" element={<FeedView />} />
        {/* Legacy aliases */}
        <Route path="/studio" element={<StudioView />} />
        <Route path="/ventures" element={<VenturesView />} />
        <Route path="/companies" element={<CompaniesView />} />
        <Route path="/team" element={<TeamView />} />
        <Route path="/careers" element={<CareersView />} />
        <Route path="/feed" element={<FeedView />} />
        <Route path="/feed/:slug" element={<ArticleDetailView />} />
        <Route path="/agb" element={<AgbView />} />
        <Route path="/legal" element={<AgbView />} />
        <Route path="/impressum" element={<ImpressumView />} />
        <Route path="/imprint" element={<ImpressumView />} />
        <Route path="/datenschutz" element={<DatenschutzView />} />
        <Route path="/privacy" element={<DatenschutzView />} />
        <Route path="*" element={<HomeView />} />
      </Routes>
      <Footer />
    </div>
  );
}
