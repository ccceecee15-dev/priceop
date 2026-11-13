import * as React from 'react';

/** A centred dialog over a blurred scrim. Closes on scrim click. */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default true. */
  open?: boolean;
  onClose?: () => void;
  head?: React.ReactNode;
  /** Body — a grid with 8px gaps, sized for a stack of Choice rows. */
  children?: React.ReactNode;
  foot?: React.ReactNode;
  className?: string;
}
export declare function Modal(props: ModalProps): React.JSX.Element;
