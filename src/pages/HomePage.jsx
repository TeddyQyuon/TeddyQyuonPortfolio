import Reveal from '../components/common/Reveal';
import useDocumentMeta from '../hooks/useDocumentMeta';
import HeroSection from '../sections/HeroSection';
import ProjectsSection from '../sections/ProjectsSection';
import StackSection from '../sections/StackSection';
import AcademicsSection from '../sections/AcademicsSection';
import ContactSection from '../sections/ContactSection';

export default function HomePage() {
  useDocumentMeta({ path: '/' });
  return (
    <div className="container">
      <HeroSection />
      <Reveal><ProjectsSection /></Reveal>
      <Reveal><StackSection /></Reveal>
      <Reveal><AcademicsSection /></Reveal>
      <Reveal><ContactSection /></Reveal>
    </div>
  );
}
