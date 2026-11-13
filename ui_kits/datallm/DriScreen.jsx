import React from 'react';
import { Topbar } from '../../components/navigation/Topbar.jsx';
import { FlowSpine } from '../../components/navigation/FlowSpine.jsx';
import { Card } from '../../components/data/Card.jsx';
import { StatValue } from '../../components/data/StatValue.jsx';
import { Meter } from '../../components/data/Meter.jsx';
import { RankList } from '../../components/data/RankList.jsx';
import { Table } from '../../components/data/Table.jsx';
import { SectionHeading } from '../../components/data/SectionHeading.jsx';
import { EmptyState } from '../../components/data/EmptyState.jsx';
import { Callout } from '../../components/feedback/Callout.jsx';
import { Button } from '../../components/core/Button.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { Icon } from '../../components/core/Icon.jsx';
import { DIMS, NEXT_STEPS, SPINE, bandTone } from './data.js';

/* Five deliberate choices here: name the weakest dimensions at the top; show the
   peer benchmark and the agent-ready threshold so 0.75 means something; show the
   trend; surface Next Steps out from behind a tab; put Export/Share in the topbar,
   because a shared report is how this reaches the decision-maker. */
export function DriScreen({ profile }) {
  if (profile.dri === null) {
    return (
      <>
        <Topbar title="Data Readiness Index" chip={<Badge><Icon name="i-layers" size={12} /> Profile: {profile.name}</Badge>} />
        <div style={{ flex: 1, padding: '22px 26px 48px' }}>
          <FlowSpine steps={SPINE(profile)} current="assess" style={{ marginBottom: 18 }} />
          <EmptyState style={{ padding: '56px 24px' }}>
            <div style={{ fontFamily: 'var(--dr-font-display)', fontSize: 17, fontWeight: 600, color: 'var(--dr-ink)', marginBottom: 8 }}>
              {profile.name} has not been assessed
            </div>
            Run an assessment to score its seven dimensions and unlock agents.
            <div style={{ marginTop: 18 }}><Button>Run DRI assessment</Button></div>
          </EmptyState>
        </div>
      </>
    );
  }

  const items = DIMS.map(([label, value], i) => ({
    label, value: value * 100, display: value.toFixed(2), weak: i < 3
  }));

  const fixes = NEXT_STEPS.map(([task, dim, effort, gain, time]) => [
    <><div style={{ fontWeight: 600 }}>{task}</div><div className="dr-table__meta">{dim}</div></>,
    <Badge>{effort} effort</Badge>,
    <span className="dr-num" style={{ color: 'var(--dr-ok)', fontWeight: 600 }}>{gain}</span>,
    <span className="dr-num" style={{ color: 'var(--dr-ink-3)' }}>{time}</span>,
    <Button variant="secondary" size="sm">Start</Button>
  ]);

  return (
    <>
      <Topbar
        title="Data Readiness Index"
        chip={<Badge><Icon name="i-layers" size={12} /> Profile: {profile.name}</Badge>}
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Icon name="i-share" />}>Share</Button>
            <Button variant="secondary" size="sm" icon={<Icon name="i-dl" />}>Export</Button>
            <Button size="sm" icon={<Icon name="i-refresh" />}>Re-assess</Button>
          </>
        }
      />
      <div style={{ flex: 1, padding: '22px 26px 48px', minWidth: 0 }}>
        <FlowSpine steps={SPINE(profile)} current="assess" style={{ marginBottom: 18 }} />

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '300px 1fr', marginBottom: 16 }}>
          <Card style={{ padding: '20px 22px' }}>
            <div className="dr-stat__label">Overall readiness</div>
            <div className="dr-kpi__value" style={{ fontSize: 52, marginTop: 4 }}>{profile.dri.toFixed(2)}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
              <Badge tone={bandTone(profile.band)}>{profile.band}</Badge>
              <span className="dr-delta dr-delta--up"><Icon name="i-trend" size={12} /> +0.08 since 12 Aug</span>
            </div>
            <Meter value={profile.dri * 100} style={{ marginTop: 16 }} />
            <div className="dr-bench">
              Peer average 0.68 · agent-ready at 0.70. You are above both — the score is no longer the blocker.
            </div>
          </Card>
          <Card head={<SectionHeading count="The ranking is the insight" style={{ margin: 0 }}>Seven dimensions, weakest first</SectionHeading>}>
            <RankList items={items} />
          </Card>
        </div>

        <Callout icon={<Icon name="i-alert" size={17} style={{ color: 'var(--dr-copper-600)', marginTop: 1 }} />} style={{ marginBottom: 16 }}>
          <strong>{DIMS.slice(0, 3).map((d) => d[0]).join(', ')}</strong> are holding this profile back.
          Fairness &amp; Bias at 0.62 is what blocks the two highest-value use cases in AI Compass.
        </Callout>

        <Card
          style={{ overflow: 'hidden' }}
          head={<SectionHeading count="Per-fix score gain and effort — not hidden behind a tab" style={{ margin: 0 }}>4 fixes to reach 0.87</SectionHeading>}
        >
          <Table columns={['Fix', 'Effort', 'Gain', 'Time', '']} rows={fixes} />
        </Card>
      </div>
    </>
  );
}
