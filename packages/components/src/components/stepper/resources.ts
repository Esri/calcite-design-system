import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const CSS = {
  actionIcon: "action-icon",
  actionIconStart: "action-icon--start",
  actionIconEnd: "action-icon--end",
  actionContainer: "action-container",
  container: "container",
  stepBarActive: "step-bar--active",
  stepBarComplete: "step-bar--complete",
  stepBarContainer: "step-bar-container",
  stepBarError: "step-bar--error",
  stepBarInactive: "step-bar--inactive",
  singleView: "single-view",
};

export const ICONS: Record<string, IconName> = {
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right",
};

const idPrefix = "calcite-stepper-action";

export const IDS = {
  position: (id: any, isPositionStart: boolean) => `${idPrefix}-${id}-${isPositionStart ? "start" : "end"}`,
} as const;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isStepper = isTag("calcite-stepper");
