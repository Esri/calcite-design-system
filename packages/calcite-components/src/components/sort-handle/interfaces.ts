export type Reorder = "up" | "down" | "top" | "bottom";

export interface MoveToItem {
  label: string;
  value: string;
}

export interface ReorderEventDetail {
  reorder: Reorder;
}

export interface MoveEventDetail {
  value: MoveToItem["value"];
}
