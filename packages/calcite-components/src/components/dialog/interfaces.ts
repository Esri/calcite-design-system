export type DialogPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "cover"
  | "center";

export type DialogResizePosition = { top: number; right: number; bottom: number; left: number };

export type DialogDragPosition = { x: number; y: number };
