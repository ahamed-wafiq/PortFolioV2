import React from 'react';
import styles from './TargetingHUD.module.css';

/**
 * TargetingHUD
 * Minecraft-inspired voxel targeting reticle with blocky brackets and stepped reticle square.
 */
const TargetingHUD = () => {
  return (
    <div className={styles.hudContainer} aria-hidden="true">
      <div className={styles.targetingReticle}>
        {/* Horizontal & Vertical Pixel Crosshairs */}
        <div className={styles.crosshairH} />
        <div className={styles.crosshairV} />

        {/* Stepped Pixel Corner Brackets */}
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />

        {/* Rotating Voxel Target Square */}
        <div className={styles.targetSquare} />

        {/* Center Voxel Target Dot */}
        <div className={styles.centerDot} />

        {/* Voxel Telemetry Readout */}
        <span className={styles.targetTelemetry}>TARGET: LOCKED // 24.8 AU</span>
      </div>
    </div>
  );
};

export default TargetingHUD;
