import { html } from "../../../support/formatting";

type FieldSetStoryArgs = {
  disabled: boolean;
  legend: string;
  legendTextColor?: string;
  inputGap?: string;
  gap?: string;
  columnGap?: string;
  scale: "s" | "m" | "l";
  layout: "vertical" | "horizontal" | "columns";
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  prefixAutoWidth: boolean;
  suffixAutoWidth: boolean;
};

const hiddenCustomSpacingArgTypes = Object.fromEntries(
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
    columnGap: {
      name: "columnSpace",
      control: { type: "text" },
      if: { arg: "layout", eq: "columns" },
    },
    gap: {
      name: "space",
      control: { type: "text" },
    },
    inputGap: {
      name: "inputSpace",
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
    args.columnGap ? `--calcite-field-set-column-gap: ${args.columnGap};` : "",
    args.gap ? `--calcite-field-set-gap: ${args.gap};` : "",
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
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input
        label-text="Label"
        placeholder="Placeholder"
        status="invalid"
        validation-message="This field is required."
        validation-icon="frown"
      ></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder" disabled></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-text-area label-text="Label" placeholder="Placeholder"></calcite-text-area>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder" value="Sample value"></calcite-input>
      <calcite-checkbox label-text="Allows large dogs"></calcite-checkbox>
      <calcite-radio-button label-text="Standalone radio button" value="standalone"></calcite-radio-button>
      <calcite-radio-button-group name="framework">
        <calcite-radio-button label-text="React" value="react"></calcite-radio-button>
        <calcite-radio-button label-text="Vue" value="vue"></calcite-radio-button>
      </calcite-radio-button-group>
      <calcite-switch label="Enable notifications"></calcite-switch>
      <calcite-select label-text="Select an option">
        <calcite-option label="First option" value="first"></calcite-option>
        <calcite-option label="Second option" value="second"></calcite-option>
      </calcite-select>
      <calcite-combobox label-text="Choose an option">
        <calcite-combobox-item heading="First option" value="first"></calcite-combobox-item>
        <calcite-combobox-item heading="Second option" value="second"></calcite-combobox-item>
      </calcite-combobox>
      <calcite-slider label-text="Slider" max="100" min="0" value="50"></calcite-slider>
      <calcite-segmented-control label-text="Framework">
        <calcite-segmented-control-item checked value="react">React</calcite-segmented-control-item>
        <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
      </calcite-segmented-control>
    </calcite-field-set>
  `;
};
simple.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const disabled = (args: FieldSetStoryArgs): string => simple(args);
disabled.args = { disabled: true };
disabled.parameters = {
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

export const customSpacing = (args: FieldSetStoryArgs): string => simple(args);
customSpacing.args = { columnGap: "50px", inputGap: "40px", gap: "80px", layout: "columns" };
customSpacing.argTypes = {
  columnGap: {
    name: "columnSpace",
    control: { type: "text" },
  },
  gap: {
    name: "space",
    control: { type: "text" },
  },
  inputGap: {
    name: "inputSpace",
    control: { type: "text" },
  },
  ...hiddenCustomSpacingArgTypes,
};

export const customLegendColor = (args: FieldSetStoryArgs): string => simple(args);
customLegendColor.args = { legendTextColor: "pink" };
customLegendColor.parameters = { controls: { disable: true } };

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

const labels = (args: FieldSetStoryArgs): string => {
  const style = [
    args.columnGap ? `--calcite-field-set-column-gap: ${args.columnGap};` : "",
    args.gap ? `--calcite-field-set-gap: ${args.gap};` : "",
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
        <calcite-input placeholder="Placeholder"></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input
          placeholder="Placeholder"
          status="invalid"
          validation-message="This field is required."
          validation-icon="frown"
        ></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input placeholder="Placeholder" disabled></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input placeholder="Placeholder"></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-text-area placeholder="Placeholder"></calcite-text-area>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input placeholder="Placeholder"></calcite-input>
      </calcite-label>
      <calcite-label>
        Label
        <calcite-input placeholder="Placeholder" value="Sample value"></calcite-input>
      </calcite-label>
      <calcite-label>
        Allows large dogs
        <calcite-checkbox></calcite-checkbox>
      </calcite-label>
      <calcite-label layout="inline">
        Standalone radio button
        <calcite-radio-button value="standalone"></calcite-radio-button>
      </calcite-label>
      <calcite-radio-button-group name="framework">
        <calcite-label layout="inline">
          React
          <calcite-radio-button value="react"></calcite-radio-button>
        </calcite-label>
        <calcite-label layout="inline">
          Vue
          <calcite-radio-button value="vue"></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>
      <calcite-label>
        Enable notifications
        <calcite-switch></calcite-switch>
      </calcite-label>
      <calcite-label>
        Select an option
        <calcite-select>
          <calcite-option label="First option" value="first"></calcite-option>
          <calcite-option label="Second option" value="second"></calcite-option>
        </calcite-select>
      </calcite-label>
      <calcite-label>
        Choose an option
        <calcite-combobox>
          <calcite-combobox-item heading="First option" value="first"></calcite-combobox-item>
          <calcite-combobox-item heading="Second option" value="second"></calcite-combobox-item>
        </calcite-combobox>
      </calcite-label>
      <calcite-label>
        Slider
        <calcite-slider max="100" min="0" value="50"></calcite-slider>
      </calcite-label>
      <calcite-label>
        Framework
        <calcite-segmented-control>
          <calcite-segmented-control-item checked value="react">React</calcite-segmented-control-item>
          <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
        </calcite-segmented-control>
      </calcite-label>
    </calcite-field-set>
  `;
};

export const simpleUsingLabels = (args: FieldSetStoryArgs): string => labels(args);
simpleUsingLabels.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const disabledUsingLabels = (args: FieldSetStoryArgs): string => labels(args);
disabledUsingLabels.args = { disabled: true };
disabledUsingLabels.parameters = {
  controls: { exclude: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const scalesUsingLabels = (args: FieldSetStoryArgs): string => html`
  <div style="display: flex; gap: 3rem;">
    ${labels({ ...args, legend: "Small", scale: "s" })} ${labels({ ...args, legend: "Medium (default)" })}
    ${labels({ ...args, legend: "Large", scale: "l" })}
  </div>
`;
scalesUsingLabels.args = { scale: "m" };
scalesUsingLabels.parameters = { controls: { disable: true } };

export const layoutsUsingLabels = (args: FieldSetStoryArgs): string => html`
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
layoutsUsingLabels.parameters = { controls: { disable: true } };

export const customSpacingUsingLabels = (args: FieldSetStoryArgs): string => labels(args);
customSpacingUsingLabels.args = {
  columnGap: "50px",
  inputGap: "40px",
  gap: "80px",
  layout: "columns",
};
customSpacingUsingLabels.argTypes = {
  columnGap: {
    name: "columnSpace",
    control: { type: "text" },
  },
  gap: {
    name: "space",
    control: { type: "text" },
  },
  inputGap: {
    name: "inputSpace",
    control: { type: "text" },
  },
  ...hiddenCustomSpacingArgTypes,
};

export const customLegendColorUsingLabels = (args: FieldSetStoryArgs): string => labels(args);
customLegendColorUsingLabels.args = { legendTextColor: "pink" };
customLegendColorUsingLabels.parameters = { controls: { disable: true } };

export const prefixAndSuffixAutoWidthUsingLabels = (args: FieldSetStoryArgs): string => html`
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
prefixAndSuffixAutoWidthUsingLabels.args = { prefixAutoWidth: true, suffixAutoWidth: true };
prefixAndSuffixAutoWidthUsingLabels.parameters = {
  controls: { include: ["prefixAutoWidth", "suffixAutoWidth"] },
};

export const fieldRowWrappers = (): string => html`
  <calcite-field-set legend="Field Set legend">
    <calcite-field-row layout="columns" columns="6">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-field-row layout="columns" columns="5">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-field-row layout="columns" columns="4">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-field-row layout="columns" columns="3">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-field-row layout="columns" columns="2">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-field-row layout="columns" columns="1">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
  </calcite-field-set>
`;

export const fieldSetOneRowWrapper = (): string => html`
  <calcite-field-set legend="Field Set legend">
    <calcite-field-row layout="columns" columns="6">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-field-row layout="columns" columns="5">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-field-row layout="columns" columns="4">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-field-row layout="columns" columns="3">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-field-row layout="columns" columns="2">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
  </calcite-field-set>
`;

export const fieldSetParentChildColumns = (): string => html`
  <calcite-field-set layout="columns" columns="2" legend="Field Set legend">
    <calcite-field-row layout="columns" columns="2">
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
    <calcite-field-row>
      <calcite-input label-text="Label" placeholder="Placeholder"></calcite-input>
    </calcite-field-row>
  </calcite-field-set>
`;
