import React, { useEffect, useState } from 'react';
import styles from './CockpitCanopy.module.css';

/**
 * CockpitCanopy
 * Minecraft-inspired voxel windshield frame designed for a HUGE ~80%+ windshield view!
 * Slim overhead beam with compact magma lanterns and slim A-pillars hugging the outer borders.
 */
const CockpitCanopy = () => {
  const [vibration, setVibration] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animId;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) * 0.001;
      // High-frequency engine rumble
      const vx = Math.sin(elapsed * 18.0) * 0.75 + Math.sin(elapsed * 9.2) * 0.4;
      const vy = Math.cos(elapsed * 22.0) * 0.6 + Math.sin(elapsed * 6.5) * 0.35;
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
      {/* SLIM OVERHEAD VOXEL CANOPY BEAM & MAGMA LANTERNS (~28px high)     */}
      {/* ================================================================ */}
      <div className={styles.topCanopyBar}>
        <div className={styles.topBlockStructure}>
          <div className={styles.topWingBlockLeft} />

          <div className={styles.topCenterConsole}>
            <div className={styles.magmaLantern}>
              <div className={styles.lanternCore} />
            </div>
            <div className={styles.magmaLantern}>
              <div className={styles.lanternCore} />
            </div>
            <div className={styles.magmaLantern}>
              <div className={styles.lanternCore} />
            </div>
            <div className={styles.magmaLantern}>
              <div className={styles.lanternCore} />
            </div>
          </div>

          <div className={styles.topWingBlockRight} />
        </div>
      </div>

      {/* ================================================================ */}
      {/* SLIM LEFT VOXEL A-PILLAR (Hugging Left Viewport Edge)            */}
      {/* ================================================================ */}
      <div className={styles.leftVoxelPillar}>
        {[1, 2, 3].map((id) => (
          <div key={`left-voxel-${id}`} className={styles.pillarVoxelBlock}>
            <div className={styles.voxelLightCore} />
          </div>
        ))}
      </div>

      {/* ================================================================ */}
      {/* SLIM RIGHT VOXEL A-PILLAR (Hugging Right Viewport Edge)          */}
      {/* ================================================================ */}
      <div className={styles.rightVoxelPillar}>
        {[1, 2, 3].map((id) => (
          <div key={`right-voxel-${id}`} className={styles.pillarVoxelBlock}>
            <div className={styles.voxelLightCore} />
          </div>
        ))}
      </div>

      {/* ================================================================ */}
      {/* COMPACT STEPPED CORNER BLOCKS (TOP-LEFT)                         */}
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
      {/* COMPACT STEPPED CORNER BLOCKS (TOP-RIGHT)                        */}
      {/* ================================================================ */}
      <div className={styles.steppedCornerTR}>
        <div
          className={styles.cornerStepBlockTR}
          style={{ top: 0, right: 0, width: 56, height: 18 }}
        />
        <div
          className={styles.cornerStepBlockTR}
          style={{ top: 18, right: 0, width: 34, height: 18 }}
        />
        <div
          className={styles.cornerStepBlockTR}
          style={{ top: 36, right: 0, width: 18, height: 20 }}
        />
      </div>

      {/* ================================================================ */}
      {/* COMPACT CORNER FOUNDATION BLOCKS (BOTTOM-LEFT)                   */}
      {/* ================================================================ */}
      <div className={styles.steppedCornerBL}>
        <div
          className={styles.cornerStepBlockBL}
          style={{ bottom: 0, left: 0, width: 44, height: 22 }}
        />
      </div>

      {/* ================================================================ */}
      {/* COMPACT CORNER FOUNDATION BLOCKS (BOTTOM-RIGHT)                  */}
      {/* ================================================================ */}
      <div className={styles.steppedCornerBR}>
        <div
          className={styles.cornerStepBlockBR}
          style={{ bottom: 0, right: 0, width: 44, height: 22 }}
        />
      </div>
    </div>
  );
};

export default CockpitCanopy;
