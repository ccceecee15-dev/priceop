import * as React from 'react';

/** A 6px progress bar. Default fill is graphite; tones exist but are rarely correct. */
export interface MeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0-100. Clamped. */
  value: number;
  /** Only when the bar itself encodes status. Usually omit — see the prompt. */
  tone?: 'ok' | 'warn' | 'danger';
  className?: string;
}
export declare function Meter(props: MeterProps): React.JSX.Element;
