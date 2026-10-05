import React from 'react';
import styles from './Sections.module.css';
import TechnologyCore from './TechCore/TechnologyCore';

const AboutSection = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.gridBackground} aria-hidden="true" />

      <div className={styles.headerBlock}>
        <div className={styles.sectionTag}>
          <span>[SYS_PROFILE // 01]</span>
        </div>
        <h2 className={styles.sectionTitle}>ABOUT THE PILOT</h2>
        <p className={styles.sectionSubtitle}>
          Mission telemetry, background dossier, and engineering disciplines.
        </p>
      </div>

      <div className={styles.aboutGrid}>
        {/* Left Column: Biography Dossier HUD Card */}
        <div className={styles.hudCard}>
          <div className={styles.cardCornerTL} />
          <div className={styles.cardCornerTR} />
          <div className={styles.cardCornerBL} />
          <div className={styles.cardCornerBR} />

          <div className={styles.cardTelemetry}>
            <span>DOSSIER: AHAMED WAFIQ</span>
            <div className={styles.telemetryStatus}>
              <span className={styles.statusDot} />
              <span>ACTIVE STATUS</span>
            </div>
          </div>

          <h3 className={styles.bioHeading}>
            Computer Engineering Student &amp; Full-Stack AI Engineer
          </h3>

          <p className={styles.bioText}>
            I am driven by the intersection of high-performance modern web architecture and artificial intelligence. My focus is engineering intelligent, scalable systems that turn complex computational models into fluid, responsive user experiences.
          </p>

          <p className={styles.bioText}>
            From designing full-stack MERN applications to training deep neural networks and real-time 3D WebGL interfaces, I approach software engineering with precision, curiosity, and an eye for cutting-edge aesthetics.
          </p>

          <div className={styles.specRow}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>DISCIPLINE</span>
              <span className={styles.specValue}>Computer Engineering &bull; AI/ML &bull; MERN</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>FOCUS</span>
              <span className={styles.specValue}>Full-Stack Architecture &bull; Deep Learning Models</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>MISSION OBJECTIVE</span>
              <span className={styles.specValue}>Creating Intelligent, High-Impact Digital Solutions</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>ORBITAL STATUS</span>
              <span className={styles.specValue}>Available for Collaborations &amp; Projects</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Technology Core Panel */}
        <TechnologyCore />
      </div>
    </section>
  );
};

export default AboutSection;
