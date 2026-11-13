import React from 'react';

export function Callout({ icon, children, className = '', ...rest }) {
  return (
    <div className={`dr-callout ${className}`} {...rest}>
      {icon}
      <div>{children}</div>
    </div>
  );
}
