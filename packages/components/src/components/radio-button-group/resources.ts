import type { RadioButtonGroup } from "./radio-button-group";

export const CSS = {
  itemWrapper: "item-wrapper",
};

export const IDS = {
  validationMessage: "radioButtonGroupValidationMessage",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isRadioButtonGroup(el: Element | null | EventTarget): el is RadioButtonGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-RADIO-BUTTON-GROUP";
}
