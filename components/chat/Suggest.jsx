import React from 'react';

export function Suggest({ icon, children, className = '', ...rest }) {
  return (
    <button type="button" className={`dr-suggest ${className}`} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
