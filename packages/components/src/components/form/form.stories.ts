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

export const mix = (): string => html`
  <div style="display: flex; flex-direction: column; gap: 50px;">
    <calcite-form>
      <calcite-field-set columns="2" layout="columns">
        <div slot="legend">Field Set legend</div>
        <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
        <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      </calcite-field-set>
      <calcite-field-set>
        <div slot="legend">Field Set legend</div>
        <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
        <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      </calcite-field-set>
      <calcite-field-set layout="horizontal">
        <div slot="legend">Field Set legend</div>
        <calcite-checkbox label-text="Allows large dogs"></calcite-checkbox>
        <calcite-checkbox label-text="Must have parking"></calcite-checkbox>
        <calcite-checkbox label-text="Allows cats"></calcite-checkbox>
        <calcite-checkbox label-text="Must be on ground floor"></calcite-checkbox>
        <calcite-checkbox label-text="On-site laundry"></calcite-checkbox>
        <calcite-checkbox label-text="Waterfront"></calcite-checkbox>
        <calcite-checkbox label-text="On-site parking"></calcite-checkbox>
      </calcite-field-set>
    </calcite-form>
    <calcite-form style="inline-size: 382px;">
      <calcite-field-set columns="2" layout="columns">
        <div slot="legend">Field Set legend</div>
        <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
        <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      </calcite-field-set>
      <calcite-field-set>
        <div slot="legend">Field Set legend</div>
        <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
        <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      </calcite-field-set>
      <calcite-field-set layout="horizontal">
        <div slot="legend">Field Set legend</div>
        <calcite-checkbox label-text="Allows large dogs"></calcite-checkbox>
        <calcite-checkbox label-text="Must have parking"></calcite-checkbox>
        <calcite-checkbox label-text="Allows cats"></calcite-checkbox>
        <calcite-checkbox label-text="Must be on ground floor"></calcite-checkbox>
        <calcite-checkbox label-text="On-site laundry"></calcite-checkbox>
        <calcite-checkbox label-text="Waterfront"></calcite-checkbox>
        <calcite-checkbox label-text="On-site parking"></calcite-checkbox>
      </calcite-field-set>
    </calcite-form>
  </div>
`;
