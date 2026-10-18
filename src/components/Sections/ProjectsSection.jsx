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
    code: 'MODULE // LEARNAI_STUDY_OS',
    category: 'RAG PIPELINE & AI STUDY OS',
    type: 'TYPE: AI STUDY OPERATING SYSTEM',
    status: 'STATUS: LIVE DEPLOYED',
    title: 'Learn AI: AI Study Operating System & RAG Platform',
    desc: 'Next-generation AI Study OS featuring local document ingestion, vector retrieval with FAISS, split-screen PDF reader with page-level citations, active recall quizzes, and adaptive revision planning.',
    tags: ['FastAPI', 'Python', 'React 19', 'FAISS', 'PostgreSQL', 'Google Gemini API', 'PyMuPDF', 'Vite', 'TypeScript'],
    windowTitle: 'GUI // LEARNAI_STUDY_OS.RAG',
    windowStatus: '[RAG_CORE: FAISS + GEMINI_3.5]',
    image: '/projects/learnai-preview.png',
    problem: 'Students and researchers struggle with hallucinated AI study notes, fragmented PDF readers, lack of verifiable source citations, and generic revision schedules disconnected from active recall mastery.',
    solution: 'Architected an end-to-end local RAG pipeline using PyMuPDF page rasterization, overlapping semantic chunking, and FAISS vector indexing with Gemini 3.5 Flash synthesis. Delivers instant grounded answers with clickable page-level citations, auto-generated quizzes, and adaptive 7-day revision roadmaps.',
    keyFeatures: [
      'Zero-hallucination grounded RAG copilot powered by FAISS vector index & Gemini 3.5 Flash',
      'Split-screen visual PDF reader with PyMuPDF server-side rasterization and zoom controls',
      'Interactive citation anchors jumping to exact source pages with similarity confidence scores',
      'Automated active recall quiz generator (MCQ, True/False, Short Answer) & flashcard decks',
      'Adaptive 7-day study planner, topic mastery tracking, and learning diagnostics dashboard',
    ],
    github: 'https://github.com/ahamed-wafiq/LearnAi',
    demo: 'https://learn-ai-alpha-wheat.vercel.app',
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

              {/* Useful Metadata Badge */}
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

              {/* Block-Based Voxel Status Indicators (Unit 07 Style) */}
              <div className={styles.voxelVitalsRow}>
                <div className={styles.voxelVital}>
                  <span className={styles.vitalLabel}>MODULE // PWR:</span>
                  <span className={styles.vitalPips}>[██████]</span>
                </div>
                <div className={styles.voxelVital}>
                  <span className={styles.vitalLabel}>ARMOR:</span>
                  <span className={styles.vitalPips}>[█████░]</span>
                </div>
                <div className={styles.voxelVital}>
                  <span className={styles.vitalLabel}>UNIT:</span>
                  <span className={styles.vitalVal}>READY</span>
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
                <div className={styles.projectMetaRow} style={{ marginBottom: '0.65rem' }}>
                  <div className={styles.projectMetaItem}>
                    <span className={styles.projectMetaLabel}>TYPE:</span>
                    <span className={styles.projectMetaValue}>{project.category}</span>
                  </div>
                  <div className={styles.projectMetaItem}>
                    <span className={styles.projectMetaLabel}>STATUS:</span>
                    <span className={styles.projectMetaValue}>{project.status}</span>
                  </div>
                </div>

                {/* Block-Based Voxel Status Indicators */}
                <div className={styles.voxelVitalsRow}>
                  <div className={styles.voxelVital}>
                    <span className={styles.vitalLabel}>PWR:</span>
                    <span className={styles.vitalPips}>[█████░]</span>
                  </div>
                  <div className={styles.voxelVital}>
                    <span className={styles.vitalLabel}>MODULE:</span>
                    <span className={styles.vitalVal}>ACTIVE</span>
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
