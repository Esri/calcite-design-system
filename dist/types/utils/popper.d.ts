import Popper from "popper.js";
declare type PlacementRtl = "leading-start" | "leading" | "leading-end" | "trailing-end" | "trailing" | "trailing-start";
export declare type CalcitePlacement = Popper.Placement | PlacementRtl;
export declare function getPlacement(el: HTMLElement, placement: CalcitePlacement): Popper.Placement;
export {};
