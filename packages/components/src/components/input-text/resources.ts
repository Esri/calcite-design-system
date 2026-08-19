import type { InputText } from "./input-text";

export const CSS = {
  loader: "loader",
  clearable: "clearable",
  clearButton: "clear-button",
  editingEnabled: "editing-enabled",
  hasPrefix: "has-prefix",
  hasSuffix: "has-suffix",
  inlineChild: "inline-child",
  inlineEditableChild: "inline-editable-child", // `calcite-inline-editable` deprecated in v5.2.0, removal target v7.0.0
  inlineEditable: "inline-editable",
  inputIcon: "icon",
  prefix: "prefix",
  suffix: "suffix",
  wrapper: "element-wrapper",
  inputWrapper: "wrapper",
  actionWrapper: "action-wrapper",
  resizeIconWrapper: "resize-icon-wrapper",
};

export const IDS = {
  validationMessage: "inputTextValidationMessage",
};

export const SLOTS = {
  action: "action",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isInputText(el: Element | null | EventTarget): el is InputText["el"] {
  return (el as Element | null)?.tagName === "CALCITE-INPUT-TEXT";
}
