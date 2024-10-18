export type Reorder = "up" | "down" | "top" | "bottom";

export interface MoveTo {
  element: HTMLElement;
  id: string;
  label: string;
}

export interface ReorderEventDetail {
  reorder: Reorder;
}

export interface MoveEventDetail {
  moveTo: MoveTo;
}
