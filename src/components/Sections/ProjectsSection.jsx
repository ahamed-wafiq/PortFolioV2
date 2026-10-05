import React, { useState } from 'react';
import commonStyles from './Sections.module.css';
import styles from './Projects/ProjectsSection.module.css';
import ProjectPreviewWindow from './Projects/ProjectPreviewWindow';
import ProjectModal from './Projects/ProjectModal';

const projectsData = [
  {
    id: 'PRJ-01',
    code: 'MODULE // PRJ-01',
    category: 'MACHINE LEARNING',
    type: 'TYPE: MACHINE LEARNING',
    status: 'STATUS: COMPLETED',
    title: 'AI Neural Vision Classifier',
    desc: 'Deep learning image classification engine with real-time inference and GPU acceleration.',
    tags: ['Python', 'PyTorch', 'Computer Vision', 'FastAPI', 'React'],
    windowTitle: 'GUI // NEURAL_VISION_INSPECTOR.PY',
    windowStatus: '[CUDA_ACCEL: ACTIVE]',
    problem: 'Classifying high-frequency multi-spectral image streams under variable lighting conditions with minimal latency and high inference confidence.',
    solution: 'Engineered a convolutional neural pipeline leveraging PyTorch and OpenCV, paired with an asynchronous FastAPI inference server and interactive inspection overlay.',
    keyFeatures: [
      'Real-time tensor batch processing with CUDA acceleration',
      'Asynchronous FastAPI serving high-throughput prediction streams',
      'Confidence scoring and real-time bounding box inspection',
      'Responsive React frontend with live telemetry visualization',
    ],
    github: 'https://github.com/ahamedwafiq',
    demo: '#contact',
  },
  {
    id: 'PRJ-02',
    code: 'MODULE // PRJ-02',
    category: 'FULL STACK',
    type: 'TYPE: FULL STACK',
    status: 'STATUS: DEPLOYED',
    title: 'Full-Stack MERN Cloud Platform',
    desc: 'Scalable distributed web platform with automated JWT security, MongoDB aggregation caching, and real-time WebSockets.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    windowTitle: 'GUI // MERN_DISTRIBUTED_CLOUD.DASH',
    windowStatus: '[SOCKET_IO: CONNECTED]',
    problem: 'Managing distributed multi-tenant state synchronization and high-frequency data streams without race conditions or memory bottlenecks.',
    solution: 'Architected decoupled microservices with Express and Node.js, combined with MongoDB indexing, automated JWT token rotation, and Socket.io channels.',
    keyFeatures: [
      'Bi-directional event streaming with sub-25ms round-trip latency',
      'MongoDB aggregation pipelines with indexed query optimization',
      'Secure role-based authentication and session refresh mechanisms',
      'Responsive reactive interface with fluid data table filtering',
    ],
    github: 'https://github.com/ahamedwafiq',
    demo: '#contact',
  },
  {
    id: 'PRJ-03',
    code: 'MODULE // PRJ-03',
    category: '3D WEB',
    type: 'TYPE: 3D WEB',
    status: 'STATUS: EXPERIMENTAL',
    title: '3D Celestial Interactive Simulation',
    desc: 'Hardware-accelerated WebGL astronomical orbital simulation utilizing Three.js and custom procedural GLSL shaders.',
    tags: ['Three.js', 'React Three Fiber', 'GLSL', 'WebGL', 'Framer Motion'],
    windowTitle: 'GUI // WEBGL_ORBIT_RENDERER.3D',
    windowStatus: '[SHADERS: GLSL_ACTIVE]',
    problem: 'Rendering multi-body celestial physics and realistic planetary atmospheres in real time across low-power mobile and desktop browsers.',
    solution: 'Developed custom GLSL vertex and fragment shaders for atmospheric scattering, integrated with React Three Fiber and procedural particle systems.',
    keyFeatures: [
      'Custom procedural GLSL shader passes for planetary atmosphere glow',
      'Multi-vector orbital mechanics with pilot-controlled camera parallax',
      'High-performance asset instancing minimizing draw calls',
      'Full mobile touch orbital controls and responsive viewport scaling',
    ],
    github: 'https://github.com/ahamedwafiq',
    demo: '#contact',
  },
];

