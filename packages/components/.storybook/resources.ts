import type {
  Alignment,
  Appearance,
  LogicalFlowPosition,
  Position,
  Scale,
  Status,
  Kind,
  Width,
  SelectionMode,
  Layout,
  Dir,
  IconType,
  CollapseDirection,
  SelectionAppearance,
} from "../src/components/types.ts";
import type { ArrowType } from "../src/components/carousel/types.ts";
import type { PaginationPosition } from "../src/components/carousel/types.ts";
import type { BlockSectionToggleDisplay } from "../src/components/block-section/types.ts";
import type { TableInteractionMode } from "../src/components/table/types.ts";
import type { DeterminateType } from "../src/components/loader/types.ts";
import type { MeterFillType, MeterLabelType } from "../src/components/meter/types.ts";
import type { DropdownClickType } from "../src/components/dropdown/types.ts";
import type { TextType } from "../src/components/input/types.ts";
import type { TimeZoneMode } from "../src/components/input-time-zone/types.ts";
import type { DisplayMode } from "../src/components/sheet/types.ts";
import type { ShellDisplayMode } from "../src/components/shell/types.ts";
import type { OverlayPositioning } from "../src/utils/floating-ui.ts";
import type { AlertDuration, AlertQueue } from "../src/components/alert/types";
import { defaultMenuPlacement, placements, menuPlacements } from "../src/utils/floating-ui";
import { dialogPlacements } from "../src/components/dialog/resources";
import { supportedNlsLocales } from "../src/components/date-picker/utils";
import { hourFormats } from "../src/utils/time";

interface AttributeMetadata<T> {
  values: T[];
  defaultValue: T;
}

interface CommonAttributes {
  alignment: AttributeMetadata<Alignment>;
  appearance: AttributeMetadata<Appearance>;
  duration: AttributeMetadata<AlertDuration>;
  scale: AttributeMetadata<Scale>;
  logicalFlowPosition: AttributeMetadata<LogicalFlowPosition>;
  position: AttributeMetadata<Position>;
  status: AttributeMetadata<Status>;
  kind: AttributeMetadata<Kind>;
  queue: AttributeMetadata<AlertQueue>;
  width: AttributeMetadata<Width>;
  selectionMode: AttributeMetadata<SelectionMode>;
  arrowType: AttributeMetadata<ArrowType>;
  paginationPosition: AttributeMetadata<PaginationPosition>;
  placement: AttributeMetadata<(typeof placements)[number]>;
  menuPlacement: AttributeMetadata<(typeof menuPlacements)[number]>;
  dialogPlacement: AttributeMetadata<(typeof dialogPlacements)[number]>;
  supportedNlsLocale: AttributeMetadata<(typeof supportedNlsLocales)[number]>;
  hourFormat: AttributeMetadata<(typeof hourFormats)[number]>;
  displayMode: AttributeMetadata<DisplayMode>;
  toggleDisplay: AttributeMetadata<BlockSectionToggleDisplay>;
  layout: AttributeMetadata<Layout>;
  dir: AttributeMetadata<Dir>;
  interactionMode: AttributeMetadata<TableInteractionMode>;
  iconType: AttributeMetadata<IconType>;
  determinateType: AttributeMetadata<DeterminateType>;
  fillType: AttributeMetadata<MeterFillType>;
  labelType: AttributeMetadata<MeterLabelType>;
  clickType: AttributeMetadata<DropdownClickType>;
  collapseDirection: AttributeMetadata<CollapseDirection>;
  textType: AttributeMetadata<TextType>;
  mode: AttributeMetadata<TimeZoneMode>;
  selectionAppearance: AttributeMetadata<SelectionAppearance>;
  shellDisplayMode: AttributeMetadata<ShellDisplayMode>;
  overlayPositioning: AttributeMetadata<OverlayPositioning>;
  numberingSystem: AttributeMetadata<string>;
  calendarCount: AttributeMetadata<number>;
  colorPickerFormat: AttributeMetadata<string>;
  fontSize: AttributeMetadata<string>;
  fontWeight: AttributeMetadata<string>;
  headingLevel: AttributeMetadata<number>;
  headingLevelWithNone: AttributeMetadata<number | "">;
  horizontalVerticalLayout: AttributeMetadata<Extract<Layout, "horizontal" | "vertical">>;
  labelLayout: AttributeMetadata<string>;
  listDisplayMode: AttributeMetadata<string>;
  monthStyle: AttributeMetadata<string>;
  numberingSystemWithNone: AttributeMetadata<string>;
  selectionDisplay: AttributeMetadata<string>;
  sliderFillPlacement: AttributeMetadata<string>;
  sortHandlePlacement: AttributeMetadata<string>;
  textAreaWrap: AttributeMetadata<string>;
  tileSelectionAppearance: AttributeMetadata<Extract<SelectionAppearance, "icon" | "highlight">>;
  tileSelectionMode: AttributeMetadata<Extract<SelectionMode, "none" | "single" | "multiple">>;
  timeZoneOffsetStyle: AttributeMetadata<string>;
}

