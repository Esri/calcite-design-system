import { select } from "@storybook/addon-knobs";
import { boolean, iconNames } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Notice",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      theme="light"
      ${boolean("icon", true)}
      ${boolean("active", true)}
      ${boolean("dismissible", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      color="${select("color", ["green", "red", "yellow", "blue"], "blue")}"
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
    </calcite-notice>
  </div>
`;

export const CustomIcon = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      theme="light"
      icon="${select("icon", iconNames, iconNames[0])}"
      ${boolean("active", true)}
      ${boolean("dismissible", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      color="${select("color", ["green", "red", "yellow", "blue"], "blue")}"
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
    </calcite-notice>
  </div>
`;

CustomIcon.story = {
  name: "Custom icon"
};

export const DarkMode = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      theme="dark"
      ${boolean("icon", true)}
      ${boolean("active", true)}
      ${boolean("dismissible", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      color="${select("color", ["green", "red", "yellow", "blue"], "red")}"
    >
      <div slot="title">This is a destructive action</div>
      <div slot="message">Be sure you know what you are doin, folks.</div>
    </calcite-notice>
  </div>
`;

DarkMode.story = {
  parameters: { backgrounds: darkBackground }
};

export const Rtl = (): string => html`
  <div dir="rtl" style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      theme="light"
      ${boolean("icon", true)}
      ${boolean("active", true)}
      ${boolean("dismissible", true)}
      width="${select("width", ["auto", "half", "full"], "auto")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      color="${select("color", ["green", "red", "yellow", "blue"], "blue")}"
      active
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
    </calcite-notice>
  </div>
`;

Rtl.story = {
  name: "RTL"
};
