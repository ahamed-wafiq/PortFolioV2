import React, { useEffect, useRef, useState } from 'react';
import styles from './CockpitDashboard.module.css';
import voxelSpacecraftImg from '../../assets/voxel_spacecraft.png';
import {
  MinecraftHeart,
  MinecraftArmor,
  MinecraftFurnaceFlame,
  MinecraftItem,
} from './MinecraftCockpitIcons';

/**
 * CockpitDashboard
 * Authentic Minecraft Flight Deck Dashboard occupying 25% of viewport height.
 * Features:
 * 1. Hull Vitality (10 Minecraft Hearts) & Shield Deflectors (10 Minecraft Iron Armor Chestplates) + EXP Level 99
 * 2. Center Console: Locator Radar & The Iconic Minecraft 9-Slot Hotbar with active weapon/tool selection
 * 3. Right Console: Blast Furnace Thruster Gauge (burning flame), Stone Buttons & Redstone Wiring Deck
 */
const CockpitDashboard = ({ isVisible = true }) => {
  const radarSweepRef = useRef();
  const [activeSlot, setActiveSlot] = useState(2); // Default to Compass/Warp slot

  // Radar sweep animation
  useEffect(() => {
    if (!isVisible) return undefined;
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
  }, [isVisible]);

  // The 9 classic Minecraft hotbar item slots
  const hotbarItems = [
    { id: 1, type: 'sword', label: 'Diamond Blade' },
    { id: 2, type: 'compass', label: 'Nav Compass' },
    { id: 3, type: 'pearl', label: 'Ender Warp' },
    { id: 4, type: 'torch', label: 'Redstone Power' },
    { id: 5, type: 'apple', label: 'Core Reactor' },
    { id: 6, type: 'clock', label: 'Solar Chrono' },
    { id: 7, type: 'rocket', label: 'Thruster Boost' },
    { id: 8, type: 'totem', label: 'Totem Shield' },
    { id: 9, type: 'sword', label: 'Aux System' },
  ];

  return (
    <div className={styles.dashboardContainer} aria-hidden="true">
      {/* ================================================================ */}
      {/* 1. TOP CONSOLE DEEPSLATE CRENELLATIONS & REDSTONE STRIP          */}
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
      {/* 2. MAIN DEEPSLATE FLIGHT DECK BODY                               */}
      {/* ================================================================ */}
      <div className={styles.consoleBody}>
        {/* === LEFT: MINECRAFT HEALTH (HEARTS) & SHIELD (ARMOR) VITALITY === */}
        <div className={styles.screenMfdLeft}>
          <div className={styles.shipSchematic}>
            <img
              src={voxelSpacecraftImg}
              alt="Spacecraft Schematic"
              className={styles.schematicSpacecraftImg}
            />
          </div>

          <div className={styles.vitalityBars}>
            {/* Hull Integrity (10 Minecraft Hearts) */}
            <div className={styles.barHeaderRow}>
              <span>HULL INTEGRITY</span>
              <span className={styles.barHeaderVal}>20 / 20 HP</span>
            </div>
            <div className={styles.iconRow}>
              {Array.from({ length: 10 }).map((_, i) => (
                <MinecraftHeart key={`heart-${i}`} filled={true} />
              ))}
            </div>

            {/* Shield Deflectors (10 Minecraft Armor Chestplates) */}
            <div className={styles.barHeaderRow} style={{ marginTop: 2 }}>
              <span>SHIELD DEFLECTOR</span>
              <span className={styles.barHeaderVal}>100% DEF</span>
            </div>
            <div className={styles.iconRow}>
              {Array.from({ length: 10 }).map((_, i) => (
                <MinecraftArmor key={`armor-${i}`} filled={true} />
              ))}
            </div>

            {/* Minecraft EXP Level Bar */}
            <div className={styles.xpBarContainer}>
              <div className={styles.xpTrack}>
                <div className={styles.xpFill} style={{ width: '92%' }} />
              </div>
              <span className={styles.xpLevelNumber}>99</span>
            </div>
          </div>
        </div>

        {/* === CENTER: LOCATOR RADAR & THE ICONIC MINECRAFT 9-SLOT HOTBAR === */}
        <div className={styles.centerConsole}>
          {/* Radar Screen */}
          <div className={styles.centerRadarScreen}>
            <div className={styles.radarDisplay}>
              <div className={`${styles.voxelRadarRing} ${styles.ring1}`} />
              <div className={`${styles.voxelRadarRing} ${styles.ring2}`} />
              <div className={`${styles.voxelRadarRing} ${styles.ring3}`} />
              <div className={styles.radarCrossH} />
              <div className={styles.radarCrossV} />
              <div ref={radarSweepRef} className={styles.radarSweep} />

              <span className={styles.radarHeaderTag}>LOCATOR // MAP</span>
              <span className={styles.radarSpeedTag}>WARP 0.85c</span>
            </div>
          </div>

          {/* Minecraft 9-Slot Hotbar */}
          <div className={styles.minecraftHotbar}>
            {hotbarItems.map((slot, index) => (
              <div
                key={slot.id}
                className={`${styles.hotbarSlot} ${activeSlot === index ? styles.hotbarSlotActive : ''}`}
                onClick={() => setActiveSlot(index)}
                title={slot.label}
              >
                <span className={styles.slotKeyNum}>{index + 1}</span>
                <MinecraftItem type={slot.type} />
              </div>
            ))}
          </div>
        </div>

        {/* === RIGHT: BLAST FURNACE THRUSTER & REDSTONE DECK === */}
        <div className={styles.screenMfdRight}>
          {/* Minecraft Furnace Thruster Gauge */}
          <div className={styles.furnaceGauge}>
            <span className={styles.furnaceLabel}>THRUST FUEL</span>
            <div className={styles.furnaceFlameAnim}>
              <MinecraftFurnaceFlame />
            </div>
            <span className={styles.furnaceArrow}>➔ 100%</span>
          </div>

          {/* Redstone Buttons & Wiring Deck */}
          <div className={styles.redstoneDeck}>
            <div className={styles.redstoneLeverRow}>
              <div className={styles.stoneButton} title="Stone Button 1">
                <div className={styles.buttonDot} />
              </div>
              <div className={styles.redstoneWire} />
              <div className={styles.stoneButton} title="Stone Button 2">
                <div className={styles.buttonDot} />
              </div>
            </div>
            <div className={styles.barHeaderRow}>
              <span style={{ color: '#ea580c' }}>REDSTONE PWR</span>
              <span style={{ color: '#ef4444' }}>SIGNAL 15</span>
            </div>
          </div>

          {/* 3D Rotating Voxel Core Cube */}
          <div className={styles.cubeContainer}>
            <div className={styles.rotatingVoxelCube}>
              <div className={`${styles.cubeFace} ${styles.faceFront}`} />
              <div className={`${styles.cubeFace} ${styles.faceBack}`} />
              <div className={`${styles.cubeFace} ${styles.faceRight}`} />
              <div className={`${styles.cubeFace} ${styles.faceLeft}`} />
              <div className={`${styles.cubeFace} ${styles.faceTop}`} />
              <div className={`${styles.cubeFace} ${styles.faceBottom}`} />
            </div>
            <span className={styles.cubeLabel}>CORE: NETHER</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CockpitDashboard;
