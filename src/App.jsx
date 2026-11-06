import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import useScrollToHash from './hooks/useScrollToHash';
import RouteView from './components/layout/RouteView';
import { loadProjectPage } from './lib/loadProjectPage';

// Case studies are the heaviest route, so they load as a separate chunk.
const ProjectPage = lazy(loadProjectPage);

export default function App() {
  const location = useLocation();
  useScrollToHash();
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <TopBar />
      <main id="main-content" tabIndex={-1}>
        <RouteView key={location.pathname}>
          <Suspense fallback={<p role="status" className="container loading">Loading project…</p>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </RouteView>
      </main>
      <Footer />
    </>
  );
}
