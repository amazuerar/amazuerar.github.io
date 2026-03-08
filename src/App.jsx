import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useFilters } from './hooks/useFilters';

import Navbar from './components/Navbar';
import Controls from './components/Controls';
import Footer from './components/Footer';

import LinearView from './pages/LinearView';
import MatrixView from './pages/MatrixView';
import AboutPage from './pages/AboutPage';
import AcknowledgmentsPage from './pages/AcknowledgmentsPage';
import TrendsPage from './pages/TrendsPage';

const VALID_PAGES = ['atlas', 'trends', 'about', 'sources'];

function pageFromPath() {
  // /atlas/trends → 'trends', /atlas → 'atlas'
  const seg = window.location.pathname.replace(/^\/atlas\/?/, '').replace(/\/$/, '');
  return VALID_PAGES.includes(seg) ? seg : 'atlas';
}

export default function App() {
  const [view, setView] = useState('linear');
  const [page, setPage] = useState(pageFromPath);
  const { isDark, toggle, t } = useTheme('light');
  const filters = useFilters();
  const showControls = page === 'atlas';

  // Push to browser history when page changes (so back button works)
  const navigatePage = (newPage) => {
    const path = newPage === 'atlas' ? '/atlas' : `/atlas/${newPage}`;
    window.history.pushState({ page: newPage }, '', path);
    setPage(newPage);
  };

  // Handle back/forward button
  useEffect(() => {
    const onPopState = () => setPage(pageFromPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, page]);

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-sans transition-colors duration-300 pb-12`}>
      <Navbar
        view={view} setView={setView}
        isDark={isDark} toggleTheme={toggle}
        t={t} page={page} setPage={navigatePage}
      />

      {showControls && (
        <Controls
          sortOrder={filters.sortOrder}
          toggleSort={filters.toggleSort}
          filterOrgs={filters.filterOrgs}
          toggleOrg={filters.toggleOrg}
          clearOrgs={filters.clearOrgs}
          filterModalities={filters.filterModalities}
          toggleModality={filters.toggleModality}
          clearModalities={filters.clearModalities}
          searchTerm={filters.searchTerm}
          setSearchTerm={filters.setSearchTerm}
          sizeRange={filters.sizeRange}
          setSizeRange={filters.setSizeRange}
          isSizeFiltered={filters.isSizeFiltered}
          clearSize={filters.clearSize}
          edgeNativeOnly={filters.edgeNativeOnly}
          setEdgeNativeOnly={filters.setEdgeNativeOnly}
          openWeightsOnly={filters.openWeightsOnly}
          setOpenWeightsOnly={filters.setOpenWeightsOnly}
          isDark={isDark}
          t={t}
        />
      )}

      <main className={`${showControls ? 'pt-36' : 'pt-24'} px-6 max-w-[1600px] mx-auto min-h-screen`}>
        {page === 'atlas' && view === 'linear' && (
          <LinearView
            filteredModels={filters.filteredModels}
            isDark={isDark} t={t}
          />
        )}
        {page === 'atlas' && view === 'matrix' && (
          <MatrixView
            filteredModels={filters.filteredModels}
            filterOrgs={filters.filterOrgs}
            isDark={isDark} t={t}
          />
        )}
        {page === 'trends' && <TrendsPage isDark={isDark} t={t} />}
        {page === 'about' && <AboutPage isDark={isDark} t={t} />}
        {page === 'sources' && <AcknowledgmentsPage isDark={isDark} t={t} />}
      </main>

      <Footer t={t} />
    </div>
  );
}