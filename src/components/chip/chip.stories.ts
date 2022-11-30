import { select } from "@storybook/addon-knobs";
import { iconNames, boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Chip",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["solid", "transparent"], "solid")}"
      color="${select("color", ["blue", "red", "yellow", "green", "grey"], "grey")}"
      ${boolean("closable", false)}
      >My great chip</calcite-chip
    >
  </div>
`;

export const withIcon = (): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip
      icon="${select("icon", iconNames, iconNames[0])}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["solid", "transparent"], "solid")}"
      color="${select("color", ["blue", "red", "yellow", "green", "grey"], "grey")}"
      ${boolean("closable", false)}
    >
      My great chip</calcite-chip
    >
  </div>
`;

export const withImage = (): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-chip
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["solid", "transparent"], "solid")}"
      color="${select("color", ["blue", "red", "yellow", "green", "grey"], "grey")}"
      ${boolean("closable", false)}
    >
      <img alt="" slot="image" src="${placeholderImage({ width: 50, height: 50 })}" />
      My great chip</calcite-chip
    >
  </div>
`;

export const withAvatar = (): string => {
  const scale = select("scale", ["s", "m", "l"], "m");

  return html`
    <div style="background-color:white;padding:100px">
      <calcite-chip
        scale="${scale}"
        appearance="${select("appearance", ["solid", "transparent"], "solid")}"
        color="${select("color", ["blue", "red", "yellow", "green", "grey"], "grey")}"
        ${boolean("closable", false)}
      >
        <calcite-avatar
          slot="image"
          scale="${scale}"
          user-id="25684463a00c449585dbb32a065f6b74"
          full-name="user name"
        ></calcite-avatar>
        User Name
      </calcite-chip>
    </div>
  `;
};

export const overriddenIconColor = (): string =>
  html`<calcite-chip icon="banana" style="--calcite-ui-icon-color: #ac9f42" closable>Banana</calcite-chip>`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-chip
      class="calcite-theme-dark"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      appearance="${select("appearance", ["solid", "transparent"], "solid")}"
      color="${select("color", ["blue", "red", "yellow", "green", "grey"], "grey")}"
      ${boolean("closable", false)}
      >My great chip</calcite-chip
    >
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };
