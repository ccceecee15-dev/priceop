import React from 'react';
import { NavRail } from '../../components/navigation/NavRail.jsx';
import { NavItem } from '../../components/navigation/NavItem.jsx';
import { UserCard } from '../../components/navigation/UserCard.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { Kbd } from '../../components/core/Kbd.jsx';
import { Icon } from '../../components/core/Icon.jsx';

export const NAV = [
  { id: 'home', label: 'Profiles', icon: 'i-layers' },
  { id: 'connectors', label: 'Connectors', icon: 'i-plug' },
  { id: 'explorer', label: 'Data Explorer', icon: 'i-db' },
  { id: 'dri', label: 'DRI', icon: 'i-gauge' },
  { id: 'dave', label: 'D.A.V.E.', icon: 'i-bot' },
  { id: 'workbench', label: 'Agent Workbench', icon: 'i-node', badge: '4' },
  { id: 'compass', label: 'AI Compass', icon: 'i-compass' }
];

/* The shell every signed-in screen sits in: dark rail left, fluid workspace right. */
export function AppShell({ screen, onNavigate, onOpenPalette, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'stretch' }}>
      <NavRail
        brand={<img src="../../assets/deeproot-logo.png" alt="deeproot.ai" style={{ width: 138, display: 'block' }} />}
        search={
          <div
            onClick={onOpenPalette}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', cursor: 'pointer',
              border: '1px solid var(--dr-shell-line)', borderRadius: 'var(--dr-r-sm)', background: 'var(--dr-shell-2)'
            }}
          >
            <Icon name="i-search" size={14} style={{ color: 'var(--dr-on-shell-3)' }} />
            <span style={{ fontSize: 13, color: 'var(--dr-on-shell-3)', flex: 1 }}>Search</span>
            <Kbd style={{ background: 'var(--dr-shell-3)', borderColor: 'var(--dr-shell-line)', color: 'var(--dr-on-shell-2)' }}>⌘K</Kbd>
          </div>
        }
        items={NAV.map((n) => (
          <NavItem
            key={n.id}
            icon={<Icon name={n.icon} />}
            label={n.label}
            badge={n.badge && <Badge tone="brand">{n.badge}</Badge>}
            active={screen === n.id}
            onClick={() => onNavigate(n.id)}
          />
        ))}
        footer={<UserCard name="Joonil Kim" email="joonil.kim@whs.com" initials="JK" role="ADMIN" />}
      />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>{children}</main>
    </div>
  );
}
