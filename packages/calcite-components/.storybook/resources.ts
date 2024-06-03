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
  ArrowType,
  DisplayMode,
  ToggleDisplay,
  Layout,
  Dir,
  ButtonType,
  InteractionMode,
  IconType,
  DeterminateType,
  FillType,
  LabelType,
  ClickType,
  CollapseDirection,
  TextType,
  Mode,
  SelectionAppearance,
} from "../../calcite-components/src/components/interfaces.ts";

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
  toggleDisplay: AttributeMetadata<ToggleDisplay>;
  layout: AttributeMetadata<Layout>;
  dir: AttributeMetadata<Dir>;
  buttonType: AttributeMetadata<ButtonType>;
  interactionMode: AttributeMetadata<InteractionMode>;
  iconType: AttributeMetadata<IconType>;
  determinateType: AttributeMetadata<DeterminateType>;
  fillType: AttributeMetadata<FillType>;
  labelType: AttributeMetadata<LabelType>;
  clickType: AttributeMetadata<ClickType>;
  collapseDirection: AttributeMetadata<CollapseDirection>;
  textType: AttributeMetadata<TextType>;
  mode: AttributeMetadata<Mode>;
  selectionAppearance: AttributeMetadata<SelectionAppearance>;
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
const displayModeOptions: DisplayMode[] = ["dock", "float", "overlay"];
const toggleDisplayOptions: ToggleDisplay[] = ["button", "switch"];
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
const dirOptions: Dir[] = ["ltr", "rtl"];
const buttonTypeOptions: ButtonType[] = ["radio", "checkbox"];
const interactionModeOptions: InteractionMode[] = ["interactive", "static"];
const iconTypeOptions: IconType[] = ["chevron", "caret", "ellipsis", "overflow", "plus-minus"];
const determinateTypeOptions: DeterminateType[] = ["determinate", "indeterminate"];
const fillTypeOptions: FillType[] = ["single", "range"];
const labelTypeOptions: LabelType[] = ["percent", "units"];
const clickTypeOptions: ClickType[] = ["click", "hover"];
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
const modeOptions: Mode[] = ["offset", "name"];
const selectionAppearanceOptions: SelectionAppearance[] = ["icon", "border"];

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
};
