import * as React from 'react';

/**
 * A KPI: label, large display figure, movement, and the benchmark that makes it mean something.
 * @startingPoint section="Data" subtitle="KPI with movement and benchmark" viewport="700x200"
 */
export interface StatValueProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  /** The headline figure. Set in Poppins with tabular figures. */
  value: React.ReactNode;
  /** Movement since the last period, e.g. "+0.08 since 12 Aug". */
  delta?: React.ReactNode;
  /** 'up' colours it ok-green, 'down' danger-rust. Omit for neutral. */
  deltaDirection?: 'up' | 'down';
  /** The comparison line below a dashed rule — peer benchmark, threshold, or scope. */
  bench?: React.ReactNode;
  className?: string;
}
export declare function StatValue(props: StatValueProps): React.JSX.Element;
