import React from 'react';
import { Icon } from '../core/Icon.jsx';

/* The product IS a sequence — Connect, Profile, Assess, Ask, Act. Showing
   position in it is what stops a demo feeling like a screen tour. */
export function FlowSpine({ steps, current, aside, className = '', style, ...rest }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', ...style }}>
      <div className={`dr-flow ${className}`} style={{ flex: '1 1 auto', minWidth: 0 }} {...rest}>
        {steps.map((s, i) => {
          const id = s.id ?? s.label;
          const now = id === current;
          const done = !!s.done && !now;
          return (
            <React.Fragment key={id}>
              {i > 0 && <i className="dr-flow__sep" />}
              <div className={`dr-flow__step ${now ? 'dr-flow__step--now' : done ? 'dr-flow__step--done' : ''}`}>
                <span className="dr-flow__num">
                  {done ? <Icon name="i-check" size={10} /> : i + 1}
                </span>
                {s.label}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {aside}
    </div>
  );
}
