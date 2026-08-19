import type { Meter } from "./meter";

export const CSS = {
  container: "container",
  fill: "fill",
  stepLine: "step-line",
  label: "label",
  labelHidden: "label-hidden",
  labelRange: "label-range",
  labelValue: "label-value",
  unitLabel: "unit-label",
  stepsVisible: "steps-visible",
  valueVisible: "value-visible",
  success: "fill-success",
  warning: "fill-warning",
  danger: "fill-danger",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isMeter(el: Element | null | EventTarget): el is Meter["el"] {
  return (el as Element | null)?.tagName === "CALCITE-METER";
}
