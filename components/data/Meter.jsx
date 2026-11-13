import React from 'react';

export function Meter({ value, tone, className = '', ...rest }) {
  return (
    <div className={`dr-meter ${className}`} role="meter" aria-valuenow={value} {...rest}>
      <div
        className={`dr-meter__fill ${tone ? `dr-meter__fill--${tone}` : ''}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
