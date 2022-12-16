/* Note: using `.d.ts` file extension will exclude it from the output build */
export type Alignment = "start" | "center" | "end";
export type Appearance = "minimal" | "outline" | "outline-fill" | "solid" | "transparent";
export type Columns = 1 | 2 | 3 | 4 | 5 | 6;
export type FlipContext = "both" | "start" | "end";
export type Kind = "brand" | "danger" | "info" | "inverse" | "neutral" | "warning" | "success";
export type Layout = "horizontal" | "vertical" | "grid";
export type LogicalFlowPosition = "inline-start" | "inline-end" | "block-start" | "block-end";
export type Position = "start" | "end";
export type SelectionMode = "single" | "none" | "children" | "multichildren" | "ancestors" | "multiple";
export type Scale = "s" | "m" | "l";
export type Status = "invalid" | "valid" | "idle";
export type ThemeClass = "calcite-theme-light" | "calcite-theme-dark" | "calcite-theme-auto";
export type ThemeName = "light" | "dark" | "auto";
export type Width = "auto" | "half" | "full";

// used to help track of event payloads to remove at 1.0.0 – see https://github.com/Esri/calcite-components/issues/3781
/* Note : should be removed before `1.0 */
export type DeprecatedEventPayload = any;
