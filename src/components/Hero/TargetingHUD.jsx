import React from 'react';
import styles from './TargetingHUD.module.css';

/**
 * TargetingHUD
 * Minecraft-inspired voxel targeting reticle featuring the iconic inverted crosshair (+),
 * XYZ axis markers (Red X, Green Y, Blue Z), and block telemetry.
 */
const TargetingHUD = () => {
  return (
    <div className={styles.hudContainer} aria-hidden="true">
      <div className={styles.targetingReticle}>
        {/* Minecraft Inverted Crosshair (+) */}
        <div className={styles.minecraftCrosshair}>
          <div className={styles.crossArmH} />
          <div className={styles.crossArmV} />
          <div className={styles.crossHole} />
        </div>

        {/* 3D Coordinate Axis Indicators (Minecraft F3 Red X, Green Y, Blue Z) */}
        <div className={styles.axisX} title="X Axis (East)" />
        <div className={styles.axisY} title="Y Axis (Up)" />
        <div className={styles.axisZ} title="Z Axis (South)" />

        {/* Stepped Pixel Corner Brackets */}
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />

        {/* Rotating Voxel Target Box */}
        <div className={styles.targetSquare} />

        {/* Minecraft Target Telemetry Readout */}
        <span className={styles.targetTelemetry}>PLANET TARGET: LOCKED // 48 BLOCKS</span>
      </div>
    </div>
  );
};

export default TargetingHUD;
