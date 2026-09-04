import { html } from "../../../support/formatting";

type FieldSetStoryArgs = {
  disabled: boolean;
  legend: string;
  legendTextColor?: string;
  gap?: string;
  columnGap?: string;
  inputGap?: string;
  scale: "s" | "m" | "l";
  layout: "vertical" | "horizontal" | "columns";
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  prefixAutoWidth: boolean;
  suffixAutoWidth: boolean;
};

const hiddenCustomGapArgTypes = Object.fromEntries(
  ["columns", "disabled", "layout", "legend", "legendTextColor", "prefixAutoWidth", "scale", "suffixAutoWidth"].map(
    (key) => [key, { table: { disable: true }, control: false }],
  ),
) as Partial<Record<keyof FieldSetStoryArgs, { table: { disable: true }; control: false }>>;

export default {
  title: "Components/Field Set",
  parameters: {
    layout: "padded",
  },
  args: {
    disabled: false,
    legend: "Field Set legend",
    legendTextColor: "",
    scale: "m",
    layout: "vertical",
    columns: 1,
    columnGap: "",
    prefixAutoWidth: false,
    suffixAutoWidth: false,
  },
  argTypes: {
    gap: {
      name: "gap",
      control: { type: "text" },
    },
    columnGap: {
      name: "column gap",
      control: { type: "text" },
      if: { arg: "layout", eq: "columns" },
    },
    inputGap: {
      name: "input gap",
      control: { type: "text" },
    },
    layout: {
      options: ["vertical", "horizontal", "columns"],
      control: { type: "radio" },
    },
    columns: {
      options: [1, 2, 3, 4, 5, 6],
      control: { type: "radio" },
      if: { arg: "layout", eq: "columns" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    legend: {
      control: { type: "text" },
    },
    legendTextColor: {
      name: "legend text color",
      control: { type: "text" },
    },
    prefixAutoWidth: {
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
    suffixAutoWidth: {
      control: { type: "boolean" },
    },
  },
};

export const simple = (args: FieldSetStoryArgs): string => {
  const style = [
    args.gap ? `--calcite-field-set-gap: ${args.gap};` : "",
    args.columnGap ? `--calcite-field-set-column-gap: ${args.columnGap};` : "",
    args.inputGap ? `--calcite-field-set-input-gap: ${args.inputGap};` : "",
    args.legendTextColor ? `--calcite-field-set-legend-text-color: ${args.legendTextColor};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <calcite-field-set
      ${args.layout === "columns" && args.columns ? `columns="${args.columns}"` : ""}
      ${args.disabled ? "disabled" : ""}
      legend="${args.legend}"
      layout="${args.layout}"
      scale="${args.scale}"
      ${style ? `style="${style}"` : ""}
    >
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input
        label-text="Label"
        status="invalid"
        validation-message="This field is required."
        validation-icon="frown"
      ></calcite-input>
      <calcite-input label-text="Label" disabled></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-text-area label-text="Label"></calcite-text-area>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-set>
  `;
};
simple.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const simpleUsingLabel = (args: FieldSetStoryArgs): string => labels(args);
simpleUsingLabel.storyName = "Simple (using 'Label')";
simpleUsingLabel.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const disabled = (args: FieldSetStoryArgs): string => simple(args);
disabled.args = { disabled: true };
disabled.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const disabledUsingLabel = (args: FieldSetStoryArgs): string => labels(args);
disabledUsingLabel.storyName = "Disabled (using 'Label')";
disabledUsingLabel.args = { disabled: true };
disabledUsingLabel.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const scales = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; gap: 3rem;">
    ${simple({ ...args, legend: "Small", scale: "s" })} ${simple({ ...args, legend: "Medium (default)" })}
    ${simple({ ...args, legend: "Large", scale: "l" })}
  </div>
`;
scales.args = { scale: "m" };
scales.parameters = { controls: { disable: true } };

export const scalesUsingLabel = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; gap: 3rem;">
    ${labels({ ...args, legend: "Small", scale: "s" })} ${labels({ ...args, legend: "Medium (default)" })}
    ${labels({ ...args, legend: "Large", scale: "l" })}
  </div>
`;
scalesUsingLabel.storyName = "Scales (using 'Label')";
scalesUsingLabel.args = { scale: "m" };
scalesUsingLabel.parameters = { controls: { disable: true } };

export const layouts = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${simple({ ...args, layout: "vertical", legend: "Vertical" })}
    ${simple({ ...args, layout: "horizontal", legend: "Horizontal" })}
    ${simple({ ...args, columns: 1, layout: "columns", legend: "Columns (1)" })}
    ${simple({ ...args, columns: 2, layout: "columns", legend: "Columns (2)" })}
    ${simple({ ...args, columns: 3, layout: "columns", legend: "Columns (3)" })}
    ${simple({ ...args, columns: 4, layout: "columns", legend: "Columns (4)" })}
    ${simple({ ...args, columns: 5, layout: "columns", legend: "Columns (5)" })}
    ${simple({ ...args, columns: 6, layout: "columns", legend: "Columns (6)" })}
  </div>
`;
layouts.parameters = { controls: { disable: true } };

export const layoutsUsingLabel = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${labels({ ...args, layout: "vertical", legend: "Vertical" })}
    ${labels({ ...args, layout: "horizontal", legend: "Horizontal" })}
    ${labels({ ...args, columns: 1, layout: "columns", legend: "Columns (1)" })}
    ${labels({ ...args, columns: 2, layout: "columns", legend: "Columns (2)" })}
    ${labels({ ...args, columns: 3, layout: "columns", legend: "Columns (3)" })}
    ${labels({ ...args, columns: 4, layout: "columns", legend: "Columns (4)" })}
    ${labels({ ...args, columns: 5, layout: "columns", legend: "Columns (5)" })}
    ${labels({ ...args, columns: 6, layout: "columns", legend: "Columns (6)" })}
  </div>
`;
layoutsUsingLabel.storyName = "Layout (using 'Label')";
layoutsUsingLabel.parameters = { controls: { disable: true } };

export const customGap = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${simple(args)} ${simple({ ...args, columns: 2, layout: "columns" })}
  </div>
`;
customGap.args = { gap: "80px", columnGap: "50px", inputGap: "40px", layout: "columns" };
customGap.argTypes = {
  gap: {
    name: "gap",
    control: { type: "text" },
  },
  columnGap: {
    name: "column gap",
    control: { type: "text" },
  },
  inputGap: {
    name: "input gap",
    control: { type: "text" },
  },
  ...hiddenCustomGapArgTypes,
};

export const customGapUsingLabel = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    ${labels(args)} ${labels({ ...args, columns: 2, layout: "columns" })}
  </div>
`;
customGapUsingLabel.storyName = "Custom gap (using 'Label')";
customGapUsingLabel.args = {
  gap: "80px",
  columnGap: "50px",
  inputGap: "40px",
  layout: "columns",
};
customGapUsingLabel.argTypes = {
  gap: {
    name: "gap",
    control: { type: "text" },
  },
  columnGap: {
    name: "column gap",
    control: { type: "text" },
  },
  inputGap: {
    name: "input gap",
    control: { type: "text" },
  },
  ...hiddenCustomGapArgTypes,
};

export const customLegendColor = (args: FieldSetStoryArgs): string => html`
  <calcite-field-set
    legend="${args.legend}"
    layout="${args.layout}"
    scale="${args.scale}"
    style="--calcite-field-set-legend-text-color: ${args.legendTextColor};"
  >
    <calcite-input label-text="Label"></calcite-input>
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
`;
customLegendColor.args = { legendTextColor: "pink" };
customLegendColor.parameters = { controls: { disable: true } };

export const customLegendColorUsingLabel = (args: FieldSetStoryArgs): string => html`
  <calcite-field-set
    legend="${args.legend}"
    layout="${args.layout}"
    scale="${args.scale}"
    style="--calcite-field-set-legend-text-color: ${args.legendTextColor};"
  >
    <calcite-label>
      Label
      <calcite-input></calcite-input>
    </calcite-label>
    <calcite-label>
      Label
      <calcite-input></calcite-input>
    </calcite-label>
  </calcite-field-set>
`;
customLegendColorUsingLabel.storyName = "Custom legend color (using 'Label')";
customLegendColorUsingLabel.args = { legendTextColor: "pink" };
customLegendColorUsingLabel.parameters = { controls: { disable: true } };

export const prefixAndSuffixAutoWidth = (args: FieldSetStoryArgs): string => html`
  <calcite-field-set
    ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
    ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
    legend="prefix and suffix auto-width"
  >
    <calcite-input
      label-text="Desired size"
      prefix-text="prefix"
      suffix-text="px"
      placeholder="Enter a size"
    ></calcite-input>
    <calcite-input
      label-text="Desired size"
      prefix-text="longer prefix"
      suffix-text="pixels"
      placeholder="Enter a size"
    ></calcite-input>
    <calcite-input
      label-text="Desired size"
      prefix-text="abc"
      suffix-text="centimeters"
      placeholder="Enter a size"
    ></calcite-input>
  </calcite-field-set>
`;
prefixAndSuffixAutoWidth.args = { prefixAutoWidth: true, suffixAutoWidth: true };
prefixAndSuffixAutoWidth.parameters = {
  controls: { include: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const prefixAndSuffixAutoWidthUsingLabel = (args: FieldSetStoryArgs): string => html`
  <calcite-field-set
    ${args.prefixAutoWidth ? "prefix-auto-width" : ""}
    ${args.suffixAutoWidth ? "suffix-auto-width" : ""}
    legend="prefix and suffix auto-width"
  >
    <calcite-label>
      Desired size
      <calcite-input prefix-text="prefix" suffix-text="px" placeholder="Enter a size"></calcite-input>
    </calcite-label>
    <calcite-label>
      Desired size
      <calcite-input prefix-text="longer prefix" suffix-text="pixels" placeholder="Enter a size"></calcite-input>
    </calcite-label>
    <calcite-label>
      Desired size
      <calcite-input prefix-text="abc" suffix-text="centimeters" placeholder="Enter a size"></calcite-input>
    </calcite-label>
  </calcite-field-set>
`;
prefixAndSuffixAutoWidthUsingLabel.storyName = "Prefix and suffix auto-width (using 'Label')";
prefixAndSuffixAutoWidthUsingLabel.args = { prefixAutoWidth: true, suffixAutoWidth: true };
prefixAndSuffixAutoWidthUsingLabel.parameters = {
  controls: { include: ["prefixAutoWidth", "suffixAutoWidth"] },
};

const labels = (args: FieldSetStoryArgs): string => {
  const style = [
    args.gap ? `--calcite-field-set-gap: ${args.gap};` : "",
    args.columnGap ? `--calcite-field-set-column-gap: ${args.columnGap};` : "",
    args.inputGap ? `--calcite-field-set-input-gap: ${args.inputGap};` : "",
    args.legendTextColor ? `--calcite-field-set-legend-text-color: ${args.legendTextColor};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return html`
    <calcite-field-set
      ${args.layout === "columns" && args.columns ? `columns="${args.columns}"` : ""}
      ${args.disabled ? "disabled" : ""}
      legend="${args.legend}"
      layout="${args.layout}"
      scale="${args.scale}"
      ${style ? `style="${style}"` : ""}
    >
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input
          status="invalid"
          validation-message="This field is required."
          validation-icon="frown"
        ></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input disabled></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-text-area></calcite-text-area>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input value="Sample value"></calcite-input>
      </calcite-label>
    </calcite-field-set>
  `;
};

export const slottedFieldGroup = (): string => html`
  <calcite-field-set legend="Field Set legend">
    <calcite-field-group layout="columns" columns="6">
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <calcite-field-group layout="columns" columns="5">
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <calcite-field-group layout="columns" columns="4">
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <calcite-field-group layout="columns" columns="3">
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <calcite-field-group layout="columns" columns="2">
      <calcite-input label-text="Label"></calcite-input>
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <calcite-field-group layout="columns" columns="1">
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <calcite-field-group layout="columns">
      <calcite-input label-text="Label"></calcite-input>
    </calcite-field-group>
    <calcite-input label-text="Label"></calcite-input>
    <calcite-input label-text="Label"></calcite-input>
  </calcite-field-set>
`;

export const slottedFieldGroupUsingLabel = (): string => html`
  <calcite-field-set legend="Field Set legend">
    <calcite-field-group layout="columns" columns="6">
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
    </calcite-field-group>
    <calcite-field-group layout="columns" columns="5">
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
    </calcite-field-group>
    <calcite-field-group layout="columns" columns="4">
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
    </calcite-field-group>
    <calcite-field-group layout="columns" columns="3">
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
    </calcite-field-group>
    <calcite-field-group layout="columns" columns="2">
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
    </calcite-field-group>
    <calcite-field-group layout="columns" columns="1">
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
    </calcite-field-group>
    <calcite-field-group layout="columns">
      <calcite-label>
        Label
        <calcite-input></calcite-input>
      </calcite-label>
    </calcite-field-group>
    <calcite-label>
      Label
      <calcite-input></calcite-input>
    </calcite-label>
    <calcite-label>
      Label
      <calcite-input></calcite-input>
    </calcite-label>
  </calcite-field-set>
`;
slottedFieldGroupUsingLabel.storyName = "Slotted Field Group (using 'Label')";
