import React from 'react';
import { Topbar } from '../../components/navigation/Topbar.jsx';
import { FlowSpine } from '../../components/navigation/FlowSpine.jsx';
import { Message } from '../../components/chat/Message.jsx';
import { Composer } from '../../components/chat/Composer.jsx';
import { Suggest } from '../../components/chat/Suggest.jsx';
import { Lineage } from '../../components/chat/Lineage.jsx';
import { Button } from '../../components/core/Button.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { HexTile } from '../../components/core/HexTile.jsx';
import { Icon } from '../../components/core/Icon.jsx';
import { SOURCES, SPINE } from './data.js';

const STARTERS = [
  ['i-spark', 'Which stores miss the exit date at their current rate?'],
  ['i-coin', 'What margin is at risk if we hold price this week?'],
  ['i-trend', 'Which dimension is holding readiness back?'],
  ['i-alert', 'Which suppliers slipped on lead time last quarter?']
];

/* Every answer carries lineage. "Where did this number come from" is the
   enterprise buying question, and answering it visibly is trust and proof of
   federation in one component. Lineage derives from the ACTIVE PROFILE, so a
   one-source profile cannot claim three. */
export function DaveScreen({ profile, turns, onAsk }) {
  const sources = profile.srcs.map((name) => {
    const meta = SOURCES.find((s) => s.name === name) || { icon: 'i-db', objects: '' };
    return { id: name, icon: <Icon name={meta.icon} />, label: `${name} · ${meta.objects}` };
  });

  return (
    <>
      <Topbar
        title="D.A.V.E."
        chip={<Badge><Icon name="i-layers" size={12} /> Profile: {profile.name}</Badge>}
        actions={
          <>
            <Badge tone="brand"><Icon name="i-shield" size={12} /> Grounded</Badge>
            <Button variant="secondary" size="sm" icon={<Icon name="i-clock" />}>History</Button>
          </>
        }
      />
      <div style={{ flex: 1, padding: '22px 26px 48px', minWidth: 0 }}>
        <FlowSpine steps={SPINE(profile)} current="ask" style={{ marginBottom: 18 }} />

        <div style={{ maxWidth: 860 }}>
          {turns.length === 0 ? (
            <div style={{ maxWidth: 720 }}>
              <div style={{ fontFamily: 'var(--dr-font-display)', fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
                Ask {profile.name} a question
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--dr-ink-2)', lineHeight: 1.6, marginBottom: 18 }}>
                One query, whichever engine each source needs. Every answer carries its lineage.
              </div>
              <div style={{ display: 'grid', gap: 9, gridTemplateColumns: '1fr 1fr' }}>
                {STARTERS.map(([icon, q]) => (
                  <Suggest key={q} icon={<Icon name={icon} size={16} style={{ color: 'var(--dr-copper-600)', marginTop: 1 }} />} onClick={() => onAsk(q)}>
                    {q}
                  </Suggest>
                ))}
              </div>
            </div>
          ) : (
            turns.map((t, i) => (
              <Message
                key={i}
                from={t.me ? 'me' : 'agent'}
                avatar={<HexTile size={32}><Icon name="i-bot" /></HexTile>}
                lineage={!t.me && <Lineage sources={sources} plan={<a href="#plan" style={{ fontSize: 11.5, marginLeft: 4 }}>Query plan</a>} />}
              >
                {t.text}
              </Message>
            ))
          )}

          <Composer
            style={{ marginTop: 22 }}
            placeholder={`Ask a question about ${profile.name}…`}
            tools={
              <>
                <Badge>{profile.srcs.length} source{profile.srcs.length > 1 ? 's' : ''} in scope</Badge>
                <Badge tone="brand">Grounded</Badge>
              </>
            }
          />
        </div>
      </div>
    </>
  );
}
