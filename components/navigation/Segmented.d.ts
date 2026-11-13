import * as React from 'react';

/**
 * An inset segmented control for a small set of mutually exclusive settings.
 * @startingPoint section="Navigation" subtitle="Segmented control, 2-4 options" viewport="700x100"
 */
export interface SegmentedItem {
  id?: string;
  label: React.ReactNode;
}
export interface SegmentedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SegmentedItem[];
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}
export declare function Segmented(props: SegmentedProps): React.JSX.Element;
