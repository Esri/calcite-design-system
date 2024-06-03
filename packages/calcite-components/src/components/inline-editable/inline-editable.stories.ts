import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { scale, alignment } = ATTRIBUTES;

interface InlineEditableArgs {
  scale: string;
  controls: boolean;
  editingEnabled: boolean;
  loading: boolean;
  disabled: boolean;
  alignment: string;
  placeholder: string;
}

export default {
  title: "Components/Controls/Inline Editable",
  args: {
    scale: scale.defaultValue,
    controls: false,
    editingEnabled: false,
    loading: false,
    disabled: false,
    alignment: alignment.defaultValue,
    placeholder: "Placeholder text",
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    alignment: {
      options: alignment.values.filter((option) => option !== "center"),
      control: { type: "select" },
    },
  },
};

export const simple = (args: InlineEditableArgs): string => html`
  <div style="width:300px;max-width:100%;">
    <calcite-inline-editable
      scale="${args.scale}"
      ${boolean("controls", args.controls)}
      ${boolean("editing-enabled", args.editingEnabled)}
      ${boolean("loading", args.loading)}
      ${boolean("disabled", args.disabled)}
    >
      <calcite-input alignment="${args.alignment}" placeholder="${args.placeholder}"> </calcite-input>
    </calcite-inline-editable>
  </div>
`;

export const disabled_TestOnly = (): string => html`
  <calcite-inline-editable disabled>
    <calcite-input value="disabled"></calcite-input>
  </calcite-inline-editable>
  <br />
  <calcite-inline-editable controls disabled editing-enabled loading>
    <calcite-input value="disabled and loading"></calcite-input>
  </calcite-inline-editable>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div dir="rtl" style="width:300px;max-width:100%;">
    <calcite-label class="calcite-mode-dark" status="idle" scale="m" layout="default">
      My great label
      <calcite-inline-editable>
        <calcite-input alignment="start" placeholder="Placeholder text"> </calcite-input>
      </calcite-inline-editable>
      <calcite-input-message status="idle"> My great input message </calcite-input-message>
    </calcite-label>
  </div>
`;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const longValue_TestOnly = (): string =>
  html`<div style="width: 300px;">
    <calcite-inline-editable>
      <calcite-input
        value="A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Angiospermae)."
        placeholder="My placeholder"
      ></calcite-input>
    </calcite-inline-editable>
  </div>`;
