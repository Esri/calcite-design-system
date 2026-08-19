import type { Graph } from "./graph";

export const CSS = {
  svg: "svg",
  graphPath: "graph-path",
  graphPathHighlight: "graph-path--highlight",
};

const idPrefix = "calcite-graph";

export const IDS = {
  host: (id: string) => `${idPrefix}-${id}`,
  linearGradient: (id: string) => `linear-gradient-${idPrefix}-${id}`,
  mask: (id: string, maskId: number) => `${idPrefix}-${id}${maskId}`,
} as const;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isGraph(el: Element | null | EventTarget): el is Graph["el"] {
  return (el as Element | null)?.tagName === "CALCITE-GRAPH";
}
