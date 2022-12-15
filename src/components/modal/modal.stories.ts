import { select, text, number } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Modal",
  parameters: {
    notes: readme,
    chromatic: {
      delay: 500
    }
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-modal
    ${boolean("open", true)}
    kind="${select("kind", ["brand", "danger", "info", "success", "warning"], "")}"
    background-color="${select("background-color", ["white", "grey"], "white")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["s", "m", "l"], "s")}"
    ${boolean("fullscreen", false)}
    ${boolean("docked", false)}
    ${boolean("escape-disabled", false)}
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

export const darkThemeRTLCustomSize_TestOnly = (): string => html`
  <calcite-modal
    class="calcite-theme-dark"
    dir="rtl"
    ${boolean("open", true)}
    kind="${select("kind", ["brand", "danger", "info", "success", "warning"], "")}"
    background-color="${select("background-color", ["white", "grey"], "white")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${number("width", 300)}"
    ${boolean("fullscreen", false)}
    ${boolean("docked", false)}
    ${boolean("escape-disabled", false)}
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

darkThemeRTLCustomSize_TestOnly.parameters = { themes: themesDarkDefault };

export const withTooltips_TestOnly = (): string => html`
  <button id="button">Open</button>
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-modal open aria-labelledby="modal-title" id="modal">
    <div slot="header" id="modal-title">Modal title</div>
    <div slot="content">
      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="back" color="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
  <calcite-tooltip open label="Back" reference-element="back-button-modal">Back</calcite-tooltip>
`;
