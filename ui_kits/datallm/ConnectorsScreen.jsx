import React from 'react';
import { Topbar } from '../../components/navigation/Topbar.jsx';
import { FlowSpine } from '../../components/navigation/FlowSpine.jsx';
import { Card } from '../../components/data/Card.jsx';
import { Table } from '../../components/data/Table.jsx';
import { StatValue } from '../../components/data/StatValue.jsx';
import { SectionHeading } from '../../components/data/SectionHeading.jsx';
import { Button } from '../../components/core/Button.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { HexTile } from '../../components/core/HexTile.jsx';
import { Icon } from '../../components/core/Icon.jsx';
import { SOURCES, SPINE } from './data.js';

const KPIS = [
  ['Sources', '5', 'across 4 system types'],
  ['Rows profiled', '1.29M', 'plus 8,410 messages'],
  ['Documents parsed', '1,284', '96% text-extractable'],
  ['PII columns flagged', '3', 'in WHS_Retail_DW'],
  ['Longest setup', '14 min', 'SharePoint, incl. OCR']
];

/* Each source reports WHAT INGESTION ACHIEVED, not a status pill — connection is
   where a "2-4 week deployment" claim gets proven. Mail is Archive, not
   Connected: a Connected pill implies a sync that does not exist. */
export function ConnectorsScreen({ profile }) {
  const rows = SOURCES.map((s) => [
    <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
      <HexTile variant="soft" size={30}><Icon name={s.icon} /></HexTile>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 600 }}>{s.name}</div>
        <div className="dr-table__meta">{s.fmt} · {s.objects}</div>
      </div>
    </div>,
    <>
      {s.live ? <Badge tone="ok" dot>Connected</Badge> : <Badge tone="warn">Archive</Badge>}
      <div className="dr-table__meta">{s.updated}</div>
    </>,
    <>
      <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--dr-ink-2)' }}>{s.ingest}</div>
      <div className="dr-table__meta">ready in {s.setup}</div>
    </>,
    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
      <Button variant="ghost" size="sm">Schema</Button>
      <Button variant="secondary" size="sm" style={{ marginLeft: 6 }}>Test</Button>
    </div>
  ]);

  return (
    <>
      <Topbar title="Connectors" actions={<Button size="sm" icon={<Icon name="i-plus" />}>Add source</Button>} />
      <div style={{ flex: 1, padding: '22px 26px 48px', minWidth: 0 }}>
        <FlowSpine steps={SPINE(profile)} current="connect" style={{ marginBottom: 18 }} />

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(178px, 1fr))', marginBottom: 20 }}>
          {KPIS.map(([label, value, bench]) => (
            <Card key={label} style={{ padding: '16px 18px' }}>
              <StatValue label={label} value={value} bench={bench} />
            </Card>
          ))}
        </div>

        <Card
          style={{ overflow: 'hidden' }}
          head={<SectionHeading count="Databases, documents, spreadsheets and mail — together" style={{ margin: 0 }}>Connected sources</SectionHeading>}
        >
          <Table columns={['Source', 'State', 'What ingestion achieved', '']} rows={rows} />
        </Card>
      </div>
    </>
  );
}
