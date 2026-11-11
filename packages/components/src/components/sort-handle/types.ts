/** @public */
export type Reorder = "up" | "down" | "top" | "bottom";

/** @public */
export interface SortMenuItem {
  /** @public */
  element: HTMLElement;
  /** @public */
  id: string;
  /** @public */
  label: string;
}

/** @public */
export interface ReorderEventDetail {
  /** @public */
  reorder: Reorder;
}

/** @public */
export interface MoveEventDetail {
  /** @public */
  moveTo: SortMenuItem;
}

/** @public */
export interface AddEventDetail {
  /** @public */
  addTo: SortMenuItem;
}
