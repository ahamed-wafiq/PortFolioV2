import React from 'react';
import styles from './ProjectsSection.module.css';

export default function ProjectPreviewWindow({ project, isFeatured = false, onInspect }) {
  return (
    <div
      className={`${styles.previewWindow} ${isFeatured ? styles.previewWindowFeatured : ''}`}
      onClick={onInspect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInspect();
        }
      }}
      aria-label={`Inspect ${project.title} Preview`}
    >
      {/* Window Titlebar */}
      <div className={styles.windowTitlebar}>
        <div className={styles.windowControls}>
          <span className={`${styles.windowDot} ${styles.windowDotRed}`} />
          <span className={`${styles.windowDot} ${styles.windowDotAmber}`} />
          <span className={`${styles.windowDot} ${styles.windowDotGreen}`} />
        </div>
        <div className={styles.windowTitle}>
          <span>{project.windowTitle}</span>
        </div>
        <div className={styles.windowStatus}>
          <span>{project.windowStatus}</span>
        </div>
      </div>

      {/* Window Body with Authentic Project Demo Screenshot */}
      <div className={styles.windowBody}>
        {/* Subtle Scanline Overlay */}
        <div className={styles.scanlineOverlay} aria-hidden="true" />

        {project.image ? (
          <div className={styles.previewImageContainer}>
            <img
              src={project.image}
              alt={`${project.title} demo preview screenshot`}
              className={styles.previewImage}
              loading="lazy"
            />
            <div className={styles.previewImageGradient} aria-hidden="true" />
            
            {/* Corner Bracket Accents over screenshot */}
            <div className={styles.imageCornerTL} aria-hidden="true" />
            <div className={styles.imageCornerTR} aria-hidden="true" />
            <div className={styles.imageCornerBL} aria-hidden="true" />
            <div className={styles.imageCornerBR} aria-hidden="true" />
          </div>
        ) : (
          <>
            {/* Project-specific visual interface fallback */}
            {project.id === 'PRJ-01' && (
              <div className={styles.neuralVisionInterface}>
                <div className={styles.interfaceGrid} />
                <div className={styles.detectionFrame}>
                  <div className={styles.detectionCornerTL} />
                  <div className={styles.detectionCornerTR} />
                  <div className={styles.detectionCornerBL} />
                  <div className={styles.detectionCornerBR} />
                  <div className={styles.detectionTag}>
                    <span>CLASS: HAZARD_OBSTACLE</span>
                    <span className={styles.detectionConf}>CONF: 0.98</span>
                  </div>
                  <div className={styles.crosshairCenter}>+</div>
                  <div className={styles.detectionCoords}>
                    <span>SPATIAL: CENTER &bull; DIST: 1.2m (NEAR)</span>
                  </div>
                </div>
                <div className={styles.waveformContainer}>
                  <div className={styles.waveformBar} style={{ height: '45%' }} />
                  <div className={styles.waveformBar} style={{ height: '75%' }} />
                  <div className={styles.waveformBar} style={{ height: '60%' }} />
                  <div className={styles.waveformBar} style={{ height: '90%' }} />
                  <div className={styles.waveformBar} style={{ height: '50%' }} />
                  <div className={styles.waveformBar} style={{ height: '80%' }} />
                  <div className={styles.waveformBar} style={{ height: '65%' }} />
                  <div className={styles.waveformBar} style={{ height: '40%' }} />
                </div>
              </div>
            )}

            {project.id === 'PRJ-02' && (
              <div className={styles.mernInterface}>
                <div className={styles.interfaceGrid} />
                <div className={styles.mernTerminalBlock}>
                  <div className={styles.terminalLine}>
                    <span className={styles.termPrompt}>&gt;</span>
                    <span className={styles.termCmd}>krishimitra --diagnose-crop</span>
                  </div>
                  <div className={styles.terminalOutput}>
                    <span className={styles.termSuccess}>[DETECTED]</span> Leaf Blight (Confidence: 96.4%)
                  </div>
                  <div className={styles.terminalOutput}>
                    <span className={styles.termSuccess}>[MANDI TICKER]</span> Wheat ₹2,420/Q &bull; Paddy ₹2,183/Q
                  </div>
                  <div className={styles.terminalOutput}>
                    <span className={styles.termMuted}>[SENSORS]</span> Soil Moisture: 68% &bull; Temp: 28.5&deg;C
                  </div>
                </div>
                <div className={styles.clusterNodes}>
                  <span className={styles.clusterNode}>CROP_AI: ACTIVE</span>
                  <span className={styles.clusterNode}>VOICE_i18n: SYNCED</span>
                </div>
              </div>
            )}

            {project.id === 'PRJ-03' && (
              <div className={styles.celestialInterface}>
                <div className={styles.interfaceGrid} />
                <div className={styles.mernTerminalBlock}>
                  <div className={styles.terminalLine}>
                    <span className={styles.termPrompt}>&gt;</span>
                    <span className={styles.termCmd}>learnai --rag-query "explain backpropagation"</span>
                  </div>
                  <div className={styles.terminalOutput}>
                    <span className={styles.termSuccess}>[FAISS RETRIEVAL]</span> 4 Chunks Indexed (Cosine: 0.94)
                  </div>
                  <div className={styles.terminalOutput}>
                    <span className={styles.termSuccess}>[CITATION ANCHOR]</span> Neural_Networks.pdf &bull; Page 42 Verified
                  </div>
                  <div className={styles.terminalOutput}>
                    <span className={styles.termMuted}>[STUDY COPILOT]</span> Gemini 3.5 Flash &bull; Latency: 140ms
                  </div>
                </div>
                <div className={styles.celestialTelemetry}>
                  <div className={styles.telemetryStat}>
                    <span>VECTOR STORE</span>
                    <span>FAISS INDEX</span>
                  </div>
                  <div className={styles.telemetryStat}>
                    <span>DATABASE</span>
                    <span>POSTGRESQL 16</span>
                  </div>
                  <div className={styles.telemetryStat}>
                    <span>RAG PIPELINE</span>
                    <span>ACTIVE // GROUNDED</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Live Demo Preview Label Badge */}
        <div className={styles.previewPlaceholderBadge}>
          <span className={styles.previewBadgeDot} />
          <span>LIVE PREVIEW // VERIFIED</span>
        </div>

        {/* Hover "EXPAND DOSSIER" Overlay Indicator */}
        <div className={styles.openProjectIndicator}>
          <span className={styles.openIcon}>&nearr;</span>
          <span>EXPAND DOSSIER</span>
        </div>
      </div>
    </div>
  );
}
