import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import EducationSection from '../sections/EducationSection';
import AcademicProgressSection from '../sections/AcademicProgressSection';
import ResumeSection from '../sections/ResumeSection';
import ContactSection from '../sections/ContactSection';
import usePageMetadata from '../hooks/usePageMetadata';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE_ALT,
  OG_IMAGE_URL,
} from '../utils/seo';

export default function HomePage() {
  usePageMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: '/',
    image: OG_IMAGE_URL,
    imageAlt: OG_IMAGE_ALT,
  });

  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <AcademicProgressSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
