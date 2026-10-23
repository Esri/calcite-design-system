import "./field-set";
import "../field-group/field-group";
import "../input/input";
import "../label/label";
import "../text-area/text-area";
import { html } from "../../../support/formatting";

type FieldSetStoryArgs = {
  legend: string;
  legendTextColor?: string;
  gap?: string;
};

const hiddenCustomGapArgTypes = Object.fromEntries(
  ["legend", "legendTextColor"].map((key) => [key, { table: { disable: true }, control: false }]),
) as Partial<Record<keyof FieldSetStoryArgs, { table: { disable: true }; control: false }>>;

export default {
  title: "Components/Field Set",
  parameters: { layout: "padded" },
  args: {
    legend: "Field Set legend",
    legendTextColor: "",
    gap: "",
  },
  argTypes: {
    legend: { control: { type: "text" } },
    legendTextColor: { name: "legend text color", control: { type: "text" } },
    gap: { control: { type: "text" } },
  },
};

function getStyle(args: FieldSetStoryArgs): string {
  return [
    args.gap ? `--calcite-field-set-gap: ${args.gap};` : "",
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
    <calcite-field-set legend="${args.legend}" ${style ? `style="${style}"` : ""}> ${controls} </calcite-field-set>
  `;
}

export const simple = (args: FieldSetStoryArgs): string => renderFieldSet(args);

export const simpleUsingLabel = (args: FieldSetStoryArgs): string => renderFieldSet(args, true);
simpleUsingLabel.storyName = "Simple (using 'Label')";

export const complex = (args: FieldSetStoryArgs): string => {
  const style = getStyle(args);

  return html`
    <calcite-field-set legend="${args.legend}" ${style ? `style="${style}"` : ""}>
      <calcite-field-group layout="columns" columns="2">
        <calcite-input label-text="Label"></calcite-input>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-group>
      <calcite-field-group layout="horizontal">
        <calcite-input label-text="Label"></calcite-input>
        <calcite-input label-text="Label"></calcite-input>
      </calcite-field-group>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-set>
  `;
};

export const complexUsingLabel = (args: FieldSetStoryArgs): string => {
  const style = getStyle(args);

  return html`
    <calcite-field-set legend="${args.legend}" ${style ? `style="${style}"` : ""}>
      <calcite-field-group layout="columns" columns="2">
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-group>
      <calcite-field-group layout="horizontal">
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
        <calcite-label>Label<calcite-input></calcite-input></calcite-label>
      </calcite-field-group>
      <calcite-label>Label<calcite-input></calcite-input></calcite-label>
    </calcite-field-set>
  `;
};
complexUsingLabel.storyName = "Complex (using 'Label')";

export const customGap = (args: FieldSetStoryArgs): string => complex(args);
customGap.args = { gap: "40px" };
customGap.argTypes = {
  gap: { control: { type: "text" } },
  ...hiddenCustomGapArgTypes,
};

export const customGapUsingLabel = (args: FieldSetStoryArgs): string => complexUsingLabel(args);
customGapUsingLabel.storyName = "Custom gap (using 'Label')";
customGapUsingLabel.args = { gap: "40px" };
customGapUsingLabel.argTypes = customGap.argTypes;

export const customLegendColor = (args: FieldSetStoryArgs): string => complex(args);
customLegendColor.args = { legendTextColor: "pink" };
customLegendColor.parameters = { controls: { disable: true } };

export const customLegendColorUsingLabel = (args: FieldSetStoryArgs): string => complexUsingLabel(args);
customLegendColorUsingLabel.storyName = "Custom legend color (using 'Label')";
customLegendColorUsingLabel.args = { legendTextColor: "pink" };
customLegendColorUsingLabel.parameters = { controls: { disable: true } };

export const slottedFieldGroups = (): string => html`
  <calcite-field-set legend="Field Set legend">
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

export const slottedFieldGroupsUsingLabel = (): string => html`
  <calcite-field-set legend="Field Set legend">
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
