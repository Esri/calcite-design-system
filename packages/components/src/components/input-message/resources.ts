import type { InputMessage } from "./input-message";

export const CSS = {
  inputMessageIcon: "calcite-input-message-icon",
};

export const StatusIconDefaults = {
  valid: "check-circle",
  invalid: "exclamation-mark-triangle",
  idle: "information",
} as const;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isInputMessage(el: Element | null | EventTarget): el is InputMessage["el"] {
  return (el as Element | null)?.tagName === "CALCITE-INPUT-MESSAGE";
}
