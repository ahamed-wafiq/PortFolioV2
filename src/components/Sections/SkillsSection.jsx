import React from 'react';
import styles from './Sections.module.css';
import AstronautModule from './Astronaut/AstronautModule';

const skillCategories = [
  {
    category: 'CORE WEB & FRONTEND',
    skills: [
      { name: 'React / Next.js', level: '95%' },
      { name: 'JavaScript (ES6+) / TypeScript', level: '92%' },
      { name: 'Three.js / React Three Fiber', level: '86%' },
      { name: 'HTML5 / Modern CSS / Modules', level: '95%' },
      { name: 'Framer Motion / UI Micro-Interactions', level: '90%' },
    ],
  },
  {
    category: 'BACKEND & INFRASTRUCTURE',
    skills: [
      { name: 'Node.js / Express.js', level: '92%' },
      { name: 'MongoDB / Mongoose / SQL', level: '88%' },
      { name: 'RESTful API & GraphQL Design', level: '90%' },
      { name: 'WebSockets / Realtime Streams', level: '84%' },
      { name: 'Docker / Cloud Services', level: '80%' },
    ],
  },
  {
    category: 'AI & MACHINE LEARNING',
    skills: [
      { name: 'Python (NumPy, Pandas)', level: '92%' },
      { name: 'PyTorch / Neural Networks', level: '85%' },
      { name: 'Scikit-Learn / Predictive Models', level: '88%' },
      { name: 'Computer Vision / CNN Architectures', level: '82%' },
      { name: 'NLP / Generative AI APIs', level: '86%' },
    ],
  },
  {
    category: 'DEV PROTOCOLS & TOOLS',
    skills: [
      { name: 'Git / GitHub CI/CD', level: '94%' },
      { name: 'Vite / Webpack / Build Tools', level: '90%' },
      { name: 'Linux / Command Line / Bash', level: '86%' },
      { name: 'Agile Development / Pair Programming', level: '92%' },
      { name: 'Performance Profiling / WebGL Shaders', level: '84%' },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.gridBackground} aria-hidden="true" />

      <div className={styles.headerBlock}>
        <div className={styles.sectionTag}>
          <span>[SYSTEMS_MATRIX // 03]</span>
        </div>
        <h2 className={styles.sectionTitle}>TECHNICAL CAPABILITIES</h2>
        <p className={styles.sectionSubtitle}>
          Instrumentation, frameworks, machine learning models, and production workflows.
        </p>
      </div>

      <div className={styles.skillsGrid}>
        {skillCategories.map((group, idx) => (
          <div key={idx} className={styles.hudCard}>
            <div className={styles.cardCornerTL} />
            <div className={styles.cardCornerTR} />
            <div className={styles.cardCornerBL} />
            <div className={styles.cardCornerBR} />

            <div className={styles.cardTelemetry}>
              <span>MATRIX_BUS // 0{idx + 1}</span>
              <span className={styles.telemetryStatus}>ONLINE</span>
            </div>

            <h3 className={styles.skillsGroupTitle}>
              <span>&gt;</span> {group.category}
            </h3>

            <div>
              {group.skills.map((s, i) => (
                <div key={i} className={styles.skillItemRow}>
                  <div className={styles.skillHeader}>
                    <span className={styles.skillName}>{s.name}</span>
                    <span className={styles.skillLevel}>{s.level}</span>
                  </div>
                  <div className={styles.progressBarTrack}>
                    <div
                      className={styles.progressBarFill}
                      style={{ width: s.level }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <AstronautModule />
      </div>
    </section>
  );
};

export default SkillsSection;
