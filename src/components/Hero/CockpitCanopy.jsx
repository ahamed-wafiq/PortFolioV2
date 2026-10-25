import React, { useEffect, useState } from 'react';
import styles from './CockpitCanopy.module.css';

/**
 * CockpitCanopy
 * Minecraft-inspired voxel windshield frame featuring authentic glass reflections,
 * F3 Debug Telemetry, Deepslate pillars, and glowing Redstone Lamps!
 */
const CockpitCanopy = () => {
  const [vibration, setVibration] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animId;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) * 0.001;
      // High-frequency spacecraft engine rumble
      const vx = Math.sin(elapsed * 18.0) * 0.65 + Math.sin(elapsed * 9.2) * 0.35;
      const vy = Math.cos(elapsed * 22.0) * 0.5 + Math.sin(elapsed * 6.5) * 0.3;
      setVibration({ x: vx, y: vy });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className={styles.canopyWrapper}
      style={{
        transform: `translate3d(${vibration.x}px, ${vibration.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* ================================================================ */}
      {/* 1. MINECRAFT GLASS VIEWPORT REFLECTION STREAKS                  */}
      {/* ================================================================ */}
      <div className={styles.glassReflections}>
        <div className={styles.glassStreakTL}>
          <svg viewBox="0 0 48 36" className={styles.pixelStreakSvg}>
            {/* Stepped diagonal pixel streaks matching Minecraft glass block texture */}
            <path
              d="M6,2 h4 v4 h-4 z M10,6 h4 v4 h-4 z M14,10 h4 v4 h-4 z M18,14 h4 v4 h-4 z M22,18 h4 v4 h-4 z"
              fill="rgba(255, 255, 255, 0.45)"
            />
            <path
              d="M16,2 h4 v4 h-4 z M20,6 h4 v4 h-4 z M24,10 h4 v4 h-4 z M28,14 h4 v4 h-4 z M32,18 h4 v4 h-4 z"
              fill="rgba(255, 255, 255, 0.25)"
            />
          </svg>
        </div>

        <div className={styles.glassStreakTR}>
          <svg viewBox="0 0 40 30" className={styles.pixelStreakSvg}>
            <path
              d="M12,2 h4 v4 h-4 z M16,6 h4 v4 h-4 z M20,10 h4 v4 h-4 z M24,14 h4 v4 h-4 z"
              fill="rgba(255, 255, 255, 0.35)"
            />
          </svg>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 3. SLIM TOP VOXEL CANOPY BEAM & MINECRAFT REDSTONE LAMPS         */}
      {/* ================================================================ */}
      <div className={styles.topCanopyBar}>
        <div className={styles.topBlockStructure}>
          <div className={styles.topWingBlockLeft} />

          <div className={styles.topCenterConsole}>
            {[1, 2, 3, 4].map((id) => (
              <div key={`redstone-lamp-${id}`} className={styles.redstoneLamp} title="Redstone Lamp">
                <div className={styles.lampLattice} />
                <div className={styles.lampCore} />
              </div>
            ))}
          </div>

          <div className={styles.topWingBlockRight} />
        </div>
      </div>

      {/* ================================================================ */}
      {/* 4. LEFT DEEPSLATE A-PILLAR WITH REDSTONE TORCHES                 */}
      {/* ================================================================ */}
      <div className={styles.leftVoxelPillar}>
        {[1, 2, 3].map((id) => (
          <div key={`left-deepslate-${id}`} className={styles.pillarVoxelBlock}>
            <div className={styles.torchBracket}>
              <div className={styles.torchHeadRedstone} />
              <div className={styles.torchWoodStick} />
            </div>
          </div>
        ))}
      </div>

      {/* ================================================================ */}
      {/* 5. RIGHT DEEPSLATE A-PILLAR WITH REDSTONE TORCHES                */}
      {/* ================================================================ */}
      <div className={styles.rightVoxelPillar}>
        {[1, 2, 3].map((id) => (
          <div key={`right-deepslate-${id}`} className={styles.pillarVoxelBlock}>
            <div className={styles.torchBracket}>
              <div className={styles.torchHeadRedstone} />
              <div className={styles.torchWoodStick} />
            </div>
          </div>
        ))}
      </div>

      {/* ================================================================ */}
      {/* 6. COMPACT STEPPED CORNER BLOCKS (TOP-LEFT)                      */}
      {/* ================================================================ */}
      <div className={styles.steppedCornerTL}>
        <div
          className={styles.cornerStepBlock}
          style={{ top: 0, left: 0, width: 56, height: 18 }}
        />
        <div
          className={styles.cornerStepBlock}
          style={{ top: 18, left: 0, width: 34, height: 18 }}
        />
        <div
          className={styles.cornerStepBlock}
          style={{ top: 36, left: 0, width: 18, height: 20 }}
        />
      </div>

      {/* ================================================================ */}
      {/* 7. COMPACT STEPPED CORNER BLOCKS (TOP-RIGHT)                     */}
      {/* ================================================================ */}
      <div className={styles.steppedCornerTR}>
        <div
          className={styles.cornerStepBlock}
          style={{ top: 0, right: 0, width: 56, height: 18 }}
        />
        <div
          className={styles.cornerStepBlock}
          style={{ top: 18, right: 0, width: 34, height: 18 }}
        />
        <div
          className={styles.cornerStepBlock}
          style={{ top: 36, right: 0, width: 18, height: 20 }}
        />
      </div>
    </div>
  );
};

export default CockpitCanopy;