const logicalFlowPositionOptions: LogicalFlowPosition[] = ["inline-start", "inline-end", "block-start", "block-end"];
const positionOptions: Position[] = ["start", "end", "top", "bottom"];
const scaleOptions: Scale[] = ["s", "m", "l"];
const durationOptions: AlertDuration[] = ["slow", "medium", "fast"];
const alignmentOptions: Alignment[] = ["start", "center", "end"];
const appearanceOptions: Appearance[] = ["solid", "outline", "outline-fill", "transparent"];
const statusOptions: Status[] = ["invalid", "valid", "idle"];
const kindOptions: Kind[] = ["brand", "danger", "info", "inverse", "neutral", "warning", "success"];
const queueOptions: AlertQueue[] = ["last", "next", "immediate"];
const widthOptions: Width[] = ["auto", "half", "full"];
const selectionModeOptions: SelectionMode[] = [
  "single",
  "none",
  "children",
  "single-persist",
  "multichildren",
  "ancestors",
  "multiple",
];
const arrowTypeOptions: ArrowType[] = ["inline", "edge", "none"];
const paginationPositionOptions: PaginationPosition[] = ["bottom", "top"];
const displayModeOptions: DisplayMode[] = ["float", "overlay"];
const toggleDisplayOptions: BlockSectionToggleDisplay[] = ["button", "switch"];
const layoutOptions: Layout[] = [
  "horizontal",
  "vertical",
  "grid",
  "inline",
  "center",
  "auto",
  "fixed",
  "none",
  "horizontal-single",
];
const numberingSystems = ["arab", "arabext", "latn"];
const dirOptions: Dir[] = ["ltr", "rtl"];
const interactionModeOptions: TableInteractionMode[] = ["interactive", "static"];
const iconTypeOptions: IconType[] = ["chevron", "caret", "ellipsis", "overflow", "plus-minus"];
const determinateTypeOptions: DeterminateType[] = ["determinate", "indeterminate"];
const fillTypeOptions: MeterFillType[] = ["single", "range"];
const labelTypeOptions: MeterLabelType[] = ["percent", "units"];
const clickTypeOptions: DropdownClickType[] = ["click", "hover"];
const collapseDirectionOptions: CollapseDirection[] = ["down", "up"];
const textTypeOptions: TextType[] = [
  "text",
  "textarea",
  "email",
  "password",
  "tel",
  "number",
  "search",
  "file",
  "time",
  "date",
];
const modeOptions: TimeZoneMode[] = ["offset", "name"];
const selectionAppearanceOptions: SelectionAppearance[] = ["icon", "border", "neutral", "highlight"];
const overlayPositioningOptions: OverlayPositioning[] = ["absolute", "fixed"];
const shellDisplayModeOptions: ShellDisplayMode[] = ["dock", "float", "overlay"];
const calendarCountOptions = [1, 2];
const colorPickerFormatOptions = [
  "auto",
  "hex",
  "hexa",
  "rgb-css",
  "rgba-css",
  "hsl-css",
  "hsla-css",
  "rgb",
  "rgba",
  "hsl",
  "hsla",
  "hsv",
  "hsva",
];
const fontSizeOptions = ["12", "14", "16", "18", "20", "24", "32"];
const fontWeightOptions = ["300", "400", "500", "700"];
const headingLevelOptions: number[] = [1, 2, 3, 4, 5, 6];
const headingLevelWithNoneOptions: (number | "")[] = ["", ...headingLevelOptions];
const horizontalVerticalLayoutOptions: Extract<Layout, "horizontal" | "vertical">[] = ["horizontal", "vertical"];
const labelLayoutOptions = ["default", "block", "inline", "inline-space-between"];
const listDisplayModeOptions = ["flat", "nested"];
const monthStyleOptions = ["wide", "abbreviated"];
const numberingSystemWithNoneOptions = ["", "arab", "latn"];
const selectionDisplayOptions = ["none", "top"];
const sliderFillPlacementOptions = ["all", "none", "single"];
const sortHandlePlacementOptions = ["leading-start", "leading-end", "trailing-start", "trailing-end"];
const textAreaWrapOptions = ["hard", "soft"];
const tileSelectionAppearanceOptions: Extract<SelectionAppearance, "icon" | "highlight">[] = ["icon", "highlight"];
const tileSelectionModeOptions: Extract<SelectionMode, "none" | "single" | "multiple">[] = [
  "none",
  "single",
  "multiple",
];
const timeZoneOffsetStyleOptions = ["user", "utc", "gmt"];

