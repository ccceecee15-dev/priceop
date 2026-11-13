import React from 'react';

export function Message({ from = 'agent', avatar, lineage, children, className = '', ...rest }) {
  const me = from === 'me';
  return (
    <div className={`dr-msg ${me ? 'dr-msg--me' : ''} ${className}`} {...rest}>
      {!me && avatar}
      <div className="dr-msg__body">
        {children}
        {!me && lineage}
      </div>
    </div>
  );
}
