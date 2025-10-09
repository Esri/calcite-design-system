import { withThemeByClassName } from "@storybook/addon-themes";
import { CSS_UTILITY } from "../src/utils/resources";
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

/**
 * This helper creates a story that captures all breakpoints across all scales for testing.
 *
 * @param singleStoryHtml – HTML story template with placeholders for `scale` attributes (e.g., `{scale}`). You can additionally use `.breakpoint-stories-container` and `.breakpoint-story-container` to style breakpoint story containers.
 * @param [focused] – when specified, creates a single story for the provided breakpoint and scale.
 *   This should only be used if multiple stories cannot be displayed side-by-side.
 * @param focused.breakpoint
 * @param focused.scale
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

/**
 * Returns boolean property name if value is true. If value is false, returns an empty string.
 *
 * @param prop name of boolean property
 * @param value value of boolean property
 */
export const boolean = (prop: string, value: boolean): string => {
  return value ? prop : "";
};
