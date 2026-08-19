import type { Stack } from "./stack";

export const CSS = {
  container: "container",
  actionsStart: "actions-start",
  contentStart: "content-start",
  content: "content",
  contentEnd: "content-end",
  actionsEnd: "actions-end",
};

export const SLOTS = {
  actionsStart: "actions-start",
  contentStart: "content-start",
  contentEnd: "content-end",
  actionsEnd: "actions-end",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isStack(el: Element | null | EventTarget): el is Stack["el"] {
  return (el as Element | null)?.tagName === "CALCITE-STACK";
}
