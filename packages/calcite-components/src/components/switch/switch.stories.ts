import { select } from "../../../.storybook/fake-knobs";
import { boolean } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Controls/Switch",
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

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-switch disabled checked></calcite-switch>`;

export const Focus_TestOnly = (): string => html`
  <div style="width:300px;height:300px; padding: 20px">
    <calcite-switch></calcite-switch>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-switch");
      await document.querySelector("calcite-switch").setFocus();
    })();
  </script>
`;

Focus_TestOnly.parameters = {
  chromatic: { delay: 1000 },
};

export const FocusLabel_TestOnly = (): string => html`
  <div style="width:300px;height:300px; padding: 20px">
    <calcite-label>Switch label<calcite-switch></calcite-switch></calcite-label>
  </div>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-switch");
      await document.querySelector("calcite-switch").setFocus();
    })();
  </script>
`;

FocusLabel_TestOnly.parameters = {
  chromatic: { delay: 1000 },
};
