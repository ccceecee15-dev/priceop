import * as React from 'react';

/**
 * A list of labelled bars, sorted worst-first, answering "which dimensions are weak".
 * @startingPoint section="Data" subtitle="Ranked dimension bars with weak rows called out" viewport="700x210"
 */
export interface RankItem {
  label: string;
  /** 0-100 bar length. */
  value: number;
  /** Overrides the numeric readout, e.g. "0.41" or "36 / 110". */
  display?: React.ReactNode;
  /** Emphasises the row and turns the figure rust — use on the weakest few. */
  weak?: boolean;
}
export interface RankListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: RankItem[];
  className?: string;
}
export declare function RankList(props: RankListProps): React.JSX.Element;
