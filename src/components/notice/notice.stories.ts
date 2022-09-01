import { select } from "@storybook/addon-knobs";
import { boolean, iconNames } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Notice",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      ${boolean("icon", true)}
      ${boolean("open", true)}
      ${boolean("closable", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      color="${select("color", ["green", "red", "yellow", "blue"], "blue")}"
      icon="${select("icon", iconNames, iconNames[0])}"
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
      <calcite-action
        label="Retry"
        icon="reset"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        slot="actions-end"
      ></calcite-action>
    </calcite-notice>
  </div>
`;

export const darkThemeRTL = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      dir="rtl"
      class="calcite-theme-dark"
      ${boolean("icon", true)}
      ${boolean("open", true)}
      ${boolean("closable", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      color="${select("color", ["green", "red", "yellow", "blue"], "red")}"
    >
      <div slot="title">This is a destructive action</div>
      <div slot="message">Be sure you know what you are doin, folks.</div>
    </calcite-notice>
  </div>
`;

darkThemeRTL.parameters = { themes: themesDarkDefault };
