import { Alignment, Appearance, LogicalFlowPosition, Position, Scale } from "../src/components/interfaces";

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
}

const logicalFlowPositionOptions: LogicalFlowPosition[] = ["inline-start", "inline-end", "block-start", "block-end"];
const positionOptions: Position[] = ["start", "end"];
const scaleOptions: Scale[] = ["s", "m", "l"];
const alignmentOptions: Alignment[] = ["start", "center", "end"];
const appearanceOptions: Appearance[] = ["solid", "transparent", "outline"];

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
};
