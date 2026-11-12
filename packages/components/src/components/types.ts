import { LuminaJsx } from "@arcgis/lumina";
import { CamelCase, ReadonlyTuple } from "type-fest";

/** @public */
export type Alignment = "start" | "center" | "end";
/** @public */
export type Appearance = "solid" | "outline" | "outline-fill" | "transparent";
export interface Dimensions {
  width: number;
  height: number;
}
/** @public */
export type FlipContext = "both" | "start" | "end";
/** @public */
export type Height = Scale;
/** @public */
export type Kind = "brand" | "danger" | "info" | "inverse" | "neutral" | "warning" | "success";
/** @public */
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
/** @public */
export type LogicalFlowPosition = "inline-start" | "inline-end" | "block-start" | "block-end";

/**
 * Mode classes.
 *
 * @deprecated in v5.2.0, removal target v7.0.0. Use the CSS `color-scheme` property to set the theme.
 * @see [MDN - color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)
 */
export type ModeClass = "calcite-mode-light" | "calcite-mode-dark" | "calcite-mode-auto";

export type ModeName = "light" | "dark" | "auto";
/** @public */
export type Position = "start" | "end" | "top" | "bottom";
export interface ResizeValues {
  inlineSize: number | null;
  blockSize: number | null;
  minInlineSize: number | null;
  minBlockSize: number | null;
  maxInlineSize: number | null;
  maxBlockSize: number | null;
}
/** @public */
export type SelectionAppearance = "icon" | "border" | "neutral" | "highlight";
/** @public */
export type SelectionMode =
  | "single"
  | "none"
  | "children"
  | "single-persist"
  | "multichildren"
  | "ancestors"
  | "multiple";
/** @public */
export type Scale = "s" | "m" | "l";
/** @public */
export type Status = "invalid" | "valid" | "idle";
/** @public */
export type Width = Scale | "auto" | "half" | "full";
/** @public */
export type IconType = "chevron" | "caret" | "ellipsis" | "overflow" | "plus-minus";
/** @public */
export type CollapseDirection = "down" | "up";
export type Dir = "ltr" | "rtl";
/** @public */
export type InteractionMode = "interactive" | "static";

/**
 * Helper type for properties decorated with @queryAssignedElements or @queryAssignedNodes
 * that are intended to support exactly one slotted element or node.
 */
export type SingleItemSlotArray<T extends HTMLElement | Node> = ReadonlyTuple<T, 1>;

/** @public */
type RemoveAriaPrefix<K extends string> = K extends `aria-${infer Rest}`
  ? Rest
  : K extends `aria${infer Rest}`
    ? Uncapitalize<Rest>
    : K;

/** @public */
export type AriaAttributesCamelCased = {
  [K in Exclude<keyof LuminaJsx.AriaAttributes, "role"> as CamelCase<
    RemoveAriaPrefix<K & string>
  >]: LuminaJsx.AriaAttributes[K];
};

/**
 * This type is used to represent a union of all possible values in a given object.
 */
export type ValueUnion<T> = T[keyof T];

/**
 * Creates a bivariant function type using TypeScript's method bivariance behavior.
 * Commonly used for callback and event handler types.
 */
export type BivariantHandler<Arg, Return> = {
  // eslint-disable-next-line @typescript-eslint/method-signature-style -- needed for bivariance see https://www.typescriptlang.org/tsconfig/#strictFunctionTypes
  bivarianceHack(detail: Arg): Return;
}["bivarianceHack"];
