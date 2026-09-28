import React from 'react';
import styles from './Sections.module.css';

const projectsData = [
  {
    id: 'PRJ-01',
    title: 'AI Neural Vision Classifier',
    desc: 'Deep learning image classification engine trained on multi-spectral datasets with real-time inference, high confidence metrics, and GPU acceleration.',
    tags: ['Python', 'PyTorch', 'Computer Vision', 'FastAPI', 'React'],
    metrics: 'ACCURACY: 98.4%',
  },
  {
    id: 'PRJ-02',
    title: 'Full-Stack MERN Cloud Platform',
    desc: 'Scalable distributed web platform with automated JWT security, MongoDB sharded caching, real-time WebSockets, and fluid micro-interactions.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    metrics: 'LATENCY: <25ms',
  },
  {
    id: 'PRJ-03',
    title: '3D Celestial Interactive Simulation',
    desc: 'Hardware-accelerated WebGL astronomical orbital simulation utilizing Three.js and custom procedural GLSL shaders with pilot-controlled camera vectors.',
    tags: ['Three.js', 'React Three Fiber', 'GLSL', 'WebGL', 'Framer Motion'],
    metrics: 'FPS: 60 LOCKED',
  },
  {
    id: 'PRJ-04',
    title: 'Intelligent Predictive Analytics Pipeline',
    desc: 'Automated ML data ingest pipeline delivering predictive modeling, anomaly detection in time-series telemetry, and dynamic visualization dashboards.',
    tags: ['Scikit-Learn', 'Pandas', 'Flask', 'TypeScript', 'TailwindCSS'],
    metrics: 'PRECISION: 0.94',
  },
];

const ProjectsSection = () => {
  return (
    <section id="work" className={`${styles.section} ${styles.sectionAlt}`}>
      <div id="projects" style={{ position: 'relative', top: '-80px' }} aria-hidden="true" />
      <div className={styles.gridBackground} aria-hidden="true" />

      <div className={styles.headerBlock}>
        <div className={styles.sectionTag}>
          <span>[MISSION_ARCHIVE // 02]</span>
        </div>
        <h2 className={styles.sectionTitle}>FEATURED MISSIONS</h2>
        <p className={styles.sectionSubtitle}>
          Production applications, intelligent machine learning systems, and 3D experiences.
        </p>
      </div>

      <div className={styles.projectsGrid}>
        {projectsData.map((project) => (
          <div key={project.id} className={`${styles.hudCard} ${styles.projectCard}`}>
            <div className={styles.cardCornerTL} />
            <div className={styles.cardCornerTR} />
            <div className={styles.cardCornerBL} />
            <div className={styles.cardCornerBR} />

            <div>
              <div className={styles.cardTelemetry}>
                <span>MODULE // {project.id}</span>
                <span className={styles.telemetryStatus}>
                  <span className={styles.statusDot} />
                  <span>{project.metrics}</span>
                </span>
              </div>

              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.desc}</p>
            </div>

            <div>
              <div className={styles.tagList}>
                {project.tags.map((tag, i) => (
                  <span key={i} className={styles.techTag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.projectActionGroup}>
                <a href="#contact" className={styles.projectBtn}>
                  INSPECT CODE &rarr;
                </a>
                <a href="#contact" className={styles.projectBtn}>
                  LIVE DEMO &rarr;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
