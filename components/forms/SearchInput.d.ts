import * as React from 'react';

/** A text field with the search glyph inset left. */
export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export declare function SearchInput(props: SearchInputProps): React.JSX.Element;
