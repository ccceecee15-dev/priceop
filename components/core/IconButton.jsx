import React from 'react';

export function IconButton({ label, children, className = '', ...rest }) {
  return (
    <button type="button" aria-label={label} title={label} className={`dr-icon-btn ${className}`} {...rest}>
      {children}
    </button>
  );
}
