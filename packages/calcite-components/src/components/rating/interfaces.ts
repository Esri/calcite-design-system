import { Scale } from "../interfaces";

export interface Star {
  average: boolean;
  checked: boolean;
  fraction: number;
  hovered: boolean;
  id: string;
  partial: boolean;
  selected: boolean;
  value: number;
  tabIndex: number;
}

export interface StarIconProps {
  full: boolean;
  scale: Scale;
  partial?: boolean;
}
