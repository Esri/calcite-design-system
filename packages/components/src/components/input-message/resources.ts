import { isTag } from "../resources";

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
export const isInputMessage = isTag("calcite-input-message");
