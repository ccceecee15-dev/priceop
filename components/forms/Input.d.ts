import * as React from 'react';

/**
 * The text field, select and textarea — one component, three renderings.
 * @startingPoint section="Forms" subtitle="Text, select and textarea fields" viewport="700x170"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 'input' (default), 'select' (pass <option> children) or 'textarea'. */
  as?: 'input' | 'select' | 'textarea';
  className?: string;
}
export declare function Input(props: InputProps): React.JSX.Element;
