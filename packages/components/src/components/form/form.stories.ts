import { html } from "../../../support/formatting";

export default {
  title: "Components/Form",
  parameters: {
    layout: "padded",
  },
};

export const sample = (): string => html`
  <calcite-form>
    <calcite-field-set>
      <div slot="legend">Field Set legend</div>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-set>
    <calcite-field-set>
      <div slot="legend">Field Set legend</div>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-set>
  </calcite-form>
`;
