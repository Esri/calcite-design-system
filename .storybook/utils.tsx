/* @jsx React.createElement */

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
import { Description, DocsPage } from "@storybook/addon-docs/blocks";
import React from "react";

const lightValue = {
  name: "Light",
  value: colors["blk-005"]
};

const foregroundValue = {
  name: "Foreground",
  value: colors["blk-000"]
};

const darkValue = {
  name: "Dark",
  value: colors["blk-210"]
};

const foregroundDarkValue = {
  name: "Foreground Dark",
  value: colors["blk-200"]
};

export const backgrounds = {
  default: lightValue.name,
  values: [lightValue, foregroundValue, darkValue, foregroundDarkValue]
};

export const lightBackground = {
  default: lightValue.name,
  values: [lightValue]
};

export const darkBackground = {
  default: darkValue.name,
  values: [darkValue]
};

/**
 * This transforms a component markdown to properly render in Storybook notes.
 */
export const parseReadme = (content) =>
  content
    // the generated readme includes escape characters which actually get rendered, remove them
    .replace(/ \\\| /g, " | ")

    // markdown uses relative paths for component links
    .replace(/\.\.\//g, "https://github.com/Esri/calcite-components/tree/master/src/components/");

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

export const createComponentHTML = (
  tagName: string,
  attributes: Attributes,
  contentHTML: string = ""
): string =>
  `<${tagName} ${attributes
    .map(({ name, value }) => {
      const booleanAttr = typeof value === "boolean";
      if (booleanAttr) {
        return value ? name : "";
      }
      return `${name}="${value}"`;
    })
    .join(" ")}>${contentHTML}</${tagName}>`;

export const globalDocsPage: typeof DocsPage = () => (
  <React.Fragment>
    {/* omit <Title /> as Description includes it (from component READMEs) */}
    <Description />
  </React.Fragment>
);
