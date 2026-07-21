import { html } from "../../../support/formatting";

type FieldSetStoryArgs = {
  disabled: boolean;
  layout: "vertical" | "horizontal";
};

export default {
  title: "Components/Field Set",
  args: {
    disabled: false,
    layout: "vertical",
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    layout: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
    },
  },
};

export const simple = (args: FieldSetStoryArgs): string => html`
  <calcite-field-set ${args.disabled ? "disabled" : ""} layout="${args.layout}">
    <div slot="legend">Field Set</div>
    <calcite-input label-text="Region" placeholder="Enter your region"></calcite-input>
    <calcite-input label-text="Region" placeholder="Enter your region" disabled></calcite-input>
    <calcite-input
      label-text="Region"
      placeholder="Enter your region"
      status="invalid"
      validation-message="This field is required."
      validation-icon="frown"
    ></calcite-input>
  </calcite-field-set>
`;
