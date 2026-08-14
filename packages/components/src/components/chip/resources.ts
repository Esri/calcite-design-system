import { IconName } from "../icon/types";
import type { Chip } from "./chip";

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

export function isChip(el: Element | null | EventTarget): el is Chip["el"] {
  return (el as Element)?.tagName === "CALCITE-CHIP";
}
