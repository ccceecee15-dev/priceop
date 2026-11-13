import * as React from 'react';

/**
 * A filter chip. Selection is a copper TINT, never a solid fill.
 * @startingPoint section="Core" subtitle="Filter chips with a selected state" viewport="700x110"
 */
export interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected state — applies the copper tint and sets aria-pressed. */
  active?: boolean;
  /** Optional trailing count, dimmed. */
  count?: number;
  children?: React.ReactNode;
  className?: string;
}
export declare function Pill(props: PillProps): React.JSX.Element;
