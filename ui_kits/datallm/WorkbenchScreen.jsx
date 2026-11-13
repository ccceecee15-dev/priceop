import React from 'react';
import { Topbar } from '../../components/navigation/Topbar.jsx';
import { FlowSpine } from '../../components/navigation/FlowSpine.jsx';
import { Tabs } from '../../components/navigation/Tabs.jsx';
import { Card } from '../../components/data/Card.jsx';
import { StatValue } from '../../components/data/StatValue.jsx';
import { Table } from '../../components/data/Table.jsx';
import { Callout } from '../../components/feedback/Callout.jsx';
import { Button } from '../../components/core/Button.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { HexTile } from '../../components/core/HexTile.jsx';
import { Icon } from '../../components/core/Icon.jsx';
import { BIZ_AGENTS, COMPONENTS, SPINE } from './data.js';

const KPIS = [
  ['Runs this month', '38', 'across 4 business agents'],
  ['Records processed', '1.3M', 'SKUs, suppliers and stores'],
  ['Margin protected', '£14.2k', 'Markdown agent, 5 styles'],
  ['Awaiting approval', '55', 'nothing auto-executes']
];

/* The catalog is SPLIT: business agents a buyer runs, and components that are
   shared plumbing. Seven of eleven agents were plumbing whose own descriptions
   say they have "zero built-in notion of any caller's business" — a merchandiser
   scrolling past those learns the catalog isn't for them. KPIs are outcomes
   (runs, records, margin) rather than an undifferentiated 11 / 11 / 0. */
export function WorkbenchScreen({ profile, tab, onTab }) {
  return (
    <>
      <Topbar
        title="Agent Workbench"
        chip={<Badge><Icon name="i-layers" size={12} /> Profile: {profile.name}</Badge>}
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Icon name="i-cal" />}>Schedule</Button>
            <Button size="sm" icon={<Icon name="i-plus" />}>Register agent</Button>
          </>
        }
      />
      <div style={{ flex: 1, padding: '22px 26px 48px', minWidth: 0 }}>
        <FlowSpine steps={SPINE(profile)} current="act" style={{ marginBottom: 18 }} />

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: 20 }}>
          {KPIS.map(([label, value, bench]) => (
            <Card key={label} style={{ padding: '16px 18px' }}>
              <StatValue label={label} value={value} bench={bench} />
            </Card>
          ))}
        </div>

        <Tabs
          value={tab}
          onChange={onTab}
          style={{ marginBottom: 18 }}
          items={[
            { id: 'business', label: 'Business agents', count: 4 },
            { id: 'components', label: 'Components', count: 7 }
          ]}
        />

        {tab === 'business' ? (
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))' }}>
            {BIZ_AGENTS.map(([name, desc, version, ran, processed, outcome]) => (
              <Card
                key={name}
                interactive
                head={
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <HexTile size={34}><Icon name="i-node" /></HexTile>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--dr-font-display)', fontWeight: 600, fontSize: 15 }}>{name}</div>
                      <div className="dr-table__meta">{version} · last run {ran}</div>
                    </div>
                    {ran === 'Never run' ? <Badge>Idle</Badge> : <Badge tone="ok" dot>Healthy</Badge>}
                  </div>
                }
                foot={
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button variant="secondary" size="sm" block>Open</Button>
                    <Button size="sm" block icon={<Icon name="i-play" />}>Run</Button>
                  </div>
                }
              >
                <div style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--dr-ink-2)' }}>{desc}</div>
                <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
                  <div>
                    <div className="dr-stat__label">Processed</div>
                    <div className="dr-num" style={{ fontWeight: 600, fontSize: 13.5, marginTop: 2 }}>{processed}</div>
                  </div>
                  <div>
                    <div className="dr-stat__label">Outcome</div>
                    <div style={{ marginTop: 2 }}>
                      {outcome === '—'
                        ? <span style={{ fontSize: 13.5, color: 'var(--dr-ink-3)' }}>—</span>
                        : <span className="dr-impact">{outcome}</span>}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <Callout icon={<Icon name="i-info" size={17} style={{ color: 'var(--dr-copper-600)', marginTop: 1 }} />} style={{ marginBottom: 14 }}>
              <strong>Components carry no business logic.</strong> They are shared plumbing that business
              agents compose with. A merchandiser does not run these directly.
            </Callout>
            <Card style={{ overflow: 'hidden' }}>
              <Table
                columns={['Component', 'What it does', 'Version']}
                rows={COMPONENTS.map(([name, desc, version]) => [
                  <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{name}</span>,
                  <span style={{ color: 'var(--dr-ink-2)' }}>{desc}</span>,
                  <span className="dr-num" style={{ color: 'var(--dr-ink-3)' }}>{version}</span>
                ])}
              />
            </Card>
          </>
        )}
      </div>
    </>
  );
}
