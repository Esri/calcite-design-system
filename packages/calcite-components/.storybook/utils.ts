import { CSS_UTILITY } from "../src/utils/resources";
import { withThemeByClassName } from "@storybook/addon-themes";
import { Scale } from "../src/components/interfaces";
import { html } from "../support/formatting";
import { Breakpoints } from "../src/utils/responsive";

export const themeDecorator = withThemeByClassName({
  themes: {
    auto: CSS_UTILITY.autoMode,
    light: CSS_UTILITY.lightMode,
    dark: CSS_UTILITY.darkMode,
  },
  defaultTheme: "light",
});

export const modesDarkDefault = {
  themeOverride: "dark",
};

export interface KnobbedAttribute {
  name: string;
  value: ReturnType<any>;
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

export const filterComponentAttributes = (attributesList: DeferredAttribute[], exceptions: string[]): Attributes => {
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
 * @param singleStoryHtml – HTML story template with placeholders for `scale` attributes (e.g., `{scale}`). You can additionally use `.breakpoint-stories-container` and `.breakpoint-story-container` to style breakpoint story containers.
 * @param [focused] – when specified, creates a single story for the provided breakpoint and scale.
 *   This should only be used if multiple stories cannot be displayed side-by-side.
 */
export function createBreakpointStories(
  singleStoryHtml: string,
  focused?: { breakpoint: keyof Breakpoints["width"]; scale: Scale },
): string {
  // we hard-code breakpoint values because we can't read them directly from the page when setting up a story
  // based on https://github.com/Esri/calcite-design-tokens/blob/2e8fc1b8f410b5443fa53ca1c12ceef71e651b9a/tokens/core.json#L1533-L1553
  const widthBreakpoints: { name: keyof Breakpoints["width"]; maxWidth: number }[] = [
    { name: "xxsmall", maxWidth: 320 },
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
              placeholder === "scale" ? scale : placeholder,
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
