import React from 'react';
import { Icon } from '../core/Icon.jsx';

/* Guardrail proof: show the limit AND the actual value. A rule the user cannot
   see the arithmetic of is a promise, not a proof. */
export function RuleCheck({ name, detail, fail, className = '', ...rest }) {
  return (
    <div className={`dr-rule ${fail ? 'dr-rule--fail' : ''} ${className}`} {...rest}>
      <Icon name={fail ? 'i-alert' : 'i-check'} size={14} style={{ flex: 'none', marginTop: 1 }} />
      <div>
        <strong>{name}</strong>
        {detail && <div style={{ opacity: 0.9, marginTop: 1 }}>{detail}</div>}
      </div>
    </div>
  );
}
