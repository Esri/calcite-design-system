/** @internal */
export type Reorder = "up" | "down" | "top" | "bottom";

/** @internal */
export interface SortMenuItem {
  /** @internal */
  element: HTMLElement;
  /** @internal */
  id: string;
  /** @internal */
  label: string;
}

/** @internal */
export interface ReorderEventDetail {
  /** @internal */
  reorder: Reorder;
}

/** @internal */
export interface MoveEventDetail {
  /** @internal */
  moveTo: SortMenuItem;
}

/** @internal */
export interface AddEventDetail {
  /** @internal */
  addTo: SortMenuItem;
}
