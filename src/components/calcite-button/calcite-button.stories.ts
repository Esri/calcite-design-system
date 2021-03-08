import { text, select } from "@storybook/addon-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import { html } from "../../tests/utils";
import readme from "./readme.md";

export default {
  title: "Components/Buttons/Button",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <calcite-button
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

export const WithIconStart = (): string => html`
  <calcite-button
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

WithIconStart.story = {
  name: "With icon-start"
};

export const WithIconEnd = (): string => html`
  <calcite-button
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    icon-end="${select("icon-end", iconNames, iconNames[0])}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

WithIconEnd.story = {
  name: "With icon-end"
};

export const WithIconStartAndIconEnd = (): string => html`
  <calcite-button
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
    icon-end="${select("icon-end", iconNames, iconNames[0])}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

WithIconStartAndIconEnd.story = {
  name: "With icon-start and icon-end"
};

export const SetWidthContainer = (): string => html`
  <div style="width: 480px; max-width: 100%; background-color: #fff">
    <calcite-button
      width="${select("width", ["auto", "half", "full"], "auto")}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
    >
      ${text("text", "button text here")}
    </calcite-button>
  </div>
`;

SetWidthContainer.story = {
  name: "Set width container"
};

export const Alignment = (): string => html`
  <div style="width: 480px; max-width: 100%; background-color: #fff">
    <calcite-button
      alignment="${select(
        "alignment",
        ["start", "end", "center", "space-between", "icon-start-space-between", "icon-end-space-between"],
        "center"
      )}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
      icon-end="${select("icon-end", iconNames, iconNames[0])}"
    >
      ${text("text", "button text here")}
    </calcite-button>
  </div>
`;

export const SideBySide = (): string => html`
  <div style="width: 300px; max-width: 100%; display: flex; flex-direction: row; background-color: #fff">
    <calcite-button
      width="half"
      appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "outline")}"
      color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    >
      ${text("text", "Back")}
    </calcite-button>
    <calcite-button
      width="half"
      appearance="${select("appearance-2", ["solid", "clear", "outline", "transparent"], "solid")}"
      color="${select("color-2", ["blue", "red", "neutral", "inverse"], "blue")}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
    >
      ${text("text-2", "Some long string")}
    </calcite-button>
  </div>
`;

SideBySide.story = {
  name: "Side by side"
};

export const DarkMode = (): string => html`
  <calcite-button
    theme="dark"
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color", ["blue", "red", "neutral", "inverse"], "blue")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
    icon-end="${select("icon-end", iconNames, iconNames[0])}"
  >
    ${text("text", "button text here")}
  </calcite-button>
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};
