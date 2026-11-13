import React from 'react';

export function Divider({ children, className = '', ...rest }) {
  return <div className={`dr-divider ${className}`} {...rest}>{children}</div>;
}
