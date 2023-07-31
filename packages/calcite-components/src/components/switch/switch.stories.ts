import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Switch",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-switch
    name="setting"
    value="enabled"
    ${boolean("checked", true)}
    ${boolean("disabled", false)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-switch>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-switch
    class="calcite-mode-dark"
    name="setting"
    value="enabled"
    ${boolean("checked", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-switch>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-switch disabled checked></calcite-switch>`;

export const Focus_TestOnly = (): string =>
  html`
    <calcite-switch> </calcite-switch>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-switch");
        await document.querySelector("calcite-switch").focus();
      })();
    </script>
  `;
