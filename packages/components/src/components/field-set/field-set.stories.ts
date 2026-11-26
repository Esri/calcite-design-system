import "./field-set";
import "../button/button";
import "../field-group/field-group";
import "../input/input";
import "../input-number/input-number";
import "../input-text/input-text";
import "../label/label";
import "../option/option";
import "../select/select";
import "../text-area/text-area";
import { optionalAttribute } from "../../../.storybook/utils";
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
    <calcite-field-set legend="${args.legend}" ${optionalAttribute("style", style)}> ${controls} </calcite-field-set>
  `;
}

export const simple = (args: FieldSetStoryArgs): string => html`
  ${renderFieldSet({ ...args, legend: args.legend ?? "calcite-input" })} <br /><br />
  ${renderFieldSet({ ...args, legend: "calcite-label" }, true)}
`;
simple.args = { legend: "calcite-label" };

export const legend = (): string => html`
  <calcite-field-set>
    <div slot="legend">Legend as slot</div>
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
  <br /><br />
  <calcite-field-set legend="Legend as prop">
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
  <h1>no legend</h1>
  <calcite-field-set>
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
`;
legend.parameters = { controls: { disable: true } };

const renderComplex = (args: FieldSetStoryArgs): string => {
  const style = getStyle(args);

  return html`
    <calcite-field-set legend="${args.legend}" ${optionalAttribute("style", style)}>
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
};

const renderComplexUsingLabel = (args: FieldSetStoryArgs): string => {
  const style = getStyle(args);

  return html`
    <calcite-field-set legend="${args.legend}" ${optionalAttribute("style", style)}>
      <calcite-field-group layout="columns" columns="2">
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
};

export const complex = (args: FieldSetStoryArgs): string => html`
  ${renderComplex({ ...args, legend: "calcite-input" })} <br /><br />
  ${renderComplexUsingLabel({ ...args, legend: "calcite-label" })}
`;
complex.parameters = { controls: { disable: true } };

const renderUnitSelect = (label?: string): string => html`
  <calcite-select ${optionalAttribute("label-text", label)}>
    <calcite-option>Meters</calcite-option>
    <calcite-option>Kilometers</calcite-option>
    <calcite-option>Miles</calcite-option>
  </calcite-select>
`;

const renderClassRow = (labels: { min?: string; max?: string; unit?: string } = {}): string => html`
  <calcite-field-group layout="columns" columns="3">
    <calcite-input-number ${optionalAttribute("label-text", labels.min)} placeholder="Min"></calcite-input-number>
    <calcite-input-number ${optionalAttribute("label-text", labels.max)} placeholder="Max"></calcite-input-number>
    ${renderUnitSelect(labels.unit)}
  </calcite-field-group>
`;

export const custom = (): string => html`
  <style>
    .span-2-columns {
      grid-column: span 2;
    }
  </style>
  <div style="padding: 1rem;border: 2px solid blue;">
    <calcite-field-set>
      <calcite-field-set legend="Buffer radius">
        <calcite-input-number placeholder="123"></calcite-input-number>
      </calcite-field-set>
      <calcite-field-set legend="Buffer radius">
        <calcite-field-group layout="columns" columns="3">
          <calcite-input-number
            class="span-2-columns"
            label-text="Buffer radius"
            placeholder="123"
          ></calcite-input-number>
          ${renderUnitSelect("Buffer radius unit")}
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set legend="Classes (min-max)">
        ${[1, 2, 3]
          .map((row) =>
            renderClassRow({ min: `Class ${row} minimum`, max: `Class ${row} maximum`, unit: `Class ${row} unit` }),
          )
          .join("")}
        <calcite-field-group layout="columns" columns="3">
          <calcite-button appearance="outline-fill" icon-start="plus" kind="neutral">Add class</calcite-button>
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set legend="Buffer radius">
        <calcite-input-text value="Input Text value"></calcite-input-text>
      </calcite-field-set>
    </calcite-field-set>
  </div>
  <br /><br />
  <div style="padding: 1rem;border: 2px solid red;">
    <calcite-field-set>
      <calcite-field-group>
        <calcite-input-number label-text="Buffer radius" placeholder="123"></calcite-input-number>
      </calcite-field-group>
      <calcite-field-set>
        <calcite-field-group layout="columns" columns="3">
          <calcite-input-number
            class="span-2-columns"
            label-text="Buffer radius"
            placeholder="123"
          ></calcite-input-number>
          ${renderUnitSelect("Buffer radius unit")}
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-set>
        ${renderClassRow({ min: "Classes (min-max)" })} ${renderClassRow()} ${renderClassRow()}
        <calcite-field-group layout="columns" columns="3">
          <div>
            <calcite-button appearance="outline-fill" icon-start="plus" kind="neutral">Add class</calcite-button>
          </div>
        </calcite-field-group>
      </calcite-field-set>
      <calcite-field-group>
        <calcite-input-text label-text="Buffer radius" value="Input Text value"></calcite-input-text>
      </calcite-field-group>
    </calcite-field-set>
  </div>
`;
custom.parameters = { controls: { disable: true } };

export const customGap = (args: FieldSetStoryArgs): string => complex(args);
customGap.args = { gap: "40px" };
customGap.argTypes = {
  gap: { control: { type: "text" } },
  ...hiddenCustomGapArgTypes,
};
customGap.parameters = { controls: { disable: true } };

export const customLegendColor = (args: FieldSetStoryArgs): string => complex(args);
customLegendColor.args = { legendTextColor: "pink" };
customLegendColor.parameters = { controls: { disable: true } };
