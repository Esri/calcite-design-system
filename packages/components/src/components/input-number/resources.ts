import type { IconName } from "../icon/types";
import type { InputNumber } from "./input-number";

export const CSS = {
  loader: "loader",
  clearButton: "clear-button",
  clearable: "clearable",
  editingEnabled: "editing-enabled",
  inlineChild: "inline-child",
  inlineEditableChild: "inline-editable-child", // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
  inlineEditable: "inline-editable",
  inputIcon: "icon",
  prefix: "prefix",
  suffix: "suffix",
  numberButtonWrapper: "number-button-wrapper",
  buttonItemHorizontal: "number-button-item--horizontal",
  wrapper: "element-wrapper",
  inputWrapper: "wrapper",
  actionWrapper: "action-wrapper",
  resizeIconWrapper: "resize-icon-wrapper",
  numberButtonItem: "number-button-item",
  hasSuffix: "has-suffix",
  hasPrefix: "has-prefix",
};

export const IDS = {
  validationMessage: "inputNumberValidationMessage",
};

export const SLOTS = {
  action: "action",
};

export const ICONS: Record<string, IconName> = {
  clear: "x",
  chevronUp: "chevron-up",
  chevronDown: "chevron-down",
};

export const DIRECTION = {
  up: "up",
  down: "down",
};

export const NUDGE_DELAY_IN_MS = 150;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isInputNumber(el: Element | null | EventTarget): el is InputNumber["el"] {
  return (el as Element | null)?.tagName === "CALCITE-INPUT-NUMBER";
}
