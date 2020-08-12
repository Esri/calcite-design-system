import {
  array,
  boolean,
  button,
  color,
  date,
  files,
  number,
  object,
  optionsKnob as options,
  radios,
  select,
  text
} from "@storybook/addon-knobs";

import colors from "../node_modules/@esri/calcite-colors/colors.json";

export const lightBackground = {
  default: "Light",
  values: [
    {
      name: "Light",
      value: "#f8f8f8"
    }
  ]
};

export const darkBackground = {
  default: "Dark",
  values: [
    {
      name: "Dark",
      value: colors["blk-210"]
    }
  ]
};

/**
 * This transforms a component markdown to properly render in Storybook notes.
 */
export const parseReadme = (content: string): string => {
  return (
    content
      // markdown uses relative paths for component links
      .replace(/\.\.\//g, "https://github.com/Esri/calcite-components/tree/master/src/components/")
  );
};

export interface KnobbedAttribute {
  name: string;
  value: ReturnType<
    | typeof boolean
    | typeof color
    | typeof date
    | typeof number
    | typeof array
    | typeof files
    | typeof button
    | typeof object
    | typeof radios
    | typeof options
    | typeof select
    | typeof text
  >;
}

export interface SimpleAttribute {
  name: string;
  value: string | boolean | number;
}

export type Attribute = KnobbedAttribute | SimpleAttribute;
export type Attributes = Attribute[];

export const createComponentHTML = (tagName: string, attributes: Attributes, contentHTML: string = ""): string =>
  `<${tagName} ${attributes
    .map(({ name, value }) => {
      const booleanAttr = typeof value === "boolean";
      if (booleanAttr) {
        return value ? name : "";
      }
      return `${name}="${value}"`;
    })
    .join(" ")}>${contentHTML}</${tagName}>`;
