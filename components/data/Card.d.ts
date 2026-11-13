import * as React from 'react';

/**
 * The surface everything sits on — white, hairline border, 14px radius, shadow-1.
 * @startingPoint section="Data" subtitle="Card with head, body and foot; interactive and selected" viewport="700x260"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds pointer + copper hover border. Use only when the whole card is clickable. */
  interactive?: boolean;
  /** Copper border, copper-050 fill and the focus ring. */
  selected?: boolean;
  /** Header content — rendered in a bordered __head region. */
  head?: React.ReactNode;
  /** Footer content — rendered in a tinted __foot region. */
  foot?: React.ReactNode;
  /** Body content. Omit entirely for a bare card you pad yourself. */
  children?: React.ReactNode;
  className?: string;
}
export declare function Card(props: CardProps): React.JSX.Element;
