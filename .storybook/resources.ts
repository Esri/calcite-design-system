import { Appearance, Position, Scale, ThemeClass } from "../src/components/interfaces";

type Direction = "ltr" | "rtl";

interface AttributeMetadata<T> {
  values: T[];
  defaultValue: T;
}

interface CommonAttributes {
  dir: AttributeMetadata<Direction>;
  theme: AttributeMetadata<ThemeClass>;
  scale: AttributeMetadata<Scale>;
  position: AttributeMetadata<Position>;
  appearance: AttributeMetadata<Appearance>;
}

const dirOptions: Direction[] = ["ltr", "rtl"];
const themeOptions: ThemeClass[] = ["calcite-theme-light", "calcite-theme-dark", "calcite-theme-auto"];
const positionOptions: Position[] = ["start", "end"];
const scaleOptions: Scale[] = ["s", "m", "l"];
const appearanceOptions: Appearance[] = ["solid", "clear", "outline"];

export const ATTRIBUTES: CommonAttributes = {
  dir: {
    values: dirOptions,
    defaultValue: dirOptions[0]
  },
  theme: {
    values: themeOptions,
    defaultValue: themeOptions[0]
  },
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
