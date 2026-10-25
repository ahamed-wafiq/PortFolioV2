import React from 'react';

// Pixel-perfect SVG icons faithfully matching Minecraft's 16x16 / 9x9 pixel art aesthetic

export const MinecraftHeart = ({ filled = true, className = '' }) => (
  <svg
    viewBox="0 0 9 9"
    width="16"
    height="16"
    className={className}
    style={{ imageRendering: 'pixelated', display: 'inline-block' }}
  >
    {/* Dark outline */}
    <path
      d="M1,1 h2 v1 h1 v-1 h2 v1 h1 v2 h-1 v1 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 v-2 h1 z"
      fill="#290505"
    />
    {filled ? (
      <>
        {/* Red Heart Core */}
        <path
          d="M2,2 h1 v2 h-1 z M5,2 h1 v2 h-1 z M3,2 h2 v3 h-1 v1 h-1 v-1 h-1 v-2 z M2,3 h4 v1 h-4 z"
          fill="#e11d48"
        />
        <path d="M2,3 h1 v1 h-1 z M5,3 h1 v1 h-1 z M3,4 h2 v1 h-2 z" fill="#be123c" />
        {/* White Glint Highlight */}
        <rect x="2" y="2" width="1" height="1" fill="#ffffff" />
      </>
    ) : (
      <path d="M2,2 h5 v3 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 z" fill="#3f3f46" />
    )}
  </svg>
);

export const MinecraftArmor = ({ filled = true, className = '' }) => (
  <svg
    viewBox="0 0 9 9"
    width="16"
    height="16"
    className={className}
    style={{ imageRendering: 'pixelated', display: 'inline-block' }}
  >
    {/* Dark outline */}
    <path
      d="M1,1 h7 v2 h-1 v3 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h-1 v-3 h-1 z"
      fill="#18181b"
    />
    {filled ? (
      <>
        {/* Iron Chestplate Core */}
        <path d="M2,2 h5 v1 h-1 v3 h-1 v1 h-1 v-1 h-1 v-3 h-1 z" fill="#cbd5e1" />
        <path d="M3,3 h3 v2 h-1 v1 h-1 z" fill="#94a3b8" />
        {/* White Highlight */}
        <rect x="2" y="2" width="1" height="1" fill="#ffffff" />
      </>
    ) : (
      <path d="M2,2 h5 v4 h-1 v1 h-1 v-1 h-1 z" fill="#3f3f46" />
    )}
  </svg>
);

export const MinecraftFurnaceFlame = ({ className = '' }) => (
  <svg
    viewBox="0 0 14 14"
    width="20"
    height="20"
    className={className}
    style={{ imageRendering: 'pixelated', display: 'inline-block' }}
  >
    {/* Flame dark rim */}
    <path d="M6,1 h2 v2 h2 v3 h1 v4 h-1 v2 h-2 v1 h-4 v-1 h-2 v-2 h-1 v-4 h1 v-3 h2 v-2 z" fill="#7c2d12" />
    {/* Orange flame outer */}
    <path d="M6,2 h2 v3 h2 v3 h-1 v2 h-1 v1 h-4 v-1 h-1 v-2 h-1 v-3 h2 v-3 z" fill="#ea580c" />
    {/* Yellow flame inner */}
    <path d="M6,4 h2 v2 h1 v3 h-1 v1 h-2 v-1 h-1 v-3 h1 z" fill="#facc15" />
    {/* White hot core */}
    <rect x="6" y="6" width="2" height="2" fill="#fef08a" />
  </svg>
);

