import type { Dir } from "../types";

export type ActiveSliderProperty = "minValue" | "maxValue" | "value" | "minMaxValue";
export type SetValueProperty = Exclude<ActiveSliderProperty, "minMaxValue">;
export type ThumbType =
  | "min"
  | "min-labeled"
  | "min-precise"
  | "min-histogram"
  | "min-labeled-precise"
  | "min-labeled-histogram"
  | "min-precise-histogram"
  | "min-labeled-precise-histogram"
  | "max"
  | "max-labeled"
  | "max-precise"
  | "max-histogram"
  | "max-labeled-precise"
  | "max-labeled-histogram"
  | "max-precise-histogram"
  | "max-labeled-precise-histogram";
type Percentage = string;
type PercentageString = `${Percentage}%`;
export type SideOffset = { left: PercentageString } | { right: PercentageString };

/**
 * Tick-label text bounds used to detect overlapping labels.
 *
 * `left` and `right` are pixel offsets from the track's minimum-value end,
 * including in mirrored layouts; they are not viewport coordinates.
 */
export interface TickLabelMeasurement extends Pick<DOMRectReadOnly, "left" | "right"> {
  value: number;
  /** Tick position from 0 at min to 1 at max, or 0 when min and max are equal. */
  position: number;
  /** Identifies endpoint labels, which take priority over interior labels. */
  edge?: "min" | "max";
}

/** Cached measurements and visible tick values for one rendered slider layout. */
export interface TickLabelLayout {
  /** Text direction when the layout was measured. */
  direction: Dir;
  /** Rendered labels, including labels whose formatter returned no text. */
  labels: {
    element: HTMLSpanElement;
    /** Absent for empty or whitespace-only label text. */
    measurement?: TickLabelMeasurement;
  }[];
  /** Values selected to be shown; absent when visibility needs recalculation. */
  visibleValues?: Set<number>;
}
