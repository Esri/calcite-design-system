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
} from "../src/components/interfaces";

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
}

const logicalFlowPositionOptions: LogicalFlowPosition[] = ["inline-start", "inline-end", "block-start", "block-end"];
const positionOptions: Position[] = ["start", "end"];
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
};
