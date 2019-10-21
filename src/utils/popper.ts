import Popper from "popper.js";
import { getElementDir } from "../utils/dom";

type PlacementRtl =
  | "leading-start"
  | "leading"
  | "leading-end"
  | "trailing-end"
  | "trailing"
  | "trailing-start";

export type CalcitePlacement = Popper.Placement | PlacementRtl;

export function getPlacement(
  el: HTMLElement,
  placement: CalcitePlacement
): Popper.Placement {
  const values = ["left", "right"];

  if (getElementDir(el) === "rtl") {
    values.reverse();
  }

  return placement
    .replace(/leading/gi, values[0])
    .replace(/trailing/gi, values[1]) as Popper.Placement;
}
