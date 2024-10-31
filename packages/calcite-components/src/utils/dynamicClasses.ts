export function getDimension(
  type: "width" | "height",
  size: "s" | "m" | "l",
  scale: "s" | "m" | "l",
): "width-s" | "width-m" | "width-l" | "height-s" | "height-m" | "height-l" | "width" | "height" {
  return size ? `${type}-${size}` : scale ? `${type}-${scale}` : undefined;
}
