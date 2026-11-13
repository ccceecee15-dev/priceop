import * as React from 'react';

/**
 * A data table with the tinted uppercase header and copper row hover.
 * @startingPoint section="Data" subtitle="Data table with header and row hover" viewport="700x230"
 */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Header cells. Omit for a headerless key/value table. */
  columns?: React.ReactNode[];
  /** Row-major cell content. */
  rows: React.ReactNode[][];
  className?: string;
}
export declare function Table(props: TableProps): React.JSX.Element;
