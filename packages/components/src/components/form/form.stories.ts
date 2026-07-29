import { html } from "../../../support/formatting";

type FormStoryArgs = {
  showButtons: boolean;
  showNotice: boolean;
};

export default {
  title: "Components/Form",
  parameters: {
    layout: "padded",
  },
  args: {
    showButtons: true,
    showNotice: true,
  },
  argTypes: {
    showButtons: {
      name: "buttons",
      control: { type: "boolean" },
    },
    showNotice: {
      name: "notice",
      control: { type: "boolean" },
    },
  },
};

export const simple = (args: FormStoryArgs): string => html`
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
    ${args.showNotice
      ? html`
          <calcite-notice open icon="exclamation-mark-triangle-f" kind="danger" slot="notice">
            <div slot="message">Aggregate notice</div>
          </calcite-notice>
        `
      : ""}
    ${args.showButtons
      ? html`
          <calcite-button slot="buttons" appearance="outline">Cancel</calcite-button>
          <calcite-button slot="buttons">Save</calcite-button>
        `
      : ""}
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
      <calcite-button slot="buttons" appearance="outline">Cancel</calcite-button>
      <calcite-button slot="buttons">Save</calcite-button>
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
      <calcite-button slot="buttons" appearance="outline">Cancel</calcite-button>
      <calcite-button slot="buttons">Save</calcite-button>
    </calcite-form>
  </div>
`;
