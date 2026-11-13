import React from 'react';

export function FieldLabel({ children, className = '', ...rest }) {
  return <label className={`dr-field-label ${className}`} {...rest}>{children}</label>;
}
