import { html } from "../../../support/formatting";

type FormStoryArgs = {
  disabled: boolean;
  readOnly: boolean;
  scale: "s" | "m" | "l";
  showButtons: boolean;
  showNotice: boolean;
};

export default {
  title: "Components/Form",
  parameters: {
    layout: "padded",
  },
  args: {
    disabled: false,
    readOnly: false,
    scale: "m",
    showButtons: true,
    showNotice: true,
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      name: "read-only",
      control: { type: "boolean" },
    },
    scale: {
      options: ["s", "m", "l"],
      control: {
        type: "radio",
        labels: {
          m: "m (default)",
        },
      },
    },
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
  <calcite-form ${args.disabled ? "disabled" : ""} ${args.readOnly ? "read-only" : ""} scale="${args.scale}">
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

export const scales = (args: FormStoryArgs): string => html`
  <div style="display: flex; gap: 3rem;">
    ${simple({ ...args, scale: "s" })} ${simple({ ...args, scale: "m" })} ${simple({ ...args, scale: "l" })}
  </div>
`;
scales.args = { scale: "m" };
scales.parameters = { controls: { disable: true } };

export const Disabled = (args: FormStoryArgs): string => simple(args);
Disabled.args = { disabled: true };
Disabled.parameters = { controls: { disable: true } };

export const ReadOnly = (args: FormStoryArgs): string => simple(args);
ReadOnly.args = { readOnly: true };
ReadOnly.parameters = { controls: { disable: true } };

const renderControlsForm = (args: FormStoryArgs, style = ""): string => html`
  <calcite-form
    ${args.disabled ? "disabled" : ""}
    ${args.readOnly ? "read-only" : ""}
    scale="${args.scale}"
    ${style ? `style="${style}"` : ""}
  >
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
    <calcite-field-set layout="columns" columns="2">
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
`;

export const controls = (args: FormStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 50px;">
    ${renderControlsForm(args)} ${renderControlsForm(args, "inline-size: 382px;")}
  </div>
`;
