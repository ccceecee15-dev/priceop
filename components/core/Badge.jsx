import React from 'react';

/* Status only carries semantic tone. 'brand' is for identity/selection labels,
   'neutral' for metadata. Never use 'ok'/'warn'/'danger' decoratively. */
export function Badge({ tone = 'neutral', dot, children, className = '', ...rest }) {
  return (
    <span className={`dr-badge dr-badge--${tone} ${className}`} {...rest}>
      {dot && <i className="dr-dot" />}
      {children}
    </span>
  );
}
