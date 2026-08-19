import type { TileGroup } from "./tile-group";

export const CSS = {
  container: "container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isTileGroup(el: Element | null | EventTarget): el is TileGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-TILE-GROUP";
}
