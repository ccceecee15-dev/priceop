import React from 'react';

export function SsoButton({ icon, children, className = '', ...rest }) {
  return (
    <button type="button" className={`dr-sso ${className}`} {...rest}>
      {icon}
      {children}
    </button>
  );
}
