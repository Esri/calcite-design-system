import type { SplitButton } from "./split-button";

import { IconName } from "../icon/types";

export const CSS = {
  container: "container",
  dividerContainer: "divider-container",
  divider: "divider",
  widthAuto: "width-auto",
  widthHalf: "width-half",
  widthFull: "width-full",
};

export const SLOTS = {
  trigger: "trigger",
};

export const ICONS: Record<string, IconName> = {
  chevronDown: "chevronDown",
  caretDown: "caretDown",
  ellipsis: "ellipsis",
  handleVertical: "handle-vertical",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isSplitButton(el: Element | null | EventTarget): el is SplitButton["el"] {
  return (el as Element | null)?.tagName === "CALCITE-SPLIT-BUTTON";
}
