import * as React from 'react';

/**
 * The provenance strip under an answer — which sources, how much of each.
 * @startingPoint section="Chat" subtitle="Answer lineage source chips" viewport="700x110"
 */
export interface LineageSource {
  id?: string;
  /** A 12px copper icon for the source type. */
  icon?: React.ReactNode;
  /** Name AND volume — "Orders · 42 tables, 1.24M rows". */
  label: React.ReactNode;
}
export interface LineageProps extends React.HTMLAttributes<HTMLDivElement> {
  sources: LineageSource[];
  /** A trailing query-plan link. */
  plan?: React.ReactNode;
  className?: string;
}
export declare function Lineage(props: LineageProps): React.JSX.Element;
