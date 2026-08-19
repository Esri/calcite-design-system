import type { RadioButton } from "./radio-button";

export const CSS = {
  container: "container",
  radio: "radio",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isRadioButton(el: Element | null | EventTarget): el is RadioButton["el"] {
  return (el as Element | null)?.tagName === "CALCITE-RADIO-BUTTON";
}
