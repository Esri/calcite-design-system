export const CSS = {};

export function getDimension(type: "width" | "height", size: string, scale: string): string {
  return size ? `${type}-${size}` : scale ? `${type}-${scale}` : "";
}
