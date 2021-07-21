import { select, number, text } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
import readme from "./readme.md";
import { Steps } from "screener-storybook/src/screener";

const placements = [
  "auto",
  "auto-start",
  "auto-end",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end"
];

const calcite_placements = placements.concat([
  "leading-start",
  "leading",
  "leading-end",
  "trailing-end",
  "trailing",
  "trailing-start",
  "leading-leading",
  "leading-trailing",
  "trailing-leading",
  "trailing-trailing",
  "top-leading",
  "top-trailing",
  "bottom-leading",
  "bottom-trailing",
  "right-leading",
  "right-trailing",
  "left-leading",
  "left-trailing"
]);

const contentHTML = `
<div style="padding:12px 16px; width: 300px;">
  <b>I am a title!</b> <br>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <calcite-link>I am an inline link</calcite-link>
</div>
`;

const referenceElementHTML = `<calcite-popover-manager>Ut enim ad minim veniam, quis <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.</calcite-popover-manager>`;

export default {
  title: "Components/Popover",
  steps: new Steps().wait(500).snapshot("name").end(),
  parameters: {
    notes: readme
  }
};

export const Simple = (): string => {
  return `
      <div style="width: 400px;">
        ${referenceElementHTML}
        <calcite-popover
        class="calcite-theme-light"
          ${boolean("dismissible", false)}
          ${boolean("disable-flip", false)}
          ${boolean("disable-pointer", false)}
          reference-element="reference-element"
          placement="${select("placement", calcite_placements, "auto")}"
          offset-distance="${number("offset-distance", 6)}"
          offset-skidding="${number("offset-skidding", 0)}"
          ${boolean("open", true)}
          text-close="${text("text-close", "Close")}"
        >
          ${contentHTML}
        </calcite-popover>
      </div>
    `;
};

export const RTL = (): string => {
  const { theme } = ATTRIBUTES;

  return `
      <div dir="rtl" style="width: 400px;">
        ${referenceElementHTML}
        <calcite-popover
          class="${select("class", theme.values, theme.defaultValue)}"
          ${boolean("dismissible", false)}
          ${boolean("disable-flip", false)}
          ${boolean("disable-pointer", false)}
          reference-element="reference-element"
          placement="${select("placement", calcite_placements, "auto")}"
          offset-distance="${number("offset-distance", 6)}"
          offset-skidding="${number("offset-skidding", 0)}"
          ${boolean("open", true)}
          text-close="${text("text-close", "Close")}"
        >
          ${contentHTML}
        </calcite-popover>
      </div>
    `;
};

export const DarkMode = (): string => {
  return `
      <div style="width: 400px;">
        ${referenceElementHTML}
        <calcite-popover
        class="calcite-theme-dark"
          ${boolean("dismissible", false)}
          ${boolean("disable-flip", false)}
          ${boolean("disable-pointer", false)}
          reference-element="reference-element"
          placement="${select("placement", calcite_placements, "auto")}"
          offset-distance="${number("offset-distance", 6)}"
          offset-skidding="${number("offset-skidding", 0)}"
          ${boolean("open", true)}
          text-close="${text("text-close", "Close")}"
        >
          ${contentHTML}
        </calcite-popover>
      </div>
    `;
};
