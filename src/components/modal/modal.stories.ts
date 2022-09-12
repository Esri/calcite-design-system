import { select, text, number } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Modal",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-modal
    ${boolean("open", true)}
    color="${select("color", { blue: "blue", red: "red", none: "" }, "")}"
    background-color="${select("background-color", ["white", "grey"], "white")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["s", "m", "l"], "s")}"
    ${boolean("fullscreen", false)}
    ${boolean("docked", false)}
    ${boolean("disable-escape", false)}
    ${boolean("no-padding", false)}
    intl-close="${text("intl-close", "Close")}"
  >
    <h3 slot="header">Small Modal</h3>
    <div slot="content">
      <p>The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.</p>
    </div>
    <calcite-button slot="back" color="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`;

export const darkThemeRTLCustomSize_NoTest = (): string => html`
  <calcite-modal
    class="calcite-theme-dark"
    dir="rtl"
    ${boolean("open", true)}
    color="${select("color", { blue: "blue", red: "red", none: "" }, "")}"
    background-color="${select("background-color", ["white", "grey"], "white")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${number("width", 300)}"
    ${boolean("fullscreen", false)}
    ${boolean("docked", false)}
    ${boolean("disable-escape", false)}
    ${boolean("no-padding", false)}
    intl-close="${text("intl-close", "Close")}"
  >
    <h3 slot="header">Small Modal</h3>
    <div slot="content">
      <p>
        The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can
        customize the size using the width attribute.
      </p>
    </div>
    <calcite-button slot="back" color="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`;

darkThemeRTLCustomSize_NoTest.parameters = { themes: themesDarkDefault };
