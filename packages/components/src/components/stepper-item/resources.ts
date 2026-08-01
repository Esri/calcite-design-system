import type { IconName } from "../icon/interfaces";
import type { StepperItem } from "./stepper-item";

export const CSS = {
  container: "container",
  hasSlottedContent: "has-slotted-content",
  stepperItemContent: "stepper-item-content",
  stepperItemDescription: "stepper-item-description",
  stepperItemHeader: "stepper-item-header",
  stepperItemHeading: "stepper-item-heading",
  stepperItemHeaderText: "stepper-item-header-text",
  stepperItemIcon: "stepper-item-icon",
  stepperItemNumber: "stepper-item-number",
  visuallyHidden: "visually-hidden",
};

export const ICONS: Record<string, IconName> = {
  circle: "circle",
  circleF: "circleF",
  exclamationMarkCircleF: "exclamationMarkCircleF",
  checkCircleF: "checkCircleF",
};

export function isStepperItem(el?: Element | null): el is StepperItem["el"] {
  return el?.tagName === "CALCITE-STEPPER-ITEM";
}
