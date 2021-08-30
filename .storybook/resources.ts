import { Appearance, Position, Scale } from "../src/components/interfaces";

interface AttributeMetadata<T> {
  values: T[];
  defaultValue: T;
}

interface CommonAttributes {
  scale: AttributeMetadata<Scale>;
  position: AttributeMetadata<Position>;
  appearance: AttributeMetadata<Appearance>;
}

const positionOptions: Position[] = ["start", "end"];
const scaleOptions: Scale[] = ["s", "m", "l"];
const appearanceOptions: Appearance[] = ["solid", "clear", "outline"];

export const ATTRIBUTES: CommonAttributes = {
  scale: {
    values: scaleOptions,
    defaultValue: scaleOptions[1]
  },
  position: {
    values: positionOptions,
    defaultValue: positionOptions[0]
  },
  appearance: {
    values: appearanceOptions,
    defaultValue: appearanceOptions[0]
  }
};