const ProjectsSection = () => {
  const [activeModalProject, setActiveModalProject] = useState(null);

  const featuredProject = projectsData[0];
  const supportingProjects = projectsData.slice(1);

  return (
    <section id="work" className={`${commonStyles.section} ${commonStyles.sectionAlt}`}>
      {/* Anchor targets */}
      <div id="projects" style={{ position: 'relative', top: '-80px' }} aria-hidden="true" />
      <div className={commonStyles.gridBackground} aria-hidden="true" />

      {/* Header Block */}
      <div className={commonStyles.headerBlock}>
        <div className={commonStyles.sectionTag}>
          <span>[PROJECT_ARCHIVE // 02]</span>
        </div>
        <h2 className={commonStyles.sectionTitle}>PROJECT ARCHIVE</h2>
        <p className={commonStyles.sectionSubtitle}>
          Production applications, intelligent machine learning systems, and hardware-accelerated 3D experiences.
        </p>
      </div>

      <div className={styles.archiveContainer}>
        {/* =================================================================
            1. LARGE FEATURED PROJECT CARD (HERO)
            ================================================================= */}
        <div className={styles.featuredCard}>
          {/* Corner Tech Marks */}
          <div className={styles.cardCornerTL} />
          <div className={styles.cardCornerTR} />
          <div className={styles.cardCornerBL} />
          <div className={styles.cardCornerBR} />

          {/* Card Header Telemetry */}
          <div className={styles.cardTelemetry}>
            <span className={styles.featuredModuleTag}>
              PROJECT ARCHIVE // FEATURED
            </span>
            <div className={styles.telemetryStatus}>
              <span className={styles.statusDot} />
              <span>CORE ARCHIVE</span>
            </div>
          </div>

          {/* 2-Column Split on Desktop */}
          <div className={styles.featuredContentGrid}>
            {/* Left Column: Authentic Project Preview Window */}
            <div>
              <ProjectPreviewWindow
                project={featuredProject}
                isFeatured={true}
                onInspect={() => setActiveModalProject(featuredProject)}
              />
            </div>

            {/* Right Column: Information & Actions */}
            <div className={styles.featuredDetails}>
              <div>
                <div className={styles.featuredModuleTag} style={{ marginBottom: '0.4rem' }}>
                  {featuredProject.code}
                </div>
                <h3 className={styles.featuredTitle}>{featuredProject.title}</h3>
              </div>

              {/* Useful Metadata Badge (No Fake Metrics) */}
              <div className={styles.projectMetaRow}>
                <div className={styles.projectMetaItem}>
                  <span className={styles.projectMetaLabel}>DISCIPLINE:</span>
                  <span className={styles.projectMetaValue}>{featuredProject.category}</span>
                </div>
                <div className={styles.projectMetaItem}>
                  <span className={styles.projectMetaLabel}>STATUS:</span>
                  <span className={styles.projectMetaValue}>COMPLETED</span>
                </div>
              </div>

              <p className={styles.projectDesc}>{featuredProject.desc}</p>

              {/* Tech Stack */}
              <div className={styles.tagList}>
                {featuredProject.tags.map((tag, i) => (
                  <span key={i} className={styles.techTag}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className={styles.actionGroup}>
                <button
                  type="button"
                  className={styles.btnInspect}
                  onClick={() => setActiveModalProject(featuredProject)}
                >
                  <span>INSPECT CODE</span>
                  <span>&rarr;</span>
                </button>
                <a href={featuredProject.demo} className={styles.btnLaunch}>
                  <span>LIVE DEMO</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            2. TWO SUPPORTING PROJECT MODULES
            ================================================================= */}
        <div className={styles.supportingGrid}>
          {supportingProjects.map((project) => (
            <div key={project.id} className={styles.supportingCard}>
              {/* Corner Tech Marks */}
              <div className={styles.cardCornerTL} />
              <div className={styles.cardCornerTR} />
              <div className={styles.cardCornerBL} />
              <div className={styles.cardCornerBR} />

              {/* Card Header Telemetry */}
              <div className={styles.cardTelemetry}>
                <span>{project.code}</span>
                <span className={styles.telemetryStatus}>
                  <span className={styles.statusDot} />
                  <span>{project.category}</span>
                </span>
              </div>

              {/* Realistic Project Preview Window */}
              <ProjectPreviewWindow
                project={project}
                isFeatured={false}
                onInspect={() => setActiveModalProject(project)}
              />

              {/* Project Information */}
              <div>
                <h3 className={styles.supportingTitle}>{project.title}</h3>

                {/* Verified Metadata */}
                <div className={styles.projectMetaRow} style={{ marginBottom: '0.85rem' }}>
                  <div className={styles.projectMetaItem}>
                    <span className={styles.projectMetaLabel}>TYPE:</span>
                    <span className={styles.projectMetaValue}>{project.category}</span>
                  </div>
                  <div className={styles.projectMetaItem}>
                    <span className={styles.projectMetaLabel}>STATUS:</span>
                    <span className={styles.projectMetaValue}>
                      {project.id === 'PRJ-02' ? 'DEPLOYED' : 'EXPERIMENTAL'}
                    </span>
                  </div>
                </div>

                <p className={styles.projectDesc} style={{ marginBottom: '1rem' }}>
                  {project.desc}
                </p>

                {/* Tech Stack */}
                <div className={styles.tagList} style={{ marginBottom: '1.25rem' }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} className={styles.techTag}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={styles.actionGroup}>
                  <button
                    type="button"
                    className={styles.btnInspect}
                    onClick={() => setActiveModalProject(project)}
                  >
                    <span>INSPECT</span>
                    <span>&rarr;</span>
                  </button>
                  <a href={project.demo} className={styles.btnLaunch}>
                    <span>LIVE DEMO</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sci-Fi Detail Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
