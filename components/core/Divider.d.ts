import * as React from 'react';

/** A labelled horizontal rule — a hairline either side of centred text. */
export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The centred label, e.g. "or". Omit for a plain rule. */
  children?: React.ReactNode;
  className?: string;
}
export declare function Divider(props: DividerProps): React.JSX.Element;
