import React from 'react';
import HeroContainer from './components/Hero/HeroContainer';
import AboutSection from './components/Sections/AboutSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import SkillsSection from './components/Sections/SkillsSection';
import ContactSection from './components/Sections/ContactSection';
import CockpitFooter from './components/Sections/CockpitFooter';

function App() {
  return (
    <div className="portfolio-app">
      {/* Front Cockpit Viewport & Flight Hero */}
      <HeroContainer />

      {/* Futuristic Spacecraft HUD Sections */}
      <main>
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Cockpit System Telemetry Footer */}
      <CockpitFooter />
    </div>
  );
}

export default App;
