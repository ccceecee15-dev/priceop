import React from 'react';

export function Input({ as = 'input', className = '', ...rest }) {
  if (as === 'textarea') return <textarea className={`dr-textarea ${className}`} {...rest} />;
  if (as === 'select') return <select className={`dr-select ${className}`} {...rest} />;
  return <input className={`dr-input ${className}`} {...rest} />;
}
