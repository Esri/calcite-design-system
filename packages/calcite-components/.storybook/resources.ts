import {
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
  IconType,
  CollapseDirection,
  SelectionAppearance,
} from "../../calcite-components/src/components/interfaces.ts";
import { ArrowType } from "../src/components/carousel/interfaces.ts";
import { BlockSectionToggleDisplay } from "../src/components/block-section/interfaces.ts";
import { TileSelectGroupDir } from "../src/components/tile-select-group/interfaces.ts";
import { TileSelectType } from "../src/components/tile-select/interfaces.ts";
import { TableInteractionMode } from "../src/components/table/interfaces.ts";
import { DeterminateType } from "../src/components/loader/interfaces.ts";
import { MeterFillType, MeterLabelType } from "../src/components/meter/interfaces.ts";
import { DropdownClickType } from "../src/components/dropdown/interfaces.ts";
import { TextType } from "../src/components/input/interfaces.ts";
import { TimeZoneMode } from "../src/components/input-time-zone/interfaces.ts";
import { DisplayMode } from "../src/components/sheet/interfaces.ts";
import { ShellDisplayMode } from "../src/components/shell/interfaces.ts";

interface AttributeMetadata<T> {
  values: T[];
  defaultValue: T;
}

interface CommonAttributes {
  alignment: AttributeMetadata<Alignment>;
  appearance: AttributeMetadata<Appearance>;
  scale: AttributeMetadata<Scale>;
  logicalFlowPosition: AttributeMetadata<LogicalFlowPosition>;
  position: AttributeMetadata<Position>;
  status: AttributeMetadata<Status>;
  kind: AttributeMetadata<Kind>;
  width: AttributeMetadata<Width>;
  selectionMode: AttributeMetadata<SelectionMode>;
  arrowType: AttributeMetadata<ArrowType>;
  displayMode: AttributeMetadata<DisplayMode>;
  toggleDisplay: AttributeMetadata<BlockSectionToggleDisplay>;
  layout: AttributeMetadata<Layout>;
  dir: AttributeMetadata<TileSelectGroupDir>;
  buttonType: AttributeMetadata<TileSelectType>;
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
}

const logicalFlowPositionOptions: LogicalFlowPosition[] = ["inline-start", "inline-end", "block-start", "block-end"];
const positionOptions: Position[] = ["start", "end", "top", "bottom"];
const scaleOptions: Scale[] = ["s", "m", "l"];
const alignmentOptions: Alignment[] = ["start", "center", "end"];
const appearanceOptions: Appearance[] = ["solid", "outline", "outline-fill", "transparent"];
const statusOptions: Status[] = ["invalid", "valid", "idle"];
const kindOptions: Kind[] = ["brand", "danger", "info", "inverse", "neutral", "warning", "success"];
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
const dirOptions: TileSelectGroupDir[] = ["ltr", "rtl"];
const buttonTypeOptions: TileSelectType[] = ["radio", "checkbox"];
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
const selectionAppearanceOptions: SelectionAppearance[] = ["icon", "border"];
const shellDisplayModeOptions: ShellDisplayMode[] = ["dock", "float", "overlay"];

export const ATTRIBUTES: CommonAttributes = {
  alignment: {
    values: alignmentOptions,
    defaultValue: alignmentOptions[0],
  },
  appearance: {
    values: appearanceOptions,
    defaultValue: appearanceOptions[0],
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
  buttonType: {
    values: buttonTypeOptions,
    defaultValue: buttonTypeOptions[0],
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
  selectionAppearance: {
    values: selectionAppearanceOptions,
    defaultValue: selectionAppearanceOptions[0],
  },
  shellDisplayMode: {
    values: shellDisplayModeOptions,
    defaultValue: shellDisplayModeOptions[0],
  },
};