export const MinecraftItem = ({ type = 'sword' }) => {
  switch (type) {
    case 'sword':
      return (
        <svg viewBox="0 0 16 16" width="22" height="22" style={{ imageRendering: 'pixelated' }}>
          {/* Diamond Sword */}
          <path d="M12,1 h3 v3 h-1 v1 h-1 v1 h-1 v1 h-1 v1 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 v-1 h1 v-1 h1 v-1 h1 v-1 h1 v-1 z" fill="#38bdf8" />
          <path d="M11,3 h2 v2 h-1 v1 h-1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 v-1 h1 v-1 z" fill="#0284c7" />
          <path d="M13,2 h1 v1 h-1 z" fill="#e0f2fe" />
          {/* Guard */}
          <path d="M5,10 h2 v2 h-1 v1 h-2 v-1 h-1 v-2 h2 z" fill="#0369a1" />
          {/* Handle */}
          <rect x="3" y="12" width="2" height="2" fill="#78350f" />
          {/* Pommel */}
          <rect x="1" y="14" width="2" height="2" fill="#0369a1" />
        </svg>
      );
    case 'pearl':
      return (
        <svg viewBox="0 0 16 16" width="22" height="22" style={{ imageRendering: 'pixelated' }}>
          {/* Ender Pearl */}
          <circle cx="8" cy="8" r="6" fill="#064e3b" />
          <circle cx="8" cy="8" r="5" fill="#0f766e" />
          <circle cx="7" cy="7" r="3" fill="#14b8a6" />
          <rect x="6" y="6" width="2" height="2" fill="#5eead4" />
          <rect x="9" y="8" width="2" height="2" fill="#042f2e" />
        </svg>
      );
    case 'compass':
      return (
        <svg viewBox="0 0 16 16" width="22" height="22" style={{ imageRendering: 'pixelated' }}>
          {/* Compass Gold casing */}
          <circle cx="8" cy="8" r="6" fill="#713f12" />
          <circle cx="8" cy="8" r="5" fill="#ca8a04" />
          <circle cx="8" cy="8" r="4" fill="#0f172a" />
          {/* Red needle */}
          <path d="M8,4 L9,8 L8,7 L7,8 Z" fill="#ef4444" />
          <path d="M8,12 L9,8 L8,9 L7,8 Z" fill="#94a3b8" />
          <rect x="7" y="7" width="2" height="2" fill="#facc15" />
        </svg>
      );
    case 'torch':
      return (
        <svg viewBox="0 0 16 16" width="22" height="22" style={{ imageRendering: 'pixelated' }}>
          {/* Redstone Torch */}
          <rect x="7" y="6" width="2" height="8" fill="#78350f" />
          <rect x="6" y="2" width="4" height="4" fill="#b91c1c" />
          <rect x="7" y="3" width="2" height="2" fill="#f87171" />
          <rect x="7" y="1" width="2" height="1" fill="#fca5a5" />
        </svg>
      );
    case 'apple':
      return (
        <svg viewBox="0 0 16 16" width="22" height="22" style={{ imageRendering: 'pixelated' }}>
          {/* Golden Apple */}
          <path d="M5,4 h6 v1 h2 v6 h-1 v2 h-2 v1 h-4 v-1 h-2 v-2 h-1 v-6 h2 z" fill="#854d0e" />
          <path d="M6,5 h4 v1 h2 v5 h-1 v2 h-2 v1 h-2 v-1 h-2 v-2 h-1 v-5 h2 z" fill="#eab308" />
          <rect x="6" y="5" width="2" height="2" fill="#fef08a" />
          <rect x="8" y="2" width="1" height="2" fill="#451a03" />
        </svg>
      );
    case 'rocket':
      return (
        <svg viewBox="0 0 16 16" width="22" height="22" style={{ imageRendering: 'pixelated' }}>
          {/* Firework Rocket */}
          <rect x="6" y="2" width="4" height="2" fill="#dc2626" />
          <rect x="6" y="4" width="4" height="8" fill="#f5f5f4" />
          <rect x="6" y="6" width="4" height="2" fill="#dc2626" />
          <rect x="6" y="10" width="4" height="2" fill="#dc2626" />
          <rect x="7" y="12" width="2" height="3" fill="#ca8a04" />
        </svg>
      );
    case 'clock':
      return (
        <svg viewBox="0 0 16 16" width="22" height="22" style={{ imageRendering: 'pixelated' }}>
          {/* Minecraft Clock */}
          <circle cx="8" cy="8" r="6" fill="#713f12" />
          <circle cx="8" cy="8" r="5" fill="#ca8a04" />
          {/* Sky / Moon */}
          <path d="M4,8 a4,4 0 0,1 8,0 Z" fill="#0284c7" />
          <path d="M4,8 a4,4 0 0,0 8,0 Z" fill="#0f172a" />
          <rect x="7" y="5" width="2" height="2" fill="#fef08a" />
        </svg>
      );
    case 'totem':
      return (
        <svg viewBox="0 0 16 16" width="22" height="22" style={{ imageRendering: 'pixelated' }}>
          {/* Totem of Undying */}
          <rect x="5" y="2" width="6" height="5" fill="#eab308" />
          <rect x="6" y="4" width="1" height="1" fill="#10b981" />
          <rect x="9" y="4" width="1" height="1" fill="#10b981" />
          <rect x="3" y="6" width="10" height="2" fill="#ca8a04" />
          <rect x="6" y="7" width="4" height="6" fill="#eab308" />
          <rect x="7" y="9" width="2" height="2" fill="#10b981" />
        </svg>
      );
    default:
      return null;
  }
};
