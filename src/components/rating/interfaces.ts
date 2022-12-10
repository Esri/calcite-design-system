import { Scale } from "../interfaces";

export interface Star {
  average: boolean;
  checked: boolean;
  focused: boolean;
  fraction: number;
  hovered: boolean;
  id: string;
  partial: boolean;
  selected: boolean;
  value: number;
}

export interface StarIconProps {
  icon: string;
  scale: Scale;
  partial?: boolean;
}
