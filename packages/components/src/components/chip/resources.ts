import { isTag } from "../resources";
import { IconName } from "../icon/types";
export const CSS = {
  title: "title",
  close: "close",
  imageContainer: "image-container",
  chipIcon: "chip-icon",
  textSlotted: "text--slotted",
  container: "container",
  imageSlotted: "image--slotted",
  closable: "closable",
  multiple: "multiple",
  single: "single",
  selectable: "selectable",
  selectIcon: "select-icon",
  selectIconActive: "select-icon--active",
  nonInteractive: "non-interactive",
  isCircle: "is-circle",
  selected: "selected",
};

export const SLOTS = {
  image: "image",
};

export const ICONS: Record<string, IconName> = {
  close: "x",
  checkedSingle: "circle-f",
  uncheckedMultiple: "square",
  checkedMultiple: "check-square-f",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isChip = isTag("calcite-chip");
