import React, { useState } from 'react';
import commonStyles from './Sections.module.css';
import styles from './Projects/ProjectsSection.module.css';
import ProjectPreviewWindow from './Projects/ProjectPreviewWindow';
import ProjectModal from './Projects/ProjectModal';

const projectsData = [
  {
    id: 'PRJ-01',
    code: 'MODULE // SIGHT_ASSIST_AI',
    category: 'COMPUTER VISION & AI',
    type: 'TYPE: AI VISION SYSTEM',
    status: 'STATUS: PRODUCTION READY',
    title: 'SightAssist: AI Vision for Visually Impaired',
    desc: 'Real-time computer vision assistant utilizing YOLO object detection, spatial orientation, distance estimation, and voice audio guidance to empower independent navigation.',
    tags: ['Python', 'FastAPI', 'YOLO', 'React', 'Computer Vision', 'Web Speech API', 'WebRTC'],
    windowTitle: 'GUI // SIGHT_ASSIST_VISION.AI',
    windowStatus: '[YOLO_V8: REALTIME_60FPS]',
    image: '/projects/sightassist-preview.png',
    problem: 'Visually impaired individuals face dangerous obstacles, moving hazards, and spatial navigation barriers in unfamiliar indoor and outdoor environments without hands-free real-time auditory assistance.',
    solution: 'Architected a client-side WebRTC frame processor paired with an asynchronous FastAPI microservice running YOLO object detection. Computes spatial vectors (Left/Center/Right), estimates proximity, and delivers synthesized voice cues with anti-spam cooldowns.',
    keyFeatures: [
      'Sub-second YOLO object, obstacle, and hazard detection from live camera streams',
      'Spatial orientation engine identifying relative direction (Left, Center, Right)',
      'Proximity and distance estimation (Very Near, Near, Medium, Far)',
      'Hands-free spoken navigational cues powered by Web Speech API with smart cooldowns',
      'Privacy-first architecture: in-memory frame processing with zero permanent storage',
    ],
    github: 'https://github.com/ahamed-wafiq/SightAssist',
    demo: 'https://sight-assist-three.vercel.app',
  },
  {
    id: 'PRJ-02',
    code: 'MODULE // KRISHIMITRA_AGRI',
    category: 'SMART AGRICULTURE & AI',
    type: 'TYPE: AI AGRO-PLATFORM',
    status: 'STATUS: DEPLOYED',
    title: 'KrishiMitra: AI Smart Agriculture Engine',
    desc: 'Intelligent agricultural platform providing deep learning leaf disease diagnosis, meteorological yield prediction, live mandi market commodity prices, and multilingual voice assistance.',
    tags: ['React 19', 'TailwindCSS', 'Machine Learning', 'Vite', 'Recharts', 'i18n', 'Node.js'],
    windowTitle: 'GUI // KRISHIMITRA_AGRI_CORE.OS',
    windowStatus: '[AI_AGRO_ENGINE: ACTIVE]',
    image: '/projects/krishimitra-preview.png',
    problem: 'Smallholder farmers frequently lose crop yields to late-diagnosed plant diseases, volatile mandi market middlemen prices, and lack of localized multilingual scientific advisory services.',
    solution: 'Engineered an integrated agro-intelligence suite featuring CNN-driven image classification for instant leaf disease diagnosis, predictive crop yield modeling, live Mandi commodity tracking with interactive Recharts, and regional voice guidance.',
    keyFeatures: [
      'Automated crop leaf disease classification with localized treatment recommendations',
      'Predictive crop yield modeling factoring historical soil, weather, and rainfall parameters',
      'Real-time Mandi commodity price charts and market trend forecasting via Recharts',
      'Multilingual voice assistant with full internationalization (i18n) for regional languages',
      'Offline-resilient reactive UI built on React 19 and TailwindCSS for rural mobile connectivity',
    ],
    github: 'https://github.com/ahamed-wafiq/smart_farming',
    demo: 'https://smart-farming-lac.vercel.app',
  },
  {
    id: 'PRJ-03',
    code: 'MODULE // GEMINI_ARCHITECT',
    category: 'GENERATIVE AI & CLOUD',
    type: 'TYPE: AI SYSTEM STUDIO',
    status: 'STATUS: LIVE DEPLOYED',
    title: 'Gemini Architect 3.0: AI Cloud Studio',
    desc: 'Generative AI workspace that transforms natural language system specifications into interactive cloud architectures, schema graphs, and scaffolded production codebases.',
    tags: ['Google Gemini API', 'React 19', 'TypeScript', 'TailwindCSS', 'System Architecture', 'Vite'],
    windowTitle: 'GUI // GEMINI_ARCHITECT_STUDIO.AI',
    windowStatus: '[GEMINI_API: CONNECTED]',
    image: '/projects/gemini-architect-preview.png',
    problem: 'Architecting distributed cloud systems, database schemas, and microservice topologies requires fragmented diagramming tools, manual boilerplate authoring, and slow specification iterations.',
    solution: 'Constructed an intelligent architectural canvas leveraging Google Gemini LLMs to synthesize end-to-end system topology graphs, API contract schemas, and scaffolded component boilerplate from natural language prompts in real time.',
    keyFeatures: [
      'Natural language to distributed cloud architecture synthesis powered by Google Gemini',
      'Multi-node interactive architectural graph visualization with dynamic relationship links',
      'Automated full-stack code scaffolding, API contracts, and database schema generation',
      'Instant live parameter tweaking, node re-architecting, and exportable system blueprints',
      'High-speed reactive interface optimized for rapid prototyping and enterprise architecture',
    ],
    github: 'https://github.com/ahamed-wafiq/codex',
    demo: 'https://gemini-architect-3-0.vercel.app',
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
                  <span>INSPECT DOSSIER</span>
                  <span>&rarr;</span>
                </button>
                <a
                  href={featuredProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnLaunch}
                >
                  <span>LIVE DEMO ↗</span>
                </a>
                <a
                  href={featuredProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnRepo}
                >
                  <span>GITHUB REPO ↗</span>
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
                    <span className={styles.projectMetaValue}>{project.status}</span>
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
                    <span>DOSSIER</span>
                    <span>&rarr;</span>
                  </button>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnLaunch}
                  >
                    <span>LIVE DEMO ↗</span>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnRepo}
                  >
                    <span>REPO ↗</span>
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
