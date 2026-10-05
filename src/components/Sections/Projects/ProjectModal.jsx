import React, { useEffect } from 'react';
import styles from './ProjectsSection.module.css';
import ProjectPreviewWindow from './ProjectPreviewWindow';

export default function ProjectModal({ project, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner Brackets */}
        <div className={styles.cardCornerTL} />
        <div className={styles.cardCornerTR} />
        <div className={styles.cardCornerBL} />
        <div className={styles.cardCornerBR} />

        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTelemetry}>
            <span className={styles.modalCode}>PROJECT // {project.id}</span>
            <span className={styles.modalType}>{project.type}</span>
          </div>
          <button
            type="button"
            className={styles.modalCloseBtn}
            onClick={onClose}
            aria-label="Close Project Modal"
          >
            [ &times; CLOSE TERMINAL ]
          </button>
        </div>

        <div className={styles.modalScrollContent}>
          {/* Project Title & Short Tagline */}
          <div className={styles.modalTitleBlock}>
            <h2 id="modal-project-title" className={styles.modalTitle}>
              {project.title}
            </h2>
            <p className={styles.modalDesc}>{project.desc}</p>
          </div>

          {/* Project Preview Window Inside Modal */}
          <div className={styles.modalPreviewContainer}>
            <ProjectPreviewWindow project={project} isFeatured={true} onInspect={() => {}} />
          </div>

          {/* Structured Engineering Dossier: Problem, Solutions, Key Features */}
          <div className={styles.modalSectionsGrid}>
            {/* PROBLEM */}
            <div className={styles.modalSectionBox}>
              <div className={styles.modalSectionTag}>
                <span>[01 // PROBLEM ARCHITECTURE]</span>
              </div>
              <h4 className={styles.modalSectionHeading}>ENGINEERING CHALLENGE</h4>
              <p className={styles.modalSectionText}>{project.problem}</p>
            </div>

            {/* SOLUTIONS */}
            <div className={styles.modalSectionBox}>
              <div className={styles.modalSectionTag}>
                <span>[02 // TECHNICAL IMPLEMENTATION]</span>
              </div>
              <h4 className={styles.modalSectionHeading}>ARCHITECTURAL SOLUTION</h4>
              <p className={styles.modalSectionText}>{project.solution}</p>
            </div>
          </div>

          {/* KEY FEATURES */}
          <div className={styles.modalFeaturesBox}>
            <div className={styles.modalSectionTag}>
              <span>[03 // CAPABILITY MATRIX]</span>
            </div>
            <h4 className={styles.modalSectionHeading}>KEY SYSTEM FEATURES</h4>
            <div className={styles.featuresList}>
              {project.keyFeatures.map((feat, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.featureBullet}>&bull;</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TECH STACK */}
          <div className={styles.modalTechStackBox}>
            <div className={styles.modalSectionTag}>
              <span>[04 // RELEVANT TECHNOLOGIES]</span>
            </div>
            <h4 className={styles.modalSectionHeading}>TECH STACK</h4>
            <div className={styles.tagList}>
              {project.tags.map((tag, i) => (
                <span key={i} className={styles.techTag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className={styles.modalActions}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalBtnPrimary}
            >
              <span>GITHUB REPOSITORY</span>
              <span>&rarr;</span>
            </a>
            <a
              href={project.demo}
              className={styles.modalBtnSecondary}
              onClick={() => {
                if (project.demo.startsWith('#')) {
                  onClose();
                }
              }}
            >
              <span>LIVE DEMO</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
