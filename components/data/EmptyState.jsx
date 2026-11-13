import React from 'react';

export function EmptyState({ children, className = '', ...rest }) {
  return <div className={`dr-empty ${className}`} {...rest}>{children}</div>;
}
