import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import EducationSection from '../sections/EducationSection';
import AcademicProgressSection from '../sections/AcademicProgressSection';
import ResumeSection from '../sections/ResumeSection';
import ContactSection from '../sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <AcademicProgressSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}