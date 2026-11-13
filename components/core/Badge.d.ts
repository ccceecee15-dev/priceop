import * as React from 'react';

/**
 * A pill-shaped status or metadata label.
 * @startingPoint section="Core" subtitle="Status and metadata labels" viewport="700x120"
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** ok/warn/danger are reserved for real status. Default 'neutral'. */
  tone?: 'ok' | 'warn' | 'danger' | 'brand' | 'neutral';
  /** Prepend a 6px filled dot in the current colour. */
  dot?: boolean;
  children?: React.ReactNode;
  className?: string;
}
export declare function Badge(props: BadgeProps): React.JSX.Element;
