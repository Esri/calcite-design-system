import type { Tabs } from "./tabs";

export const CSS = {
  section: "section",
};

export const SLOTS = {
  titleGroup: "title-group",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isTabs(el: Element | null | EventTarget): el is Tabs["el"] {
  return (el as Element | null)?.tagName === "CALCITE-TABS";
}
