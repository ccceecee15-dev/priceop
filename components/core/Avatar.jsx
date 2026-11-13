import React from 'react';

export function Avatar({ initials, size, className = '', ...rest }) {
  return (
    <div className={`dr-avatar ${size === 'sm' ? 'dr-avatar--sm' : ''} ${className}`} {...rest}>
      {initials}
    </div>
  );
}
