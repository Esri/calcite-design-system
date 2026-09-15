import { html } from "../../../support/formatting";

type FieldSetStoryArgs = {
  disabled: boolean;
  legend: string;
  legendTextColor?: string;
  legendGap?: string;
  inputGap?: string;
  scale: "s" | "m" | "l";
};

const hiddenCustomGapArgTypes = Object.fromEntries(
  ["disabled", "legend", "legendTextColor", "scale"].map((key) => [key, { table: { disable: true }, control: false }]),
) as Partial<Record<keyof FieldSetStoryArgs, { table: { disable: true }; control: false }>>;

export default {
  title: "Components/Field Set",
  parameters: { layout: "padded" },
  args: {
    disabled: false,
    legend: "Field Set legend",
    legendTextColor: "",
    legendGap: "",
    inputGap: "",
    scale: "m",
  },
  argTypes: {
    disabled: { control: { type: "boolean" } },
    legend: { control: { type: "text" } },
    legendTextColor: { name: "legend text color", control: { type: "text" } },
    legendGap: { name: "legend gap", control: { type: "text" } },
    inputGap: { name: "input gap", control: { type: "text" } },
    scale: {
      options: ["s", "m", "l"],
      control: { type: "radio", labels: { m: "m (default)" } },
    },
  },
};

function getStyle(args: FieldSetStoryArgs): string {
  return [
    args.inputGap ? `--calcite-field-set-input-gap: ${args.inputGap};` : "",
    args.legendGap ? `--calcite-field-set-legend-gap: ${args.legendGap};` : "",
    args.legendTextColor ? `--calcite-field-set-legend-text-color: ${args.legendTextColor};` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function renderFieldSet(args: FieldSetStoryArgs, useLabel = false): string {
  const style = getStyle(args);
  const controls = useLabel
    ? html`
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        <calcite-label>
          Label
          <calcite-input
            status="invalid"
            validation-icon="frown"
            validation-message="This field is required."
          ></calcite-input>
        </calcite-label>
        <calcite-label>Label<calcite-input disabled></calcite-input></calcite-label>
        <calcite-label>Label<calcite-text-area></calcite-text-area></calcite-label>
      `
    : html`
        <calcite-input label-text="Label"></calcite-input>
        <calcite-input
          label-text="Label"
          status="invalid"
          validation-icon="frown"
          validation-message="This field is required."
        ></calcite-input>
        <calcite-input disabled label-text="Label"></calcite-input>
        <calcite-text-area label-text="Label"></calcite-text-area>
      `;

  return html`
    <calcite-field-set
      ${args.disabled ? "disabled" : ""}
      legend="${args.legend}"
      scale="${args.scale}"
      ${style ? `style="${style}"` : ""}
    >
      ${controls}
    </calcite-field-set>
  `;
}

export const simple = (args: FieldSetStoryArgs): string => renderFieldSet(args);

export const simpleUsingLabel = (args: FieldSetStoryArgs): string => renderFieldSet(args, true);
simpleUsingLabel.storyName = "Simple (using 'Label')";

export const disabled = (args: FieldSetStoryArgs): string => renderFieldSet(args);
disabled.args = { disabled: true };
disabled.parameters = { controls: { disable: true } };

export const disabledUsingLabel = (args: FieldSetStoryArgs): string => renderFieldSet(args, true);
disabledUsingLabel.storyName = "Disabled (using 'Label')";
disabledUsingLabel.args = { disabled: true };
disabledUsingLabel.parameters = { controls: { disable: true } };

export const scales = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; gap: 3rem;">
    ${renderFieldSet({ ...args, legend: "Small", scale: "s" })}
    ${renderFieldSet({ ...args, legend: "Medium (default)", scale: "m" })}
    ${renderFieldSet({ ...args, legend: "Large", scale: "l" })}
  </div>
`;
scales.parameters = { controls: { disable: true } };

export const scalesUsingLabel = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; gap: 3rem;">
    ${renderFieldSet({ ...args, legend: "Small", scale: "s" }, true)}
    ${renderFieldSet({ ...args, legend: "Medium (default)", scale: "m" }, true)}
    ${renderFieldSet({ ...args, legend: "Large", scale: "l" }, true)}
  </div>
`;
scalesUsingLabel.storyName = "Scales (using 'Label')";
scalesUsingLabel.parameters = { controls: { disable: true } };

export const customGap = (args: FieldSetStoryArgs): string => renderFieldSet(args);
customGap.args = { inputGap: "40px", legendGap: "80px" };
customGap.argTypes = {
  inputGap: { name: "input gap", control: { type: "text" } },
  legendGap: { name: "legend gap", control: { type: "text" } },
  ...hiddenCustomGapArgTypes,
};

export const customGapUsingLabel = (args: FieldSetStoryArgs): string => renderFieldSet(args, true);
customGapUsingLabel.storyName = "Custom gap (using 'Label')";
customGapUsingLabel.args = { inputGap: "40px", legendGap: "80px" };
customGapUsingLabel.argTypes = customGap.argTypes;

export const customLegendColor = (args: FieldSetStoryArgs): string => renderFieldSet(args);
customLegendColor.args = { legendTextColor: "pink" };
customLegendColor.parameters = { controls: { disable: true } };

export const customLegendColorUsingLabel = (args: FieldSetStoryArgs): string => renderFieldSet(args, true);
customLegendColorUsingLabel.storyName = "Custom legend color (using 'Label')";
customLegendColorUsingLabel.args = { legendTextColor: "pink" };
customLegendColorUsingLabel.parameters = { controls: { disable: true } };

export const slottedFieldGroups = (args: FieldSetStoryArgs): string => html`
  <calcite-field-set legend="Field Set legend" scale="${args.scale}">
    <calcite-field-group layout="columns" columns="2">
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <calcite-field-group layout="horizontal">
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <calcite-field-group>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <calcite-input label-text="Label"></calcite-input>
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
`;
slottedFieldGroups.parameters = { controls: { disable: true } };

export const slottedFieldGroupsUsingLabel = (args: FieldSetStoryArgs): string => html`
  <calcite-field-set legend="Field Set legend" scale="${args.scale}">
    <calcite-field-group columns="2" layout="columns">
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
    </calcite-field-group>
    <calcite-field-group layout="horizontal">
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
    </calcite-field-group>
    <calcite-field-group>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
    </calcite-field-group>
    <calcite-label>Label<calcite-input></calcite-input></calcite-label>
    <calcite-label>Label<calcite-input></calcite-input></calcite-label>
  </calcite-field-set>
`;
slottedFieldGroupsUsingLabel.storyName = "Slotted Field Groups (using 'Label')";
slottedFieldGroupsUsingLabel.parameters = { controls: { disable: true } };
