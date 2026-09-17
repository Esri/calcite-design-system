import { isTag } from "../resources";
import type { IconName } from "../icon/types";
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

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isStepperItem = isTag("calcite-stepper-item");
