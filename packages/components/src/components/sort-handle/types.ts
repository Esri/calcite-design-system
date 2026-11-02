export type Reorder = "up" | "down" | "top" | "bottom";

export interface SortMenuItem {
  element: HTMLElement;
  id: string;
  label: string;
}

export interface ReorderEventDetail {
  reorder: Reorder;
}

export interface MoveEventDetail {
  moveTo: SortMenuItem;
}

export interface AddEventDetail {
  addTo: SortMenuItem;
}
