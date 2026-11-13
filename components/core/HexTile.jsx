import React from 'react';

/* The signature device. The logo mark is a hexagon, so every object icon —
   source, agent, profile, scope chip — is a hexagon, not a rounded square. */
export function HexTile({ variant = 'solid', size = 40, label, children, className = '', style, ...rest }) {
  const mod = variant === 'solid' ? '' : `dr-hex--${variant}`;
  return (
    <div
      className={`dr-hex ${mod} ${className}`}
      style={{ '--hex-size': `${size}px`, ...style }}
      {...rest}
    >
      {children ?? (label && (
        <span style={{ fontFamily: 'var(--dr-font-display)', fontWeight: 700, fontSize: Math.round(size * 0.3) }}>
          {label}
        </span>
      ))}
    </div>
  );
}
