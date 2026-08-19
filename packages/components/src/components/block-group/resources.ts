import type { BlockGroup } from "./block-group";

export const CSS = {
  container: "container",
  groupContainer: "group-container",
  scrim: "scrim",
  assistiveText: "assistive-text",
};

export const blockGroupSelector = "calcite-block-group";

export const blockSelector = "calcite-block";

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isBlockGroup(el: Element | null | EventTarget): el is BlockGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-BLOCK-GROUP";
}
