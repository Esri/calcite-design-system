export type StatusColor = "blue" | "green" | "red" | "yellow";
export type AlertDuration = "fast" | "medium" | "slow";
export type AlertPlacement = "bottom" | "bottom-end" | "bottom-start" | "top" | "top-end" | "top-start";
export enum StatusIcons {
  green = "checkCircle",
  yellow = "exclamationMarkTriangle",
  red = "exclamationMarkTriangle",
  blue = "lightbulb"
}
export interface Sync {
  queue: HTMLCalciteAlertElement[];
}