export const ATTRIBUTES: CommonAttributes = {
  alignment: {
    values: alignmentOptions,
    defaultValue: alignmentOptions[0],
  },
  appearance: {
    values: appearanceOptions,
    defaultValue: appearanceOptions[0],
  },
  duration: {
    values: durationOptions,
    defaultValue: durationOptions[1],
  },
  logicalFlowPosition: {
    values: logicalFlowPositionOptions,
    defaultValue: logicalFlowPositionOptions[2],
  },
  position: {
    values: positionOptions,
    defaultValue: positionOptions[0],
  },
  scale: {
    values: scaleOptions,
    defaultValue: scaleOptions[1],
  },
  status: {
    values: statusOptions,
    defaultValue: statusOptions[2],
  },
  kind: {
    values: kindOptions,
    defaultValue: kindOptions[0],
  },
  queue: {
    values: queueOptions,
    defaultValue: queueOptions[0],
  },
  width: {
    values: widthOptions,
    defaultValue: widthOptions[0],
  },
  selectionMode: {
    values: selectionModeOptions,
    defaultValue: selectionModeOptions[6],
  },
  arrowType: {
    values: arrowTypeOptions,
    defaultValue: arrowTypeOptions[0],
  },
  paginationPosition: {
    values: paginationPositionOptions,
    defaultValue: paginationPositionOptions[0],
  },
  placement: {
    values: [...placements],
    defaultValue: placements[0],
  },
  menuPlacement: {
    values: menuPlacements,
    defaultValue: defaultMenuPlacement,
  },
  dialogPlacement: {
    values: dialogPlacements,
    defaultValue: dialogPlacements[7],
  },
  supportedNlsLocale: {
    values: supportedNlsLocales,
    defaultValue: supportedNlsLocales[0],
  },
  hourFormat: {
    values: hourFormats,
    defaultValue: hourFormats[0],
  },
  displayMode: {
    values: displayModeOptions,
    defaultValue: displayModeOptions[0],
  },
  toggleDisplay: {
    values: toggleDisplayOptions,
    defaultValue: toggleDisplayOptions[0],
  },
  layout: {
    values: layoutOptions,
    defaultValue: layoutOptions[0],
  },
  dir: {
    values: dirOptions,
    defaultValue: dirOptions[0],
  },
  interactionMode: {
    values: interactionModeOptions,
    defaultValue: interactionModeOptions[0],
  },
  iconType: {
    values: iconTypeOptions,
    defaultValue: iconTypeOptions[0],
  },
  determinateType: {
    values: determinateTypeOptions,
    defaultValue: determinateTypeOptions[0],
  },
  fillType: {
    values: fillTypeOptions,
    defaultValue: fillTypeOptions[1],
  },
  labelType: {
    values: labelTypeOptions,
    defaultValue: labelTypeOptions[0],
  },
  clickType: {
    values: clickTypeOptions,
    defaultValue: clickTypeOptions[0],
  },
  collapseDirection: {
    values: collapseDirectionOptions,
    defaultValue: collapseDirectionOptions[0],
  },
  textType: {
    values: textTypeOptions,
    defaultValue: textTypeOptions[0],
  },
  mode: {
    values: modeOptions,
    defaultValue: modeOptions[0],
  },
  overlayPositioning: {
    values: overlayPositioningOptions,
    defaultValue: overlayPositioningOptions[0],
  },
  selectionAppearance: {
    values: selectionAppearanceOptions,
    defaultValue: selectionAppearanceOptions[0],
  },
  shellDisplayMode: {
    values: shellDisplayModeOptions,
    defaultValue: shellDisplayModeOptions[0],
  },
  numberingSystem: {
    values: numberingSystems,
    defaultValue: numberingSystems[2],
  },
  calendarCount: {
    values: calendarCountOptions,
    defaultValue: calendarCountOptions[1],
  },
  colorPickerFormat: {
    values: colorPickerFormatOptions,
    defaultValue: colorPickerFormatOptions[0],
  },
  fontSize: {
    values: fontSizeOptions,
    defaultValue: fontSizeOptions[2],
  },
  fontWeight: {
    values: fontWeightOptions,
    defaultValue: fontWeightOptions[1],
  },
  headingLevel: {
    values: headingLevelOptions,
    defaultValue: 1,
  },
  headingLevelWithNone: {
    values: headingLevelWithNoneOptions,
    defaultValue: "",
  },
  horizontalVerticalLayout: {
    values: horizontalVerticalLayoutOptions,
    defaultValue: horizontalVerticalLayoutOptions[0],
  },
  labelLayout: {
    values: labelLayoutOptions,
    defaultValue: labelLayoutOptions[1],
  },
  listDisplayMode: {
    values: listDisplayModeOptions,
    defaultValue: listDisplayModeOptions[0],
  },
  monthStyle: {
    values: monthStyleOptions,
    defaultValue: monthStyleOptions[0],
  },
  numberingSystemWithNone: {
    values: numberingSystemWithNoneOptions,
    defaultValue: numberingSystemWithNoneOptions[0],
  },
  selectionDisplay: {
    values: selectionDisplayOptions,
    defaultValue: selectionDisplayOptions[1],
  },
  sliderFillPlacement: {
    values: sliderFillPlacementOptions,
    defaultValue: sliderFillPlacementOptions[0],
  },
  sortHandlePlacement: {
    values: sortHandlePlacementOptions,
    defaultValue: sortHandlePlacementOptions[0],
  },
  textAreaWrap: {
    values: textAreaWrapOptions,
    defaultValue: textAreaWrapOptions[1],
  },
  tileSelectionAppearance: {
    values: tileSelectionAppearanceOptions,
    defaultValue: tileSelectionAppearanceOptions[0],
  },
  tileSelectionMode: {
    values: tileSelectionModeOptions,
    defaultValue: tileSelectionModeOptions[0],
  },
  timeZoneOffsetStyle: {
    values: timeZoneOffsetStyleOptions,
    defaultValue: timeZoneOffsetStyleOptions[0],
  },
};
