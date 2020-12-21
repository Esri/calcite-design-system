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

import { colors } from "../node_modules/@esri/calcite-colors/dist/colors";
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

export const globalDocsPage: typeof DocsPage = () => (
  <React.Fragment>
    {/* omit <Title /> as Description includes it (from component READMEs) */}
    <Description />
  </React.Fragment>
);

/**
 * This utility helps build the HTML for a story element.
 * It allows configuration and reuse of attributes between stories.
 *
 * @param tagName - the element tag to create
 * @param attributes - the attribute configuration to apply on the element
 * @param contentHTML - the element's HTML content
 */
export const createComponentHTML = (
  tagName: string,
  attributes: SupportedAttributes,
  contentHTML: string = ""
): string =>
  `<${tagName} ${getAttributes(attributes)
    .map(({ name, value }) => {
      const booleanAttr = typeof value === "boolean";
      if (booleanAttr) {
        return value ? name : "";
      }
      return `${name}="${value}"`;
    })
    .join(" ")}>${contentHTML}</${tagName}>`;

/**
 * Represents an HTML attribute with an associated storybook knob
 */
interface KnobbedAttribute {
  name: string;
  value: KnobbedAttributeValue;
}

type KnobbedAttributeValue = ReturnType<
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

type AttributeValue = string | boolean | number;

/**
 * Represents an HTML attribute and its respective value.
 */
interface SimpleAttribute {
  name: string;
  value: AttributeValue;
}

/**
 * Represents an HTML attribute whose value will be committed dynamically.
 *
 * @deprecated - use attribute map instead.
 */
export interface DeferredAttribute {
  name: string;
  commit: () => Attribute;
}

/**
 * Represents supported HTML attributes in a story.
 */
export type Attribute = KnobbedAttribute | SimpleAttribute;

/**
 * Represents a collection of HTML attributes in a story.
 *
 * @deprecated - use attribute map instead.
 */
export type Attributes = Attribute[];

/**
 * A map where key represents an HTML attribute and the value holds the attribute's value.
 */
export type AttributeMap = Record<string, AttributeFactory>;

/**
 * A function that generates an HTML attribute's associated value to be used in a story.
 */
type AttributeFactory = () => KnobbedAttributeValue | AttributeValue;

/**
 * This object should be used whenever there is an attribute map that needs override support.
 */
type OverridableAttributeMap = {
  map: AttributeMap;
  overrides: AttributeMap;
};

/**
 * This object should be used whenever there is an attribute map that needs excluding attributes.
 */
type IgnorableAttributeMap = {
  map: AttributeMap;
  ignore: string[];
};

type AttributeMapOptions = OverridableAttributeMap | IgnorableAttributeMap;

type AttributeMapCompatible = AttributeMap | AttributeMapOptions;

type SupportedAttributes = Attributes | AttributeMapCompatible;

const getAttributes = (attributes: SupportedAttributes): Attribute[] => {
  if (!isAttributeMapCompatible(attributes)) {
    return attributes.map(({ name, value }) => {
      if (typeof value === "function") {
        value = value();
      }

      return {
        name,
        value
      };
    });
  }

  if (!hasMapOptions(attributes)) {
    return toAttributes(attributes);
  }

  const overrides = "overrides" in attributes ? attributes.overrides : {};

  let attrMap = { ...attributes.map, ...overrides };

  if ("ignore" in attributes) {
    attributes.ignore.forEach((attr) => delete attrMap[attr]);
  }

  return toAttributes(attrMap);
};

const isAttributeMapCompatible = (
  attributes: SupportedAttributes
): attributes is AttributeMapCompatible => !Array.isArray(attributes);

const hasMapOptions = (attributeMap: AttributeMapCompatible): attributeMap is AttributeMapOptions =>
  "map" in attributeMap;

const toAttributes = (attributeMap: AttributeMap): Attribute[] =>
  Object.keys(attributeMap).map((attr) => {
    const value = attributeMap[attr]();

    return {
      name: attr,
      value
    };
  });
