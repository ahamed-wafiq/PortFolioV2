import React from 'react';
import styles from './TargetingHUD.module.css';

const TargetingHUD = () => {
  return (
    <div className={styles.hudContainer} aria-hidden="true">
      <div className={styles.targetingReticle}>
        {/* Horizontal & Vertical Crosshairs */}
        <div className={styles.crosshairH} />
        <div className={styles.crosshairV} />

        {/* Outer Corner Brackets */}
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />

        {/* Dashed Rotating Radar Target Ring */}
        <div className={styles.targetRing} />

        {/* Center Target Dot */}
        <div className={styles.centerDot} />

        {/* Rangefinder Readout */}
        <span className={styles.targetTelemetry}>TARGET: STABLE // 24.8 AU</span>
      </div>
    </div>
  );
};

export default TargetingHUD;
