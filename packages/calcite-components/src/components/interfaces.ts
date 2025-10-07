import { LuminaJsx } from "@arcgis/lumina";
import { CamelCase, ReadonlyTuple } from "type-fest";

export type Alignment = "start" | "center" | "end";
export type Appearance = "solid" | "outline" | "outline-fill" | "transparent";
export interface Dimensions {
  width: number;
  height: number;
}
export type FlipContext = "both" | "start" | "end";
export type Height = Scale;
export type Kind = "brand" | "danger" | "info" | "inverse" | "neutral" | "warning" | "success";
export type Layout =
  | "horizontal"
  | "vertical"
  | "grid"
  | "inline"
  | "center"
  | "auto"
  | "fixed"
  | "none"
  | "horizontal-single";
export type LogicalFlowPosition = "inline-start" | "inline-end" | "block-start" | "block-end";
export type ModeClass = "calcite-mode-light" | "calcite-mode-dark" | "calcite-mode-auto";
export type ModeName = "light" | "dark" | "auto";
export type Position = "start" | "end" | "top" | "bottom";
export type SelectionAppearance = "icon" | "border";
export type SelectionMode =
  | "single"
  | "none"
  | "children"
  | "single-persist"
  | "multichildren"
  | "ancestors"
  | "multiple";
export type Scale = "s" | "m" | "l";
export type Status = "invalid" | "valid" | "idle";
export type Width = Scale | "auto" | "half" | "full";
export type IconType = "chevron" | "caret" | "ellipsis" | "overflow" | "plus-minus";
export type CollapseDirection = "down" | "up";
export type Dir = "ltr" | "rtl";
export type InteractionMode = "interactive" | "static";

/**
 * Helper type for properties decorated with @queryAssignedElements or @queryAssignedNodes
 * that are intended to support exactly one slotted element or node.
 */
export type SingleItemSlotArray<T extends HTMLElement | Node> = ReadonlyTuple<T, 1>;

type RemoveAriaPrefix<K extends string> = K extends `aria-${infer Rest}`
  ? Rest
  : K extends `aria${infer Rest}`
    ? Uncapitalize<Rest>
    : K;

export type AriaAttributesCamelCased = {
  [K in Exclude<keyof LuminaJsx.AriaAttributes, "role"> as CamelCase<
    RemoveAriaPrefix<K & string>
  >]: LuminaJsx.AriaAttributes[K];
};
