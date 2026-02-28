import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Switch } from "./switch";

const { scale } = ATTRIBUTES;

type SwitchStoryArgs = Pick<Switch, "checked" | "disabled" | "scale">;

export default {
  title: "Components/Controls/Switch",
  args: {
    checked: true,
    disabled: false,
    scale: scale.defaultValue,
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: SwitchStoryArgs): string => html`
  <calcite-switch
    name="setting"
    value="enabled"
    ${boolean("checked", args.checked)}
    ${boolean("disabled", args.disabled)}
    scale="${args.scale}"
  ></calcite-switch>
`;

export const darkModeRTL = (): string => html`
  <calcite-switch class="calcite-mode-dark" name="setting" value="enabled" checked scale="m"></calcite-switch>
`;

darkModeRTL.parameters = { themes: modesDarkDefault };

export const disabled = (): string => html`<calcite-switch disabled checked></calcite-switch>`;

export const Focus = (): string => html`
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

Focus.parameters = {
  chromatic: { delay: 1000 },
};

export const FocusLabel = (): string => html`
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

FocusLabel.parameters = {
  chromatic: { delay: 1000 },
};
