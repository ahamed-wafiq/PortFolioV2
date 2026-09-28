import React, { useEffect, useRef } from 'react';
import styles from './CockpitDashboard.module.css';

const CockpitDashboard = () => {
  const radarSweepRef = useRef();
  const voxelCubeRef = useRef();

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

  return (
    <div className={styles.dashboardContainer} aria-hidden="true">
      {/* Top Console Ridge Seam with Glowing Orange Strip */}
      <div className={styles.consoleRidge}>
        <div className={styles.ridgeGlowStrip} />
      </div>

      {/* Main Multi-Screen Cockpit Console */}
      <div className={styles.consoleBody}>
        {/* === LEFT MFD: SPACESHIP BLUEPRINT & HULL DIAGNOSTICS === */}
        <div className={styles.screenMfd}>
          <div className={styles.mfdHeader}>
            <span>VESSEL HULL STATUS</span>
            <span className={styles.mfdLiveBadge}>LIVE</span>
          </div>

          <div className={styles.mfdContentRow}>
            {/* Spaceship Silhouette SVG */}
            <div className={styles.shipSchematic}>
              <svg viewBox="0 0 100 120" className={styles.shipSvg}>
                {/* Hull outline */}
                <polygon
                  points="50,10 70,55 90,80 80,95 62,88 50,96 38,88 20,95 10,80 30,55"
                  fill="rgba(234, 88, 12, 0.25)"
                  stroke="#ea580c"
                  strokeWidth="2.5"
                />
                {/* Cockpit canopy */}
                <polygon points="50,25 60,50 40,50" fill="#ffb84d" opacity="0.8" />
                {/* Wing thruster trails */}
                <line x1="28" y1="95" x2="28" y2="115" stroke="#ff8a1f" strokeWidth="3" />
                <line x1="72" y1="95" x2="72" y2="115" stroke="#ff8a1f" strokeWidth="3" />
                <line x1="50" y1="96" x2="50" y2="118" stroke="#ffb84d" strokeWidth="3" />
              </svg>
            </div>

            {/* Diagnostic Bars */}
            <div className={styles.diagBars}>
              {[
                { label: 'THRUST', val: '94%' },
                { label: 'SHIELD', val: '98%' },
                { label: 'O2 LEV', val: '96%' },
                { label: 'REACTOR', val: '88%' },
                { label: 'WARP', val: '85%' },
              ].map((item, i) => (
                <div key={i} className={styles.diagRow}>
                  <div className={styles.diagLabel}>
                    <span>{item.label}</span>
                    <span>{item.val}</span>
                  </div>
                  <div className={styles.diagTrack}>
                    <div className={styles.diagFill} style={{ width: item.val }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === CENTER MFD: FLIGHT RADAR & COMPASS VECTOR === */}
        <div className={styles.centerRadarScreen}>
          <div className={styles.radarBezel}>
            <div className={styles.radarDisplay}>
              {/* Radar Concentric Rings */}
              <div className={`${styles.radarRing} ${styles.ring1}`} />
              <div className={`${styles.radarRing} ${styles.ring2}`} />
              <div className={`${styles.radarRing} ${styles.ring3}`} />

              {/* Crosshairs */}
              <div className={styles.radarCrossH} />
              <div className={styles.radarCrossV} />

              {/* Rotating Sweep Beam */}
              <div ref={radarSweepRef} className={styles.radarSweep} />

              {/* Ship Vector Icon (Center Arrow) */}
              <div className={styles.shipVectorIcon}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <polygon points="12,2 20,20 12,15 4,20" fill="#ffb84d" stroke="#ea580c" strokeWidth="1" />
                </svg>
              </div>

              {/* Radar Readouts */}
              <div className={styles.radarHeaderTag}>NAV // SYS_READY</div>
              <div className={styles.radarSpeedTag}>WARP 0.85c</div>
              <div className={styles.radarTargetTag}>TARGET: LOCKED</div>
            </div>
          </div>
        </div>

        {/* === RIGHT MFD: TELEMETRY & ROTATING VOXEL CUBE === */}
        <div className={styles.screenMfd}>
          <div className={styles.mfdHeader}>
            <span>MISSION TELEMETRY</span>
            <span className={styles.mfdLiveBadge}>OK</span>
          </div>

          <div className={styles.mfdContentRow}>
            {/* Telemetry Bar Chart */}
            <div className={styles.barGraphContainer}>
              {[35, 55, 78, 92, 70, 85, 96, 68, 88, 100].map((h, i) => (
                <div key={i} className={styles.telemetryBar} style={{ height: `${h}%` }} />
              ))}
            </div>

            {/* Rotating Voxel Cube Display */}
            <div className={styles.cubeContainer}>
              <div ref={voxelCubeRef} className={styles.rotatingVoxelCube}>
                <div className={`${styles.cubeFace} ${styles.faceFront}`} />
                <div className={`${styles.cubeFace} ${styles.faceBack}`} />
                <div className={`${styles.cubeFace} ${styles.faceRight}`} />
                <div className={`${styles.cubeFace} ${styles.faceLeft}`} />
                <div className={`${styles.cubeFace} ${styles.faceTop}`} />
                <div className={`${styles.cubeFace} ${styles.faceBottom}`} />
              </div>
              <span className={styles.cubeLabel}>CORE ID: 0x4F</span>
            </div>
          </div>
        </div>
      </div>

      {/* Console Amber Status Switches & Lamps along Bottom */}
      <div className={styles.consoleSwitchBar}>
        {[-0.6, -0.3, 0.0, 0.3, 0.6, 1.2, 1.5, 1.8].map((_, i) => (
          <div key={i} className={styles.switchLamp} />
        ))}
      </div>

      {/* Engine Thruster Ambient Underglow */}
      <div className={styles.thrusterGlow} />
    </div>
  );
};

export default CockpitDashboard;
