import { storiesOf } from "@storybook/html";
import { text, select } from "@storybook/addon-knobs";
import { iconNames, boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Button", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    (): string => `
    <calcite-button
      appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      ${boolean("round", false)}
      ${boolean("floating", false)}
      href="${text("href", "")}"
      ${boolean("loading", false)}
      ${boolean("disabled", false)}
    >
   ${text("text", "button text here")}
    </calcite-button>
  `
  )
  .add(
    "With icon-start",
    (): string => `
    <calcite-button
      appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      ${boolean("round", false)}
      ${boolean("floating", false)}
      href="${text("href", "")}"
      ${boolean("loading", false)}
      ${boolean("disabled", false)}
      icon-start="${select("icon-start", iconNames, iconNames[0])}">
      ${text("text", "button text here")}
    </calcite-button>
  `
  )
  .add(
    "With icon-end",
    (): string => `
    <calcite-button
      appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      ${boolean("round", false)}
      ${boolean("floating", false)}
      href="${text("href", "")}"
      ${boolean("loading", false)}
      ${boolean("disabled", false)}
      icon-end="${select("icon-end", iconNames, iconNames[0])}">
      ${text("text", "button text here")}
    </calcite-button>
  `
  )
  .add(
    "With icon-start and icon-end",
    (): string => `
    <calcite-button
      appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
      color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      ${boolean("round", false)}
      ${boolean("floating", false)}
      href="${text("href", "")}"
      ${boolean("loading", false)}
      ${boolean("disabled", false)}
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
      icon-end="${select("icon-end", iconNames, iconNames[0])}">
      ${text("text", "button text here")}
    </calcite-button>
  `
  )
  .add(
    "Set width container",
    (): string => `
    <div style="width: 480px; max-width: 100%; background-color: #fff">
      <calcite-button
        width="${select("width", ["auto", "half", "full"], "auto")}"
        icon-start="${select("icon-start", iconNames, iconNames[0])}">
        ${text("text", "button text here")}
      </calcite-button>
    </div>
  `
  )
  .add(
    "Alignment",
    (): string => `
    <div style="width: 480px; max-width: 100%; background-color: #fff">
    <calcite-button
      alignment="${select(
        "alignment",
        ["start", "end", "center", "space-between", "icon-start-space-between", "icon-end-space-between"],
        "center"
      )}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      icon-start="${select("icon-start", iconNames, iconNames[0])}"
      icon-end="${select("icon-end", iconNames, iconNames[0])}">
      ${text("text", "button text here")}
    </calcite-button>
    </div>
    `
  )
  .add(
    "Side by side",
    (): string => `
    <div style="width: 300px; max-width: 100%; display: flex; flex-direction: row; background-color: #fff">
    <calcite-button
    width="half"
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "outline")}"
    color="${select("color", ["blue", "red", "dark", "light"], "blue")}">
    ${text("text", "Back")}
    </calcite-button>
    <calcite-button
    width="half"
    appearance="${select("appearance-2", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color-2", ["blue", "red", "dark", "light"], "blue")}"
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
    >
    ${text("text-2", "Some long string")}
    </calcite-button>
  </div>
  `
  )
  .add(
    "Dark mode",
    (): string => `
    <calcite-button
    theme="dark"
    appearance="${select("appearance", ["solid", "clear", "outline", "transparent"], "solid")}"
    color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("round", false)}
    ${boolean("floating", false)}
    href="${text("href", "")}"
    ${boolean("loading", false)}
    ${boolean("disabled", false)}
    icon-start="${select("icon-start", iconNames, iconNames[0])}"
    icon-end="${select("icon-end", iconNames, iconNames[0])}"
    >
    ${text("text", "button text here")}
  </calcite-button>
  `,
    { backgrounds: darkBackground }
  );
