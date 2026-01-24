export type DisplayMode = "dock" | "float" | "overlay" | "float-content" | "float-all";

export interface ResizeValues {
  inlineSize: number;
  blockSize: number;
  minInlineSize: number;
  minBlockSize: number;
  maxInlineSize: number;
  maxBlockSize: number;
}
