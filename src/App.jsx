import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import useScrollToHash from './hooks/useScrollToHash';

// Case studies are the heaviest route, so they load as a separate chunk.
const ProjectPage = lazy(() => import('./pages/ProjectPage'));

export default function App() {
  useScrollToHash();
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <TopBar />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<p role="status" className="container loading">Loading project…</p>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
