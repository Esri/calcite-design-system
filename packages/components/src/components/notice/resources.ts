import type { Notice } from "./notice";

export const SLOTS = {
  title: "title",
  message: "message",
  link: "link",
  actionsEnd: "actions-end",
};

export const CSS = {
  actionsEnd: "actions-end",
  close: "notice-close",
  container: "container",
  content: "notice-content",
  icon: "notice-icon",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isNotice(el: Element | null | EventTarget): el is Notice["el"] {
  return (el as Element | null)?.tagName === "CALCITE-NOTICE";
}
