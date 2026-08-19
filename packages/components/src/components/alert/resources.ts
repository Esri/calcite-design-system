import type { Alert } from "./alert";

export const DURATIONS = {
  slow: 14000,
  medium: 10000,
  fast: 6000,
};

export const SLOTS = {
  actionsEnd: "actions-end",
  title: "title",
  message: "message",
  link: "link",
};

export const CSS = {
  actionsEnd: "actions-end",
  close: "close",
  container: "container",
  containerBottom: "container--bottom",
  containerBottomEnd: "container--bottom-end",
  containerBottomStart: "container--bottom-start",
  containerActive: "container--active",
  containerTop: "container--top",
  containerTopEnd: "container--top-end",
  containerTopStart: "container--top-start",
  content: "content",
  contentContainer: "content-container",
  dismissProgress: "dismiss-progress",
  footer: "footer",
  icon: "icon",
  containerEmbedded: "container--embedded",
  queueCount: "queue-count",
  queueCountActive: "queue-count--active",
  textContainer: "text-container",
  focused: "focused",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isAlert(el: Element | null | EventTarget): el is Alert["el"] {
  return (el as Element | null)?.tagName === "CALCITE-ALERT";
}
