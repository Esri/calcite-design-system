import type { Fab } from "./fab";

import { IconName } from "../icon/types";

export const CSS = {
  button: "button",
};

export const ICONS: Record<string, IconName> = {
  plus: "plus",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isFab(el: Element | null | EventTarget): el is Fab["el"] {
  return (el as Element | null)?.tagName === "CALCITE-FAB";
}
