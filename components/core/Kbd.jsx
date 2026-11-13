import React from 'react';

export function Kbd({ children, className = '', ...rest }) {
  return <kbd className={`dr-kbd ${className}`} {...rest}>{children}</kbd>;
}
