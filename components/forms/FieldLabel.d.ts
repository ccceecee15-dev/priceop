import * as React from 'react';

/** The 11px uppercase tracked label that sits above a field or a panel section. */
export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  className?: string;
}
export declare function FieldLabel(props: FieldLabelProps): React.JSX.Element;
