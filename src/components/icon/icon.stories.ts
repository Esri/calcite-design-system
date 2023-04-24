import { select } from "@storybook/addon-knobs";
import { iconNames, boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Icon",
  parameters: { notes: readme },
  ...storyFilters()
};

const sampleIcon = iconNames.find((item) => item === "arrowRight");

export const simple = (): string => html`
  <calcite-icon
    icon="${select("icon", iconNames, sampleIcon)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-icon>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <calcite-icon
    class="calcite-theme-dark"
    dir="rtl"
    icon="${select("icon", iconNames, sampleIcon)}"
    ${boolean("flip-rtl", true)}
  ></calcite-icon>
`;
darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };
