import { html } from "../../../support/formatting";

type FieldSetStoryArgs = {
  disabled: boolean;
  gap: string;
  layout: "vertical" | "horizontal";
};

export default {
  title: "Components/Field Set",
  parameters: {
    layout: "padded",
  },
  args: {
    disabled: false,
    gap: "var(--calcite-space-md)",
    layout: "vertical",
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    gap: {
      control: { type: "text" },
    },
    layout: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
    },
  },
};

export const simple = (args: FieldSetStoryArgs): string => html`
  <calcite-field-set
    ${args.disabled ? "disabled" : ""}
    layout="${args.layout}"
    style="--calcite-field-set-gap: ${args.gap};"
  >
    <div slot="legend">Field Set legend</div>
    <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    <calcite-input label-text="Label" placeholder="Placeholder" disabled></calcite-input>
    <calcite-input
      label-text="Label"
      placeholder="Placeholder"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input>
    <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    <calcite-input label-text="Label" placeholder="Placeholder" disabled></calcite-input>
    <calcite-input
      label-text="Label"
      placeholder="Placeholder"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input>
  </calcite-field-set>
`;
