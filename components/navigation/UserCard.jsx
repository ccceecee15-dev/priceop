import React from 'react';
import { Avatar } from '../core/Avatar.jsx';

export function UserCard({ name, email, initials, role, className = '', ...rest }) {
  return (
    <div className={`dr-usercard ${className}`} {...rest}>
      <Avatar initials={initials} size="sm" />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--dr-on-shell)' }}>{name}</div>
        {email && (
          <div style={{ fontSize: 10.5, color: 'var(--dr-on-shell-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {email}
          </div>
        )}
      </div>
      {role && <span className="dr-badge dr-badge--brand" style={{ fontSize: 9.5, padding: '3px 6px' }}>{role}</span>}
    </div>
  );
}
