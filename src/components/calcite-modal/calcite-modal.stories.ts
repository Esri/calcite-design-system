import { select, text, number } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

export default {
  title: "Components/Modal",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => {
  return `
      <calcite-modal
        ${boolean("active", true)}
        color="${select("color", { blue: "blue", red: "red", none: null }, null)}"
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
          <p>
            The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.
          </p>
        </div>
        <calcite-button slot="back" color="neutral" appearance="outline" icon="chevron-left" width="full">Back</calcite-button>
        <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
        <calcite-button slot="primary" width="full">Save</calcite-button>
      </calcite-modal>
    `;
};

export const CustomSize = (): string => {
  return `
      <calcite-modal
        active
        width="${number("width", 500)}"
      >
        <h3 slot="header">Custom Size</h3>
        <div slot="content">
          <p>
            By passing a number rather than "small", "medium", "large", or "fullscreen", you can set your own max width for the modal.
            Below this size, the modal will become fullscreen.
          </p>
        </div>
        <calcite-button slot="back" color="neutral" appearance="outline" icon="chevron-left" width="full">Back</calcite-button>
        <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
        <calcite-button slot="primary" width="full">Save</calcite-button>
      </calcite-modal>
    `;
};

export const DarkMode = (): string => {
  return `
  <calcite-modal
    theme="dark"
    ${boolean("active", true)}
    color="${select("color", { blue: "blue", red: "red", none: null }, null)}"
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
      <p>
        The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.
      </p>
    </div>
    <calcite-button theme="dark" slot="back" color="neutral" appearance="outline" icon="chevron-left" width="full">Back</calcite-button>
    <calcite-button theme="dark" slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button theme="dark" slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`;
};

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};
