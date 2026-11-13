import * as React from 'react';

/**
 * The brand's object tile — a copper hexagon echoing the logo mark.
 * @startingPoint section="Brand" subtitle="The hexagon object tile in three fills" viewport="700x140"
 */
export interface HexTileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** solid = copper gradient (default); soft = copper-100 fill; outline = faintest tint. */
  variant?: 'solid' | 'soft' | 'outline';
  /** Width in px; height is 1.08x. Default 40. Use >=60 for 3-character labels. */
  size?: number;
  /** Short text label (1-3 chars) auto-sized to the tile. Ignored when children are given. */
  label?: string;
  /** An icon element — rendered at 55% of the tile. */
  children?: React.ReactNode;
  className?: string;
}
export declare function HexTile(props: HexTileProps): React.JSX.Element;
