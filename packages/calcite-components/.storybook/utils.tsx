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
  text,
} from "@storybook/addon-knobs";
import { CSS_UTILITY } from "../src/utils/resources";

import { colors } from "../../../node_modules/@esri/calcite-colors/dist/colors";
import { Description, DocsPage } from "@storybook/addon-docs";
import { Theme as Mode } from "storybook-addon-themes/dist/models/Theme";
import React from "react";
import { Scale } from "../src/components/interfaces";
import { html } from "../support/formatting";
import { Breakpoints } from "../src/utils/responsive";

const autoValue = {
  name: "Auto",
  value: colors["blk-200"],
};

const lightValue = {
  name: "Light",
  value: colors["blk-005"],
};

const darkValue = {
  name: "Dark",
  value: colors["blk-210"],
};

const list: Mode[] = [
  {
    name: lightValue.name,
    class: CSS_UTILITY.lightMode,
    color: lightValue.value,
  },
  {
    name: darkValue.name,
    class: CSS_UTILITY.darkMode,
    color: darkValue.value,
  },
  {
    name: autoValue.name,
    class: CSS_UTILITY.autoMode,
    color: autoValue.value,
  },
];

export const modes = {
  default: lightValue.name,
  list,
};

export const modesDarkDefault = {
  default: darkValue.name,
  list,
};

/**
 * This transforms a component markdown to properly render in Storybook notes.
 */
export const parseReadme = (content: string) =>
  content
    // the generated readme includes escape characters which actually get rendered, remove them
    .replace(/ \\\| /g, " | ")

    // markdown uses relative paths for component links
    .replace(/\.\.\//g, "https://github.com/Esri/calcite-design-system/tree/main/src/components/");

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

interface DeferredAttribute {
  name: string;
  commit: () => Attribute;
}

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

export const filterComponentAttributes = (
  attributesList: DeferredAttribute[],
  exceptions: string[]
): Attributes => {
  if (!exceptions.length) {
    return attributesList.map((attr) => attr.commit());
  }
  return attributesList
    .filter((attr) => !exceptions.find((except) => except === attr.name))
    .map((attr) => attr.commit());
};

/**
 * This helper creates a story that captures all breakpoints across all scales for testing.
 *
 * @param singleStoryHtml – HTML story template with placeholders for `scale` attributes (e.g., `{scale}`).
 * @param [focused] – when specified, creates a single story for the provided breakpoint and scale.
 *   This should only be used if multiple stories cannot be displayed side-by-side.
 */
export function createBreakpointStories(
  singleStoryHtml: string,
  focused?: { breakpoint: keyof Breakpoints["width"]; scale: Scale }
): string {
  // we hard-code breakpoint values because we can't read them directly from the page when setting up a story
  // based on https://github.com/Esri/calcite-design-tokens/blob/2e8fc1b8f410b5443fa53ca1c12ceef71e651b9a/tokens/core.json#L1533-L1553
  const widthBreakpoints: { name: keyof Breakpoints["width"]; maxWidth: number }[] = [
    { name: "xsmall", maxWidth: 476 },
    { name: "small", maxWidth: 768 },
    { name: "medium", maxWidth: 1152 },
    { name: "large", maxWidth: 1440 },
  ];
  const scales: Scale[] = ["s", "m", "l"];
  const placeholderPattern = /"\{([^}]+)\}"/g;
  const css = {
    storiesContainer: "breakpoint-stories-container",
    storyContainer: "breakpoint-story-container",
  } as const;

  let storyHTML = "";

  scales
    .filter((scale): boolean => !focused || focused.scale === scale)
    .forEach((scale): void => {
      storyHTML += html`<strong>scale = ${scale}</strong>`;

      widthBreakpoints
        .filter(({ name }): boolean => !focused || focused.breakpoint === name)
        .forEach(({ name, maxWidth }): void => {
          storyHTML += html`<strong>breakpoint = ${name}</strong>`;
          storyHTML += html`<div class="${css.storyContainer}" style="width:${maxWidth - 1}px">
            ${singleStoryHtml.replace(placeholderPattern, (_match, placeholder: string) =>
              placeholder === "scale" ? scale : placeholder
            )}
          </div>`;
        });
    });

  return html`<div class="${css.storiesContainer}">
    <style>
      .${css.storiesContainer} {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: flex-start;
      }

      .${css.storyContainer} {
        display: flex;
      }

      .${css.storyContainer} > * {
        flex: 1;
      }
    </style>
    ${storyHTML}
  </div>`;
}
