import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Composer({ placeholder = 'Ask a question…', tools, onSend, className = '', ...rest }) {
  return (
    <div className={`dr-composer ${className}`} {...rest}>
      <textarea
        className="dr-textarea"
        placeholder={placeholder}
        style={{ border: 0, padding: 0, minHeight: 44, background: 'transparent', boxShadow: 'none' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
        {tools}
        <button type="button" className="dr-composer__send" aria-label="Send" onClick={onSend} style={{ marginLeft: 'auto' }}>
          <Icon name="i-up" size={15} />
        </button>
      </div>
    </div>
  );
}
