import React from 'react';

export function Pill({ active, count, children, className = '', ...rest }) {
  return (
    <button
      type="button"
      aria-pressed={!!active}
      className={`dr-pill ${active ? 'dr-pill--active' : ''} ${className}`}
      {...rest}
    >
      {children}
      {count != null && <span style={{ opacity: 0.7, marginLeft: 5 }}>{count}</span>}
    </button>
  );
}
