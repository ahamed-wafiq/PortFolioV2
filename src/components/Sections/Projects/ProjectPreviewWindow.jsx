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

      {/* Window Body with Authentic Project Interface Visualization */}
      <div className={styles.windowBody}>
        {/* Subtle Scanline Overlay */}
        <div className={styles.scanlineOverlay} aria-hidden="true" />

        {/* Project-specific visual interface */}
        {project.id === 'PRJ-01' && (
          <div className={styles.neuralVisionInterface}>
            {/* Background Grid & Coordinates */}
            <div className={styles.interfaceGrid} />
            
            {/* Central Detection Frame */}
            <div className={styles.detectionFrame}>
              <div className={styles.detectionCornerTL} />
              <div className={styles.detectionCornerTR} />
              <div className={styles.detectionCornerBL} />
              <div className={styles.detectionCornerBR} />
              
              <div className={styles.detectionTag}>
                <span>CLASS: TENSOR_STREAM</span>
                <span className={styles.detectionConf}>CONF: 0.98</span>
              </div>
              <div className={styles.crosshairCenter}>+</div>
              <div className={styles.detectionCoords}>
                <span>X: 1024 &bull; Y: 768 &bull; CH: 4</span>
              </div>
            </div>

            {/* Neural Matrix Waveform Bars */}
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
                <span className={styles.termPrompt}>$</span>
                <span className={styles.termCmd}>mern-service --status</span>
              </div>
              <div className={styles.terminalOutput}>
                <span className={styles.termSuccess}>[200 OK]</span> REST API: /api/v1/telemetry
              </div>
              <div className={styles.terminalOutput}>
                <span className={styles.termSuccess}>[CONNECTED]</span> WebSocket: wss://stream.cluster
              </div>
              <div className={styles.terminalOutput}>
                <span className={styles.termMuted}>[DATABASE]</span> MongoDB ReplicaSet: HEALTHY
              </div>
            </div>
            <div className={styles.clusterNodes}>
              <span className={styles.clusterNode}>NODE_01: ONLINE</span>
              <span className={styles.clusterNode}>NODE_02: SYNCED</span>
            </div>
          </div>
        )}

        {project.id === 'PRJ-03' && (
          <div className={styles.celestialInterface}>
            <div className={styles.interfaceGrid} />
            {/* Celestial Orbital Wireframe Geometry */}
            <div className={styles.celestialOrbitFrame}>
              <div className={styles.celestialOrbitRing1} />
              <div className={styles.celestialOrbitRing2} />
              <div className={styles.celestialCoreDot} />
            </div>
            <div className={styles.celestialTelemetry}>
              <div className={styles.telemetryStat}>
                <span>RENDERER</span>
                <span>WEBGL 2.0</span>
              </div>
              <div className={styles.telemetryStat}>
                <span>SHADERS</span>
                <span>GLSL PASS</span>
              </div>
              <div className={styles.telemetryStat}>
                <span>CAMERA</span>
                <span>VECTOR PARALLAX</span>
              </div>
            </div>
          </div>
        )}

        {/* Clear Project Preview Label Badge */}
        <div className={styles.previewPlaceholderBadge}>
          <span className={styles.previewBadgeDot} />
          <span>PROJECT PREVIEW</span>
        </div>

        {/* Hover "OPEN PROJECT" Overlay Indicator */}
        <div className={styles.openProjectIndicator}>
          <span className={styles.openIcon}>&nearr;</span>
          <span>OPEN PROJECT ARCHIVE</span>
        </div>
      </div>
    </div>
  );
}
