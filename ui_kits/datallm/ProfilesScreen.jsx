import React from 'react';
import { Topbar } from '../../components/navigation/Topbar.jsx';
import { FlowSpine } from '../../components/navigation/FlowSpine.jsx';
import { Card } from '../../components/data/Card.jsx';
import { StatValue } from '../../components/data/StatValue.jsx';
import { Meter } from '../../components/data/Meter.jsx';
import { SectionHeading } from '../../components/data/SectionHeading.jsx';
import { EmptyState } from '../../components/data/EmptyState.jsx';
import { Callout } from '../../components/feedback/Callout.jsx';
import { Button } from '../../components/core/Button.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { HexTile } from '../../components/core/HexTile.jsx';
import { Icon } from '../../components/core/Icon.jsx';
import { SPINE, bandTone } from './data.js';

/* Profiles is HOME. A profile is the central object — DRI, D.A.V.E., agents and
   Compass are all scoped to one — so every other screen is a drill-down. */
export function ProfilesScreen({ profiles, active, onSelect, onNavigate }) {
  return (
    <>
      <Topbar
        title="Profiles"
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Icon name="i-share" />}>Invite</Button>
            <Button size="sm" icon={<Icon name="i-plus" />}>New profile</Button>
          </>
        }
      />
      <div style={{ flex: 1, padding: '22px 26px 48px', minWidth: 0 }}>
        <FlowSpine steps={SPINE(profiles[active])} current="profile" style={{ marginBottom: 18 }}
          aside={<span style={{ fontSize: 12.5, color: 'var(--dr-ink-3)' }}>Scope: <strong style={{ color: 'var(--dr-ink)' }}>{profiles[active].name}</strong></span>} />

        <Callout icon={<Icon name="i-info" size={17} style={{ color: 'var(--dr-copper-600)', marginTop: 1 }} />} style={{ marginBottom: 20 }}>
          <strong>A profile is the unit of everything here.</strong> DRI, D.A.V.E., agents and Compass are
          all scoped to one, so this is the hub and every other screen is a drill-down from it.
        </Callout>

        <SectionHeading count={`${profiles.length} · click one to change scope`}>Your profiles</SectionHeading>

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))' }}>
          {profiles.map((p, i) => (
            <Card
              key={p.name}
              interactive
              selected={i === active}
              onClick={() => onSelect(i)}
              head={
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <HexTile size={34}><Icon name="i-layers" /></HexTile>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--dr-font-display)', fontWeight: 600, fontSize: 15 }}>{p.name}</div>
                    <div className="dr-table__meta">
                      {p.srcs.length} source{p.srcs.length > 1 ? 's' : ''} · {p.tables} tables · {p.agents} agent{p.agents === 1 ? '' : 's'}
                    </div>
                  </div>
                  {p.dri === null
                    ? <Badge>Not assessed</Badge>
                    : <Badge tone={bandTone(p.band)}>{p.band}</Badge>}
                </div>
              }
              foot={
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12.5, color: 'var(--dr-ink-2)', flex: 1, minWidth: 0 }}>{p.next}</span>
                  <Button variant="secondary" size="sm" onClick={() => onNavigate(p.nextTo)}>Open</Button>
                </div>
              }
            >
              {p.dri === null ? (
                <EmptyState>No readiness score yet. One source connected.</EmptyState>
              ) : (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
                  <StatValue label="Readiness" value={p.dri.toFixed(2)}
                    delta={`+${(p.dri - p.prev).toFixed(2)} since 12 Aug`} deltaDirection="up" />
                  <div style={{ flex: 1, minWidth: 0, paddingBottom: 4 }}>
                    <Meter value={p.dri * 100} />
                    <div className="dr-bench" style={{ borderTop: 0, paddingTop: 7, marginTop: 7 }}>
                      Peer average 0.68 · agent-ready at 0.70
                    </div>
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                {p.srcs.map((s) => <button key={s} className="dr-src"><Icon name="i-db" />{s}</button>)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
