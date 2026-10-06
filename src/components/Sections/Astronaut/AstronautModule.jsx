import React, { useState } from 'react';
import styles from './AstronautModule.module.css';
import AstronautCanvas from './AstronautCanvas';

export default function AstronautModule() {
  const [thrusterBurst, setThrusterBurst] = useState(0);
  const [visorMode, setVisorMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFiring, setIsFiring] = useState(false);

  const handleThrusterFire = () => {
    setIsFiring(true);
    setThrusterBurst((prev) => prev + 1);
    setTimeout(() => {
      setIsFiring(false);
    }, 600);
  };

  const toggleVisor = () => {
    setVisorMode((prev) => !prev);
  };

  const toggleAutoRotate = () => {
    setAutoRotate((prev) => !prev);
  };

  return (
    <div className={styles.astronautCard}>
      {/* HUD Corner Brackets */}
      <div className={styles.cardCornerTL} />
      <div className={styles.cardCornerTR} />
      <div className={styles.cardCornerBL} />
      <div className={styles.cardCornerBR} />

      {/* Card Header Telemetry Tag */}
      <div className={styles.cardTelemetry}>
        <span>MATRIX_BUS // 05: EVA-SPECIALIST</span>
        <div className={styles.telemetryStatus}>
          <span className={styles.statusDot} />
          <span>ORBITAL ZERO-G</span>
        </div>
      </div>

      <div className={styles.innerGrid}>
        {/* Left Column: Interactive 3D Astronaut Viewport */}
        <div className={styles.canvasWrapper}>
          <div className={styles.radarOverlay} />
          <AstronautCanvas
            thrusterBurst={thrusterBurst}
            visorMode={visorMode}
            autoRotate={autoRotate}
          />
          <div className={styles.viewportBadge}>
            [DRAG TO ROTATE 360° // ZERO-G EVA]
          </div>
        </div>

        {/* Right Column: Suit Telemetry & Cockpit Controls */}
        <div className={styles.detailsCol}>
          <div>
            <h3 className={styles.moduleTitle}>
              <span className={styles.titleIcon}>&gt;</span> EXTRAVEHICULAR MOBILITY // EVA-01
            </h3>
            <p className={styles.moduleDesc}>
              Photorealistic orbital astronaut unit equipped with reflective gold Apollo visor, life-support telemetry, and MMU maneuvering thrusters.
            </p>
          </div>

          {/* Live Suit Telemetry Gauges */}
          <div className={styles.telemetryBars}>
            <div className={styles.gaugeRow}>
              <div className={styles.gaugeLabels}>
                <span className={styles.gaugeName}>O2 LIFE SUPPORT</span>
                <span className={styles.gaugeValue}>98.4% [NOMINAL]</span>
              </div>
              <div className={styles.gaugeTrack}>
                <div className={styles.gaugeFill} style={{ width: '98.4%' }} />
              </div>
            </div>

            <div className={styles.gaugeRow}>
              <div className={styles.gaugeLabels}>
                <span className={styles.gaugeName}>RCS NITROGEN PROPELLANT</span>
                <span className={styles.gaugeValue}>91.2% [PRESSURIZED]</span>
              </div>
              <div className={styles.gaugeTrack}>
                <div
                  className={styles.gaugeFill}
                  style={{
                    width: isFiring ? '88.5%' : '91.2%',
                    background: isFiring
                      ? 'linear-gradient(90deg, #ff4400, #ff8800)'
                      : 'linear-gradient(90deg, #f97316, #ffb84d)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className={styles.statusChips}>
            <span className={styles.chip}>CORE TEMP: 21.4°C</span>
            <span className={styles.chip}>PULSE: 72 BPM</span>
            <span className={`${styles.chip} ${styles.chipActive}`}>
              {visorMode ? 'VISOR: HUD SCAN' : 'VISOR: GOLD PBR'}
            </span>
          </div>

          {/* Cockpit Actions */}
          <div className={styles.controlsRow}>
            <button
              type="button"
              className={`${styles.cockpitBtn} ${isFiring ? styles.thrusterBtnActive : ''}`}
              onClick={handleThrusterFire}
              title="Trigger RCS thruster burst"
            >
              <span>▲</span> {isFiring ? 'FIRING RCS...' : 'THRUSTER BURST'}
            </button>

            <button
              type="button"
              className={styles.cockpitBtn}
              onClick={toggleVisor}
              title="Toggle helmet visor mode"
            >
              <span>◉</span> {visorMode ? 'MIRROR VISOR' : 'VISOR HUD'}
            </button>

            <button
              type="button"
              className={styles.cockpitBtn}
              onClick={toggleAutoRotate}
              title="Toggle 3D auto rotation"
            >
              <span>↻</span> {autoRotate ? 'PAUSE ORBIT' : 'AUTO ORBIT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
