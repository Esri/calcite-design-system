import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const CSS = {
  wrapper: "wrapper",
  confirmChangesButton: "confirm-changes-button",
  cancelEditingButton: "cancel-editing-button",
  inputWrapper: "input-wrapper",
  cancelEditingButtonWrapper: "cancel-editing-button-wrapper",
  enableEditingButton: "enable-editing-button",
  enableEditingButtonHidden: "enable-editing-button--hidden",
  controlsWrapper: "controls-wrapper",
};

export const ICONS: Record<string, IconName> = {
  check: "check",
  close: "x",
  pencil: "pencil",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isInlineEditable = isTag("calcite-inline-editable");
