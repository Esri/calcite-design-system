import { Scale, Width, Height } from "../components/interfaces";

export function getDimensionClass(
  type: "width" | "height",
  size: Width | Height,
  scale: Scale,
): `${typeof type}-${Scale | Width | Height}` {
  return size ? `${type}-${size}` : scale ? `${type}-${scale}` : "width-m";
}
