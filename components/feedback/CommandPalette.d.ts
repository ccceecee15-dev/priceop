import * as React from 'react';

/** Global ⌘K search across profiles, sources and screens. */
export interface PaletteItem {
  id?: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  /** Right-aligned qualifier — a type, a profile name, a shortcut. */
  meta?: React.ReactNode;
  active?: boolean;
}
export interface CommandPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  placeholder?: string;
  groups: { label: React.ReactNode; items: PaletteItem[] }[];
  className?: string;
}
export declare function CommandPalette(props: CommandPaletteProps): React.JSX.Element;
