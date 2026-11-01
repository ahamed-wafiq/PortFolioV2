import React, { useState } from 'react';
import styles from './CyberDogModule.module.css';
import CyberDogCanvas from './CyberDogCanvas';
import { OPTIC_COLORS } from './opticColors';
import {
  playRoboBark,
  playServoClick,
  playThrusterBurst,
  playOpticPing,
} from './cyberAudio';

const COLOR_KEYS = Object.keys(OPTIC_COLORS);

export default function CyberDogModule() {
  const [isSitting, setIsSitting] = useState(false);
  const [boosterActive, setBoosterActive] = useState(false);
  const [opticIndex, setOpticIndex] = useState(0);
  const [isPetting, setIsPetting] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [affinity, setAffinity] = useState(100);

  const activeColorKey = COLOR_KEYS[opticIndex];
  const activeColorConfig = OPTIC_COLORS[activeColorKey];

  // Petting interaction
  const handlePet = () => {
    setIsPetting(true);
    playRoboBark();
    setAffinity((prev) => Math.min(prev + 1, 150));
    setTimeout(() => {
      setIsPetting(false);
    }, 2200);
  };

  // Sit / Stand toggle
  const handleToggleSit = () => {
    playServoClick();
    setIsSitting((prev) => !prev);
    // Sitting disables booster flight
    if (!isSitting) {
      setBoosterActive(false);
    }
  };

  // Thruster toggle
  const handleToggleBooster = () => {
    playThrusterBurst();
    setBoosterActive((prev) => {
      const next = !prev;
      if (next) {
        setIsSitting(false);
      }
      return next;
    });
  };

  // Optic color cycling
  const handleCycleColor = () => {
    playOpticPing();
    setOpticIndex((prev) => (prev + 1) % COLOR_KEYS.length);
  };

  const handleToggleRotate = () => {
    setAutoRotate((prev) => !prev);
  };

  return (
    <div className={styles.dogCard}>
      {/* Corner HUD Brackets */}
      <div className={styles.cardCornerTL} />
      <div className={styles.cardCornerTR} />
      <div className={styles.cardCornerBL} />
      <div className={styles.cardCornerBR} />

      {/* Top Telemetry Header */}
      <div className={styles.cardTelemetry}>
        <span>MATRIX_BUS // 06: K9-TITAN CYBERNETIC SCOUT</span>
        <div className={styles.telemetryStatus}>
          <span className={styles.statusDot} />
          <span>{boosterActive ? 'ZERO-G FLIGHT' : isSitting ? 'SIT // GUARD MODE' : 'STAND // PATROL'}</span>
        </div>
      </div>

      <div className={styles.innerGrid}>
        {/* Left Column: 3D Interactive Canvas */}
        <div className={styles.canvasWrapper}>
          <CyberDogCanvas
            isSitting={isSitting}
            boosterActive={boosterActive}
            opticColor={activeColorKey}
            isPetting={isPetting}
            autoRotate={autoRotate}
          />
          <div className={styles.viewportBadge}>
            [DRAG TO ROTATE 360° // SCROLL TO ZOOM]
          </div>

          {isPetting && (
            <div className={styles.pettingOverlay}>
              ♥ GOOD BOY! [ROBO-BARK DETECTED]
            </div>
          )}
        </div>

        {/* Right Column: Mecha Specifications & Controls */}
        <div className={styles.detailsCol}>
          <div>
            <h3 className={styles.moduleTitle}>
              <span className={styles.titleIcon}>&gt;</span> K9-TITAN // VOXEL CYBER CANINE
            </h3>
            <p className={styles.moduleDesc}>
              Minecraft-inspired autonomous cyber wolf engineered with titanium block armor, articulated wagging tail, glowing sensor optics, and twin rocket backpack thrusters.
            </p>
          </div>

          {/* Telemetry Status Gauges */}
          <div className={styles.telemetryBars}>
            <div className={styles.gaugeRow}>
              <div className={styles.gaugeLabels}>
                <span className={styles.gaugeName}>NUCLEAR CELL BATTERY</span>
                <span className={styles.gaugeValue}>99.4% [OPTIMAL]</span>
              </div>
              <div className={styles.gaugeTrack}>
                <div
                  className={styles.gaugeFill}
                  style={{
                    width: '99.4%',
                    background: 'linear-gradient(90deg, #00e5ff, #00ff88)',
                  }}
                />
              </div>
            </div>

            <div className={styles.gaugeRow}>
              <div className={styles.gaugeLabels}>
                <span className={styles.gaugeName}>PILOT AFFINITY MATRIX</span>
                <span className={styles.gaugeValue}>
                  {affinity}% [{affinity >= 110 ? 'OVERJOYED' : 'BONDED'}]
                </span>
              </div>
              <div className={styles.gaugeTrack}>
                <div
                  className={styles.gaugeFill}
                  style={{
                    width: `${Math.min(affinity, 100)}%`,
                    background: isPetting
                      ? 'linear-gradient(90deg, #ff3366, #ff77aa)'
                      : 'linear-gradient(90deg, #ffaa00, #ff7700)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Status Metadata Grid */}
          <div className={styles.statusTagsGrid}>
            <div className={styles.statusTagItem}>
              <span className={styles.statusTagLabel}>VOXEL ARCHITECTURE</span>
              <span className={styles.statusTagVal}>72 PBR CHUNKS</span>
            </div>
            <div className={styles.statusTagItem}>
              <span className={styles.statusTagLabel}>OPTIC FREQUENCY</span>
              <span className={styles.statusTagVal} style={{ color: activeColorConfig.hex }}>
                {activeColorConfig.label}
              </span>
            </div>
            <div className={styles.statusTagItem}>
              <span className={styles.statusTagLabel}>TAIL OSCILLATION</span>
              <span className={styles.statusTagVal}>
                {isPetting ? '24.0 Hz [HYPER]' : isSitting ? '7.0 Hz [CHILL]' : '11.0 Hz [NOMINAL]'}
              </span>
            </div>
            <div className={styles.statusTagItem}>
              <span className={styles.statusTagLabel}>THRUST PROPULSION</span>
              <span className={styles.statusTagVal}>
                {boosterActive ? 'IGNITED [ACTIVE]' : 'STANDBY'}
              </span>
            </div>
          </div>

          {/* Interactive Controls Toolbar */}
          <div className={styles.controlsToolbar}>
            <button
              type="button"
              className={`${styles.actionBtn} ${styles.petBtn}`}
              onClick={handlePet}
              title="Pet the robot dog to hear a cyber woof and make its tail wag fast"
            >
              ♥ PET K9
            </button>

            <button
              type="button"
              className={`${styles.actionBtn} ${isSitting ? styles.actionBtnActive : ''}`}
              onClick={handleToggleSit}
            >
              {isSitting ? 'STAND GUARD' : 'SIT / REST'}
            </button>

            <button
              type="button"
              className={`${styles.actionBtn} ${boosterActive ? styles.actionBtnActive : ''}`}
              onClick={handleToggleBooster}
            >
              {boosterActive ? 'CUT THRUSTERS' : 'ROCKET HOVER'}
            </button>

            <button
              type="button"
              className={styles.actionBtn}
              onClick={handleCycleColor}
            >
              OPTIC: {activeColorKey.toUpperCase()}
            </button>

            <button
              type="button"
              className={`${styles.actionBtn} ${autoRotate ? styles.actionBtnActive : ''}`}
              onClick={handleToggleRotate}
            >
              {autoRotate ? 'STOP SPIN' : '360° SPIN'}
            </button>

            <a
              href="/models/minecraft_robot_dog.glb"
              download="minecraft_robot_dog.glb"
              className={`${styles.actionBtn} ${styles.downloadBtn}`}
              title="Download 3D GLB file"
            >
              ⬇ DOWNLOAD .GLB
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
