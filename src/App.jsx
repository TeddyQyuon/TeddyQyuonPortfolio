import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/common/BackToTop';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import useScrollToHash from './hooks/useScrollToHash';

export default function App() {
  // Applies to every route: deep links such as /#projects or
  // /projects/gym-calories-predictive-analysis#results scroll to the target
  // section, and ordinary route changes reset to the top.
  //
  // This is handled in React rather than relying on native anchor jumps,
  // because the router re-renders on a hash change and that re-render cancels
  // the browser's own smooth scroll.
  useScrollToHash();

  return (
    <>
      {/* Keyboard users can jump past the navbar straight to the content. */}
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}