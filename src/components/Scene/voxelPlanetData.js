// Voxel Planet Generator - generates 3D blocky Minecraft-style survival planets
// Each planet produces terrain blocks and emissive glowing blocks (lava, windows, crystals)

function hash(x, y, z) {
  let h = x * 374761393 + y * 668265263 + z * 9301;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967296;
}

export function generateVoxelPlanetData(type, radius = 2.0) {
  const terrainBlocks = [];
  const glowBlocks = [];

  // Discrete grid radius in blocks
  let gridR = 8.5;
  if (type === 'gasGiant') gridR = 9.5;
  if (type === 'moon') gridR = 7.5;
  if (type === 'oceanic') gridR = 8.5;
  if (type === 'desert') gridR = 8.0;
  if (type === 'lava') gridR = 8.5;
  if (type === 'emerald') gridR = 8.0;

  const blockSize = (radius / gridR) * 0.98;
  const maxCoord = Math.ceil(gridR + 3);

  // Surface shell grid helper
  const isSolid = (x, y, z) => {
    const d = Math.sqrt(x * x + y * y + z * z);
    if (d > gridR + 2.5) return false;

    let elev = 0;
    if (type === 'oceanic') {
      elev = Math.sin(x * 0.45) * Math.cos(z * 0.45) * 0.75 + Math.sin(y * 0.35) * 0.4;
    } else if (type === 'lava') {
      elev = (Math.sin(x * 0.5) * Math.cos(z * 0.5) + Math.cos(y * 0.6) * 0.6) * 0.9;
    } else if (type === 'desert') {
      elev = Math.floor((Math.sin(x * 0.4) + Math.cos(z * 0.4)) * 1.5) * 0.5;
    } else if (type === 'emerald') {
      elev = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.7 + Math.sin(y * 0.4) * 0.5;
    } else if (type === 'moon') {
      elev = (Math.sin(x * 0.6) * Math.sin(z * 0.6) - Math.cos(y * 0.5) * 0.4) * 0.6;
    } else {
      // gasGiant - smoother stratified sphere
      elev = Math.sin(y * 0.8) * 0.2;
    }

    return d <= gridR + elev;
  };

  // 1. Generate surface shell blocks (only outer exposed blocks to keep count light and fast)
  for (let x = -maxCoord; x <= maxCoord; x++) {
    for (let y = -maxCoord; y <= maxCoord; y++) {
      for (let z = -maxCoord; z <= maxCoord; z++) {
        if (!isSolid(x, y, z)) continue;

        // Check if exposed to air on any 6 faces
        const exposed = (
          !isSolid(x + 1, y, z) ||
          !isSolid(x - 1, y, z) ||
          !isSolid(x, y + 1, z) ||
          !isSolid(x, y - 1, z) ||
          !isSolid(x, y, z + 1) ||
          !isSolid(x, y, z - 1)
        );

        if (!exposed) continue;

        const d = Math.sqrt(x * x + y * y + z * z);
        const ny = y / (d || 1);
        const nx = x / (d || 1);
        const nz = z / (d || 1);
        const rnd = hash(x, y, z);

        // Determine block color and type based on planet biome
        if (type === 'oceanic') {
          // Central Overworld Planet
          // River path winding through
          const riverPath = Math.sin(x * 0.38 + z * 0.28) * 3.2 + Math.cos(x * 0.2 - z * 0.3) * 1.8;
          const distToRiver = Math.abs(y - riverPath);

          if (distToRiver < 1.15) {
            // Water block
            const waterColors = ['#1e88e5', '#29b6f6', '#1976d2', '#0288d1'];
            terrainBlocks.push({
              x, y, z,
              color: waterColors[Math.floor(rnd * waterColors.length)],
            });
          } else if (distToRiver < 1.55) {
            // River shoreline / foam / sand
            terrainBlocks.push({
              x, y, z,
              color: rnd > 0.5 ? '#e1f5fe' : '#e0c068',
            });
          } else if (y > gridR * 0.65 || (y > gridR * 0.4 && d > gridR + 0.4)) {
            // Mountain peak / polar snow
            terrainBlocks.push({
              x, y, z,
              color: rnd > 0.3 ? '#ffffff' : '#eceff1',
            });
          } else {
            // Land: Green grass on upward-facing blocks, rich brown dirt on sides/cliffs
            if (ny > -0.2) {
              const grassColors = ['#4caf50', '#43a047', '#558b2f', '#689f38', '#7cb342'];
              terrainBlocks.push({
                x, y, z,
                color: grassColors[Math.floor(rnd * grassColors.length)],
              });
            } else {
              const dirtColors = ['#795548', '#6d4c41', '#5d4037', '#8d6e63'];
              terrainBlocks.push({
                x, y, z,
                color: dirtColors[Math.floor(rnd * dirtColors.length)],
              });
            }
          }
        } else if (type === 'lava') {
          // Volcanic Nether Fortress Planet
          const lavaWave = Math.sin(x * 0.45 + y * 0.3) * Math.cos(z * 0.45 + y * 0.2);
          if (Math.abs(lavaWave) < 0.22) {
            // Molten magma / lava fissure
            const lavaColors = ['#ff3d00', '#ff6d00', '#ff9100', '#ffab00'];
            glowBlocks.push({
              x, y, z,
              color: lavaColors[Math.floor(rnd * lavaColors.length)],
              emissive: '#ff3d00',
            });
          } else {
            // Volcanic crimson netherrack & obsidian
            const netherColors = ['#7f1d1d', '#991b1b', '#5c0f0f', '#3e1010', '#1c1917', '#292524'];
            terrainBlocks.push({
              x, y, z,
              color: netherColors[Math.floor(rnd * netherColors.length)],
            });
          }
        } else if (type === 'desert') {
          // Sandstone / Desert World
          // Stratified horizontal layers
          const layer = Math.sin(y * 1.1) * 0.5 + 0.5;
          let sandColor = '#eab308';
          if (layer > 0.7) sandColor = '#facc15';
          else if (layer > 0.4) sandColor = '#e2b36a';
          else if (layer > 0.2) sandColor = '#ca8a04';
          else sandColor = '#b48430';

          if (rnd > 0.75) sandColor = '#fde047';
          terrainBlocks.push({ x, y, z, color: sandColor });
        } else if (type === 'emerald') {
          // Tropical Jungle Planet
          if (ny < -0.3) {
            // Tropical turquoise ocean
            const oceanCols = ['#00acc1', '#0097a7', '#00838f', '#26c6da'];
            terrainBlocks.push({ x, y, z, color: oceanCols[Math.floor(rnd * oceanCols.length)] });
          } else if (ny < 0.0) {
            // Golden beach sand
            terrainBlocks.push({ x, y, z, color: rnd > 0.5 ? '#fde047' : '#eab308' });
          } else {
            // Lush jungle grass
            const jungleCols = ['#22c55e', '#16a34a', '#15803d', '#4ade80'];
            terrainBlocks.push({ x, y, z, color: jungleCols[Math.floor(rnd * jungleCols.length)] });
          }
        } else if (type === 'moon') {
          // End / Moon Asteroid Planet
          const crater = Math.sin(x * 0.8) * Math.sin(z * 0.8) * Math.cos(y * 0.8);
          if (crater < -0.35) {
            // Dark crater pit
            terrainBlocks.push({ x, y, z, color: '#9e9e70' });
          } else {
            // Pale endstone
            const endCols = ['#dfdf9c', '#d5d590', '#eeeeb0', '#c8c882'];
            terrainBlocks.push({ x, y, z, color: endCols[Math.floor(rnd * endCols.length)] });
          }
        } else {
          // gasGiant - Banded Amber Gas Giant
          const band = Math.sin(y * 0.9) * 0.5 + 0.5;
          let gasCol = '#f97316';
          if (band > 0.8) gasCol = '#ffedd5';
          else if (band > 0.6) gasCol = '#fbbf24';
          else if (band > 0.4) gasCol = '#ea580c';
          else if (band > 0.2) gasCol = '#c2410c';
          else gasCol = '#7c2d12';

          if (rnd > 0.8) gasCol = '#ff8a1f';
          terrainBlocks.push({ x, y, z, color: gasCol });
        }
      }
    }
  }

  // =========================================================================
  // 2. BIOME-SPECIFIC 3D VOXEL PROPS & BUILDINGS
  // =========================================================================

  // Helper to add pine tree
  const addPineTree = (tx, ty, tz, height = 3) => {
    // Brown wood trunk
    for (let h = 0; h < height; h++) {
      terrainBlocks.push({ x: tx, y: ty + h, z: tz, color: '#4e342e' });
    }
    // Spruce green foliage tiers
    const top = ty + height;
    // Bottom leaf ring (cross/rounded)
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dz === 0) continue;
        terrainBlocks.push({ x: tx + dx, y: top - 1, z: tz + dz, color: '#2e7d32' });
      }
    }
    // Mid leaf ring
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (Math.abs(dx) + Math.abs(dz) <= 1) {
          terrainBlocks.push({ x: tx + dx, y: top, z: tz + dz, color: '#1b5e20' });
        }
      }
    }
    // Peak top leaf
    terrainBlocks.push({ x: tx, y: top + 1, z: tz, color: '#388e3c' });
  };

  // Helper to add cactus
  const addCactus = (cx, cy, cz, height = 3) => {
    for (let h = 0; h < height; h++) {
      terrainBlocks.push({ x: cx, y: cy + h, z: cz, color: '#15803d' });
    }
    // Left arm
    terrainBlocks.push({ x: cx - 1, y: cy + 1, z: cz, color: '#16a34a' });
    terrainBlocks.push({ x: cx - 1, y: cy + 2, z: cz, color: '#16a34a' });
    // Right arm
    terrainBlocks.push({ x: cx + 1, y: cy + 2, z: cz, color: '#16a34a' });
    terrainBlocks.push({ x: cx + 1, y: cy + 3, z: cz, color: '#16a34a' });
  };

  if (type === 'oceanic') {
    // 1. Survival Wooden Cabin on top plateau
    const hx = 0;
    const hy = Math.round(gridR) + 1;
    const hz = 1;

    // Wood cabin base walls (3x2x3)
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {
        for (let y = 0; y <= 1; y++) {
          if (x === 0 && z === 1 && y === 0) {
            // Doorway
            continue;
          }
          if (x === 0 && z === 1 && y === 1) {
            // Lit front window (warm amber glow!)
            glowBlocks.push({
              x: hx + x, y: hy + y, z: hz + z,
              color: '#ffe082',
              emissive: '#ff9800',
            });
            continue;
          }
          terrainBlocks.push({
            x: hx + x, y: hy + y, z: hz + z,
            color: '#8d6e63',
          });
        }
      }
    }
    // Peaked dark wood roof
    for (let z = -1; z <= 1; z++) {
      terrainBlocks.push({ x: hx - 1, y: hy + 2, z: hz + z, color: '#4e342e' });
      terrainBlocks.push({ x: hx, y: hy + 3, z: hz + z, color: '#3e2723' });
      terrainBlocks.push({ x: hx + 1, y: hy + 2, z: hz + z, color: '#4e342e' });
    }
    // Chimney
    terrainBlocks.push({ x: hx + 1, y: hy + 3, z: hz - 1, color: '#757575' });
    terrainBlocks.push({ x: hx + 1, y: hy + 4, z: hz - 1, color: '#616161' });

    // 2. Voxel Pine Trees around the cabin & on grassy hills
    addPineTree(hx - 3, hy - 1, hz, 4);
    addPineTree(hx + 3, hy - 1, hz + 1, 4);
    addPineTree(hx - 1, hy, hz - 4, 3);
    addPineTree(hx + 2, hy, hz - 3, 3);
    addPineTree(-4, hy - 3, 4, 3);
    addPineTree(4, hy - 3, -4, 3);

    // 3. Floating Mini-Island satellite with tiny pine tree!
    const ix = Math.round(gridR) + 3;
    const iy = 2;
    const iz = 2;
    // Island dirt/grass
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        terrainBlocks.push({ x: ix + dx, y: iy, z: iz + dz, color: '#4caf50' });
        terrainBlocks.push({ x: ix + dx, y: iy - 1, z: iz + dz, color: '#6d4c41' });
      }
    }
    terrainBlocks.push({ x: ix, y: iy - 2, z: iz, color: '#5d4037' });
    addPineTree(ix, iy + 1, iz, 2);

  } else if (type === 'lava') {
    // 1. Gothic Nether Castle Fortress on the peak
    const fx = 0;
    const fy = Math.round(gridR) + 1;
    const fz = 0;

    // Castle Keep Main Hall
    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        for (let y = 0; y <= 2; y++) {
          if (Math.abs(x) < 2 && Math.abs(z) < 2 && y > 0) continue; // hollow inside
          terrainBlocks.push({
            x: fx + x, y: fy + y, z: fz + z,
            color: '#18181b',
          });
        }
      }
    }

    // Left Castle Tower (taller with battlements)
    for (let y = 0; y <= 5; y++) {
      for (let dx = 0; dx <= 1; dx++) {
        for (let dz = 0; dz <= 1; dz++) {
          terrainBlocks.push({
            x: fx - 3 + dx, y: fy + y, z: fz - 1 + dz,
            color: '#27272a',
          });
        }
      }
    }
    // Left Tower Spire / Crenellations
    terrainBlocks.push({ x: fx - 3, y: fy + 6, z: fz - 1, color: '#3f3f46' });
    terrainBlocks.push({ x: fx - 2, y: fy + 6, z: fz, color: '#3f3f46' });

    // Right Castle Tower
    for (let y = 0; y <= 4; y++) {
      for (let dx = 0; dx <= 1; dx++) {
        for (let dz = 0; dz <= 1; dz++) {
          terrainBlocks.push({
            x: fx + 2 + dx, y: fy + y, z: fz - 1 + dz,
            color: '#27272a',
          });
        }
      }
    }
    // Right Tower Crenellations
    terrainBlocks.push({ x: fx + 2, y: fy + 5, z: fz - 1, color: '#3f3f46' });
    terrainBlocks.push({ x: fx + 3, y: fy + 5, z: fz, color: '#3f3f46' });

    // Cyan Soul Torches & Warped Turquoise Trees (glowing turquoise!)
    glowBlocks.push({ x: fx - 1, y: fy + 3, z: fz + 2, color: '#00e5ff', emissive: '#00e5ff' });
    glowBlocks.push({ x: fx + 1, y: fy + 3, z: fz + 2, color: '#00e5ff', emissive: '#00e5ff' });
    glowBlocks.push({ x: fx - 3, y: fy + 7, z: fz - 1, color: '#00e5ff', emissive: '#00e5ff' });

    // Warped turquoise soul trees flanking the fortress
    for (let h = 0; h < 3; h++) {
      terrainBlocks.push({ x: fx + 4, y: fy + h, z: fz + 2, color: '#134e4a' });
    }
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        glowBlocks.push({
          x: fx + 4 + dx, y: fy + 3, z: fz + 2 + dz,
          color: '#14b8a6', emissive: '#0d9488',
        });
      }
    }

  } else if (type === 'desert') {
    // 1. Stepped Sandstone Pyramid / Temple Spire on top
    const px = 0;
    const py = Math.round(gridR) + 1;
    const pz = 0;

    // Layer 1 (5x5)
    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        terrainBlocks.push({ x: px + x, y: py, z: pz + z, color: '#ca8a04' });
      }
    }
    // Layer 2 (3x3)
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) {
        terrainBlocks.push({ x: px + x, y: py + 1, z: pz + z, color: '#eab308' });
      }
    }
    // Layer 3 (Peak Spire)
    terrainBlocks.push({ x: px, y: py + 2, z: pz, color: '#facc15' });
    terrainBlocks.push({ x: px, y: py + 3, z: pz, color: '#fef08a' });

    // 2. Green Voxel Cacti
    addCactus(-3, py - 1, 3, 3);
    addCactus(4, py - 2, 2, 3);
    addCactus(-2, py - 2, -4, 2);
    addCactus(3, py - 3, -3, 3);

  } else if (type === 'emerald') {
    // Giant Tropical Voxel Palm Trees
    const px = 1;
    const py = Math.round(gridR);
    const pz = 1;

    // Curved Palm Tree 1
    const trunk1 = [
      { x: px, y: py + 1, z: pz },
      { x: px + 1, y: py + 2, z: pz },
      { x: px + 1, y: py + 3, z: pz },
      { x: px + 2, y: py + 4, z: pz + 1 },
      { x: px + 2, y: py + 5, z: pz + 1 },
    ];
    trunk1.forEach((b) => terrainBlocks.push({ ...b, color: '#78350f' }));

    // Palm Tree 1 Sprawling Leaf Fronds
    const top1 = { x: px + 2, y: py + 5, z: pz + 1 };
    const fronds = [
      // North
      { x: top1.x, y: top1.y + 1, z: top1.z + 1 },
      { x: top1.x, y: top1.y + 1, z: top1.z + 2 },
      { x: top1.x, y: top1.y, z: top1.z + 3 },
      // South
      { x: top1.x, y: top1.y + 1, z: top1.z - 1 },
      { x: top1.x, y: top1.y + 1, z: top1.z - 2 },
      { x: top1.x, y: top1.y, z: top1.z - 3 },
      // East
      { x: top1.x + 1, y: top1.y + 1, z: top1.z },
      { x: top1.x + 2, y: top1.y + 1, z: top1.z },
      { x: top1.x + 3, y: top1.y, z: top1.z },
      // West
      { x: top1.x - 1, y: top1.y + 1, z: top1.z },
      { x: top1.x - 2, y: top1.y + 1, z: top1.z },
      { x: top1.x - 3, y: top1.y, z: top1.z },
    ];
    fronds.forEach((f) => terrainBlocks.push({ ...f, color: '#22c55e' }));

    // Second Palm Tree (curving the other way)
    const trunk2 = [
      { x: px - 3, y: py, z: pz - 1 },
      { x: px - 4, y: py + 1, z: pz - 1 },
      { x: px - 4, y: py + 2, z: pz - 2 },
      { x: px - 5, y: py + 3, z: pz - 2 },
      { x: px - 5, y: py + 4, z: pz - 2 },
    ];
    trunk2.forEach((b) => terrainBlocks.push({ ...b, color: '#78350f' }));
    const top2 = { x: px - 5, y: py + 4, z: pz - 2 };
    [
      { x: top2.x + 1, y: top2.y, z: top2.z },
      { x: top2.x - 1, y: top2.y, z: top2.z },
      { x: top2.x - 2, y: top2.y - 1, z: top2.z },
      { x: top2.x, y: top2.y, z: top2.z + 1 },
      { x: top2.x, y: top2.y, z: top2.z - 1 },
      { x: top2.x, y: top2.y - 1, z: top2.z - 2 },
    ].forEach((f) => terrainBlocks.push({ ...f, color: '#16a34a' }));

    // Fluffy Voxel Cloud floating nearby
    const cloudY = py + 3;
    for (let cx = -2; cx <= 1; cx++) {
      for (let cz = 3; cz <= 5; cz++) {
        terrainBlocks.push({ x: cx, y: cloudY, z: cz, color: '#ffffff' });
      }
    }

  } else if (type === 'moon') {
    // Tall Dark Obsidian Pillars with Glowing Magenta Ender Crystals
    const pillars = [
      { x: -2, z: 2, height: 4 },
      { x: 3, z: 1, height: 5 },
      { x: 0, z: -3, height: 4 },
    ];

    pillars.forEach((p) => {
      const py = Math.round(gridR);
      for (let h = 0; h < p.height; h++) {
        terrainBlocks.push({ x: p.x, y: py + h, z: p.z, color: '#181420' });
      }
      // Glowing Ender Crystal on top
      glowBlocks.push({
        x: p.x, y: py + p.height, z: p.z,
        color: '#e879f9',
        emissive: '#d946ef',
      });
    });

  } else if (type === 'gasGiant') {
    // Banded Amber Voxel Giant - add equator bulge and voxel asteroid belt chunks
  }

  return {
    terrainBlocks,
    glowBlocks,
    blockSize,
    gridR,
    scale: radius / gridR,
  };
}

// Generate voxel ring asteroids
export function generateVoxelRingData(innerRadius, outerRadius, count = 110) {
  const ringAsteroids = [];
  const colors = ['#f97316', '#fbbf24', '#ea580c', '#ffedd5', '#fed7aa', '#c2410c'];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (hash(i, 1, 2) - 0.5) * 0.15;
    const rDist = innerRadius + hash(i, 2, 3) * (outerRadius - innerRadius);
    const x = Math.cos(angle) * rDist;
    const y = (hash(i, 3, 4) - 0.5) * 0.45; // slight ring thickness
    const z = Math.sin(angle) * rDist;
    const size = 0.18 + hash(i, 4, 5) * 0.28;
    const color = colors[Math.floor(hash(i, 5, 6) * colors.length)];

    ringAsteroids.push({ x, y, z, size, color });
  }

  return ringAsteroids;
}
