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
