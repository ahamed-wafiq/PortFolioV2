import React, { useState } from 'react';
import styles from './TechCore.module.css';
import TechCoreCanvas from './TechCoreCanvas';

const TECH_NODES = [
  {
    id: 'python',
    label: 'PYTHON',
    pos: { left: '16%', top: '15%' },
    tooltipAlign: 'bottom-left',
    category: 'LANG // ARCHITECTURE',
    details: 'PyTorch • NumPy • FastAPI • Scikit-Learn',
  },
  {
    id: 'aiml',
    label: 'AI / ML',
    pos: { left: '84%', top: '15%' },
    tooltipAlign: 'bottom-right',
    category: 'CORE // INTELLIGENCE',
    details: 'LLMs • LangChain • Neural Networks • Vision',
  },
  {
    id: 'react',
    label: 'REACT',
    pos: { left: '12%', top: '50%' },
    tooltipAlign: 'top-left',
    category: 'UI/UX // ENGINE',
    details: 'Next.js • Hooks • State Sync • Tailwind',
  },
  {
    id: 'nodejs',
    label: 'NODE.JS',
    pos: { left: '88%', top: '50%' },
    tooltipAlign: 'top-right',
    category: 'SERVER // RUNTIME',
    details: 'Express • REST APIs • WebSockets • Microservices',
  },
  {
    id: 'mongodb',
    label: 'MONGODB',
    pos: { left: '18%', top: '85%' },
    tooltipAlign: 'top-left',
    category: 'DATA // PERSISTENCE',
    details: 'NoSQL • Aggregations • Mongoose • Cloud Atlas',
  },
  {
    id: 'threejs',
    label: 'THREE.JS',
    pos: { left: '82%', top: '85%' },
    tooltipAlign: 'top-right',
    category: 'RENDER // 3D WEB',
    details: 'WebGL • R3F • GLSL Shaders • Dynamic Physics',
  },
];

export default function TechnologyCore() {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className={styles.techCoreCard}>
      {/* Corner Bracket Accents */}
      <div className={styles.cardCornerTL} />
      <div className={styles.cardCornerTR} />
      <div className={styles.cardCornerBL} />
      <div className={styles.cardCornerBR} />

      {/* Header Telemetry */}
      <div className={styles.cardTelemetry}>
        <div className={styles.telemetryTitle}>
          <span>SYSTEM // TECHNOLOGY CORE</span>
        </div>
        <div className={styles.telemetryStatus}>
          <span className={styles.statusDot} />
          <span>● CORE ONLINE</span>
        </div>
      </div>

      {/* Central Viewport with 3D Core and Orbital Nodes */}
      <div className={styles.viewportContainer}>
        {/* Subtle Ambient Radial Glow */}
        <div className={styles.coreRadialGlow} />

        {/* 3D WebGL Canvas */}
        <div className={styles.canvasWrapper}>
          <TechCoreCanvas activeTech={hoveredTech} />
        </div>

        {/* SVG Orbital Circuit Network Tracks */}
        <svg className={styles.orbitalSvgOverlay} viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Subtle Orbital Ellipse Guides */}
          <ellipse
            cx="50"
            cy="50"
            rx="36"
            ry="36"
            fill="none"
            stroke="rgba(249, 115, 22, 0.2)"
            strokeWidth="0.4"
            strokeDasharray="1.5 2"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="43"
            ry="43"
            fill="none"
            stroke="rgba(249, 115, 22, 0.1)"
            strokeWidth="0.3"
          />

          {/* Circuit Radiating Connections to Nodes (starts outside central 3D core) */}
          {TECH_NODES.map((node) => {
            const isHovered = hoveredTech === node.id;
            const x = parseFloat(node.pos.left);
            const y = parseFloat(node.pos.top);
            const angle = Math.atan2(y - 50, x - 50);
            const coreRadius = 26; // Keeps central 3D core clear of 2D line clutter
            const startX = 50 + Math.cos(angle) * coreRadius;
            const startY = 50 + Math.sin(angle) * coreRadius;

            return (
              <g key={node.id}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={x}
                  y2={y}
                  stroke={isHovered ? '#ff9e3b' : 'rgba(249, 115, 22, 0.28)'}
                  strokeWidth={isHovered ? '0.75' : '0.35'}
                  strokeDasharray={isHovered ? 'none' : '1.5 2'}
                />
                {/* Node Target Reticle on hover */}
                {isHovered && (
                  <circle
                    cx={startX}
                    cy={startY}
                    r="1.2"
                    fill="#ffb84d"
                    opacity="0.9"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Orbital Technology Nodes Overlay */}
        <div className={styles.techNodesNetwork}>
          {TECH_NODES.map((node) => {
            const isHovered = hoveredTech === node.id;
            const isRightSide = node.tooltipAlign.includes('right');
            const isTop = node.tooltipAlign.includes('top');

            return (
              <div
                key={node.id}
                className={styles.techNodeAnchor}
                style={{ left: node.pos.left, top: node.pos.top }}
                onMouseEnter={() => setHoveredTech(node.id)}
                onMouseLeave={() => setHoveredTech(null)}
                onFocus={() => setHoveredTech(node.id)}
                onBlur={() => setHoveredTech(null)}
              >
                <button
                  type="button"
                  tabIndex={0}
                  className={`${styles.nodeBadge} ${isHovered ? styles.nodeBadgeActive : ''}`}
                  aria-label={`${node.label} Technology Node`}
                >
                  <span className={styles.nodeMarker} />
                  <span>{node.label}</span>
                </button>

                {/* Technical Tooltip on Hover / Focus */}
                <div
                  className={`${styles.techTooltip} ${isHovered ? styles.techTooltipVisible : ''}`}
                  style={{
                    left: isRightSide ? 'auto' : '0',
                    right: isRightSide ? '0' : 'auto',
                    top: isTop ? 'auto' : 'calc(100% + 6px)',
                    bottom: isTop ? 'calc(100% + 6px)' : 'auto',
                  }}
                  role="tooltip"
                >
                  <div className={styles.tooltipCategory}>
                    <span>[SYS_LINK]</span>
                    <span>{node.category}</span>
                  </div>
                  <div className={styles.tooltipDetails}>
                    {node.details}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom of Panel */}
      <div className={styles.panelFooter}>
        <div className={styles.footerDisciplines}>
          <span>AI / ML</span>
          <span className={styles.footerBullet}>&bull;</span>
          <span>FULL STACK</span>
          <span className={styles.footerBullet}>&bull;</span>
          <span>3D WEB</span>
        </div>
      </div>
    </div>
  );
}
