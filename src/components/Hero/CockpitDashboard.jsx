import React, { useEffect, useRef } from 'react';
import styles from './CockpitDashboard.module.css';

/**
 * CockpitDashboard
 * Balanced Minecraft-style voxel flight dashboard occupying approximately 25% of hero height,
 * perfectly balancing the 75% huge cockpit windshield and space vista above!
 */
const CockpitDashboard = () => {
  const radarSweepRef = useRef();

  // Radar sweep animation
  useEffect(() => {
    let angle = 0;
    let animId;
    const animate = () => {
      angle = (angle + 2) % 360;
      if (radarSweepRef.current) {
        radarSweepRef.current.style.transform = `rotate(${angle}deg)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const diagnosticRows = [
    { label: 'THRUST', pips: 7, total: 8 },
    { label: 'SHIELD', pips: 8, total: 8 },
    { label: 'O2 LEV', pips: 7, total: 8 },
    { label: 'WARP', pips: 6, total: 8 },
  ];

  const graphColumns = [3, 5, 7, 9, 6, 8, 10, 7, 9, 10];

  return (
    <div className={styles.dashboardContainer} aria-hidden="true">
      {/* ================================================================ */}
      {/* TOP CONSOLE BLOCK RIDGE & STEPPED CRENELLATIONS                  */}
      {/* ================================================================ */}
      <div className={styles.consoleRidge}>
        <div className={styles.ridgeBlockTeeth}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={`tooth-${i}`} className={styles.toothBlock} />
          ))}
        </div>
        <div className={styles.ridgeGlowStrip} />
      </div>

      {/* ================================================================ */}
      {/* BALANCED VOXEL CONSOLE BODY (Occupying the 25% Dashboard tier)   */}
      {/* ================================================================ */}
      <div className={styles.consoleBody}>
        {/* === LEFT: VOXEL SHIP SCHEMATIC & DIAGNOSTIC METERS === */}
        <div className={styles.screenMfdLeft}>
          <div className={styles.shipSchematic}>
            <svg viewBox="0 0 100 120" className={styles.voxelShipSvg}>
              <rect x="36" y="20" width="28" height="50" fill="#2b1e16" stroke="#ea580c" strokeWidth="2" />
              <rect x="40" y="24" width="20" height="16" fill="#fde68a" opacity="0.85" />
              <rect x="36" y="44" width="28" height="6" fill="#ea580c" />
              <rect x="18" y="48" width="18" height="26" fill="#1e1828" stroke="#3b82f6" strokeWidth="1.5" />
              <rect x="64" y="48" width="18" height="26" fill="#1e1828" stroke="#3b82f6" strokeWidth="1.5" />
              <rect x="34" y="70" width="8" height="8" fill="#ea580c" stroke="#f97316" strokeWidth="1" />
              <rect x="46" y="70" width="8" height="8" fill="#ea580c" stroke="#f97316" strokeWidth="1" />
              <rect x="58" y="70" width="8" height="8" fill="#ea580c" stroke="#f97316" strokeWidth="1" />
              <rect x="36" y="78" width="4" height="14" fill="#ffb84d" />
              <rect x="48" y="78" width="4" height="18" fill="#ffedd5" />
              <rect x="60" y="78" width="4" height="14" fill="#ffb84d" />
            </svg>
          </div>

          <div className={styles.diagBars}>
            {diagnosticRows.map((row) => (
              <div key={row.label} className={styles.diagRow}>
                <span className={styles.diagLabel}>{row.label}</span>
                <div className={styles.diagTrack}>
                  {Array.from({ length: row.total }).map((_, pipIdx) => (
                    <div
                      key={pipIdx}
                      className={`${styles.diagPip} ${pipIdx < row.pips ? styles.diagPipActive : ''}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === CENTER: ELEVATED SQUARE RADAR TERMINAL === */}
        <div className={styles.centerRadarScreen}>
          <div className={styles.radarDisplay}>
            <div className={`${styles.voxelRadarRing} ${styles.ring1}`} />
            <div className={`${styles.voxelRadarRing} ${styles.ring2}`} />
            <div className={`${styles.voxelRadarRing} ${styles.ring3}`} />
            <div className={styles.radarCrossH} />
            <div className={styles.radarCrossV} />
            <div ref={radarSweepRef} className={styles.radarSweep} />
            <div className={styles.voxelShipVector} />
            <span className={styles.radarHeaderTag}>NAV // SYS</span>
            <span className={styles.radarSpeedTag}>WARP 0.85c</span>
          </div>
        </div>

        {/* === RIGHT: TELEMETRY & 3D ROTATING VOXEL CUBE === */}
        <div className={styles.screenMfdRight}>
          <div className={styles.barGraphContainer}>
            {graphColumns.map((blocks, colIdx) => (
              <div key={colIdx} className={styles.voxelColBlock}>
                {Array.from({ length: blocks }).map((_, pIdx) => (
                  <div key={pIdx} className={styles.voxelSubPip} />
                ))}
              </div>
            ))}
          </div>

          <div className={styles.cubeContainer}>
            <div className={styles.rotatingVoxelCube}>
              <div className={`${styles.cubeFace} ${styles.faceFront}`} />
              <div className={`${styles.cubeFace} ${styles.faceBack}`} />
              <div className={`${styles.cubeFace} ${styles.faceRight}`} />
              <div className={`${styles.cubeFace} ${styles.faceLeft}`} />
              <div className={`${styles.cubeFace} ${styles.faceTop}`} />
              <div className={`${styles.cubeFace} ${styles.faceBottom}`} />
            </div>
            <span className={styles.cubeLabel}>CORE: 0x4F</span>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* INTEGRATED BOTTOM CONTROL SWITCHES                               */}
      {/* ================================================================ */}
      <div className={styles.consoleSwitchBar}>
        <div className={styles.voxelVentGrille}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`vent-l-${i}`} className={styles.ventSlat} />
          ))}
        </div>

        <div className={styles.voxelControlButton}>
          <div className={styles.voxelLedIndicator} />
          <span>SYS</span>
        </div>

        <div className={styles.voxelControlButton}>
          <div className={styles.voxelLedIndicator} style={{ background: '#22c55e', borderColor: '#86efac' }} />
          <span>WARP</span>
        </div>

        <div className={styles.voxelControlButton}>
          <div className={styles.voxelLedIndicator} />
          <span>RADAR</span>
        </div>

        <div className={styles.voxelControlButton}>
          <div className={styles.voxelLedIndicator} style={{ background: '#38bdf8', borderColor: '#bae6fd' }} />
          <span>SHIELD</span>
        </div>

        <div className={styles.voxelVentGrille}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`vent-r-${i}`} className={styles.ventSlat} />
          ))}
        </div>
      </div>

      <div className={styles.thrusterGlow} />
    </div>
  );
};

export default CockpitDashboard;
