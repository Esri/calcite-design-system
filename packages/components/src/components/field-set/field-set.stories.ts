import { html } from "../../../support/formatting";

type FieldSetStoryArgs = {
  layout: "vertical" | "horizontal";
};

export default {
  title: "Components/Field Set",
  args: {
    layout: "vertical",
  },
  argTypes: {
    layout: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
    },
  },
};

export const simple = (args: FieldSetStoryArgs): string => html`
  <calcite-field-set layout="${args.layout}">
    <div slot="legend">Field Set</div>
    <calcite-label layout="default">
      Controlled label
      <calcite-input-text
        id="label-controls-input-1"
        placeholder="Adjust label controls"
        status="invalid"
        validation-message="This field is required."
        validation-icon="frown"
      ></calcite-input-text>
    </calcite-label>
    <calcite-label layout="default">
      Controlled label
      <calcite-input-text
        id="label-controls-input-2"
        placeholder="Adjust label controls"
        status="invalid"
        validation-message="This field is required."
        validation-icon="frown"
      ></calcite-input-text>
    </calcite-label>
  </calcite-field-set>
`;
