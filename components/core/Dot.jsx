import React from 'react';

export function Dot({ className = '', ...rest }) {
  return <i className={`dr-dot ${className}`} {...rest} />;
}
