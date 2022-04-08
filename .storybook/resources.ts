import { Alignment, Appearance, Position, Scale } from "../src/components/interfaces";

interface AttributeMetadata<T> {
  values: T[];
  defaultValue: T;
}

interface CommonAttributes {
  alignment: AttributeMetadata<Alignment>;
  appearance: AttributeMetadata<Appearance>;
  scale: AttributeMetadata<Scale>;
  position: AttributeMetadata<Position>;
}

const positionOptions: Position[] = ["start", "end"];
const scaleOptions: Scale[] = ["s", "m", "l"];
const alignmentOptions: Alignment[] = ["start", "center", "end"];
const appearanceOptions: Appearance[] = ["solid", "clear", "outline"];

export const ATTRIBUTES: CommonAttributes = {
  alignment: {
    values: alignmentOptions,
    defaultValue: alignmentOptions[0]
  },
  appearance: {
    values: appearanceOptions,
    defaultValue: appearanceOptions[0]
  },
  position: {
    values: positionOptions,
    defaultValue: positionOptions[0]
  },
  scale: {
    values: scaleOptions,
    defaultValue: scaleOptions[1]
  }
};
